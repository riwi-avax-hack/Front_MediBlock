import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';

class ClientHTTP {
  private api: AxiosInstance;

  /**
   * Constructs an instance of the ClientHTTP class.
   * @param {boolean} applyInterceptor - Indicates whether to apply
   * the request interceptor.
   */
  constructor(
    private applyInterceptor: boolean = true,
    private applyContentAppJson: boolean = true
  ) {
    this.api = axios.create({
      baseURL: 'http://192.168.88.164/api',
      headers: {
        'Content-Type': this.applyContentAppJson
          ? 'application/json'
          : 'multipart/form-data',
      },
    });

    // Attach the request interceptor to the Axios instance.
    this.api.interceptors.request.use(
      this.requestInterceptor.bind(this),
      (error) => Promise.reject(error)
    );
  }

  private requestInterceptor(
    config: InternalAxiosRequestConfig
  ): InternalAxiosRequestConfig {
    if (this.applyInterceptor) {
      const token = localStorage.getItem('access_token');
      if (token) {
        config.headers['Authorization'] = 'Bearer ' + token;
      }
    }

    return config;
  }

  /**
   * Get the created Axios instance.
   * @returns {AxiosInstance} - The created Axios instance for making
   * HTTP requests.
   */
  getApi(): AxiosInstance {
    return this.api;
  }
}

export default new ClientHTTP().getApi();
