import axios from "axios";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import uuid from "react-native-uuid";
import { Job } from "../types/types";

interface JobContextType {
  jobs: Job[];
  savedJobs: Job[];
  fetchJobs: () => void;
  saveJob: (job: Job) => void;
  removeJob: (id: string) => void;
}

// Create context
const JobContext = createContext<JobContextType | undefined>(undefined);

export const JobProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [savedJobs, setSavedJobs] = useState<Job[]>([]);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await axios.get("https://empllo.com/api/v1");

      if (!response.data || !Array.isArray(response.data)) {
        throw new Error("Invalid API response format");
      }

      const jobsWithId: Job[] = response.data.map((job: any) => ({
        id: String(uuid.v4()),
        title: job.title || "Unknown Title",
        company: job.company || "Unknown Company",
        salary: job.salary ? String(job.salary) : "Not Provided",
        location: job.location || "Unknown Location",
        description: job.description || "No description available",
      }));

      setJobs(jobsWithId);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  const saveJob = (job: Job) => {
    if (!savedJobs.some((saved) => saved.id === job.id)) {
      setSavedJobs([...savedJobs, job]);
    }
  };

  const removeJob = (id: string) => {
    setSavedJobs(savedJobs.filter((job) => job.id !== id));
  };

  return (
    <JobContext.Provider
      value={{ jobs, savedJobs, fetchJobs, saveJob, removeJob }}
    >
      {children}
    </JobContext.Provider>
  );
};

export const useJobs = (): JobContextType => {
  const context = useContext(JobContext);
  if (!context) {
    throw new Error("useJobs must be used within a JobProvider");
  }
  return context;
};
