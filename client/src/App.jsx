import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import About from './pages/About';
import HowItWorksSection from './pages/HowItWorks';
import AddJob from './pages/AddJob';
import JobList from './pages/JobList';
import Layout from './components/Layout';
import FAQ from './pages/FAQs';
import ApplicantDashboard from './pages/ApplicantDashboard';
import EmployerDashboard from './pages/EmployerDashboard';
import ApplicantAnalytics from './pages/ApplicantAnalytics';
import EmployerAnalytics from './pages/EmployerAnalytics';
import { getCurrentUser } from './redux/auth/authThunk';
import { useDispatch } from 'react-redux';
import JobDetails from './pages/JobDetails';


const App = () => {
   const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getCurrentUser());
  // }, [dispatch]);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/how' element={<HowItWorksSection />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path='/jobs' element={<JobList />} />
            <Route path='/job/:id' element={<JobDetails />} />
            <Route path='/faq' element={<FAQ />} />
            {/* <Route path='/jobs' element={<JobList/>}/> */}

            <Route path='/create-job' element={<AddJob />} />
            <Route path="/employer/dashboard" element={<EmployerDashboard />} />
            <Route path="/employer/analytics" element={<EmployerAnalytics />} />

            <Route path="/applicant/dashboard" element={<ApplicantDashboard />} />
            <Route path="/applicant/analytics" element={<ApplicantAnalytics />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App
