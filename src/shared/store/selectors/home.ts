import { createSelector } from 'reselect';

const selectHomeStore = (store: any) => store.home;

export const selectSearchProductItem = createSelector(
  [selectHomeStore],
  (homeStore) => homeStore.searchProductSelect,
);
