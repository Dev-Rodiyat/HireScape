import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  MapPin,
  Clock,
  Users,
  DollarSign,
  Building2,
  ArrowLeft,
} from "lucide-react";
import api from "../app/api";
import ClipLoader from "react-spinners/ClipLoader";
import axios from "axios";

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/job/get-job/${id}`);
        setJob(res.data);
      } catch (err) {
        console.error("Failed to fetch job details:", err);
      }
    };

    fetchJobDetails();
  }, [id]);

  if (!job) {
    return (
      <div className="h-[50vh] flex items-center justify-center">
        <ClipLoader size={40} />
      </div>
    );
  }

  const {
    title,
    description,
    responsibilities,
    requirements,
    jobType,
    salaryRange,
    applicants,
    company,
    createdAt,
  } = job;

  const createdDate = new Date(createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 relative">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="absolute left-4 top-4 p-2 rounded-full bg-white border hover:bg-gray-100 shadow-sm"
      >
        <ArrowLeft className="h-5 w-5 text-gray-700" />
      </button>

      {/* Card */}
      <div className="bg-white rounded-2xl shadow-md border p-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{title}</h1>
            <p className="text-sm text-gray-500 mt-1">Posted on {createdDate}</p>
          </div>
          <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-all text-sm font-medium">
            Apply Now
          </button>
        </div>

        {/* Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-b pb-6 mb-6">
          <InfoItem icon={<DollarSign className="text-indigo-600" />} label="Salary">
            {salaryRange?.min} - {salaryRange?.max}
          </InfoItem>
          <InfoItem icon={<Clock className="text-indigo-600" />} label="Job Type">
            {jobType}
          </InfoItem>
          <InfoItem icon={<Users className="text-indigo-600" />} label="Applicants">
            {applicants?.length || 0}
          </InfoItem>
          <InfoItem icon={<MapPin className="text-indigo-600" />} label="Location">
            {company?.location}
          </InfoItem>
        </div>

        {/* Description */}
        <Section title="Job Description">
          <p className="text-gray-700 leading-relaxed">{description}</p>
        </Section>

        {/* Responsibilities */}
        {responsibilities?.length > 0 && (
          <Section title="Responsibilities">
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              {responsibilities.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </Section>
        )}

        {/* Requirements */}
        {requirements?.length > 0 && (
          <Section title="Requirements">
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              {requirements.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </Section>
        )}

        {/* Company Info */}
        <div className="bg-gray-50 border p-5 rounded-xl mt-8">
          <div className="flex items-center gap-4 mb-2">
            <img
              src={company?.logoUrl || "/placeholder-logo.png"}
              alt="Company Logo"
              className="w-12 h-12 rounded-full border object-cover"
            />
            <div>
              <h3 className="font-semibold text-gray-900 text-lg">{company?.name}</h3>
              <p className="text-sm text-gray-600 flex items-center gap-1">
                <Building2 className="h-4 w-4" />
                {company?.location}
              </p>
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            {company?.description || "No company description available."}
          </p>
        </div>
      </div>
    </div>
  );
};

// Reusable Info Item
const InfoItem = ({ icon, label, children }) => (
  <div className="flex items-start gap-3 text-gray-700">
    <div className="mt-1">{icon}</div>
    <div>
      <p className="text-sm font-semibold text-gray-800">{label}</p>
      <p className="text-sm">{children}</p>
    </div>
  </div>
);

// Reusable Section
const Section = ({ title, children }) => (
  <div className="mb-6">
    <h2 className="text-lg font-semibold text-gray-900 mb-2">{title}</h2>
    {children}
  </div>
);

export default JobDetails;
