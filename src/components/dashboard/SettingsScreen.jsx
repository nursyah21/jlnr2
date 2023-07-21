import { View, Text, TouchableOpacity, Image, TextInput, Alert } from "react-native"
import { useState, useEffect, useRef } from "react"
import LoadingModal from "../LoadingModal"
import styles, { color } from "../styles"
import { supabase } from "../../lib/supabase"
import * as ImagePicker from 'react-native-image-picker'
import { isValidUrl, profileSchema, stringToUuid, typeProfile } from "../../lib/utils"
import { useFormik } from "formik"

function SettingsScreen({session}){
    const [loading, setLoading] = useState(false)
    const [loadingMessage, setLoadingMessage] = useState('Please wait...')
    const [editProfile, setEditProfile] = useState(false)
    const [data, setData] = useState(typeProfile)

    const signOut = async () => {
      setLoading(true)
      await supabase.auth.signOut()
      setLoading(false)
    }

    const cancelEdit = () => {
      setEditProfile(false)
    }

    const deleteUser = async () => {
      setLoadingMessage("delete account...")
      setLoading(true)
      const {data: {user}} = await supabase.auth.getUser()

      
      // const {data, error} = await supabase.auth.admin.deleteUser({
      //   id: user.id
      // })

      const { data, error } = await supabase.auth.admin.deleteUser(
        user.id
      )
      
      if(error) {
        console.log(error)
        console.log(error.message)
        Alert.alert('error', error.message)
      }
      
      await supabase.auth.signOut()

      setLoading(false)
      setLoadingMessage("Please wait...")
    }

    const promptDelete = () => Alert.alert('Warning', 'Do you want to delete this account', [
      {
        text: 'yes',
        onPress: () => deleteUser(),
      },
      {
        text: 'No',
        onPress: () => console.log('Cancel Pressed'),
      }
    ]);

    const form = useFormik({
      initialValues: {username:'', email:''},
      validationSchema: profileSchema,
      onSubmit: value => {
        console.log(value)
      }
    })

    useEffect(()=>{
      (async () => {
        const {data: {user}} = await supabase.auth.getUser()

        if(user == null)return
        
        let { data, error } = await supabase.from('users')
        .select("*").eq('id', user.id)
        
        if(error) return console.log(error.details)
        setData({auth_id: user.id, name:data[0]?.name, email: user.email, url_img: data[0]?.url_img})
        form.values.username = data[0].name
        
        form.values.email = user.email 
      })()
    }, [])

    const imageDefault = isValidUrl(data.email) ? 
      {uri:data.url_img} : require('../../assets/anon.png')
  
    return (
      <View style={[styles.container, {padding: 10}]}>
        <LoadingModal visible={loading} message={loadingMessage} />
        
        <View>
          { editProfile ?
                <View style={{alignItems: "center"}}>
                  <TouchableOpacity style={{justifyContent: 'center', flexDirection: 'row'}}>
                      <Image source={imageDefault} style={[styles.imgProfile, {borderColor: color.primaryColor, borderWidth: 2}]} />
                  </TouchableOpacity>
                  <Text>Tap to change</Text>
                </View>
            : <View style={{justifyContent: 'center', flexDirection: 'row'}}>
                <Image source={imageDefault} style={styles.imgProfile} />
              </View>
          }
          { editProfile ?
            <View style={{gap:2}}>
              <Text>Username</Text>
              <TextInput
                maxLength={200}
                style={styles.input}
                onChangeText={form.handleChange('username')}
                value={form.values.username}/>
              <Text>Email</Text>
              <TextInput
                maxLength={200}
                style={styles.input}
                onChangeText={form.handleChange('email')}
                value={form.values.email}/>
            </View>
            :
            <View style={{gap:2}}>
              <Text>Username</Text>
              <View style={{marginVertical: 5, borderWidth: .6, padding: 6, borderRadius: 6}}>
                <Text>{data.name}</Text>
              </View>

              <Text>Email</Text>
              <View style={{marginVertical: 5, borderWidth: .6, padding: 6, borderRadius: 6}}>
                <Text>{data.email}</Text>
              </View>
            </View>
            }

        </View>
        
        <TouchableOpacity style={styles.btnPrimary} onPress={()=>setEditProfile(!editProfile)}>
          <Text style={{color: 'white'}}>
            {editProfile ? "Submit" : "Edit Profile"}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.btnPrimary} onPress={editProfile ? cancelEdit : signOut}>
          <Text style={{color: 'white'}}>
          { editProfile ? "Cancel" : "Logout" }
          </Text>
        </TouchableOpacity>
        {
          !editProfile ? <TouchableOpacity style={[styles.btnPrimary, {backgroundColor: color.dangerColor}]} onPress={promptDelete}>
          <Text style={{color: 'white'}}>Delete Account</Text>
        </TouchableOpacity> : null
        }
      </View>
    )
  }

  export default SettingsScreen