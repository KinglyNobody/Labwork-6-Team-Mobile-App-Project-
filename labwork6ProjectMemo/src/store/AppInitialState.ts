import { AppState } from './AppState';

export const AppInitialState: AppState = {
  loading: {
    show: false,
  },
  login: {
    error: null,
    hasRecoveredPassword: false,
    isRecoveringPassword: false,
    isLoggedIn: false,
    isLoggingIn: false,
  },
};
