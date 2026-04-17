"use client";

import { createContext, useContext, type ReactNode } from "react";

export type SiteUIActions = {
  openForm: () => void;
  navigateHome: (sectionId?: string) => void;
  navigateMembers: () => void;
};

const SiteUIContext = createContext<SiteUIActions | null>(null);

export function SiteUIProvider({ value, children }: { value: SiteUIActions; children: ReactNode }) {
  return <SiteUIContext.Provider value={value}>{children}</SiteUIContext.Provider>;
}

export function useSiteUI() {
  const ctx = useContext(SiteUIContext);
  if (!ctx) {
    throw new Error("useSiteUI must be used within SiteUIProvider");
  }
  return ctx;
}
