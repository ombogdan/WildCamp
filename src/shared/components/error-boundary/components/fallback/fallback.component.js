import React from "react";
import {Modal, Text, View} from "react-native";
import {useTranslation} from "react-i18next";
import {CustomButton} from "ui-kit/custom-button";
import {Box} from "ui-kit/box";
import {styles} from "./fallback.styles";

export const Fallback = ({error, resetError, api}) => {
  const {t} = useTranslation();
  return (
    <Modal transparent animationType="fade">
      <View style={styles.modalMainContainer}>
        <View style={styles.container}>
          <Text style={styles.title}>{t('error')}</Text>
          <Text style={styles.subtitle}>{!api ? t('errorOccurred') : t('errorApiOccurred')}</Text>
          <Text style={styles.error}>{error?.toString()}</Text>
          <Box pl={16} pr={16} fullWidth pt={24} pb={24}>
            <CustomButton onPress={resetError} title={t('tryAgain')}/>
          </Box>
        </View>
      </View>
    </Modal>
  );
}
