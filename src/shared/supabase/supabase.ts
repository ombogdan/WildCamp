import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://tikiduisjrrgiungzxpy.supabase.co';
const SUPABASE_KEY = 'sb_publishable_MfAhrwdgO_p7-VwxFEX4jg_s2Ulr-sB'; // publishable-ключ

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
