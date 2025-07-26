import React from 'react';

const About = () => {
  return (
    <div className="bg-white">
      <div className="bg-indigo-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
              About HireScape
            </h1>
            <p className="mt-4 text-xl text-gray-600">
              Empowering Talent. Connecting Opportunities.
            </p>
          </div>
        </div>
      </div>

      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-3xl font-bold text-indigo-600">Our Mission</h2>
            <p className="mt-4 text-lg text-gray-600">
              HireScape is a Web 2 job listing platform built to streamline the hiring process. 
              We help companies find the right talent faster while empowering job seekers 
              to discover meaningful opportunities with ease.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold text-gray-900">User-Friendly Interface</h3>
              <p className="mt-4 text-gray-600">
                Designed with simplicity and accessibility in mind, our platform makes it easy for
                anyone to post jobs or apply in just a few clicks.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold text-gray-900">Robust Job Management</h3>
              <p className="mt-4 text-gray-600">
                Employers can manage job listings, track applicants, and update statuses, all in one
                centralized dashboard.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold text-gray-900">Verified Accounts</h3>
              <p className="mt-4 text-gray-600">
                Account verification and moderation tools help ensure authentic listings and trusted
                user interactions.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {['Integrity', 'Efficiency', 'Accessibility', 'Growth'].map((value) => (
              <div key={value} className="text-center">
                <h3 className="text-xl font-semibold text-indigo-600 mb-4">{value}</h3>
                <p className="text-gray-600">
                  We prioritize {value.toLowerCase()} in every aspect of our platform.
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
