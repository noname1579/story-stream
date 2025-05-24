import { createAsyncThunk } from '@reduxjs/toolkit';
import { setError, setLoading, clearAuthState } from './authSlice';

interface User {
  name: string;
  email: string;
  token?: string;
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
}

const API_BASE_URL = 'https://story-stream-server.vercel.app'

export const login = createAsyncThunk<User, LoginCredentials>(
  'auth/login',
  async ({ email, password }, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setLoading(true));

      const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Ошибка входа');
      }

      localStorage.setItem('auth', JSON.stringify(data.user));
      localStorage.setItem('token', data.session.access_token);
      
      return data.user;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Ошибка входа';
      dispatch(setError(message));
      return rejectWithValue(message);
    } finally {
      dispatch(setLoading(false));
    }
  }
);

export const register = createAsyncThunk<User, RegisterCredentials>(
  'auth/register',
  async ({ name, email, password }, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setLoading(true));

      const response = await fetch(`${API_BASE_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Ошибка регистрации');
      }

      if (!data.session.access_token) {
        throw new Error('Подтвердите email для завершения регистрации');
      }

      localStorage.setItem('auth', JSON.stringify(data.user))
      localStorage.setItem('token', data.session.access_token)
      
      return data.user;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Ошибка регистрации';
      dispatch(setError(message));
      return rejectWithValue(message);
    } finally {
      dispatch(setLoading(false));
    }
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { dispatch }) => {
    try {
      // Можно добавить запрос на сервер для выхода, если нужно
      // await fetch(`${API_BASE_URL}/auth/logout`, {
      //   method: 'POST',
      //   headers: {
      //     'Authorization': `Bearer ${localStorage.getItem('token')}`,
      //   },
      // });

      localStorage.removeItem('auth');
      localStorage.removeItem('token');
      dispatch(clearAuthState());
    } catch (error) {
      console.error('Ошибка при выходе:', error);
    }
  }
);

export const checkAuth = createAsyncThunk<User>(
  'auth/checkAuth',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token')
      if (!token) return rejectWithValue('Токен отсутствует')

      const response = await fetch(`${API_BASE_URL}/auth/me`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (!response.ok) {
        localStorage.removeItem('auth')
        localStorage.removeItem('token')
        throw new Error('Ошибка проверки авторизации')
      }
      const user = await response.json()
      return user
    } catch (error) {
      console.error(error)
    }
  }
)