import React, { useState } from 'react';
import {
    Clock, DollarSign, Users, Bookmark, ArrowRight, BookmarkCheck
} from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../app/api';
import { useSelector } from 'react-redux';

const truncateText = (text, maxLength = 20) =>
    text?.length > maxLength ? `${text.slice(0, maxLength)}...` : text;

const JobCard = ({ job }) => {
    const { user } = useSelector(state => state.auth)
    const [isSaved, setIsSaved] = useState(job?.isSaved || false); // Optional: if backend provides this
    const [loading, setLoading] = useState(false);

    const createdDate = new Date(job?.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    const handleToggleSave = async () => {
        try {
            setLoading(true);
            const res = await api.put(`/application/toggle-save-job/${job._id}`);
            setIsSaved(res.data.saved);
        } catch (error) {
            console.error("Failed to toggle saved job:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100">
            {/* Save Button */}
            <div className="flex justify-between items-center p-4">
                {user &&
                    (
                        <button
                            onClick={handleToggleSave}
                            disabled={loading}
                            className={`flex items-center gap-2 px-4 py-2 border rounded-lg ${isSaved
                                    ? "text-green-600 border-green-600"
                                    : "text-gray-600 border-gray-300"
                                } hover:bg-gray-50 transition`}
                        >
                            {isSaved ? (
                                <>
                                    <BookmarkCheck className="h-5 w-5" />
                                    Saved
                                </>
                            ) : (
                                <>
                                    <Bookmark className="h-5 w-5" />
                                    Save Job
                                </>
                            )}
                        </button>
                    )
                }

            </div>

            {/* Job Info */}
            <div className="px-6 pb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-1">{job?.title}</h3>
                <p className="text-sm text-gray-600 mb-2 line-clamp-2">{job?.description}</p>
                <p className="text-xs text-gray-500 mb-4">{createdDate}</p>

                {/* Salary + Applicants */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="bg-gray-50 p-3 rounded-lg">
                        <div className="flex items-center text-gray-700">
                            <DollarSign className="h-4 w-4 mr-2 text-indigo-500" />
                            <span className="text-sm font-medium">
                                {job?.salaryRange?.min?.toLocaleString()} - {job?.salaryRange?.max?.toLocaleString()}
                            </span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">Salary</p>
                    </div>

                    <div className="bg-gray-50 p-3 rounded-lg">
                        <div className="flex items-center text-gray-700">
                            <Users className="h-4 w-4 mr-2 text-indigo-500" />
                            <span className="text-sm font-medium">{job?.applicants?.length || 0}</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">Applicants</p>
                    </div>
                </div>

                {/* Company + Job Type */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="bg-gray-50 p-3 rounded-lg flex items-start gap-3">
                        <img
                            src={job?.company?.logoUrl || '/placeholder-logo.png'}
                            alt="Company Logo"
                            className="w-8 h-8 object-cover rounded-full border"
                        />
                        <div>
                            <p className="text-sm font-medium text-gray-800">
                                {truncateText(job?.company?.name)}
                            </p>
                            <p className="text-xs text-gray-500">
                                {truncateText(job?.company?.location)}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">Company</p>
                        </div>
                    </div>

                    <div className="bg-gray-50 p-3 rounded-lg">
                        <div className="flex items-center text-gray-700">
                            <Clock className="h-4 w-4 mr-2 text-indigo-500" />
                            <span className="text-sm font-medium">{job?.jobType}</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">Job Type</p>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <Link
                        to={`/job/${job._id}`}
                        className="flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors"
                    >
                        View Details
                        <ArrowRight className="h-4 w-4 ml-1" />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default JobCard;
