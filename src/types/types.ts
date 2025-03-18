export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  description: string;
  requirements: string[];
  postedDate: string;
}

export interface JobResponse {
  title: string;
  company: string;
  location: string;
  salary: string;
  description: string;
  requirements: string[];
  postedDate: string;
}

export interface ApplicationForm {
  name: string;
  email: string;
  contactNumber: string;
  whyHireYou: string;
  jobId: string;
}

export interface FormErrors {
  name?: string;
  email?: string;
  contactNumber?: string;
  whyHireYou?: string;
}

export type ThemeType = "light" | "dark";
