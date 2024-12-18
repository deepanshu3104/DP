import { ActivityIndicator, SafeAreaView, ScrollView, StatusBar, Text, TouchableOpacity, View, ViewStyle } from 'react-native'
import React from 'react'
import { styles } from './styles'
import FastImage from 'react-native-fast-image'
import Modal from 'react-native-modal';
import { AppTextProps, CommonbtnProps, HeaderProps, ImageComponentProps, TouchableComponentProps, TouchableImageProps, TouchableTextProps, WrapperProps } from './Props'
import { colors, fonts } from './constants';
import { useNavigation } from '@react-navigation/native';
import { Images } from './Images';
import Ionicons from "react-native-vector-icons/Ionicons";


export const Wrapper: React.FC<WrapperProps> = ({ children }) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={colors.main1} barStyle={'dark-content'} />
      <ScrollView showsVerticalScrollIndicator={false}>
        {children}
      </ScrollView>
    </SafeAreaView>
  )
}
export const WrapperNoScroll: React.FC<WrapperProps> = ({ children }) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={colors.main1} barStyle={'dark-content'} />
      {children}
    </SafeAreaView>
  )
}
export const LWrapper: React.FC<WrapperProps> = ({ children, value }) => {
  const navigate = useNavigation()
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={colors.main1} barStyle={'dark-content'} />
      <ScrollView>
        {children}
      </ScrollView>
      {value === 'Login' ? <Text style={styles.lwtext1}>Don't have an Account ? <Text style={styles.lwtext2} onPress={() => { }}>Register</Text></Text> :
        <Text style={styles.lwtext1}>Already have an Account ? <Text style={styles.lwtext2} onPress={() => { }}>Login</Text></Text>}
    </SafeAreaView>
  )
}



export const ImageComponent: React.FC<ImageComponentProps> = ({
  style,
  source,
  resizeMode,
  tintColor,
}) => {
  return (
    <FastImage
      source={source}
      style={style}
      resizeMode={resizeMode}
      tintColor={tintColor}
    />
  );
};

export const TouchableComponent: React.FC<TouchableComponentProps> = ({
  onPress,
  style,
  children,
  onLongPress,
  hitSlop,
  onPressIn,
}) => {
  return (
    <TouchableOpacity
      style={style}
      onPress={onPress}
      onLongPress={onLongPress}
      activeOpacity={1}
      hitSlop={hitSlop}
      onPressIn={onPressIn}>
      {children}
    </TouchableOpacity>
  );
};

export const TouchableImage: React.FC<TouchableImageProps> = ({
  onPress,
  vstyle,
  style,
  source,
  resizeMode,
  tintColor,
}) => {
  return (
    <TouchableComponent onPress={onPress} style={vstyle}>
      <FastImage
        source={source}
        style={style}
        resizeMode={resizeMode}
        tintColor={tintColor}
      />
    </TouchableComponent>
  );
};
export const TouchableText: React.FC<TouchableTextProps> = ({
  onPress,
  vstyle,
  text,
  style,
}) => {
  return (
    <TouchableComponent onPress={onPress} style={vstyle}>
      <Text style={style}>{text}</Text>
    </TouchableComponent>
  );
};

export const AppText: React.FC<AppTextProps> = ({
  style,
  children,
  numberOfLines,
}) => {
  return (
    <Text style={style} numberOfLines={numberOfLines}>
      {children}
    </Text>
  );
};

export const Commonbtn: React.FC<CommonbtnProps> = ({
  onPress,
  title,
  opacity,
}) => {
  return (
    <TouchableComponent
      style={{ ...styles.cbtn, opacity: opacity } as ViewStyle}
      activeOpacity={1}
      onPress={onPress}>
      <AppText style={styles.cbtntxt}>{title}</AppText>
    </TouchableComponent>
  );
};
export const GoogleBtn: React.FC<CommonbtnProps> = ({
  onPress,
}) => {
  return (
    <TouchableComponent style={styles.btnview} onPress={onPress}>
      <ImageComponent source={Images.google} style={styles.btnimage} />
      <AppText style={styles.btntext}>Continue with Google</AppText>
    </TouchableComponent>
  );
};

export const Loadingcomponent: React.FC = () => {
  return (
    <Modal
      isVisible={true}
      backdropOpacity={0.5}
      animationIn="zoomInDown"
      animationOut="zoomOutUp"
      animationInTiming={600}
      animationOutTiming={600}
      backdropTransitionInTiming={600}
      backdropTransitionOutTiming={600}>
      <View
        style={styles.loadview}>
        <ActivityIndicator size={'large'} color={'purple'} />
      </View>
    </Modal>
  );
};

export const SpaceComponent: React.FC = () => {
  return <View style={{ marginVertical: 10 }} />;
}

export const Header: React.FC<HeaderProps>  = ({
  onPress, title
}: any) => {
  return (
    <View style={{ flexDirection: 'row', marginTop: 10, marginHorizontal: 20, alignItems: 'center' }}>
      <Ionicons
        name={"chevron-back"}
        size={35}
        color={colors.main2}
        onPress={onPress}
      />
      <Text style={{
        fontFamily: fonts.playregular,
        color: "#6A5ACD",
        fontSize: 30,
        marginHorizontal: 20
      }}>{title}</Text>
    </View>
  );
};
