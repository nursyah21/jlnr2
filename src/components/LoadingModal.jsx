import { View, Text, Modal } from 'react-native'
import React from 'react'
import styles from './styles'

export default function LoadingModal({visible=false, message='Please wait...'}) {
  return (
    <Modal
        animationType="fade"
        visible={visible}
        onRequestClose={() => {}
    }>
        <View style={styles.center}>
            <Text style={{textAlign: 'center'}}>{message}</Text>
        </View>
    </Modal>
  )
}