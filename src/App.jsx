
import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  View,
  Text
} from 'react-native';
import SplashScreen from 'react-native-splash-screen'
import styles, {color} from './components/styles';
import { supabase } from './lib/supabase';
import DashboardScreen from './components/DashboardScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RegisterScreen from './components/RegisterScreen';
import LoginScreen from './components/LoginScreen';
import ForgetPasswrodScreen from './components/ForgetPasswordScreen';
import LoadingModal from './components/LoadingModal';

const Stack = createNativeStackNavigator()


function GuestScreen(){
  return (
      <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name='Login' component={LoginScreen} options={{headerShown: false}} />
            <Stack.Screen name='Forget Password'  component={ForgetPasswrodScreen} />
            <Stack.Screen name='Register' component={RegisterScreen} />
        </Stack.Navigator>
    </NavigationContainer>
    )
}

function UserScreen({session, setLoading}){

  useEffect(()=>{
    setLoading(false)
  },)

  return (
    <NavigationContainer>
      <Stack.Navigator>
          <Stack.Screen name='Dashboard' options={{headerShown: false}}>
            {(props) => <DashboardScreen {...props} key={session?.user?.id} session={session} /> }
          </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

function App() {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(()=>{
    SplashScreen.hide()

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    if(session != null){
      setLoading(true)
    }
  }, [])


  return (
    <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor={color.statusBarColor} barStyle={'light-content'}/>
        <LoadingModal visible={loading} message='sign in...'/>
        {!session ? <GuestScreen /> : <UserScreen session={session} setLoading={setLoading} /> }
    </SafeAreaView>
  );
}



export default App;
