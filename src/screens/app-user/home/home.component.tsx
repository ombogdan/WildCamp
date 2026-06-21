import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, ScrollView } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useStyles } from './home.styles';

type CampType = 'tent' | 'hammock' | 'car';

const INITIAL_REGION = {
  latitude: 48.4,
  longitude: 31.0,
  latitudeDelta: 9,
  longitudeDelta: 13,
};

const FILTERS: { key: CampType; label: string }[] = [
  { key: 'tent', label: 'Намет' },
  { key: 'hammock', label: 'Гамак' },
  { key: 'car', label: 'Авто' },
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
          <Text style={styles.searchIcon}>⌕</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Пошук місць"
            placeholderTextColor="#8A9387"
            value={query}
            onChangeText={setQuery}
          />
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
          // тут пізніше navigation.navigate('AddPlace')
        }}
      >
        <Text style={styles.fabIcon}>＋</Text>
      </Pressable>
    </View>
  );
};

export default Home;
