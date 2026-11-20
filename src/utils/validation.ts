import type { CustomerDetails } from '../types';

export interface ValidationErrors {
  [key: string]: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[+]?[\d\s\-().]{7,20}$/;

export function validateEmail(email: string): string | null {
  if (!email.trim()) return 'Email address is required.';
  if (!EMAIL_REGEX.test(email.trim())) return 'Please enter a valid email address.';
  return null;
}

export function validatePhone(phone: string): string | null {
  if (!phone.trim()) return 'Phone number is required.';
  if (!PHONE_REGEX.test(phone.trim())) return 'Please enter a valid phone number.';
  return null;
}

export function validateCheckoutForm(details: CustomerDetails): ValidationErrors {
  const errors: ValidationErrors = {};

  if (!details.fullName.trim() || details.fullName.trim().length < 2) {
    errors.fullName = 'Full name must be at least 2 characters.';
  }

  const emailErr = validateEmail(details.email);
  if (emailErr) errors.email = emailErr;

  const phoneErr = validatePhone(details.phone);
  if (phoneErr) errors.phone = phoneErr;

  if (!details.address.trim() || details.address.trim().length < 5) {
    errors.address = 'Please enter a complete delivery street address.';
  }

  if (!details.city.trim()) {
    errors.city = 'City is required.';
  }

  if (!details.state.trim()) {
    errors.state = 'State or region is required.';
  }

  if (!details.postalCode.trim() || details.postalCode.trim().length < 3) {
    errors.postalCode = 'Valid postal code is required.';
  }

  return errors;
}

export interface ContactSubmission {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  company?: string;
}

export function validateContactForm(data: ContactSubmission, requireCompany = false): ValidationErrors {
  const errors: ValidationErrors = {};

  if (!data.name.trim() || data.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters.';
  }

  const emailErr = validateEmail(data.email);
  if (emailErr) errors.email = emailErr;

  const phoneErr = validatePhone(data.phone);
  if (phoneErr) errors.phone = phoneErr;

  if (requireCompany && (!data.company || !data.company.trim())) {
    errors.company = 'Organization or company name is required.';
  }

  if (!data.subject.trim() || data.subject.trim().length < 3) {
    errors.subject = 'Subject must be at least 3 characters.';
  }

  if (!data.message.trim() || data.message.trim().length < 15) {
    errors.message = 'Please provide at least 15 characters in your message.';
  }

  return errors;
}
