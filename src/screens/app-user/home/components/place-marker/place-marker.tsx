import React from 'react';
import { View } from 'react-native';
import { Marker } from 'react-native-maps';
import { AppIcon } from 'assets/index';
import { APP_ICONS } from 'assets/icon.data';
import { useStyles } from './place-marker.styles';

type Props = {
  id: string;
  latitude: number;
  longitude: number;
  campingTypes: string[];
  onPress?: () => void;
};

// один тип → яку іконку показати
const ICON_BY_TYPE: Record<string, keyof typeof APP_ICONS> = {
  tent: 'tent',
  hammock: 'hammock',
  car: 'truck',
};

const resolveMarker = (types: string[]) => {
  const list = Array.isArray(types) ? types : [];

  if (list.length === 0) {
    return { icon: 'help' as keyof typeof APP_ICONS, color: '#9AA08E' }; // не вказано — сірий
  }
  if (list.length === 1) {
    return { icon: ICON_BY_TYPE[list[0]] ?? 'tent', color: '#2E5D3A' }; // один тип — зелений
  }
  return { icon: 'camping' as keyof typeof APP_ICONS, color: '#CF8A3F' }; // кілька — бурштиновий multi
};

export const PlaceMarker = ({
  id,
  latitude,
  longitude,
  campingTypes,
  onPress,
}: Props) => {
  const { icon, color } = resolveMarker(campingTypes);
  const styles = useStyles();

  return (
    <Marker
      identifier={id}
      coordinate={{ latitude: Number(latitude), longitude: Number(longitude) }}
      onPress={onPress}
      anchor={{ x: 0.5, y: 1 }} // вістря хвостика — на координаті
    >
      <View style={styles.wrap}>
        <View style={[styles.bubble, { backgroundColor: color }]}>
          <AppIcon name={icon} size={22} color="white" />
        </View>
        <View style={[styles.tail, { borderTopColor: color }]} />
      </View>
    </Marker>
  );
};
