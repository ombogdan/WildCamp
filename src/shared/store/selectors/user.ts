import { createSelector } from 'reselect';

const selectUserStore = (store: any) => store.user;

export const selectIsUserAuthedStatus = createSelector(
  [selectUserStore],
  (userStore) => userStore.authed,
);

export const selectUserMe = createSelector(
  [selectUserStore],
  (userStore) => userStore.userData,
);

export const selectAddToStock = createSelector(
  [selectUserStore],
  (userStore) => userStore.addToStock,
);

export const selectCleanBarcode = createSelector(
  [selectUserStore],
  (userStore) => userStore.cleanBarcode,
);

export const selectShowBottomMenu = createSelector(
  [selectUserStore],
  (userStore) => userStore.showBottomMenu,
);

export const selectShowSubscriptionModal = createSelector(
  [selectUserStore],
  (userStore) => userStore.showSubscriptionModal,
);

export const selectSubscriptionLink = createSelector(
  [selectUserStore],
  (userStore) => userStore.subscriptionLink,
);

export const selectRequestError = createSelector(
  [selectUserStore],
  (userStore) => userStore.requestError,
);

export const selectAlertCounters = createSelector(
  [selectUserStore],
  (userStore) => userStore.alertCounters,
);

export const selectPendingSends = createSelector(
  [selectUserStore],
  (userStore) => userStore.pendingSends,
);

export const selectScannedCode = createSelector(
  [selectUserStore],
  (userStore) => userStore.scannedCodeData,
);
