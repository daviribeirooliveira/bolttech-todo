import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';

declare module 'axios' {
  interface AxiosResponse<T = any> extends Promise<T> {}
}

export default abstract class HttpClient {
  protected readonly instance: AxiosInstance;

  public constructor(baseURL: string) {
    this.instance = axios.create({ baseURL });

    this._initializeResponseInterceptor();
  }

  protected _handleResponse = ({ data }: AxiosResponse): AxiosResponse => data;

  protected _handleError = (error: AxiosError): AxiosError => {
    throw error;
  };

  protected _initializeResponseInterceptor = () =>
    this.instance.interceptors.response.use(
      this._handleResponse,
      this._handleError,
    );
}
