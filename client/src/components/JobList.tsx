import React, { useState } from 'react';
import type { JobDetails } from "../types/interface/jobSearch";
import JobDescription from './JobDescription'; // Import the new component
import styles from './JobList.module.css';

interface JobListProps {
  jobs: JobDetails[];
  onSave: (job: JobDetails) => void;
  onRemoveJob: (job_id: string) => void; 
  onMarkAsApplied: (job_id: string) => void;
  isLoggedIn: boolean;
}

const JobList: React.FC<JobListProps> = ({ jobs, onSave, onRemoveJob, onMarkAsApplied, isLoggedIn }) => {
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);

  const toggleJobDescription = (job_id: string) => {
    setSelectedJobId(prevJobId => prevJobId === job_id ? null : job_id);
  };

  if (!jobs || jobs.length === 0) {
    return <p>You have not saved any job yet.</p>;
  }

  return (
    <div className={styles['job-list']}>
      <ul>
        {jobs.map((jobDetails) => (
          <li className={styles['job-card']} key={jobDetails.job_id}>
            <h2 className={styles['job-title']}>{jobDetails.job_title} at {jobDetails.employer_name}</h2>
            <p className={styles['job-info']}>
              {jobDetails.job_location} - {jobDetails.job_employment_type} - {jobDetails.job_is_remote ? 'Remote' : 'On-site'} - 
              {jobDetails.job_posted_at}</p>
            <button className={styles.button} onClick={() => toggleJobDescription(jobDetails.job_id)}>
              {selectedJobId === jobDetails.job_id ? 'Hide Description' : 'View Job'}
            </button>
            {selectedJobId === jobDetails.job_id && (
              <>
                <JobDescription text={jobDetails.job_description} />
                <a href={jobDetails.job_apply_link} target="_blank" rel="noopener noreferrer" className={styles['job-link']}>
                  Job Details
                </a>
              </>
            )}
            {isLoggedIn && (
              <>
                <button className={styles.button} onClick={() => onSave(jobDetails)}>Save Job</button>
                <button className={styles.button} onClick={() => onMarkAsApplied(jobDetails.job_id)}>Mark as Applied</button>
                <button className={styles.button} onClick={() => onRemoveJob(jobDetails.job_id)}>Remove</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JobList;
