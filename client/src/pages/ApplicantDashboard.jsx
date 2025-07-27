import React, { useEffect, useState } from "react";
import axios from "axios";
import { Briefcase, Bookmark, FileText, User } from "lucide-react";
import api from "../app/api";
import { Link } from "react-router-dom";

const ApplicantDashboard = () => {
    const [applications, setApplications] = useState([]);
    const [savedJobs, setSavedJobs] = useState([]);
    const [resumeUploaded, setResumeUploaded] = useState(false);
    const [profileCompletion, setProfileCompletion] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                setLoading(true);

                const [
                    applicationsRes,
                    savedJobsRes,
                    resumeRes,
                    profileRes,
                ] = await Promise.all([
                    api.get("/application/get-my-applications"),
                    api.get("/application/get-saved-jobs"),
                    api.get("/application/resume"),
                    api.get("/application/profile-completion"),
                ]);

              

                setApplications(applicationsRes?.data || []);
                setSavedJobs(savedJobsRes?.data || []);
                setResumeUploaded(resumeRes?.data?.uploaded || false);
                setProfileCompletion(profileRes?.data?.completion || 0);
            } catch (error) {
                console.error("Error fetching dashboard data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    if (loading) {
        return <div className="p-10 text-center text-gray-600">Loading dashboard...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Welcome Back!</h1>
                    <p className="text-gray-600 mt-1">Here’s your dashboard overview.</p>
                </div>

                {/* Dashboard Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                    <DashboardCard icon={<Briefcase />} label="Total Applications" value={applications?.length} color="indigo" />
                    <DashboardCard icon={<Bookmark />} label="Saved Jobs" value={savedJobs.length} color="green" />
                    <DashboardCard
                        icon={<FileText />}
                        label="Resume Uploaded"
                        value={applications?.some(app => !!app.resumeUrl) ? "Yes" : "No"}
                        color="purple"
                    />
                    <DashboardCard icon={<User />} label="Profile Completion" value={`${profileCompletion}%`} color="pink" />
                </div>

                {/* Applications List */}
                <Section title="Your Applications">
                    {applications?.length === 0 ? (
                        <p className="p-4 text-gray-500">You haven't applied for any jobs yet.</p>
                    ) : (
                        <ul className="divide-y">
                            {applications?.map((app) => (
                                <li key={app?._id} className="flex justify-between items-center p-4 hover:bg-gray-50">
                                    <div className="space-y-1">
                                        <h3 className="text-sm font-semibold text-gray-800">{app?.job?.title}</h3>
                                        <p className="text-sm text-gray-500">{app?.job?.company?.name}</p>
                                    </div>
                                    <span className={`text-sm font-medium px-3 py-1 rounded-full ${app.status === "Pending"
                                        ? "bg-yellow-100 text-yellow-800"
                                        : app?.status === "Interview"
                                            ? "bg-blue-100 text-blue-800"
                                            : "bg-red-100 text-red-800"
                                        }`}>
                                        {app.status}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    )}
                </Section>

                {/* Saved Jobs */}
                <Section title="Saved Jobs">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {savedJobs && savedJobs?.map > 0 ? (
                            savedJobs?.map((job) => (
                                <div key={job._id} className="bg-white p-5 border rounded-lg shadow-sm">
                                    <h3 className="text-md font-semibold text-gray-800">{job?.title}</h3>
                                    <p className="text-sm text-gray-500">{job?.company}</p>
                                    <button className="mt-3 text-sm text-indigo-600 hover:underline">View Job</button>
                                </div>
                            ))
                        ) : (
                            <p className="p-4 text-gray-500">You haven't saved any job yet.</p>
                        )}
                    </div>
                </Section>

                {/* Call to Action */}
                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100 rounded-xl p-8 text-center">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Ready to take the next step?</h3>
                    <p className="text-gray-600 mb-4">Explore new jobs or update your profile to get better matches.</p>
                    <Link to='/jobs'>
                        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-medium">
                            Browse Jobs
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

const DashboardCard = ({ icon, label, value, color }) => (
    <div className="bg-white rounded-xl p-5 shadow-sm border">
        <div className="flex items-center space-x-3">
            {React.cloneElement(icon, { className: `text-${color}-500 w-6 h-6` })}
            <h2 className="text-sm font-medium text-gray-600">{label}</h2>
        </div>
        <p className="text-2xl font-semibold text-gray-800 mt-2">{value}</p>
    </div>
);

const Section = ({ title, children }) => (
    <div className="mb-10">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">{title}</h2>
        <div className="bg-white border rounded-lg shadow-sm">{children}</div>
    </div>
);

export default ApplicantDashboard;
