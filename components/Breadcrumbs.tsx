import Link from "next/link";
import Script from "next/script";
import { type BreadcrumbItem, buildBreadcrumbJsonLd } from "@/lib/seo";
import { PRIMARY_DOMAIN } from "@/lib/constants";

type Props = {
  items: BreadcrumbItem[];
  className?: string;
  withSchema?: boolean;
};

export function Breadcrumbs({ items, className, withSchema = true }: Props) {
  return (
    <>
      <nav
        aria-label="Breadcrumb"
        className={className ?? "mb-6 text-sm text-slate-500"}
      >
        <ol className="flex flex-wrap items-center gap-2">
          {items.map((item, index) => (
            <li key={item.label} className="flex items-center gap-2">
              {item.href ? (
                <Link
                  href={item.href}
                  className="rounded-full px-3 py-1 text-xs font-semibold text-slate-400 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="rounded-full bg-white/5 px-3 py-1 text-xs font-semibold text-white">
                  {item.label}
                </span>
              )}
              {index < items.length - 1 && (
                <span className="text-slate-600" aria-hidden="true">
                  /
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>
      {withSchema ? (
        <Script
          id={`breadcrumb-${items.map((item) => item.label).join("-")}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(buildBreadcrumbJsonLd(items, PRIMARY_DOMAIN)),
          }}
        />
      ) : null}
    </>
  );
}

