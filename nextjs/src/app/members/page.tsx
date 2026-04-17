"use client";

import { useSiteUI } from "@/components/site-ui-context";
import { MembersPage } from "@/site/MembersPage";

export default function Members() {
  const { openForm, navigateHome } = useSiteUI();
  return <MembersPage onOpenForm={openForm} onGoHome={() => navigateHome()} />;
}
