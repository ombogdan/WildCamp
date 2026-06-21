import React, {useEffect, useRef} from 'react';
import {Animated, Dimensions, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {navigate} from "../../Navigation/rootNavigation";
import i18n from "i18n-js";
import fieldSort from "../../../utils/SortFunction/fieldSort";
import {waybillActions} from "../../../storage/realm";
import _ from "lodash";
import {dateFromAndToByHourShift} from "../../../utils/Time/dateFromAndTo";

const {t} = i18n;
const {width} = Dimensions.get("window")
export const MachineOperator = ({hide, text1}) => {
  const progressWidth = useRef(new Animated.Value(0)).current;

  const progress = () => {
    Animated.timing(progressWidth, {
      toValue: 0,
      duration: 1,
      useNativeDriver: false,
    }).start(() => {
      Animated.timing(progressWidth, {
        toValue: width * 0.98,
        duration: 10000,
        useNativeDriver: false,
      }).start();
    })
  };

  useEffect(() => {
    progress();
  }, [])

  useEffect(() => {
    return () => {
      progress();
    }
  }, [text1])

  const handleReasonForStopping = () => {
  }

  const handleSaveRide = () => {
    const waybillListAll = fieldSort(waybillActions.getAllExist(), ['dateTo'], true);
    let waybillArray = _.map(([waybillListAll?.[0] ?? {}]), function (item) {
      return _.pick(item, ['_id', 'id_server', 'dateFrom', 'dateTo', 'oper_day', 'vehicle', 'geozone', 'workType', 'driver', 'odometerInitial', 'odometerFinal', 'race', 'startRoute', 'endRoute', 'lat', 'lon', 'comment', 'is_pending', 'is_deleted']);
    });

    const dates = dateFromAndToByHourShift();
    const dateFrom = new Date(dates.date_from).setHours(0, 0, 0, 0);
    const dateTo = new Date(dates.date_to).setHours(0, 0, 0, 0);
    const waybillList = waybillActions.getWaybillByFilter(null, null, dateFrom, dateTo);
    if (waybillList.length === 0 && waybillListAll.length > 0) {
      waybillArray[0].dateTo = dates.date_from;
    }
    navigate('AddWaybillScreen', {
      waybill: null,
      lastWaybill: waybillArray[0]._id ? waybillArray[0] : null,
    });
    hide();
  }

  return (
    <SafeAreaView>
      <View style={styles.toastContainer}>
        <View style={styles.btnBox}>
          <TouchableOpacity
            disabled={true}
            style={[styles.iosButtonContainer, {borderColor: 'gray'}]}
            onPress={handleReasonForStopping}>
            <Text style={[styles.text, {color: 'gray'}]}>{t('reasonForStopping')}</Text>
          </TouchableOpacity>
          <View style={styles.divider}/>
          <TouchableOpacity
            disabled={false}
            style={styles.iosButtonContainer}
            onPress={handleSaveRide}>
            <Text style={styles.text}>{t('saveRide')}</Text>
          </TouchableOpacity>
        </View>
        <Animated.View style={[styles.progress, {width: progressWidth}]}/>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  toastContainer: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    borderWidth: 1,
    borderBottomWidth: 0,
    borderColor: 'silver',
    borderRadius: 5,
    shadowOpacity: 0.06,
    elevation: 2,
    shadowRadius: 8,
    marginTop: 5,
    shadowOffset: {
      height: 3,
      width: 3,
    },
    width: width * 0.98,
  },
  btnBox: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: width * 0.98,
  },
  iosButtonContainer: {
    borderColor: 'dodgerblue',
    borderWidth: 1,
    borderRadius: 12,
    flex: 1,
    padding: 6,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center'
  },
  divider: {
    width: 40
  },
  progress: {
    height: 5,
    borderRadius: 5,
    backgroundColor: 'dodgerblue',
    left: -1
  },
  text: {
    textTransform: 'uppercase',
    textAlign: 'center',
    color: 'dodgerblue'
  }
});
