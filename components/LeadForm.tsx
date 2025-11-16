"use client";

import { ContactForm } from "@/app/contact/contact-form";

export const LeadForm: React.FC<{ prepopulatedService?: string }> = ({ prepopulatedService }) => {
  return <ContactForm prepopulatedProjectType={prepopulatedService} />;
};
