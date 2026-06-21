// @ts-ignore
import React from 'react';
import { ToastConfigParams } from 'react-native-toast-message';

export declare type ToastConfig = {
  // eslint-disable-next-line no-unused-vars
  [key: string]: (params: ToastConfigParams<any>) => React.ReactNode;
};
