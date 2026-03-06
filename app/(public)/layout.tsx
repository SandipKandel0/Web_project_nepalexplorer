"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import Header from "./_components/Header";

export default function PublicLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  
  // Don't show Header for authenticated routes (user, guide, admin)
  const isAuthenticatedRoute = pathname?.startsWith("/user") || 
                                pathname?.startsWith("/guide") || 
                                pathname?.startsWith("/admin");

  return (
    <>
      {!isAuthenticatedRoute && <Header />}
      <main className={`min-h-screen bg-rose-100 ${!isAuthenticatedRoute ? 'p-6' : ''}`}>{children}</main>
    </>
  );
}
