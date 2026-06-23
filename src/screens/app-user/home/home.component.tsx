import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppIcon } from 'assets/index';
import { APP_ICONS } from 'assets/icon.data';
import { navigate } from 'shared/navigation/root-navigator.config';
import { useStyles } from './home.styles';

type CampType = 'tent' | 'hammock' | 'car';

const INITIAL_REGION = {
  latitude: 48.4,
  longitude: 31.0,
  latitudeDelta: 9,
  longitudeDelta: 13,
};

const FILTERS: {
  key: CampType;
  label: string;
  icon: keyof typeof APP_ICONS;
}[] = [
  { key: 'tent', label: 'Намет', icon: 'tent' },
  { key: 'hammock', label: 'Гамак', icon: 'hammock' },
  { key: 'car', label: 'Авто', icon: 'truck' },
];

const Home = () => {
  const styles = useStyles();
  const insets = useSafeAreaInsets();
  const [activeFilter, setActiveFilter] = useState<CampType | null>(null);
  const [query, setQuery] = useState('');

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={INITIAL_REGION}
        showsUserLocation
        showsMyLocationButton={false}
      />

      <View style={[styles.topOverlay, { top: insets.top + 12 }]}>
        <View style={styles.searchBar}>
          <AppIcon name="search" color="forest" size={20} />
          <TextInput
            style={styles.searchInput}
            placeholder="Пошук кемпінгу"
            placeholderTextColor="#9AA08E"
            value={query}
            onChangeText={setQuery}
          />
          <TouchableOpacity style={styles.filterBackground}>
            <AppIcon name="filter" color="forest" size={18} />
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.chipsRow}
        >
          {FILTERS.map((f) => {
            const active = activeFilter === f.key;
            return (
              <Pressable
                key={f.key}
                onPress={() => setActiveFilter(active ? null : f.key)}
                style={[styles.chip, active && styles.chipActive]}
              >
                <AppIcon
                  name={f.icon}
                  color={active ? 'white' : 'forest'}
                  size={20}
                />
                <Text
                  style={[styles.chipText, active && styles.chipTextActive]}
                >
                  {f.label}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>

      <Pressable
        style={[styles.fab, { bottom: insets.bottom + 24 }]}
        onPress={() => {
          navigate('AddCampingPace');
        }}
      >
        <Text style={styles.fabIcon}>＋</Text>
      </Pressable>
    </View>
  );
};

export default Home;
