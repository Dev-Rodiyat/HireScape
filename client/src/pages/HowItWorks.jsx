import React, { useState } from 'react';
import {
  UserPlus, Search, Send, CheckCircle,
  Building, Users, Eye, Handshake
} from 'lucide-react';
import { Link } from 'react-router-dom';

const HowItWorksSection = () => {
  const [activeTab, setActiveTab] = useState('jobseeker');

  const jobSeekerSteps = [
    {
      icon: <UserPlus className="w-8 h-8" />,
      step: "01",
      title: "Create Your Profile",
      description: "Sign up and build a comprehensive profile with your skills, experience, and career preferences.",
      color: "bg-blue-500"
    },
    {
      icon: <Search className="w-8 h-8" />,
      step: "02",
      title: "Browse & Search Jobs",
      description: "Explore thousands of job opportunities or let our smart matching algorithm find perfect jobs for you.",
      color: "bg-green-500"
    },
    {
      icon: <Send className="w-8 h-8" />,
      step: "03",
      title: "Apply with One Click",
      description: "Apply to multiple positions instantly with your pre-filled profile information and custom cover letters.",
      color: "bg-purple-500"
    },
    {
      icon: <CheckCircle className="w-8 h-8" />,
      step: "04",
      title: "Get Hired",
      description: "Connect with employers, schedule interviews, and land your dream job with our career support tools.",
      color: "bg-orange-500"
    }
  ];

  const employerSteps = [
    {
      icon: <Building className="w-8 h-8" />,
      step: "01",
      title: "Set Up Company Profile",
      description: "Create your company profile with detailed information about culture, benefits, and open positions.",
      color: "bg-indigo-500"
    },
    {
      icon: <Users className="w-8 h-8" />,
      step: "02",
      title: "Post Job Openings",
      description: "Create detailed job listings with requirements, responsibilities, and compensation details.",
      color: "bg-teal-500"
    },
    {
      icon: <Eye className="w-8 h-8" />,
      step: "03",
      title: "Review Applications",
      description: "Browse qualified candidates, review profiles, and use our filtering tools to find the best matches.",
      color: "bg-pink-500"
    },
    {
      icon: <Handshake className="w-8 h-8" />,
      step: "04",
      title: "Hire Top Talent",
      description: "Connect with candidates, conduct interviews, and make offers through our integrated platform.",
      color: "bg-red-500"
    }
  ];

  const currentSteps = activeTab === 'jobseeker' ? jobSeekerSteps : employerSteps;

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4">How It Works</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Getting started is simple. Follow these easy steps to find your next opportunity
            or hire the perfect candidate.
          </p>

          {/* Tabs */}
          <div className="mt-6 inline-flex bg-gray-100 rounded-xl p-1">
            {['jobseeker', 'employer'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${activeTab === tab
                    ? 'bg-white text-indigo-600 shadow'
                    : 'text-gray-600 hover:text-gray-900'
                  }`}
              >
                {tab === 'jobseeker' ? 'For Job Seekers' : 'For Employers'}
              </button>
            ))}
          </div>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Horizontal line for desktop */}
          <div className="hidden lg:block absolute top-16 left-0 w-full h-0.5 bg-gray-200 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 relative z-10">
            {currentSteps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="relative mb-6 inline-block">
                  <div className={`w-20 h-20 ${step.color} text-white rounded-full flex items-center justify-center shadow-md`}>
                    {step.icon}
                  </div>
                  <div className="absolute -top-3 -right-3 bg-white border-4 border-white rounded-full w-8 h-8 flex items-center justify-center shadow">
                    <span className="text-xs font-bold text-gray-500">{step.step}</span>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-xl p-6 shadow-sm h-full">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-20">
          <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-gray-200 rounded-2xl p-10">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              {activeTab === 'jobseeker' ? 'Start Your Career Journey Today' : 'Find Your Next Great Hire'}
            </h3>
            <p className="text-gray-600 mb-6 max-w-xl mx-auto">
              {activeTab === 'jobseeker'
                ? 'Join thousands of professionals who have found their dream jobs through our platform.'
                : 'Connect with top talent and build your dream team with our powerful hiring tools.'}
            </p>
            <button
              className={`${activeTab === 'jobseeker'
                  ? 'bg-green-600 hover:bg-green-700'
                  : 'bg-blue-600 hover:bg-blue-700'
                } text-white font-medium px-8 py-3 rounded-lg transition duration-200`}
            >
              {activeTab === 'jobseeker' ?
                <Link to='/register'>Sign Up as Job Seeker</Link>
                :
                <Link to='/register'>Start Hiring Now</Link>
              }
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
