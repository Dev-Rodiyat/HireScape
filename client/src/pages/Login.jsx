import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/auth/authThunk';
import { useNavigate, Link } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';
import { toast } from 'react-toastify';
import Regg from '../assets/Regg.jpg';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await dispatch(loginUser(formData));

      if (loginUser.fulfilled.match(result)) {
        const role = result.payload?.role;

        toast.success('Login successful');

        if (role === 'employer') {
          navigate('/employer/dashboard');
        } else if (role === 'jobseeker') {
          navigate('/applicant/dashboard');
        } else {
          navigate('/');
        }
      } else {
        toast.error(result.payload || 'Login failed');
      }
    } catch (error) {
      toast.error('Unexpected error occurred');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="flex bg-white rounded-2xl shadow-xl overflow-hidden max-w-4xl w-full">
        {/* Left - Form */}
        <div className="w-full md:w-1/2 p-8 lg:p-12">
          <div className="w-full max-w-md mx-auto">
            <div className="mb-12">
              <h1 className="text-4xl font-bold text-gray-900 mb-3">Welcome Back</h1>
              <p className="text-gray-600 text-lg">Sign in to continue</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email address
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full bg-green-700 hover:bg-green-800 text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center transition-colors duration-200 focus:ring-2 focus:ring-green-500"
              >
                {status === 'loading' ? <ClipLoader color="#fff" size={20} /> : 'Sign In'}
              </button>
            </form>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            <div className="text-center mt-6">
              <span className="text-gray-600">Don't have an account? </span>
              <Link to="/register" className="text-blue-600 hover:text-blue-800 font-medium">
                Sign Up
              </Link>
            </div>
          </div>
        </div>

        {/* Right - Image */}
        <div className="hidden md:block w-1/2 relative">
          <div
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${Regg})` }}
          />
          <div className="absolute inset-0 bg-black bg-opacity-20" />
        </div>
      </div>
    </div>
  );
};

export default Login;
