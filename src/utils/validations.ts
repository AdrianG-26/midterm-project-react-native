import { ApplicationForm, FormErrors } from "../types/types";

export const validateForm = (form: ApplicationForm): FormErrors => {
  const errors: FormErrors = {};


  if (!form.name.trim()) {
    errors.name = "Name is required";
  } else if (form.name.trim().length < 2) {
    errors.name = "Name must be at least 2 characters";
  }


  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!form.email.trim()) {
    errors.email = "Email is required";
  } else if (!emailRegex.test(form.email)) {
    errors.email = "Please enter a valid email address";
  }


  const phoneRegex = /^09[0-9]{9}$/;
  if (!form.contactNumber.trim()) {
    errors.contactNumber = "Contact number is required";
  } else if (!phoneRegex.test(form.contactNumber)) {
    errors.contactNumber =
      "Please enter a valid number starting with 09 (e.g., 09XXXXXXXXX)";
  }


  if (!form.whyHireYou.trim()) {
    errors.whyHireYou = "Please tell us why we should hire you";
  } else if (form.whyHireYou.trim().length < 10) {
    errors.whyHireYou = "Please provide at least 10 characters";
  } else if (form.whyHireYou.trim().length > 500) {
    errors.whyHireYou = "Please keep your response under 500 characters";
  }

  return errors;
};
