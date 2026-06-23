import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { Marker } from 'react-native-maps';
import { useStyles } from './cluster-marker.styles';

const formatCount = (n: number) =>
  n >= 1000 ? `${(n / 1000).toFixed(n % 1000 === 0 ? 0 : 1)}k` : String(n);

// розмір бульбашки росте з кількістю — візуальна ієрархія
const sizeForCount = (n: number) => {
  if (n < 10) return 44;
  if (n < 100) return 56;
  if (n < 1000) return 68;
  return 80;
};

type Props = {
  lat: number;
  lng: number;
  count: number;
  onPress: () => void;
};

export const ClusterMarker = ({ lat, lng, count, onPress }: Props) => {
  // спершу true (щоб стилі захопились), після першого layout — false (для перфу)
  const [tracks, setTracks] = useState(true);
  const styles = useStyles();
  const size = sizeForCount(count);

  return (
    <Marker
      coordinate={{ latitude: lat, longitude: lng }}
      onPress={onPress}
      tracksViewChanges={tracks}
      anchor={{ x: 0.5, y: 0.5 }}
    >
      <View
        onLayout={() => setTracks(false)}
        style={[
          styles.ring,
          {
            width: size + 14,
            height: size + 14,
            borderRadius: (size + 14) / 2,
          },
        ]}
      >
        <View
          style={[
            styles.bubble,
            { width: size, height: size, borderRadius: size / 2 },
          ]}
        >
          <Text style={styles.text}>{formatCount(count)}</Text>
        </View>
      </View>
    </Marker>
  );
};
