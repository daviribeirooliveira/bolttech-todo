import { AxiosRequestConfig } from 'axios';
import { Project } from '../types/Project';

import HttpClient from './HttpClient';

class ProjectsClient extends HttpClient {
  public constructor() {
    super(`${process.env.REACT_APP_TODO_API_URL}/projects`);

    this._initializeRequestInterceptor();
  }

  private _initializeRequestInterceptor = () => {
    this.instance.interceptors.request.use(
      this._handleRequest,
      this._handleError,
    );
  };

  private _handleRequest = (
    config: AxiosRequestConfig,
  ): AxiosRequestConfig<any> => {
    config.headers = {
      ...config.headers,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };

    return config;
  };

  public get = async (): Promise<Project[]> =>
    await this.instance.get<Project[]>('/');

  public getById = async (id: string): Promise<Project> =>
    await this.instance.get<Project>(`/${id}`);

  public post = async (description: string): Promise<Project> =>
    await this.instance.post('/', { description });

  public put = async (project: Project): Promise<void> =>
    await this.instance.post('/', project);

  public delete = async (id: string): Promise<void> =>
    await this.instance.delete(`/${id}`);
}

export default new ProjectsClient();
