import { ActivityIndicator, SafeAreaView, ScrollView, StatusBar, Text, TouchableOpacity, View, ViewStyle } from 'react-native'
import React from 'react'
import { styles } from './styles'
import FastImage from 'react-native-fast-image'
import Modal from 'react-native-modal';
import { AppTextProps, CommonbtnProps, ImageComponentProps, TouchableComponentProps, WrapperProps } from './Props'

export const Wrapper : React.FC<WrapperProps> = ({children}) => {
  return (
   <SafeAreaView style={styles.container}>
    <StatusBar backgroundColor={'black'}  barStyle={'light-content'}/>
    <ScrollView>
        {children}
    </ScrollView>
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
      style={{...styles.cbtn, opacity: opacity} as ViewStyle}
      activeOpacity={1}
      onPress={onPress}>
      <AppText style={styles.cbtntxt}>{title}</AppText>
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
        <ActivityIndicator size={'large'} color={'yellow'} />
      </View>
    </Modal>
  );
};

export const SpaceComponent: React.FC = () =>{
  return <View style={{marginVertical:10}} />;
}

