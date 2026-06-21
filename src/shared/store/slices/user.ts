import { createSlice } from '@reduxjs/toolkit';
import {LotsType, SearchProductByBarcode} from "shared/types";
import { RootState } from '..';

interface PendingSend {
  lots: LotsType[];
  selectedOrderId: number | null;
  api: string;
}

interface AuthState {
  userData: any;
  authed: boolean;
  addToStock: boolean;
  cleanBarcode: boolean;
  showBottomMenu: boolean;
  showSubscriptionModal: boolean;
  subscriptionLink: string;
  requestError: string;
  alertCounters: { products: number, products_lots: number };
  pendingSends: Record<number, PendingSend>;
  scannedCodeData: {scannedDate: Date, data: SearchProductByBarcode} | null;
}

const initialState: AuthState = {
  userData: null,
  authed: false,
  addToStock: false,
  cleanBarcode: false,
  showBottomMenu: true,
  showSubscriptionModal: false,
  subscriptionLink: "",
  requestError: "",
  alertCounters: { products: 0, products_lots: 0 },
  pendingSends: {  },
  scannedCodeData: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userLogin(state, { payload }) {
      state.userData = payload;
      state.authed = true;
    },
    userLogout(state) {
      state.userData = null;
      state.authed = false;
    },
    setAddToStock(state, { payload }) {
      state.addToStock = payload;
    },
    setCleanBarcode(state, { payload }) {
      state.cleanBarcode = payload;
    },
    setShowHideBottomMenu(state, { payload }) {
      state.showBottomMenu = payload;
    },
    setShowSubscriptionModal(state, { payload }) {
      state.showSubscriptionModal = payload;
    },
    setSubscriptionLink(state, { payload }) {
      state.subscriptionLink = payload;
    },
    setRequestError(state, { payload }) {
      state.requestError = payload;
    },
    setAlertCounters(state, { payload }) {
      state.alertCounters = payload;
    },
    setScannedCodeData(state, { payload }) {
      state.scannedCodeData = payload;
    },
    clearScannedCodeData(state) {
      state.scannedCodeData = null;
    },
    setPendingSends(state, { payload }) {
      const { id, data, sendTime, deleteItem } = payload;
      if (!state.pendingSends) {
        state.pendingSends = {};
      }
      // @ts-ignore
      state.pendingSends[id] = { data, sendTime, deleteItem };
    },
    removePendingSend(state, { payload }) {
      if (state.pendingSends && state.pendingSends[payload]) {
        delete state.pendingSends[payload];
      }
    },
    removeAllSends(state) {
      state.pendingSends = {};
    },
  },
});

export const userActions = userSlice.actions;
export const userReducer = userSlice.reducer;

export const userDataSelector = (state: RootState) => state.user.userData;
