import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import styles from './styles'

export default function ForgetPasswordScreen({navigation}) {
  return (
    <View style={[styles.container, styles.padding]}>
      <ScrollView>
        <Text>Forget Password</Text>
      </ScrollView>
    </View>
  )
}