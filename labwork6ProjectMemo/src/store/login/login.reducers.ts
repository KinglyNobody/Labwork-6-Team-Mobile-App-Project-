import { createReducer, on } from '@ngrx/store';
import { AppInitialState } from '../AppInitialState';
import {
  login,
  loginFail,
  loginSuccess,
  logout,
  recoverPassword,
  recoverPasswordFail,
  recoverPasswordSuccess,
} from './login.actions';
import { LoginState } from './LoginState';

const initialState: LoginState = AppInitialState.login;

const reducer = createReducer(
  initialState,

  on(recoverPassword, (currentState) => {
    return {
      ...currentState,
      error: null,
      hasRecoveredPassword: false,
      isRecoveringPassword: true,
    };
  }),

  on(recoverPasswordSuccess, (currentState, action) => {
    return {
      ...currentState,
      error: null,
      hasRecoveredPassword: true,
      isRecoveringPassword: false,
    };
  }),

  on(recoverPasswordFail, (currentState, action) => {
    return {
      ...currentState,
      error: action.error,
      hasRecoveredPassword: false,
      isRecoveringPassword: false,
    };
  }),

  on(login, (currentState) => {
    return {
      ...currentState,
      error: null,
      isLoggedIn: false,
      isLoggingIn: true,
    };
  }),

  on(loginSuccess, (currentState) => {
    return {
      ...currentState,
      error: null,
      isLoggedIn: true,
      isLoggingIn: false,
    };
  }),

  on(loginFail, (currentState, action) => {
    return {
      ...currentState,
      error: action.error,
      isLoggedIn: false,
      isLoggingIn: false,
    };
  }),

  on(logout, () => {
    return initialState;
  })
);

export function loginReducer(state: LoginState, action) {
  return reducer(state, action);
}
