/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosError } from "axios";


export class ApiService {
  private static httpUrl = 'https://api.institutoelevateperu.com/api';
  // private static httpUrl = 'http://localhost:3000/api';

  // Agregar interceptores globalmente
  static initializeInterceptors() {
    axios.interceptors.request.use((request) => {
        const token = window.localStorage.getItem('session');
        if(token){
            request.headers['Authorization'] = `Bearer ${token}`;
        }
      return request;
    });
  }

  static async get(url: string) {
    try {
      const response = await axios.get(`${this.httpUrl}${url}`);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      throw axiosError;
    }
  }


  static async post(url: string, data:any) {
    try {
      const response = await axios.post(`${this.httpUrl}${url}`, data);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      throw axiosError;
    }
  }

  static async put(url: string, data:any) {
    try {
      const response = await axios.put(`${this.httpUrl}${url}`, data);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      throw axiosError;
    }
  }

  static async delete(url: string) {
    try {
      const response = await axios.delete(`${this.httpUrl}${url}`);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      throw axiosError;
    }
  }
}

// No olvides inicializar los interceptores antes de hacer las llamadas HTTP
ApiService.initializeInterceptors();
