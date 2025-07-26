import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../app/api';

export const registerUser = createAsyncThunk(
  'auth/register',
  async (formData, thunkAPI) => {
    try {
      const res = await api.post('/user/register', formData);
      localStorage.setItem('token', res.data.token);
      return res.data.user;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || 'Registration failed');
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials, thunkAPI) => {
    try {
      const res = await api.post('/user/login', credentials);
      localStorage.setItem('token', res.data.token);
      return res.data.user;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  }
);

export const getCurrentUser = createAsyncThunk(
  'auth/getCurrentUser',
  async (_, thunkAPI) => {
    try {
      const res = await api.get('/user/get-user');
      return res.data.user;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || 'Could not fetch user');
    }
  }
);

export const updateUser = createAsyncThunk(
  'auth/updateUser',
  async (userData, thunkAPI) => {
    try {
      const res = await api.put('/user/update-user', userData);
      localStorage.setItem('jobUser', JSON.stringify(res.data.user));
      return res.data.user;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || 'Update failed');
    }
  }
);


export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, thunkAPI) => {
    try {
      await api.post('/user/logout');
      localStorage.removeItem('token');
      localStorage.removeItem('jobUser');
      return null;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || 'Logout failed');
    }
  }
);

export const deleteUser = createAsyncThunk(
  'auth/deleteUser',
  async (_, thunkAPI) => {
    try {
      await api.delete('/user/delete-user');
      localStorage.removeItem('token');
      localStorage.removeItem('jobUser');
      return null;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || 'Delete failed');
    }
  }
);