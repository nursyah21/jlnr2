import { View, Text, TouchableOpacity } from "react-native"
import { useState } from "react"
import LoadingModal from "../LoadingModal"
import styles from "../styles"
import { supabase } from "../../lib/supabase"

function HomeScreen({session}){
    const [loading, setLoading] = useState(false)
    const email = session?.user?.email
    const signOut = async () => {
      setLoading(true)
      await supabase.auth.signOut()
      setLoading(false)
    }
  
    return (
      <View style={styles.container}>
        <LoadingModal visible={loading} />
        <Text>Hey, {email} </Text>
        <TouchableOpacity style={styles.btnPrimary} onPress={signOut}>
          <Text style={{color: 'white'}}>SignOut</Text>
        </TouchableOpacity>
      </View>
    )
  }

  export default HomeScreen