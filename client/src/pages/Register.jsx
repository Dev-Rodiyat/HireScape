import React, { useState } from 'react';
import Regg from '../assets/Regg.jpg';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../redux/auth/authThunk';
import { toast } from 'react-toastify';
import ClipLoader from 'react-spinners/ClipLoader';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: '',
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

    if (!formData.role) {
      toast.error('Please select a role');
      return;
    }

    try {
      const result = await dispatch(registerUser(formData));

      if (registerUser.fulfilled.match(result)) {
        const role = result.payload?.role;
        toast.success('Registration successful');

        if (role === 'employer') {
          navigate('/employer/dashboard');
        } else if (role === 'jobseeker') {
          navigate('/applicant/dashboard');
        } else {
          navigate('/');
        }
      } else {
        toast.error(result.payload || 'Registration failed');
      }
    } catch (error) {
      toast.error('Unexpected error occurred');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="flex bg-white rounded-2xl shadow-xl overflow-hidden max-w-4xl w-full">
        {/* Left side - Form */}
        <div className="w-full md:w-1/2 p-8 lg:p-12">
          <div className="w-full max-w-md mx-auto">
            <h1 className="text-4xl font-bold text-gray-900 mb-12">Get Started Now</h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                  required
                />
              </div>

              {/* Role */}
              <div>
                <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
                  I want to register as
                </label>
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none bg-white"
                  required
                >
                  <option value="" disabled>
                    Select your role
                  </option>
                  <option value="jobseeker">Job Seeker</option>
                  <option value="employer">Employer</option>
                </select>
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                  required
                />
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                  required
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full bg-green-700 hover:bg-green-800 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center"
              >
                {status === 'loading' ? <ClipLoader size={20} color="#fff" /> : 'Signup'}
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or</span>
              </div>
            </div>

            {/* Login Link */}
            <div className="text-center mt-6">
              <span className="text-gray-600">Have an account? </span>
              <Link to="/login" className="text-blue-600 hover:text-blue-800 font-medium">
                Sign In
              </Link>
            </div>
          </div>
        </div>

        {/* Right side - Image */}
        <div className="hidden md:block w-1/2 relative overflow-hidden">
          <div
            className="w-full h-full bg-cover bg-center"
            style={{
              backgroundImage: `url(${Regg})`,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Register;
