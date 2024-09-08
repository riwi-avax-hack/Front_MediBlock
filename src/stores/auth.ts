import { defineStore } from 'pinia';
import ClientHTTP from 'src/api/ClientHTTP';
import { ILoginResp, IUser } from 'src/model/auth/simple-login';
import { Router } from 'vue-router';

interface UserInfoGoogle {
  email: string;
  family_name: string;
  given_name: string;
  id: string;
  name: string;
  picture: string;
  verified_email: boolean;
}

interface AuthState {
  token: string | null;
  userInfo: IUser | null;
  error?: boolean;
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    token: null,
    userInfo: null,
    error: false,
  }),

  getters: {
    isAuthenticated: (state: AuthState): boolean => !!state.userInfo,
    getUserInfo: (state: AuthState): IUser | null => state.userInfo,
  },

  actions: {
    async login(
      credentials: { email: string; password: string },
      isAuthGoogle: boolean = false
    ) {
      this.error = false;
      if (!isAuthGoogle) {
        try {
          const response: ILoginResp = await ClientHTTP.post(
            '/auth',
            credentials
          );
          this.setToken(response.data.token.access_token);
          this.setUserInfo(response.data.user);
        } catch (error) {
          this.error = true;
        }
      } else {
        try {
          const response: ILoginResp = await ClientHTTP.get(
            `/users/filter-by-email/${credentials.email}`
          );
          this.setToken(response.data.token.access_token);
          this.setUserInfo(response.data.user);
        } catch (error) {
          this.error = true;
        }
      }
    },

    async setToken(token: string) {
      this.token = token;
      localStorage.setItem('access_token', token);
      await this.getUserInfoGoogle(token);
    },
    setUserInfo(userInfo: IUser) {
      this.userInfo = userInfo;
      localStorage.setItem('user', JSON.stringify(userInfo));
    },

    loadToken() {
      const token = localStorage.getItem('access_token');
      const user = localStorage.getItem('user');
      if (token) this.token = token;
      if (user) this.userInfo = JSON.parse(user);
    },

    logOut(router: Router) {
      this.token = null;
      this.userInfo = null;
      localStorage.removeItem('access_token');
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
        const userInfo: UserInfoGoogle = await response.json();
        this.login({ email: userInfo.email, password: userInfo.id }, true);
      } catch (error) {
        console.error('Error al obtener la información del usuario:', error);
      }
    },
  },
});
