import { View, Text, TouchableOpacity } from 'react-native'
import React, {useEffect, useState} from 'react'
import { supabase } from '../lib/supabase'
import styles from './styles'
import LoadingScreen from './LoadingScreen'


export default function DashboardScene({session}) {
  const [loading, setLoading] = useState(false)
  const email = session.user.email
  const signOut = async () => {
    setLoading(true)
    await supabase.auth.signOut()
    setLoading(false)
  }
  useEffect(()=>{
    console.log(session.user.aud)
    console.log('user:',email)
  }, [])


  return (
    <View>
      <LoadingScreen visible={loading} />
      <Text>Hey, {email}</Text>
      <TouchableOpacity style={styles.btnPrimary} onPress={signOut}>
        <Text style={{color: 'white'}}>SignOut</Text>
      </TouchableOpacity>
    </View>
  )
}