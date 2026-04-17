"use client";

import { useSiteUI } from "@/components/site-ui-context";
import { DesignSystemPage } from "@/site/DesignSystemPage";

export default function DesignSystem() {
  const { openForm, navigateHome, navigateMembers } = useSiteUI();
  return (
    <DesignSystemPage onOpenForm={openForm} onGoHome={() => navigateHome()} onGoMembers={navigateMembers} />
  );
}
