import { createAction } from '@reduxjs/toolkit';

export const get = createAction<number>('user/unfollow');
export const followUser = createAction<number>('user/follow');
