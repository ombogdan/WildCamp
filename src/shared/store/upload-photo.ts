import { decode } from 'base64-arraybuffer';
import * as RNFS from '@dr.pogodin/react-native-fs';
import { supabase } from 'shared/supabase/supabase';

export const uploadPhoto = async (localUri: string): Promise<string> => {
  // читаємо файл як base64 → ArrayBuffer (надійніше за blob у RN)
  const base64 = await RNFS.readFile(localUri, 'base64');
  const arrayBuffer = decode(base64);

  const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.jpg`;

  const { error } = await supabase.storage
    .from('places')
    .upload(fileName, arrayBuffer, { contentType: 'image/jpeg' });

  if (error) throw error;

  const { data } = supabase.storage.from('places').getPublicUrl(fileName);
  return data.publicUrl;
};
