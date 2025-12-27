// app/page.tsx
import PublicLayout from "./(public)/layout";

export default function HomePage() {
  return (
    <PublicLayout>
      <div className="max-w-4xl mx-auto mt-8">
        <h1 className="text-3xl font-bold mb-4 text-black">
          Welcome to NepalExplorer
        </h1>
        <p className="text-black">
          Explore the beauty of Nepal with our travel guides and tips. Discover
          mountains, culture, food, and more!
        </p>
      </div>
    </PublicLayout>
  );
}
