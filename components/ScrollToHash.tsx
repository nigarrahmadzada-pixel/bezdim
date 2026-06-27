"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { scrollToSection } from "@/lib/scroll";

export default function ScrollToHash() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== "/") return;

    const hash = window.location.hash.slice(1);
    if (!hash) return;

    const run = () => scrollToSection(hash, "smooth");

    requestAnimationFrame(() => {
      requestAnimationFrame(run);
    });
  }, [pathname]);

  return null;
}
