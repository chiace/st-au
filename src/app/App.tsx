import { useEffect, useState } from "react";
import { DesignSystemPage } from "./DesignSystemPage";
import { HomePage } from "./HomePage";
import { MembersPage } from "./MembersPage";
import { Footer, Header, OnboardingModal, getRouteFromHash } from "./site-shell";
import { type Route } from "./data";

export default function App() {
  const [route, setRoute] = useState<Route>(getRouteFromHash);
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
    const syncRoute = () => setRoute(getRouteFromHash());
    window.addEventListener("hashchange", syncRoute);
    syncRoute();

    return () => window.removeEventListener("hashchange", syncRoute);
  }, []);

  useEffect(() => {
    if (route === "home" && pendingSection) {
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
  }, [pendingSection, route]);

  const navigateHome = (sectionId?: string) => {
    if (route === "home" && sectionId) {
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

    window.location.hash = "#/";

    if (!sectionId) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const navigateMembers = () => {
    window.location.hash = "#/members";
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
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

      {route === "home" ? (
        <HomePage onOpenForm={() => setFormOpen(true)} onViewMembers={navigateMembers} />
      ) : route === "members" ? (
        <MembersPage onOpenForm={() => setFormOpen(true)} onGoHome={() => navigateHome()} />
      ) : (
        <DesignSystemPage
          onGoHome={() => navigateHome()}
          onGoMembers={navigateMembers}
          onOpenForm={() => setFormOpen(true)}
        />
      )}

      <Footer onNavigateHome={navigateHome} onNavigateMembers={navigateMembers} />
      <OnboardingModal open={formOpen} onClose={() => setFormOpen(false)} />
    </div>
  );
}
