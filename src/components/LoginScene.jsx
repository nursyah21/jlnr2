import { View, Image, Text, TextInput, TouchableOpacity, Alert, Modal } from 'react-native'
import React, {useState} from 'react'
import styles from './styles'
import {useFormik} from 'formik'
import { supabase } from '../lib/supabase'
import * as Yup from 'yup'
import LoadingScreen from './LoadingScreen'

const loginSchema = Yup.object({
    email: Yup.string().email().required(),
    password: Yup.string().min(8)
})

const FormLogin = () => {
    const [loading, setLoading] = useState(false)

    const signIn = async (email, password) => {
        setLoading(true)
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        }) 
        setLoading(false)
        
        if (error) Alert.alert(error.message)
    }

    const form = useFormik({
        initialValues: {email: '', password: ''},
        validationSchema: loginSchema,
        onSubmit: value => {
            console.log(value.email, value.password)
            signIn(value.email, value.password)
        }
    })


    return (
        <View>
            <LoadingScreen visible={loading} />

            <Text>Email</Text>
            <TextInput
                maxLength={200}
                style={styles.input}
                onChangeText={form.handleChange('email')}
                value={form.values.email}
            />
            { form.values.email == '' ? 
                <Text style={styles.errorInput}>email is required</Text> 
              : form.errors.email ? (
                <Text style={styles.errorInput}>{form.errors.email}</Text>
            ) : null }
            <Text>Password</Text>
            <TextInput
                maxLength={200}
                style={styles.input}
                onChangeText={form.handleChange('password')}
                value={form.values.password}
                secureTextEntry
            />
            { form.values.password == '' ? 
                <Text style={styles.errorInput}>password is required</Text> 
              : form.errors.password ? (
                <Text style={styles.errorInput}>{form.errors.password}</Text>
            ) : null }
            <TouchableOpacity 
                style={(form.values.email === '' || form.values.password === '') || (form.errors.email || form.errors.password) ? [ styles.btnPrimary, styles.disableColor] : styles.btnPrimary} 
                onPress={form.handleSubmit} 
                disabled={
                    (form.values.email === '' || form.values.password === '') 
                    || (form.errors.email || form.errors.password) ? true : false}>
                <Text style={{color:'#fff'}}>Login</Text>
            </TouchableOpacity>
        </View>
    )
}

export default function LoginScene() {
    const logoLogin = require('../assets/logoLogin.png')    
    const logoLoginText = require('../assets/pejalanHijau.png')

    return (
        <View style={styles.center}>
            <View style={[styles.centerHorizontally]}>
                <Image source={logoLoginText} style={styles.logoLoginText} />
                <Image source={logoLogin} style={styles.logoLogin}/>
            </View>
            <FormLogin />
        </View>
    )
}