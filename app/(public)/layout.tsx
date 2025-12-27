
import { ReactNode } from "react";
import Header from "./_components/Header";

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 p-6">{children}</main>
    </>
  );
}
