"use client";

import React from "react";
import { motion } from "motion/react";

import { useAppState } from "@/lib/app-context";
import { Panel } from "@/components/panel";

type LayoutProps = {
  children: React.ReactNode;
  side: React.ReactNode;
};

export default function Layout(props: LayoutProps) {
  const { children, side } = props;

  const { state: appState } = useAppState();

  return (
    <main className="flex-1 flex gap-x-4">
      <Panel asChild className="flex-1 relative">
        <motion.main layout transition={{ type: "tween" }}>
          {children}
        </motion.main>
      </Panel>
      {appState.status === "screen" ? side : null}
    </main>
  );
}
