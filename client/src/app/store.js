import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../redux/auth/authSlice';
// import jobsReducer from '../redux/jobs/jobSlice';
// import applicationsReducer from '../redux/applications/applicationsSlice';
// import dashboardReducer from '../redux/dashboard/dashboardSlice';
// import employersReducer from '../redux/employers/employersSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    // jobs: jobsReducer,
    // applications: applicationsReducer,
    // dashboard: dashboardReducer,
    // employers: employersReducer,
  },
});
