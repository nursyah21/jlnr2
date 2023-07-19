import { View, Text, Modal } from 'react-native'
import React from 'react'
import styles from './styles'

export default function LoadingScreen({visible=false}) {
  return (
    <Modal
        animationType="fade"
        visible={visible}
        onRequestClose={() => {}
    }>
        <View style={styles.center}>
            <Text style={{textAlign: 'center'}}>Please wait...</Text>
        </View>
    </Modal>
  )
}