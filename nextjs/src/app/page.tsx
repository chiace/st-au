"use client";

import { useSiteUI } from "@/components/site-ui-context";
import { HomePage } from "@/site/HomePage";

export default function Home() {
  const { openForm, navigateMembers } = useSiteUI();
  return <HomePage onOpenForm={openForm} onViewMembers={navigateMembers} />;
}
