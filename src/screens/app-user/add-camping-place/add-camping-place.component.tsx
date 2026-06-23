import React, { useState } from 'react';
import {
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
import MapView from 'react-native-maps';
import { AMENITIES, CAMPING_TYPES } from 'constants/index';
import { Box } from 'ui-kit/box';
import { useStyles } from './add-camping-place.styles';

const AddCampingPlace = () => {
  const styles = useStyles();
  const { theme } = useTheme();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [rating, setRating] = useState(0);

  const [campingTypes, setCampingTypes] = useState<string[]>([]);
  const [amenities, setAmenities] = useState<string[]>([]);
  const [photos, setPhotos] = useState<any[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  const handleAddNewCampingPlace = async () => {
    if (!name.trim()) {
      return;
    }

    if (!rating) {
      return;
    }

    if (!selectedLocation) {
      return;
    }

    await supabase.from('camping_places').insert({
      name,
      description,
      rating,

      latitude: selectedLocation.latitude,
      longitude: selectedLocation.longitude,

      camping_types: campingTypes,
      amenities,

      status: 'pending',
      created_at: new Date(),
    });
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
              style={styles.map}
              provider="google"
              mapType="satellite"
              initialRegion={{
                latitude: 50.45,
                longitude: 30.52,
                latitudeDelta: 0.05,
                longitudeDelta: 0.05,
              }}
            />
            {/* custom marker */}
          </View>

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
                <TouchableOpacity key={item.id} style={styles.amenityCard}>
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
          <AppIcon name="check" size={20} color="white" />
          <Text style={styles.publishText}>Опублікувати</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default AddCampingPlace;
