// app/page.tsx
import Image from "next/image";
import PublicLayout from "./(public)/layout";

export default function HomePage() {
  return (
    <PublicLayout>
      <section className="mx-auto mt-4 max-w-6xl overflow-hidden rounded-3xl border border-sky-100 bg-linear-to-br from-red-50 via-yellow-50 to-white shadow-xl">
        <div className="grid gap-8 p-6 md:grid-cols-2 md:p-10">
          <div className="flex flex-col justify-center">
            <span className="mb-3 inline-flex w-fit rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold tracking-wide text-orange-800">
              Discover Nepal, One Journey at a Time
            </span>

            <h1 className="mb-4 text-4xl font-black leading-tight text-slate-900 md:text-5xl">
              Welcome to NepalExplorer
            </h1>

            <p className="mb-6 max-w-xl text-base leading-relaxed text-slate-700 md:text-lg">
              Explore the beauty of Nepal with trusted guides, curated destinations,
              and seamless trip planning. Mountains, culture, food, and adventure
              all in one place.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row">
              <button className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700">
                Explore Destinations
              </button>
              <button className="rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-800 transition hover:border-slate-500 hover:bg-slate-50">
                Book a Guide
              </button>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-orange-100 shadow-lg">
            <Image
              src="/image.jpeg"
              alt="Scenic view of Nepal"
              width={1200}
              height={800}
              className="h-full min-h-64 w-full object-cover"
              priority
            />
            <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/55 to-transparent p-4">
              <p className="text-sm font-medium text-white md:text-base">
                Start your next unforgettable journey in Nepal.
              </p>
            </div>
          </div>
        </div>
      </section>


    </PublicLayout>
  );
}
