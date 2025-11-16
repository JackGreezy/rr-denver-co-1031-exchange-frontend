import type { MetadataRoute } from "next";
import { locationsData } from "@/data/locations";
import { servicesData } from "@/data/services";
import { propertyTypesData } from "@/data/property-types";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://www.1031exchangedenver.com";

  const now = new Date();
  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/locations`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/property-types`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/tools`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  const serviceRoutes: MetadataRoute.Sitemap = servicesData.map((service) => ({
    url: `${baseUrl}/services/${service.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const locationRoutes: MetadataRoute.Sitemap = locationsData.map((location) => ({
    url: `${baseUrl}/locations/${location.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const propertyTypeRoutes: MetadataRoute.Sitemap = propertyTypesData.map((propertyType) => ({
    url: `${baseUrl}/property-types/${propertyType.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const toolPages = [
    "boot-calculator",
    "exchange-cost-estimator",
    "identification-rules-checker",
    "depreciation-recapture-estimator",
    "replacement-property-value-calculator",
    "debt-relief-calculator",
  ];

  const toolRoutes: MetadataRoute.Sitemap = toolPages.map((slug) => ({
    url: `${baseUrl}/tools/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  let blogRoutes: MetadataRoute.Sitemap = [];
  try {
    const { createClient } = await import("@sanity/client");
    const client = createClient({
      projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
      useCdn: true,
      apiVersion: "2024-01-01",
    });
    const posts: Array<{ slug: string; _updatedAt?: string }> =
      await client.fetch(`*[_type == "article" && published == true] {
        "slug": slug.current,
        _updatedAt
      }`);
    blogRoutes = posts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: post._updatedAt ? new Date(post._updatedAt) : now,
      changeFrequency: "weekly",
      priority: 0.6,
    }));
  } catch (error) {
    console.error("Unable to include blog posts in sitemap", error);
  }

  return [
    ...routes,
    ...serviceRoutes,
    ...locationRoutes,
    ...propertyTypeRoutes,
    ...toolRoutes,
    ...blogRoutes,
  ];
}


