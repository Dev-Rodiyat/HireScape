import { createSlice } from '@reduxjs/toolkit';
import {
    registerUser,
    loginUser,
    getCurrentUser,
    updateUser,
    deleteUser,
    logoutUser
} from './authThunk';

export const saveUserToStorage = (user) =>
  localStorage.setItem('jobUser', JSON.stringify(user));

export const clearAuthFromStorage = () => {
  localStorage.removeItem('jobUser');
  localStorage.removeItem('token');
};

const initialState = {
    user: JSON.parse(localStorage.getItem('jobUser')) || null,
    status: 'idle',
    error: null,
    isAuthenticated: !!localStorage.getItem('token'),
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout(state) {
            state.user = null;
            state.isAuthenticated = false;
            localStorage.removeItem('token');
            localStorage.removeItem('jobUser');
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.user = action.payload;
                state.isAuthenticated = true;
                localStorage.setItem('jobUser', JSON.stringify(action.payload));
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })

            .addCase(loginUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.user = action.payload;
                state.isAuthenticated = true;
                localStorage.setItem('jobUser', JSON.stringify(action.payload));
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })

            .addCase(getCurrentUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getCurrentUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.user = action.payload;
                state.isAuthenticated = true;
                localStorage.setItem('jobUser', JSON.stringify(action.payload));
            })
            .addCase(getCurrentUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
                state.isAuthenticated = false;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.user = action.payload;
                localStorage.setItem('jobUser', JSON.stringify(action.payload));
            })
            .addCase(deleteUser.fulfilled, (state) => {
                state.user = null;
                state.isAuthenticated = false;
                localStorage.removeItem('token');
                localStorage.removeItem('jobUser');
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.user = null;
                state.isAuthenticated = false;
                state.status = 'idle';
                localStorage.removeItem('token');
                localStorage.removeItem('jobUser');
            })
            .addMatcher(
                (action) => action.type.endsWith('/rejected'),
                (state, action) => {
                    state.status = 'failed';
                    state.error = action.payload;
                }
            );
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
