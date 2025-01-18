// src/store/userActions.ts
import { User } from "../interfaces/user";

export const SET_USER = "SET_USER";
export const ADD_POINTS = "ADD_POINTS";
export const UPDATE_SUBSCRIPTION = "UPDATE_SUBSCRIPTION";

export interface SetUserAction {
  type: typeof SET_USER;
  payload: Partial<User>;
}

export interface AddPointsAction {
  type: typeof ADD_POINTS;
  points: number;
}

export interface UpdateSubscriptionAction {
  type: typeof UPDATE_SUBSCRIPTION;
  platform: string; // теперь это строка для динамических ключей
}

export type UserActionTypes = SetUserAction | AddPointsAction | UpdateSubscriptionAction;

// Экшены
export const setUser = (payload: Partial<User>): SetUserAction => ({
  type: SET_USER,
  payload,
});

export const addPoints = (points: number): AddPointsAction => ({
  type: ADD_POINTS,
  points,
});

export const updateSubscription = (payload: Partial<User>) => ({
  type: UPDATE_SUBSCRIPTION,
  payload,
});
