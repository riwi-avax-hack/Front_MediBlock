import { defineStore } from 'pinia';
import ClientHTTP from 'src/api/ClientHTTP';
import { ILoginResp } from 'src/model/auth/simple-login';
import { Router } from 'vue-router';

interface UserInfo {
  id: string;
  email: string;
  name: string;
  picture: string;
}

interface AuthState {
  token: string | null;
  userInfo: UserInfo | null;
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    token: null,
    userInfo: null,
  }),

  getters: {
    isAuthenticated: (state: AuthState): boolean => !!state.userInfo,
    getUserInfo: (state: AuthState): UserInfo | null => state.userInfo,
  },

  actions: {
    async login(
      credentials: { email: string; password: string },
      isAuthGoogle: boolean = false
    ) {
      if (!isAuthGoogle) {
        try {
          const response: ILoginResp = await ClientHTTP.post(
            '/auth',
            credentials
          );
          this.setToken(response.data.access_token);
        } catch (error) {}
      } else {
        const response: ILoginResp = await ClientHTTP.get(
          `/users/filter-by-email/${credentials.email}`
        );
        console.log(response);
      }
    },

    async setToken(token: string) {
      this.token = token;
      localStorage.setItem('google_access_token', token);
      await this.getUserInfoGoogle(token);
    },
    setUserInfo(userInfo: UserInfo) {
      this.userInfo = userInfo;
      localStorage.setItem('user', JSON.stringify(userInfo));
    },

    loadToken() {
      const token = localStorage.getItem('google_access_token');
      const user = localStorage.getItem('user');
      if (token) this.token = token;
      if (user) this.userInfo = JSON.parse(user);
    },

    logOut(router: Router) {
      this.token = null;
      this.userInfo = null;
      localStorage.removeItem('google_access_token');
      localStorage.removeItem('user');
      router.push('/login');
    },

    async getUserInfoGoogle(token: string) {
      try {
        const response = await fetch(
          'https://www.googleapis.com/oauth2/v1/userinfo?alt=json',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const userInfo = await response.json();
        this.setUserInfo(userInfo);
      } catch (error) {
        console.error('Error al obtener la información del usuario:', error);
      }
    },
  },
});
