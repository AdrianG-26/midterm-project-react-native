export interface Job {
  id: string;
  title: string;
  companyName: string;
  companyLogo: string; 
  jobType: string;
  workModel: string;
  seniorityLevel: string;
  minSalary: string;
  maxSalary: string;
  locations: string;
}

export interface JobResponse {
  id: string;
  title: string;
  companyName: string;
  companyLogo: string; 
  jobType: string;
  workModel: string;
  seniorityLevel: string;
  minSalary: string;
  maxSalary: string;
  locations: string;
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
