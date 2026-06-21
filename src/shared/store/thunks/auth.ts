import { asyncStorageService } from 'shared/core/services/async-storage-service';
import { userActions } from '../slices/user';

export const userLogout = () => async (dispatch: any) => {
  await asyncStorageService.removeAccessToken();
  dispatch(userActions.userLogout());
};

export const showSubscriptionModal = () => async (dispatch: any) => {
  dispatch(userActions.setShowSubscriptionModal(true));
};

export const setSubscriptionModalLink = (data: string) => async (dispatch: any) => {
  dispatch(userActions.setSubscriptionLink(data));
};
