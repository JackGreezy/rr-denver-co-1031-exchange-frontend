import type { Metadata } from "next";
import Link from "next/link";
import imageUrlBuilder from "@sanity/image-url";

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
    <div className="mx-auto max-w-7xl px-6 py-12 md:px-8 md:py-20">
      <h1 className="font-serif text-3xl font-bold text-[#0B3C5D] md:text-4xl mb-4">
        1031 Exchange Blog
      </h1>
      <p className="text-lg text-gray-700 mb-12 max-w-3xl">
        Educational articles and insights about 1031 exchanges, tax strategies, and real estate investment in Colorado.
      </p>

      {posts.length === 0 ? (
        <div className="rounded-lg border border-gray-200 bg-[#F8FAFB] p-12 text-center">
          <p className="text-gray-700">No blog posts available at this time.</p>
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post: any) => (
            <Link
              key={post._id}
              href={`/blog/${post.slug.current}`}
              className="group rounded-lg border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              {post.featuredImage?.image && (
                <div className="aspect-video w-full overflow-hidden rounded-t-lg">
                  <img
                    src={imageUrlBuilder({
                      projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
                      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
                    })
                      .image(post.featuredImage.image)
                      .width(600)
                      .height(400)
                      .url()}
                    alt={post.featuredImage.alt || post.title}
                    className="h-full w-full object-cover transition group-hover:scale-105"
                  />
                </div>
              )}
              <div className="p-6">
                <h2 className="font-serif text-xl font-bold text-[#0B3C5D] mb-2 group-hover:text-[#16324F]">
                  {post.title}
                </h2>
                {post.excerpt && (
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>
                )}
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  {post.publishedAt && (
                    <time dateTime={post.publishedAt}>
                      {new Date(post.publishedAt).toLocaleDateString()}
                    </time>
                  )}
                  {post.author?.name && (
                    <span>By {post.author.name}</span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

