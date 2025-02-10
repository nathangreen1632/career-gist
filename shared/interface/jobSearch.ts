export interface JobSearchResponse {
  success: boolean;
  data: JobSearchData;
}

export interface JobSearchData {
  status: string;
  request_id: string;
  parameters?: JobSearchParameters;
  data: JobDetails[];
}

export interface JobSearchParameters {
  query?: string;
  page?: number;
  num_pages?: number;
}

export interface JobDetails {
  job_id: string;
  job_title: string;
  employer_name: string;
  job_publisher: string;
  job_employment_type: string;
  job_apply_link: string;
  job_description: string;
  job_is_remote: boolean;
  job_posted_at: string;
  job_location: string;
  job_city?: string;
  job_state?: string;
  job_country?: string;
  job_highlights?: JobHighlights;
}

export interface JobHighlights {
  Qualifications?: string[];
  Benefits?: string[];
  Responsibilities?: string[];
}
