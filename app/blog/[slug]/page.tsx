import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Script from "next/script";
import imageUrlBuilder from "@sanity/image-url";
import { PortableText } from "@portabletext/react";
import BottomCTA from "@/components/BottomCTA";
import { Breadcrumbs } from "@/components/Breadcrumbs";

async function getPost(slug: string) {
  const query = `*[_type == "article" && slug.current == $slug && published == true][0] {
    _id,
    title,
    slug,
    publishedAt,
    content,
    featuredImage,
    excerpt,
    author->{name, image, bio}
  }`;
  
  try {
    const { createClient } = await import("@sanity/client");
    const client = createClient({
      projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
      useCdn: true,
      apiVersion: "2024-01-01",
    });
    return await client.fetch(query, { slug });
  } catch (error) {
    console.error("Error fetching post:", error);
    return null;
  }
}

export async function generateStaticParams() {
  const query = `*[_type == "article" && published == true] {
    "slug": slug.current
  }`;
  
  try {
    const { createClient } = await import("@sanity/client");
    const client = createClient({
      projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
      useCdn: true,
      apiVersion: "2024-01-01",
    });
    const posts = await client.fetch(query);
    return posts.map((post: { slug: string }) => ({
      slug: post.slug,
    }));
  } catch (error) {
    return [];
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getPost(params.slug);
  
  if (!post) {
    return {
      title: "Post Not Found | 1031 Exchange Denver",
    };
  }

  return {
    title: `${post.title} | 1031 Exchange Denver Blog`,
    description: post.excerpt || `Read about ${post.title} on the 1031 Exchange Denver blog`,
    alternates: {
      canonical: `https://www.1031exchangedenver.com/blog/${post.slug.current}`,
    },
  };
}

const portableTextComponents = {
  types: {
    image: ({ value }: any) => {
      if (!value?.asset) return null;
      const builder = imageUrlBuilder({
        projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
        dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
      });
      return (
        <img
          src={builder.image(value).width(800).url()}
          alt={value.alt || ""}
          className="my-8 rounded-lg"
        />
      );
    },
  },
};

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);

  if (!post) {
    notFound();
  }

  const builder = imageUrlBuilder({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt || "",
    image: post.featuredImage?.image
      ? builder.image(post.featuredImage.image).url()
      : undefined,
    datePublished: post.publishedAt,
    author: post.author
      ? {
          "@type": "Person",
          name: post.author.name,
        }
      : undefined,
  };

  return (
    <>
      <Script
        id="jsonld-blog-post"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="mx-auto max-w-3xl px-4 py-16 text-slate-100 sm:px-6 lg:px-0">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Blog", href: "/blog" },
            { label: post.title },
          ]}
        />
        {post.featuredImage?.image && (
          <div className="mb-8 aspect-video w-full overflow-hidden rounded-3xl">
            <img
              src={builder.image(post.featuredImage.image).width(1200).height(675).url()}
              alt={post.featuredImage.alt || post.title}
              className="h-full w-full object-cover"
            />
          </div>
        )}
        <header className="mb-8 space-y-2">
          <h1 className="text-4xl font-semibold text-white">{post.title}</h1>
          <div className="flex flex-wrap items-center gap-4 text-xs uppercase tracking-[0.3em] text-amber-200">
            {post.publishedAt ? (
              <time dateTime={post.publishedAt}>
                {new Date(post.publishedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            ) : null}
            {post.author?.name ? <span>{post.author.name}</span> : null}
          </div>
        </header>
        <div className="prose prose-invert prose-lg max-w-none text-slate-100">
          {post.content && (
            <PortableText value={post.content} components={portableTextComponents} />
          )}
        </div>
      </article>
      <BottomCTA />
    </>
  );
}

