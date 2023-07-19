
import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  View,
  Text
} from 'react-native';
import SplashScreen from 'react-native-splash-screen'
import styles, {color} from './components/styles';
import {AuthScene} from './components/AuthScene';
import { supabase } from './lib/supabase';
import DashboardScene from './components/DashboardScene';
import LoginScene from './components/LoginScene';

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
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={color.statusBarColor} barStyle={'light-content'}/>
      <View style={{flex:1}}>
        {!session ? 
          <LoginScene />: 
          <DashboardScene key={session.user.id} session={session} />
        }
      </View>
    </SafeAreaView>
  );
}



export default App;
