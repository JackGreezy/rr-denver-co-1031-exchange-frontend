export type BreadcrumbItem = {
  label: string;
  href?: string;
};

export const buildBreadcrumbJsonLd = (items: BreadcrumbItem[], baseUrl: string) => {
  const list = items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.label,
    item: item.href ? `${baseUrl}${item.href}` : undefined,
  }));

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: list,
  };
};

