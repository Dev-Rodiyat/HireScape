import React from "react";
import { Send, CheckCircle, Hourglass, AlertCircle, TrendingUp } from "lucide-react";

const ApplicantAnalytics = () => {
  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Application Insights</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <AnalyticsCard icon={<Send />} label="Applications Sent" value="24" />
        <AnalyticsCard icon={<CheckCircle />} label="Offers Received" value="3" />
        <AnalyticsCard icon={<Hourglass />} label="Under Review" value="5" />
        <AnalyticsCard icon={<AlertCircle />} label="Rejected" value="6" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Application Timeline" />
        <ChartCard title="Success Rate Over Time" />
      </div>

      {/* Suggestion */}
      <div className="mt-12 p-6 bg-yellow-50 border-l-4 border-yellow-400 rounded-md text-yellow-800">
        <p className="text-sm">
          Tip: Keep your resume updated and apply early to increase your chances of success.
        </p>
      </div>
    </div>
  );
};

const AnalyticsCard = ({ icon, label, value }) => (
  <div className="bg-white shadow-sm border rounded-lg p-5">
    <div className="flex items-center space-x-4">
      <div className="bg-indigo-100 text-indigo-600 p-2 rounded-full">{icon}</div>
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <h2 className="text-xl font-semibold text-gray-800">{value}</h2>
      </div>
    </div>
  </div>
);

const ChartCard = ({ title }) => (
  <div className="bg-white border rounded-lg p-6 shadow-sm">
    <h3 className="text-lg font-semibold text-gray-700 mb-4">{title}</h3>
    <div className="h-48 flex items-center justify-center text-gray-400 text-sm border-2 border-dashed border-gray-200 rounded-md">
      [Chart coming soon]
    </div>
  </div>
);

export default ApplicantAnalytics;
