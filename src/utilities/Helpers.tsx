import { SafeAreaView, ScrollView } from 'react-native'
import React from 'react'
import { styles } from './styles'

export const Wrapper = ({children}:any) => {
  return (
   <SafeAreaView style={styles.container}>
    <ScrollView>
        {children}
    </ScrollView>
   </SafeAreaView>
  )
}

