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
    <div className="site-shell dark-theme min-h-screen text-white antialiased">
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
