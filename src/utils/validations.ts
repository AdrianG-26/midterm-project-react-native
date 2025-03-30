import { ApplicationForm, FormErrors } from "../types/types";

export const validateForm = (form: ApplicationForm): FormErrors => {
  const errors: FormErrors = {};

  // Name validation
  if (!form.name.trim()) {
    errors.name = "Name is required";
  } else if (form.name.trim().length < 2) {
    errors.name = "Name must be at least 2 characters";
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!form.email.trim()) {
    errors.email = "Email is required";
  } else if (!emailRegex.test(form.email)) {
    errors.email = "Please enter a valid email address";
  }

  // Contact number validation
  const phoneRegex = /^[0-9]{11}$/;
  if (!form.contactNumber.trim()) {
    errors.contactNumber = "Contact number is required";
  } else if (!phoneRegex.test(form.contactNumber)) {
    errors.contactNumber = "Please enter a valid 11-digit phone number";
  }

  // Why hire you validation
  if (!form.whyHireYou.trim()) {
    errors.whyHireYou = "Please tell us why we should hire you";
  } else if (form.whyHireYou.trim().length < 50) {
    errors.whyHireYou = "Please provide at least 50 characters";
  } else if (form.whyHireYou.trim().length > 500) {
    errors.whyHireYou = "Please keep your response under 500 characters";
  }

  return errors;
};
