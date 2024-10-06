import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const prompts = [
  "Clinic questionnaire for customers to understand their opinion about us and our services",
  "Generate a questionnaire for the restaurant to know the opinion of customers about our restaurant service, cleanliness and so on",
  "Create a customer feedback form for my business, including sections for customer name, rating, comments, and suggestions for improvement.",
  "Design a job application form with fields for applicant's name, contact information, work experience, education.",
  "Generate a vendor onboarding form with fields for vendor name, contact person, business registration details, product offerings, and terms of service.",
  "Create a service request form for my business with fields for client name, service type, description of the issue, preferred service date, and contact information.",
  "Generate a partnership agreement form that includes partner names, business details, terms of the partnership, and signature fields.",
];

export const parseJson = (json: string | null | undefined) => {
  try {
    const formData = JSON.parse(json || "[]");

    return formData;
  } catch (error) {
    return null;
  }
};
