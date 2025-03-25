import { JobResponse } from "../types/types";

const API_URL = "https://empllo.com/api/v1";

export const fetchJobs = async (): Promise<JobResponse[]> => {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data.jobs.map((job: JobResponse) => ({
      ...job,
      picture: job.companyLogo,
    }));
  } catch (error) {
    console.error("Error fetching jobs:", error);
    throw error;
  }
};
