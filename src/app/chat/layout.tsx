"use client";

import React from "react";

import { useAppState } from "@/lib/app-context";

type LayoutProps = {
  children: React.ReactNode;
  side: React.ReactNode;
};

export default function Layout(props: LayoutProps) {
  const { children, side } = props;

  const { state: appState } = useAppState();

  return (
    <main className="flex-1 flex gap-x-4">
      {children}
      {appState.status === "screen" ? side : null}
    </main>
  );
}
