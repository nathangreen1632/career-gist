import { JobDetails } from '../types/interface/jobSearch.js';
import { ApiMessage } from '../types/interface/jobSearch.js';
import Auth from '../utils/auth';

const retrieveJobs = async (): Promise<JobDetails[]> => {
    try {
      const response = await fetch('/api/jobs', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Auth.getToken()}`
        },
      });
  
    const data = await response.json();

    if (!response.ok) {
      throw new Error('Invalid API response, check network tab!');
    }

    return data;
  } catch (err) {
    console.log('Error fetching jobs: ', err);
    return [];
  }
};

const retrieveJobById = async (job_id: string): Promise<JobDetails> => {
    try {
      const response = await fetch(`/api/jobs/${job_id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Auth.getToken()}`
        },
      });
  
      const data = await response.json();
      if (!response.ok) {
        throw new Error('Failed to fetch job details!');
      }
  
      return data;
    } catch (err) {
      console.error('Error fetching job by ID:', err);
      return Promise.reject('Could not fetch job');
    }
  };

  const SavedJobs = async (job: JobDetails): Promise<JobDetails> => {
    try {
      const response = await fetch('/api/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Auth.getToken()}`
        },
        body: JSON.stringify(job)
      });
  
      const data = await response.json();
      if (!response.ok) {
        throw new Error('Failed to save job!');
      }
  
      return data;
    } catch (err) {
      console.error('Error saving job:', err);
      return Promise.reject('Could not save job');
    }
  };

  const MarkAsApplied = async (job_id: string): Promise<void> => {
    try {
      const response = await fetch(`/api/jobs/applied/${job_id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Auth.getToken()}`
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to mark job as applied!');
      }
  
      return;
    } catch (err) {
      console.error('Error marking job as applied:', err);
      return Promise.reject('Could not mark job as applied');
    }
  };
  

  
const retrieveSavedJobs = async (): Promise<JobDetails[]> => {
  try {
    const response = await fetch(
      '/api/jobs/saved', 
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Auth.getToken()}`
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error('Invalid API response, check network tab!');
    }

    return data;
  } catch (err) {
    console.log('Error retrieving saved jobs: ', err);
    return [];
  }
};

const deleteJob = async (job_id: string): Promise<ApiMessage> => {
  try {
    const response = await fetch(
      `/api/jobs/${job_id}`, 
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Auth.getToken()}`
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error('Invalid API response, check network tab!');
    }

    return data;
  } catch (err) {
    console.error('Error deleting saved job: ', err);
    return Promise.reject('Could not delete job');
  }
};

export { retrieveJobs, retrieveJobById, SavedJobs, MarkAsApplied, retrieveSavedJobs, deleteJob };