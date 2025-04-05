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
    <main className="min-h-0 flex-1 flex gap-x-4">
      <Panel asChild className="flex-1 w-full relative">
        <motion.main layout transition={{ type: "tween" }}>
          {children}
        </motion.main>
      </Panel>
      {appState.status === "screen" ? (
        <Panel asChild className="w-2xl">
          <motion.section
            initial={{ x: 500 }}
            animate={{ x: 0 }}
            transition={{ type: "tween" }}
          >
            {side}
          </motion.section>
        </Panel>
      ) : null}
    </main>
  );
}
