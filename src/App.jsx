
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
import ForgetPasswordScreen from './components/ForgetPasswordScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ForgetPassword from './components/ForgetPasswordScreen';
import RegisterScreen from './components/RegisterScreen';
import LoginScreen from './components/LoginScreen';

const Stack = createNativeStackNavigator()


function GuestScreen(){
  return (
      <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name='Login' component={LoginScreen} options={{headerShown: false}} />
            <Stack.Screen name='ForgetPassword' component={ForgetPasswordScreen} />
            <Stack.Screen name='Register' component={RegisterScreen} />
        </Stack.Navigator>
    </NavigationContainer>
    )
}

function UserScreen({session}){

  return (
    <NavigationContainer>
      <Stack.Navigator>
          <Stack.Screen name='Dashboard'>
            {(props) => <DashboardScreen {...props} key={session?.user?.id} session={session} /> }
          </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

function App() {
  const [session, setSession] = useState(null);

  useEffect(()=>{
    SplashScreen.hide()

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
    console.log('my_session =>', session)
  }, [])


  return (
    <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor={color.statusBarColor} barStyle={'light-content'}/>
        {!session ? <GuestScreen /> : <UserScreen session={session} /> }
    </SafeAreaView>
  );
}



export default App;
