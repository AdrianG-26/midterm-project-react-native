import { JobResponse } from "../types/types";

const API_URL = "https://empllo.com/api/v1";

export const fetchJobs = async (): Promise<JobResponse[]> => {
  try {
    const response = await fetch(`${API_URL}`);

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    console.log("Raw API response:", data); // Debugging line

    if (!Array.isArray(data)) {
      throw new Error("Unexpected API response format");
    }

    return data;
  } catch (error) {
    console.error("Error fetching jobs:", error);
    throw error;
  }
};
