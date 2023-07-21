import { View, Text, TouchableOpacity } from 'react-native'
import React, {useEffect, useState} from 'react'
import { supabase } from '../lib/supabase'
import styles, { color } from './styles'
import LoadingModal from './LoadingModal'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Dimensions } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from './dashboard/HomeScreen'

const Tab = createBottomTabNavigator();

export default function DashboardScreen({session}) {

  return (
    <View style={[styles.container]}>
      <Tab.Navigator screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            return <Ionicons name={'home'} size={size} color={color} />;
          },

          tabBarActiveTintColor: color.primaryColor,
          tabBarInactiveTintColor: color.disableColor,
        })}>
        <Tab.Screen name="Home">
            {(props) => <HomeScreen {...props}  key={session?.user?.id} session={session} /> }
        </Tab.Screen>
      </Tab.Navigator>
    </View>
  )
}