import { SafeAreaView, ScrollView, StatusBar } from 'react-native'
import React from 'react'
import { styles } from './styles'
import FastImage from 'react-native-fast-image'
import { ImageComponentProps } from './Props'

export const Wrapper = ({children}:any) => {
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

