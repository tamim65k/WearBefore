"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

interface SiteShellProps {
  children: ReactNode;
}

export default function SiteShell({ children }: SiteShellProps) {
  const pathname = usePathname();
  const isAiTrialPage = pathname === "/ai-trial";

  return (
    <>
      <Header />
      <main className={isAiTrialPage ? "h-[calc(100dvh-4rem)] overflow-hidden" : "min-h-screen"}>
        {children}
      </main>
      {!isAiTrialPage && <Footer />}
    </>
  );
}
