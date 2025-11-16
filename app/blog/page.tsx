import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { BlogGrid } from "@/components/blog/BlogGrid";

export const metadata: Metadata = {
  title: "1031 Exchange Blog | 1031 Exchange Denver",
  description: "Educational articles and insights about 1031 exchanges in Colorado",
  alternates: {
    canonical: "https://www.1031exchangedenver.com/blog",
  },
};

async function getPosts() {
  const query = `*[_type == "article" && published == true] | order(publishedAt desc) {
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    featuredImage,
    author->{name, image}
  }`;
  
  try {
    const { createClient } = await import("@sanity/client");
    const client = createClient({
      projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
      useCdn: true,
      apiVersion: "2024-01-01",
    });
    return await client.fetch(query);
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8 text-slate-100">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Blog" },
        ]}
      />
      <div className="space-y-4">
        <h1 className="text-4xl font-semibold text-white">
          1031 exchange insights
        </h1>
        <p className="text-base text-slate-300">
          Educational updates about timelines, underwriting, and Denver market
          dynamics. Pagination shows six posts on desktop and three on mobile.
        </p>
      </div>
      <div className="mt-12">
        <BlogGrid posts={posts} />
      </div>
    </div>
  );
}

