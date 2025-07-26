import React from 'react';
import { Search, Users, Shield, Zap, Target, Award } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: <Search className="w-8 h-8" />,
      title: "Smart Job Matching",
      description: "Our AI-powered algorithm matches you with the perfect job opportunities based on your skills, experience, and preferences.",
      color: "bg-blue-100 text-blue-600"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Connect with Top Employers",
      description: "Access thousands of verified companies and connect directly with hiring managers and recruiters.",
      color: "bg-green-100 text-green-600"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Secure & Private",
      description: "Your personal information is protected with enterprise-grade security. Control who sees your profile.",
      color: "bg-purple-100 text-purple-600"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Instant Applications",
      description: "Apply to multiple jobs with one click. Your profile information auto-fills application forms.",
      color: "bg-yellow-100 text-yellow-600"
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Career Growth Tools",
      description: "Access resume builders, interview prep, salary insights, and career development resources.",
      color: "bg-red-100 text-red-600"
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Quality Opportunities",
      description: "All job postings are verified and reviewed. Find legitimate opportunities from reputable companies.",
      color: "bg-indigo-100 text-indigo-600"
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Why Choose Our Platform?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We've built the most comprehensive job platform that serves both job seekers and employers 
            with cutting-edge features and unmatched user experience.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100"
            >
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-lg mb-6 ${feature.color}`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-white rounded-2xl p-8 shadow-lg max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Find Your Dream Job?
            </h3>
            <p className="text-gray-600 mb-6">
              Join thousands of professionals who have already found their perfect career match.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-green-600 hover:bg-green-700 text-white font-medium px-8 py-3 rounded-lg transition-colors duration-200">
                Get Started as Job Seeker
              </button>
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-3 rounded-lg transition-colors duration-200">
                Post a Job as Employer
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;