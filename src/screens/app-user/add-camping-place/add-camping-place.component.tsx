import React, { useEffect, useRef, useState } from 'react';
import {
  PermissionsAndroid,
  Platform,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { supabase } from 'shared/supabase/supabase';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useTheme } from 'theme/ThemeProvider';
import { AppIcon } from 'assets/index';
import MapView, { Region } from 'react-native-maps';
import {
  AMENITIES,
  CAMPING_TYPES,
  KYIV,
  LOTTIE_WHITE_LOADER,
} from 'constants/index';
import { Box } from 'ui-kit/box';
import Geolocation from '@react-native-community/geolocation';
import { storage } from 'shared/services/mmkv';
import Toast from 'react-native-toast-message';
import { goBack } from 'shared/navigation/root-navigator.config';
import wait from 'utils/wait';
import Lottie from 'lottie-react-native';
import { useStyles } from './add-camping-place.styles';

const AddCampingPlace = () => {
  const styles = useStyles();
  const { theme } = useTheme();
  const mapRef = useRef<MapView>(null);

  const getLastRegion = () => {
    const raw = storage.getString('lastRegion');
    return raw ? JSON.parse(raw) : KYIV;
  };

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [rating, setRating] = useState(0);
  const [campingTypes, setCampingTypes] = useState<string[]>([]);
  const [amenities, setAmenities] = useState<string[]>([]);
  const [photos, setPhotos] = useState<any[]>([]);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [initialRegion] = useState(() => ({
    ...getLastRegion(),
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  }));
  const [selectedLocation, setSelectedLocation] = useState({
    latitude: initialRegion.latitude,
    longitude: initialRegion.longitude,
  });

  useEffect(() => {
    const requestAndGetLocation = async () => {
      try {
        // дозвіл
        if (Platform.OS === 'android') {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          );
          if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
            setSelectedLocation(KYIV); // відмовив — ставимо запасний центр
            return;
          }
        } else {
          await Geolocation.requestAuthorization();
        }

        // координати
        Geolocation.getCurrentPosition(
          (pos) => {
            mapRef.current?.animateToRegion(
              {
                latitude: pos.coords.latitude,
                longitude: pos.coords.longitude,
                latitudeDelta: 0.05,
                longitudeDelta: 0.05,
              },
              600,
            );
          },
          () => {}, // помилка — лишаємось на initialRegion (остання точка)
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
        );
      } catch {
        setSelectedLocation(KYIV);
      }
    };

    requestAndGetLocation();
  }, []);

  const toggleItem = (
    id: string,
    setList: React.Dispatch<React.SetStateAction<string[]>>,
  ) => {
    setList((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  const handleAddNewCampingPlace = async () => {
    if (submitting) {
      return;
    }
    setSubmitting(true);

    if (!name.trim()) {
      Toast.show({ type: 'error', text1: 'Вкажіть назву кемпінгу' });
      setSubmitting(false);
      return;
    }
    if (!rating) {
      Toast.show({ type: 'error', text1: 'Поставте оцінку' });
      setSubmitting(false);
      return;
    }

    const { error } = await supabase.from('camping_places').insert({
      name: name.trim(),
      description: description.trim() || null,
      rating,
      latitude: selectedLocation.latitude,
      longitude: selectedLocation.longitude,
      camping_types: campingTypes,
      amenities,
    });
    setSubmitting(false);

    if (error) {
      Toast.show({
        type: 'error',
        text1: 'Не вдалося зберегти',
        text2: error.message,
      });
      return;
    }

    Toast.show({ type: 'success', text1: 'Місце надіслано на модерацію' });
    await wait(1500);
    goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView
        style={{ flex: 1 }}
        extraHeight={0}
        enableOnAndroid
        nestedScrollEnabled
        extraScrollHeight={100}
        enableResetScrollToCoords={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.contentContainer}>
          <View style={styles.dragButtonContainer}>
            <View style={styles.dragButton} />
          </View>
          <View style={styles.header}>
            <Text style={styles.title}>Додати кемпінг</Text>
            <TouchableOpacity style={styles.closeButton}>
              <AppIcon name="close" size={15} />
            </TouchableOpacity>
          </View>

          <View style={styles.section}>
            <Text style={styles.label}>Назва місця</Text>
            <TextInput
              value={name}
              onChangeText={setName}
              placeholder="Назва кемпінгу"
              placeholderTextColor={theme.palette.muted}
              style={styles.input}
            />
          </View>

          {/* Map */}
          <View style={styles.sectionMap}>
            <Text style={styles.label}>Точка на карті</Text>
          </View>
          <View style={styles.mapContainer}>
            <MapView
              ref={mapRef}
              style={styles.map}
              provider="google"
              mapType="satellite"
              initialRegion={initialRegion}
              onRegionChangeComplete={(region: Region) => {
                const coords = {
                  latitude: region.latitude,
                  longitude: region.longitude,
                };
                setSelectedLocation(coords);
                storage.set('lastRegion', JSON.stringify(coords));
              }}
            />
            <View style={styles.centerPin} pointerEvents="none">
              <AppIcon name="pin" size={36} color="none" />
            </View>
          </View>
          {selectedLocation && (
            <View style={styles.coordsRow}>
              <Text style={styles.coordsText}>
                {selectedLocation.latitude.toFixed(5)},{' '}
                {selectedLocation.longitude.toFixed(5)}
              </Text>
            </View>
          )}

          <View style={styles.section}>
            <Text style={styles.label}>Опис</Text>
            <TextInput
              value={description}
              onChangeText={setDescription}
              placeholder="Розкажіть детальніше про місце"
              maxLength={255}
              multiline
              numberOfLines={6}
              placeholderTextColor={theme.palette.muted}
              style={styles.commentInput}
            />
          </View>

          <View style={styles.section}>
            <Text style={styles.label}>Ваша оцінка</Text>
            <View style={styles.ratingContainer}>
              <View style={styles.starsContainer}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <TouchableOpacity
                    style={styles.starButton}
                    key={star}
                    onPress={() => setRating(star)}
                  >
                    <AppIcon
                      color="none"
                      name={rating >= star ? 'star_filled' : 'star_outline'}
                      size={30}
                    />
                  </TouchableOpacity>
                ))}
              </View>
              <Text style={styles.ratingText}>{rating.toFixed(1)}</Text>
            </View>
          </View>

          {/* Camping Types */}
          <View style={styles.section}>
            <Text style={styles.label}>Тип кемпінгу</Text>
            {CAMPING_TYPES.map((item) => {
              const selected = campingTypes.includes(item.id);
              return (
                <TouchableOpacity
                  key={item.id}
                  onPress={() => toggleItem(item.id, setCampingTypes)}
                  style={[
                    styles.cardContainer,
                    !selected && { borderColor: theme.palette.inputBorder },
                  ]}
                >
                  <View style={styles.cardText}>
                    <View style={styles.cardIconContainer}>
                      <AppIcon name={item.icon} size={25} color="forest" />
                    </View>
                    <View>
                      <Text style={styles.typeTitle}>{item.title}</Text>
                      <Text style={styles.typeDescription}>
                        {item.description}
                      </Text>
                    </View>
                  </View>
                  <AppIcon
                    name={selected ? 'checkBox' : 'checkBoxUnchecked'}
                    color="forest"
                    size={30}
                  />
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Amenities */}
          <View style={styles.section}>
            <Text style={styles.label}>Зручності</Text>
            {AMENITIES.map((item) => {
              const selected = amenities.includes(item.id);
              return (
                <TouchableOpacity
                  key={item.id}
                  style={styles.amenityCard}
                  onPress={() => toggleItem(item.id, setAmenities)}
                >
                  <Box ml={10}>
                    <AppIcon
                      name={selected ? 'checkBox' : 'checkBoxUnchecked'}
                      color="forest"
                      size={30}
                    />
                  </Box>
                  <Box ml={10}>
                    <View style={styles.cardIconContainer}>
                      <AppIcon name={item.icon} size={25} color="forest" />
                    </View>
                  </Box>
                  <Box ml={10}>
                    <Text style={styles.amenityTitle}>{item.title}</Text>
                  </Box>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </KeyboardAwareScrollView>
      <View style={styles.footerContainer}>
        <TouchableOpacity style={styles.cancelButton}>
          <Text style={styles.cancelText}>Скасувати</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.publishButton}
          onPress={handleAddNewCampingPlace}
        >
          {!submitting ? (
            <Box direction="row">
              <AppIcon name="check" size={20} color="white" />
              <Text style={styles.publishText}>Опублікувати</Text>
            </Box>
          ) : (
            <Lottie
              style={styles.loader}
              source={LOTTIE_WHITE_LOADER}
              autoPlay
              loop
            />
          )}
        </TouchableOpacity>
      </View>
      <Toast />
    </SafeAreaView>
  );
};

export default AddCampingPlace;
