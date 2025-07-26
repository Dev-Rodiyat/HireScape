import React, { useEffect, useState } from "react";
import { Briefcase, Users, CheckCircle, ClipboardList } from "lucide-react";
import { Link } from "react-router-dom";
import api from "../app/api";
import ClipLoader from "react-spinners/ClipLoader";

const EmployerDashboard = () => {
    const [loading, setLoading] = useState(true);
    const [dashboardData, setDashboardData] = useState(null);

    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                const res = await api.get("/user/dashboard");
                console.log({ res })
                setDashboardData(res.data);
            } catch (error) {
                console.error("Error fetching dashboard:", error.response?.data?.message || error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboard();
    }, []);

    if (loading) return <ClipLoader />;

    const {
        companyName,
        totalJobs,
        applications,
        activeJobs,
        hires,
        postedJobs,
        recentApplicants,
    } = dashboardData;

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="mb-8 space-y-2">
                    <h1 className="text-3xl font-bold text-gray-800">
                        Welcome Back, {companyName || "Your Company"}
                    </h1>
                    <p className="text-gray-600 mt-1">Here’s your employer dashboard overview.</p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                    <DashboardCard icon={<Briefcase className="text-indigo-500 w-6 h-6" />} label="Total Jobs" value={totalJobs} />
                    <DashboardCard icon={<Users className="text-green-500 w-6 h-6" />} label="Applications" value={applications} />
                    <DashboardCard icon={<ClipboardList className="text-yellow-500 w-6 h-6" />} label="Active Listings" value={activeJobs} />
                    <DashboardCard icon={<CheckCircle className="text-pink-500 w-6 h-6" />} label="Hires Made" value={hires} />
                </div>

                {/* Recent Applicants */}
                <div className="mb-10">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Applicants</h2>
                    <div className="bg-white border rounded-lg shadow-sm overflow-hidden">
                        <ul className="divide-y">
                            {recentApplicants?.length > 0 ? recentApplicants
                                .slice(0, 3) // 👈 only take the first 3
                                .map((app) => (
                                    <li key={app.id} className="p-4 flex justify-between items-center hover:bg-gray-50">
                                        <div>
                                            <p className="font-semibold text-gray-800">{app?.name}</p>
                                            <p className="text-sm text-gray-500">Applied for {app?.job}</p>
                                        </div>
                                        <span
                                            className={`text-xs font-medium px-3 py-1 rounded-full ${app?.status === "New"
                                                    ? "bg-blue-100 text-blue-800"
                                                    : app?.status === "Reviewed"
                                                        ? "bg-gray-100 text-gray-700"
                                                        : "bg-green-100 text-green-700"
                                                }`}
                                        >
                                            {app?.status}
                                        </span>
                                    </li>
                                )) : (
                                <li className="p-4 text-gray-500 text-sm">No recent applicants</li>
                            )}
                        </ul>
                    </div>
                </div>

                {/* Posted Jobs */}
                <div className="mb-10">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Job Listings</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {postedJobs?.length > 0 ? postedJobs.map((job) => (
                            <div key={job.id} className="bg-white p-5 border rounded-lg shadow-sm">
                                <h3 className="text-md font-semibold text-gray-800">{job?.title}</h3>
                                <p className="text-sm text-gray-500 mb-2">{job.applicants} applicants</p>
                                <span
                                    className={`inline-block text-xs px-3 py-1 rounded-full font-medium ${job.status === "open"
                                            ? "bg-green-100 text-green-700"
                                            : "bg-red-100 text-red-700"
                                        }`}
                                >
                                    {job.status}
                                </span>
                            </div>
                        )) : (
                            <p className="text-gray-500 text-sm">You haven’t posted any jobs yet.</p>
                        )}
                    </div>
                </div>

                {/* CTA */}
                <div className="text-center mt-16">
                    <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100 rounded-2xl p-10">
                        <h3 className="text-xl font-semibold text-gray-800 mb-3">
                            Ready to find your next great hire?
                        </h3>
                        <p className="text-gray-600 mb-4">
                            Post a job and start attracting top talent today.
                        </p>
                        <Link to="/create-job">
                            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-medium">
                                Post a Job
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

const DashboardCard = ({ icon, label, value }) => (
    <div className="bg-white rounded-xl p-5 shadow-sm border">
        <div className="flex items-center space-x-3">
            {icon}
            <h2 className="text-sm font-medium text-gray-600">{label}</h2>
        </div>
        <p className="text-2xl font-semibold text-gray-800 mt-2">{value}</p>
    </div>
);

export default EmployerDashboard;
