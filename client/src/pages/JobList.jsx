import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import JobCard from "../components/JobCard";
import api from "../app/api";

const JobList = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const res = await api.get("/job/get-all-jobs");
                setJobs(res.data);
            } catch (err) {
                console.error("Error fetching jobs:", err);
            }
        };

        fetchJobs();
    }, []);

    const filteredJobs = jobs.filter((job) =>
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.company?.name?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen flex flex-col">
            <main className="flex-grow bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="mb-8">
                        <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
                            <div className="relative flex-1 w-full">
                                <input
                                    type="text"
                                    placeholder="Search jobs..."
                                    className="w-full px-4 py-2 pl-10 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                            </div>
                        </div>
                    </div>

                    {filteredJobs.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredJobs.map((job) => (
                                <JobCard key={job?._id} job={job} />
                            ))}
                        </div>
                    ) : (
                        <p className="text-center text-gray-500 mt-12">No jobs found.</p>
                    )}
                </div>
            </main>
        </div>
    );
};

export default JobList;
