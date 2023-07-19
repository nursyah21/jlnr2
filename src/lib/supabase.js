import 'react-native-url-polyfill/auto'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl='https://kylurztkyiiiptmebcie.supabase.co'
const supabaseAnonKey='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt5bHVyenRreWlpaXB0bWViY2llIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODk2NzY2MjAsImV4cCI6MjAwNTI1MjYyMH0.bhdp4AClRdKBSPTEszECEaLnrFi3ehNTfyL_3BJUGhc'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  localStorage: AsyncStorage,
  detectSessionInUrl: false,
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});