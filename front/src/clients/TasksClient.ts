import { AxiosRequestConfig } from 'axios';
import { Task } from '../types/Task';

import HttpClient from './HttpClient';

class TasksClient extends HttpClient {
  public constructor() {
    super(`${process.env.REACT_APP_TODO_API_URL}/tasks`);

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

  public get = async (): Promise<Task[]> =>
    await this.instance.get<Task[]>('/');

  public getById = async (id: string): Promise<Task> =>
    await this.instance.get<Task>(`/${id}`);

  public post = async (projectId: string, description: string): Promise<Task> =>
    await this.instance.post('/', { projectId, description });

  public put = async (task: Task): Promise<void> =>
    await this.instance.put('/', task);

  public delete = async (id: string): Promise<void> =>
    await this.instance.delete(`/${id}`);
}

export default new TasksClient();
