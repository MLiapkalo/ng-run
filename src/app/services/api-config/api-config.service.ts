import { Injectable } from '@angular/core';

const BASE = 'http://localhost';
const PORT = 3004;
const API_ROOT = `${BASE}:${PORT}`;

const ENDPOINTS = {
  auth: {
    login: `${API_ROOT}/auth/login`,
    userInfo: `${API_ROOT}/auth/userInfo`
  },
  courses: `${API_ROOT}/courses`,
  authors: `${API_ROOT}/authors`,
  error: `${API_ROOT}/error`,
};

@Injectable({
  providedIn: 'root'
})
export class ApiConfigService {
  login(): string {
    return ENDPOINTS.auth.login;
  }

  userInfo(): string {
    return ENDPOINTS.auth.userInfo;
  }

  course(id: string | number): string {
    return `${ENDPOINTS.courses}/${id}`;
  }

  courses(): string {
    return ENDPOINTS.courses;
  }

  authors(): string {
    return ENDPOINTS.authors;
  }

  error(): string {
    return ENDPOINTS.error;
  }
}
