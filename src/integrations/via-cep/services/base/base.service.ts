import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

import { ViaCepHttpMethods } from '../../types/via-cep.types';
import { ViaCepRoutes } from '../../types/via-cep.routes';

@Injectable()
export abstract class BaseViaCep {
  private timeout = 4000;
  protected client: AxiosInstance;
  protected abstract maxRetries: number;
  protected abstract getViaCepRoute(): ViaCepRoutes;

  constructor() {
    this.client = axios.create({
      baseURL: `${process.env.VIA_CEP_BASE_URL}`,
      timeout: this.timeout,
    });
  }

  protected async makeRequest<T, D>(
    method: ViaCepHttpMethods,
    url: string,
    data?: D,
    config?: AxiosRequestConfig,
    retries = 0,
  ): Promise<T> {
    try {
      const axiosConfig: AxiosRequestConfig = {
        method,
        url,
        data: method === 'get' ? undefined : JSON.stringify(data),
        ...config,
      };
      const response: AxiosResponse<T, D> =
        await this.client.request<T>(axiosConfig);
      return response.data;
    } catch (error) {
      if (retries < this.maxRetries && error.response?.status === 500) {
        return this.makeRequest<T, D>(method, url, data, config, retries + 1);
      }
      throw error;
    }
  }
}
