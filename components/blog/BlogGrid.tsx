"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

type BlogCard = {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt?: string;
  publishedAt?: string;
  featuredImage?: { image?: any; alt?: string };
};

type BlogGridProps = {
  posts: BlogCard[];
};

export function BlogGrid({ posts }: BlogGridProps) {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(6);

  useEffect(() => {
    const handler = () => {
      setPageSize(window.matchMedia("(min-width: 768px)").matches ? 6 : 3);
    };
    handler();
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  const totalPages = Math.max(1, Math.ceil(posts.length / pageSize));
  const clampedPage = Math.min(page, totalPages - 1);

  const visible = useMemo(() => {
    const start = clampedPage * pageSize;
    return posts.slice(start, start + pageSize);
  }, [clampedPage, pageSize, posts]);

  if (!posts.length) {
    return (
      <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-slate-200">
        No published posts yet. Check back soon.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {visible.map((post) => (
          <Link
            key={post._id}
            href={`/blog/${post.slug.current}`}
            className="group flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/5 transition hover:-translate-y-1 hover:border-amber-200/40"
          >
            <div className="flex flex-col p-6 gap-3">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-200">
                {post.publishedAt
                  ? new Date(post.publishedAt).toLocaleDateString()
                  : "Draft"}
              </p>
              <h3 className="text-lg font-semibold text-white">
                {post.title}
              </h3>
              {post.excerpt ? (
                <p className="text-sm text-slate-300">{post.excerpt}</p>
              ) : null}
              <span className="mt-auto text-xs font-semibold uppercase tracking-[0.28em] text-amber-300">
                Read post
              </span>
            </div>
          </Link>
        ))}
      </div>
      {totalPages > 1 ? (
        <div className="flex items-center justify-between text-sm text-slate-200">
          <button
            type="button"
            disabled={clampedPage === 0}
            onClick={() => setPage((current) => Math.max(0, current - 1))}
            className="rounded-full border border-white/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] disabled:opacity-40"
          >
            Prev
          </button>
          <p>
            Page {clampedPage + 1} of {totalPages}
          </p>
          <button
            type="button"
            disabled={clampedPage >= totalPages - 1}
            onClick={() =>
              setPage((current) => Math.min(totalPages - 1, current + 1))
            }
            className="rounded-full border border-white/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] disabled:opacity-40"
          >
            Next
          </button>
        </div>
      ) : null}
    </div>
  );
}

