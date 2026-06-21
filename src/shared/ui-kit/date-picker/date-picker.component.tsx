import React, {useState} from 'react';
import {View, Button, Platform, Modal, Text, TouchableOpacity} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {format} from 'date-fns';
import {DatePickerProps} from "ui-kit/date-picker/date-picker.types";
import {useTranslation} from "react-i18next";
import {useStyles} from "./date-picker.styles";

export const DatePicker = ({value, onValue, dateFormat, disabled}: DatePickerProps) => {
  const {t} = useTranslation();
  const styles = useStyles();

  const [show, setShow] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const onChange = (event: any, selectedDate: any) => {
    if (Platform.OS === 'android') {
      setShow(false);
    }
    if (selectedDate) {
      onValue(selectedDate);
    }
  };

  const showDatePicker = () => {
    if (Platform.OS === 'ios') {
      setShowModal(true);
    } else {
      setShow(true);
    }
  };

  const onSave = () => {
    if (!value) {
      onChange(null, new Date());
    }
    setShowModal(false);
  };

  return (
    <View>
      <TouchableOpacity
        disabled={disabled}
        onPress={() => {
          if(!disabled) {
            showDatePicker();
          }
        }}
        style={{minWidth: 80, minHeight: 20}}>
        {value ?
          <Text style={styles.dateValue}>{value ? format(value, dateFormat) : ''}</Text>
          :
          <Text style={styles.dateValuePlaceholder}>{t('na')}</Text>
        }
      </TouchableOpacity>
      {Platform.OS === 'android' && show && (
        <DateTimePicker
          value={value || new Date()}
          mode="date"
          display="spinner"
          onChange={onChange}
        />
      )}
      {Platform.OS === 'ios' && showModal && (
        <Modal transparent animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.modalMainContainer}>
              <Button title={t('save')} onPress={onSave}/>
              <DateTimePicker
                // @ts-ignore
                value={value ? new Date(value) : new Date()}
                mode="date"
                display="spinner"
                onChange={onChange}
                themeVariant="light"
              />
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};
