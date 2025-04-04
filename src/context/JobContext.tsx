import React, { createContext, useContext, useEffect, useState } from "react";
import uuid from "react-native-uuid";
import { fetchJobs } from "../api/jobsApi";
import { ApplicationForm, Job, JobResponse } from "../types/types";

interface JobContextProps {
  jobs: Job[];
  savedJobs: Job[];
  applications: ApplicationForm[];
  loading: boolean;
  error: string | null;
  searchJobs: (query: string) => void;
  saveJob: (job: Job) => void;
  removeJob: (id: string) => void;
  applyForJob: (application: ApplicationForm) => void;
  cancelApplication: (jobId: string) => void;
  isJobSaved: (id: string) => boolean;
  hasApplied: (id: string) => boolean;
  refreshJobs: () => void;
  filteredJobs: Job[];
}

const JobContext = createContext<JobContextProps | undefined>(undefined);

export const JobProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [savedJobs, setSavedJobs] = useState<Job[]>([]);
  const [applications, setApplications] = useState<ApplicationForm[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);

 
  useEffect(() => {
    refreshJobs();
  }, []);


  useEffect(() => {
    if (!jobs?.length) return; 

    const search = (searchQuery ?? "").trim().toLowerCase();

    const filtered = jobs.filter(
      (job) =>
        (job.title ?? "").toLowerCase().includes(search) ||
        (job.companyName ?? "").toLowerCase().includes(search) ||
        (job.locations["1"] ?? "").toLowerCase().includes(search)
     
    );

    setFilteredJobs(filtered);
  }, [jobs, searchQuery]);

  const refreshJobs = async () => {
    setLoading(true);
    setError(null);
    try {
      const jobsData = await fetchJobs();
 
      const jobsWithIds = jobsData.map((job: JobResponse) => ({
        ...job,
        id: uuid.v4() as string,
      }));
      setJobs(jobsWithIds);
      setFilteredJobs(jobsWithIds);
    } catch (err) {
      setError("Failed to fetch jobs. Please try again later.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const searchJobs = (query: string) => {
    setSearchQuery(query);
  };

  const saveJob = (job: Job) => {
 
    if (!isJobSaved(job.id)) {
      setSavedJobs([...savedJobs, job]);
    }
  };

  const removeJob = (id: string) => {
    setSavedJobs(savedJobs.filter((job) => job.id !== id));
  };

  const applyForJob = (application: ApplicationForm) => {
    setApplications([...applications, application]);
  };

  const cancelApplication = (jobId: string) => {
  
    setApplications(applications.filter((app) => app.jobId !== jobId));
  };

  const isJobSaved = (id: string) => {
    return savedJobs.some((job) => job.id === id);
  };

  const hasApplied = (id: string) => {
    return applications.some((app) => app.jobId === id);
  };

  return (
    <JobContext.Provider
      value={{
        jobs,
        savedJobs,
        applications,
        loading,
        error,
        searchJobs,
        saveJob,
        removeJob,
        applyForJob,
        cancelApplication,
        isJobSaved,
        hasApplied,
        refreshJobs,
        filteredJobs,
      }}
    >
      {children}
    </JobContext.Provider>
  );
};

export const useJobs = () => {
  const context = useContext(JobContext);
  if (context === undefined) {
    throw new Error("useJobs must be used within a JobProvider");
  }
  return context;
};
