import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from "react-native-safe-area-context";
import {AppIcon} from "assets/index";
import {useTranslation} from "react-i18next";
import {Box} from "ui-kit/box";
import {useStyles} from "./network-connection.styles";

export const NetworkConnection = ({hide}) => {
  const styles = useStyles();
  const {t} = useTranslation();

  return (
    <SafeAreaView>
      <View style={styles.toastContainer}>
        <View style={styles.blueBackground}>
          <TouchableOpacity style={styles.cross} onPress={hide}>
            <AppIcon name="cross" size={18} color="white"/>
          </TouchableOpacity>
          <AppIcon name="pageNotFound" color="white" size={42}/>
          <Box ml={8}>
            <Text style={styles.connectionProblems}>{t('connectionProblems')}</Text>
            <Text style={styles.checkConnectionToContinue}>{t('checkConnectionToContinue')}</Text>
          </Box>
        </View>
      </View>
    </SafeAreaView>
  );
};
