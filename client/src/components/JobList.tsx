import React from 'react';
import { Job } from '../types/types';

//Defining Props for the Component
  // jobs: Job[] → The list of jobs passed as a prop to be displayed.
  // onSave: (job: Job) => void → A function prop that handles job-saving actions.
interface JobListProps {
  jobs: Job[];
  onSave: (job: Job) => void;
}

//Functional Component Definition
  // JobList is a functional component that accepts jobs and onSave as props.
  // Uses TypeScript’s React Functional Component (React.FC) for type safety.
  //rendering the list of jobs
  const JobList: React.FC<JobListProps> = ({ jobs, onSave }) => {
    console.log("Rendering jobs in JobList.tsx:", jobs); // ✅ Debugging Log
    if (!jobs || jobs.length === 0) {
      return <p>No jobs found.</p>; // ✅ Display message if jobs is empty
    }
    return (
      <ul>
        {jobs.map(job => (
          <li key={job.id}>
            <h2>{job.title} at {job.company}</h2>
            <p>{job.description}</p>
            <a href={job.url} target="_blank" rel="noopener noreferrer">View Job</a>
            <button onClick={() => onSave(job)}>Save Job</button>
          </li>
        ))}
      </ul>
    );
  };


//Key Points:
  //Keeping this file since we don't want the HomePage to be also responsible for rendering the job list.
  //This file separates concerns (as Jason has advised). HomePage.tsx fetches data, while this displays it
  //This makes the code more modular and easier to maintain.
  //If we need to show the job list on another page, we won't have to rewrite the logic

  //We can also re-use it instead of duplicating job list rendering logic
