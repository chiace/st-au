"use client";

import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import { Footer, Header, OnboardingModal } from "@/site/site-shell";
import { type Route } from "@/site/data";
import { SiteUIProvider } from "@/components/site-ui-context";

function pathnameToRoute(pathname: string | null): Route {
  if (pathname?.startsWith("/members")) {
    return "members";
  }
  if (pathname?.startsWith("/design-system")) {
    return "design-system";
  }
  return "home";
}

export function SiteChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const route = useMemo(() => pathnameToRoute(pathname), [pathname]);

  const [pendingSection, setPendingSection] = useState<string | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [cursorDown, setCursorDown] = useState(false);

  useEffect(() => {
    const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
    if (reduceMotion) {
      return;
    }

    let raf = 0;
    const handleMove = (event: MouseEvent) => {
      const x = (event.clientX / window.innerWidth) * 100;
      const y = (event.clientY / window.innerHeight) * 100;

      if (raf) {
        window.cancelAnimationFrame(raf);
      }

      raf = window.requestAnimationFrame(() => {
        document.documentElement.style.setProperty("--cursor-x", `${x.toFixed(2)}%`);
        document.documentElement.style.setProperty("--cursor-y", `${y.toFixed(2)}%`);
        document.documentElement.style.setProperty("--cursor-x-px", `${event.clientX}px`);
        document.documentElement.style.setProperty("--cursor-y-px", `${event.clientY}px`);
      });
    };

    const handleDown = () => setCursorDown(true);
    const handleUp = () => setCursorDown(false);

    window.addEventListener("mousemove", handleMove, { passive: true });
    window.addEventListener("mousedown", handleDown, { passive: true });
    window.addEventListener("mouseup", handleUp, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mousedown", handleDown);
      window.removeEventListener("mouseup", handleUp);
      if (raf) {
        window.cancelAnimationFrame(raf);
      }
    };
  }, []);

  useEffect(() => {
    if (pathname === "/" && pendingSection) {
      const timer = window.setTimeout(() => {
        document.getElementById(pendingSection)?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
        setPendingSection(null);
      }, 100);

      return () => window.clearTimeout(timer);
    }

    return undefined;
  }, [pendingSection, pathname]);

  const navigateHome = useCallback(
    (sectionId?: string) => {
      if (pathname === "/" && sectionId) {
        document.getElementById(sectionId)?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
        return;
      }

      if (sectionId) {
        setPendingSection(sectionId);
      } else {
        setPendingSection(null);
      }

      if (pathname !== "/") {
        router.push("/");
      }

      if (!sectionId) {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    },
    [pathname, router],
  );

  const navigateMembers = useCallback(() => {
    router.push("/members");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [router]);

  const siteUi = useMemo(
    () => ({
      openForm: () => setFormOpen(true),
      navigateHome,
      navigateMembers,
    }),
    [navigateHome, navigateMembers],
  );

  return (
    <SiteUIProvider value={siteUi}>
      <div className="site-shell dark-theme min-h-screen text-white antialiased cursor-hide">
        <div className="cursor-aura" />
        <div className="cursor-square" data-down={cursorDown ? "1" : "0"} aria-hidden="true" />
        <div className="absolute inset-x-0 top-0 -z-10 h-[620px] bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_36%),radial-gradient(circle_at_top_left,rgba(0,131,62,0.16),transparent_24%),radial-gradient(circle_at_top_right,rgba(254,206,0,0.1),transparent_20%)]" />

        <Header
          route={route}
          onNavigateHome={navigateHome}
          onNavigateMembers={navigateMembers}
          onOpenForm={() => setFormOpen(true)}
        />

        {children}

        <Footer onNavigateHome={navigateHome} onNavigateMembers={navigateMembers} />
        <OnboardingModal open={formOpen} onClose={() => setFormOpen(false)} />
      </div>
    </SiteUIProvider>
  );
}
