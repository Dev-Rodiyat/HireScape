import React, { useEffect, useState } from "react";
import axios from "axios";
import { BarChart, Users, FileText, CheckCircle } from "lucide-react";
import api from "../app/api";

const EmployerAnalytics = () => {
  const [stats, setStats] = useState({
    jobsPosted: 0,
    totalApplicants: 0,
    hiresMade: 0,
    avgApplicationsPerJob: 0,
  });

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await api.get("/user/analytics"); // 🔁 adjust endpoint if needed
        setStats(res.data);
      } catch (err) {
        console.error("Failed to fetch analytics:", err);
      }
    };

    fetchAnalytics();
  }, []);

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Employer Analytics</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <AnalyticsCard icon={<FileText />} label="Jobs Posted" value={stats.jobsPosted} />
        <AnalyticsCard icon={<Users />} label="Total Applicants" value={stats.totalApplicants} />
        <AnalyticsCard icon={<CheckCircle />} label="Hires Made" value={stats.hiresMade} />
        <AnalyticsCard
          icon={<BarChart />}
          label="Avg. Applications/Job"
          value={stats.avgApplicationsPerJob.toFixed(1)}
        />
      </div>

      {/* Charts Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Applications Over Time" />
        <ChartCard title="Hire Rate by Job Role" />
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

export default EmployerAnalytics;
