import React, { useState, useEffect } from 'react';
import SearchForm from '../components/SearchForm';
import JobList from '../components/JobList';
import Spinner from '../components/Spinner';
import logo from '../assets/CareerGist.png';
import type { JobDetails, JobSearchResponse } from "../types/interface/jobSearch";
import { SavedJobs, MarkAsApplied, deleteJob } from '../api/jobsAPI';
import '../App.css';
import './HomePage.css';

const HomePage: React.FC = () => {
  const [jobs, setJobs] = useState<JobDetails[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false); // ✅ Track login state

  useEffect(() => {
    // Check if the user is logged in when the component mounts
    const checkAuth = () => {
      const token = localStorage.getItem("authToken");
      if (token) {
        setIsLoggedIn(true);
      }
    };
    checkAuth();
  }, []);

  const handleSearch = async (query: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/jsearch/query?query=${encodeURIComponent(query)}`, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error(`HTTP Error ${response.status}: ${response.statusText}`);
      }

      const data: JobSearchResponse = await response.json();
      console.log("API Response:", data);

  if (Array.isArray(data.data)) {
    // Transform the data to match the JobDetails type
    const transformedJobs: JobDetails[] = data.data.map((jobDetails: JobDetails) => ({
      job_id: jobDetails.job_id,
      job_title: jobDetails.job_title,
      employer_name: jobDetails.employer_name,
      job_publisher: jobDetails.job_publisher,
      job_location: jobDetails.job_location,
      job_description: jobDetails.job_description,
      job_employment_type: jobDetails.job_employment_type,
      job_apply_link: jobDetails.job_apply_link,
      job_highlights: jobDetails.job_highlights,
      job_is_remote: jobDetails.job_is_remote,
      job_posted_at: jobDetails.job_posted_at,
      job_city: jobDetails?.job_city,
      job_state: jobDetails?.job_state,
      job_country: jobDetails?.job_country,
    }));
    console.log("Transformed Jobs:", transformedJobs);

    setJobs(transformedJobs); // strictly following API response structure
  } else {
    throw new Error("Unexpected response format");
  }
} catch (error) {
  console.error("Failed to load jobs:", error);
  setError("Unable to fetch jobs. Please try again later.");
}
setLoading(false);
};

  // ✅ Save job using `SavedJobs()`
  const handleSaveJob = async (job: JobDetails) => {
    if (!isLoggedIn) return alert('Please log in to save jobs.');

    try {
        await SavedJobs(job); // ✅ Now using the reusable function
        alert(`Job saved: ${job.job_title} at ${job.employer_name}`);
    } catch (error) {
        console.error('Error saving job:', error);
        alert('Error saving job. Try again later.');
    }
};


  // ✅ Mark job as applied using `MarkAsApplied()`
  const handleMarkAsApplied = async (job_id: string) => {
    try {
      console.log("Marking job as applied:", job_id);
      await MarkAsApplied(job_id); // ✅ Passes only `job_id` as expected
      alert(`Marked job ${job_id} as applied!`);
    } catch (error) {
      console.error('Error marking job as applied:', error);
      alert('Error marking job as applied. Try again later.');
    }
  };


  // ✅ Remove job using `deleteJob()`
  const handleRemoveJob = async (job_id: string) => {
    try {
      console.log("Removing job:", job_id);
      await deleteJob(job_id); // ✅ Calls function from jobsAPI.tsx
      alert(`Removed job ${job_id} from saved jobs.`);
    } catch (error) {
      console.error('Error removing job:', error);
      alert('Error removing job. Try again later.');
    }
  };

  return (
    <div className="header-container">
      <img className="logo" src={logo} alt="CareerGist Logo" />
      <h1 className="homepage-h1">Welcome to CareerGist</h1>
      <h2 className="homepage-h2">Because Searching for Jobs Should be Easy.</h2>

      <SearchForm onSearch={handleSearch} loading={loading} />

      {loading && <Spinner />}
      {error && <p className="error">{error}</p>}

      {jobs?.length > 0 ? (
        <JobList
          jobs={jobs}
          onSave={handleSaveJob}
          onMarkAsApplied={handleMarkAsApplied}
          onRemoveJob={handleRemoveJob}
          isLoggedIn={isLoggedIn} // ✅ Pass login state to JobList
        />
      ) : (
        !loading && <p>No results found.</p>
      )}
    </div>
  );
};

export default HomePage;