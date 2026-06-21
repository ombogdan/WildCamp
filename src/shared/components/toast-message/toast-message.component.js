import React from 'react';
import Toast from 'react-native-toast-message';
// eslint-disable-next-line import/named
import {NetworkConnection} from "./network-connection/network-connection.component";

const toastConfig = {
  networkConnection: (params) => (
    <NetworkConnection hide={params.hide} text1={params.text1} text2={params.text2} />
  ),
};

export const ToastMessage = () => <Toast topOffset={0} config={toastConfig} />;
