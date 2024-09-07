import { defineStore } from 'pinia';

// Definimos el tipo para la información del usuario
interface UserInfo {
  id: string;
  email: string;
  name: string;
  picture: string;
}

// Definimos el tipo para el estado del store
interface AuthState {
  token: string | null;
  userInfo: UserInfo | null;
}

// Creamos el store de Pinia tipado
export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    token: null,
    userInfo: null,
  }),

  getters: {
    isAuthenticated: (state: AuthState): boolean => !!state.token,
    getUserInfo: (state: AuthState): UserInfo | null => state.userInfo,
  },

  actions: {
    setToken(token: string) {
      this.token = token;
      localStorage.setItem('google_access_token', token);
    },
    setUserInfo(userInfo: UserInfo) {
      this.userInfo = userInfo;
    },
    logout() {
      this.token = null;
      this.userInfo = null;
      localStorage.removeItem('google_access_token');
    },

    loadToken() {
      const token = localStorage.getItem('google_access_token');
      if (token) {
        this.token = token;
      }
    },
  },
});
