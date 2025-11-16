import Link from "next/link";

const PHONE_DISPLAY = "(720) 738-1031";
const PHONE_TEL = "+17207381031";

export default function BottomCTA() {
  return (
    <section className="mt-16 border-t border-gray-200 bg-[#F8FAFB]">
      <div className="mx-auto max-w-7xl px-6 py-12 md:px-8 md:py-16">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div>
            <h2 className="font-serif text-2xl font-bold text-[#0B3C5D] md:text-3xl mb-2">
              Ready to Start Your 1031 Exchange?
            </h2>
            <p className="text-gray-700">
              Contact our Denver-based team for expert guidance on your Colorado 1031 exchange.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href={`tel:${PHONE_TEL}`}
              className="inline-flex items-center justify-center rounded-full bg-[#DAA520] px-6 py-3 text-sm font-semibold tracking-[0.18em] text-gray-900 transition hover:bg-[#c4911b]"
            >
              CALL {PHONE_DISPLAY}
            </Link>
            <Link
              href="#lead-form"
              className="inline-flex items-center justify-center rounded-full border border-[#16324F] px-6 py-3 text-sm font-semibold text-[#16324F] transition hover:bg-[#16324F] hover:text-white"
            >
              REQUEST CONSULTATION
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}