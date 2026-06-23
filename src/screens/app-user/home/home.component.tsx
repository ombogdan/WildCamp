import React, { useCallback, useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import MapView, { PROVIDER_GOOGLE, Region } from 'react-native-maps';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppIcon } from 'assets/index';
import { APP_ICONS } from 'assets/icon.data';
import { navigate } from 'shared/navigation/root-navigator.config';
import { supabase } from 'shared/supabase/supabase';
import {CLUSTER_MIN_DELTA, CLUSTER_THRESHOLD} from 'constants/index';
import {PlaceMarker} from "screens/app-user/home/components/place-marker/place-marker";
import { ClusterMarker } from './components/cluster-marker/cluster-marker';
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
  const [places, setPlaces] = useState<any[]>([]);
  const [clusters, setClusters] = useState<any[]>([]);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const mapRef = useRef<MapView>(null);
  const reqIdRef = useRef(0);

  const boundsFromRegion = (r: Region) => ({
    min_lat: r.latitude - r.latitudeDelta / 2,
    max_lat: r.latitude + r.latitudeDelta / 2,
    min_lng: r.longitude - r.longitudeDelta / 2,
    max_lng: r.longitude + r.longitudeDelta / 2,
  });

  const loadForRegion = useCallback((region: Region) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(async () => {
      // eslint-disable-next-line no-plusplus
      const myReqId = ++reqIdRef.current;
      const bounds = boundsFromRegion(region);

      // близький зум — завжди місця, навіть якщо їх багато
      const zoomedIn = region.longitudeDelta < CLUSTER_MIN_DELTA;

      if (zoomedIn) {
        const { data } = await supabase.rpc('places_in_bounds', {
          ...bounds,
          max_rows: 500,
        });
        if (myReqId !== reqIdRef.current) return;
        setPlaces(data ?? []);
        setClusters([]);
        return;
      }

      // далекий зум — вирішуємо за кількістю
      const { data: count } = await supabase.rpc('places_count_in_bounds', bounds);
      if (myReqId !== reqIdRef.current) return;

      if ((count ?? 0) <= CLUSTER_THRESHOLD) {
        const { data } = await supabase.rpc('places_in_bounds', {
          ...bounds,
          max_rows: CLUSTER_THRESHOLD,
        });
        if (myReqId !== reqIdRef.current) return;
        setPlaces(data ?? []);
        setClusters([]);
      } else {
        const grid = region.longitudeDelta / 6;
        const { data } = await supabase.rpc('place_clusters', { ...bounds, grid });
        if (myReqId !== reqIdRef.current) return;
        setClusters(data ?? []);
        setPlaces([]);
      }
    }, 700);
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={INITIAL_REGION}
        showsUserLocation
        showsMyLocationButton={false}
        onMapReady={() => loadForRegion(INITIAL_REGION)}
        onRegionChangeComplete={loadForRegion}
      >
        {places.map((p) => (
          <PlaceMarker
            key={p.id}
            id={p.id}
            latitude={p.latitude}
            longitude={p.longitude}
            campingTypes={p.camping_types}
            onPress={() => {
              // тут пізніше — bottom sheet
            }}
          />
        ))}

        {clusters.map((c) => (
          <ClusterMarker
            key={`cluster-${c.lat}-${c.lng}`}
            lat={c.lat}
            lng={c.lng}
            count={c.cnt}
            onPress={() =>
              mapRef.current?.animateToRegion(
                {
                  latitude: c.lat,
                  longitude: c.lng,
                  latitudeDelta: 0.4,
                  longitudeDelta: 0.4,
                },
                500,
              )
            }
          />
        ))}
      </MapView>

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
