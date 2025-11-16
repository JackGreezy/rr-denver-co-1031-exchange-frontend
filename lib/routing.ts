import { CONTACT_ROUTE } from "./constants";

export const buildContactHref = (projectType?: string) => {
  if (!projectType) {
    return CONTACT_ROUTE;
  }

  const params = new URLSearchParams({
    projectType,
  });

  return `${CONTACT_ROUTE}?${params.toString()}`;
};

