"use client";

import React from "react";
import { motion } from "motion/react";

import { Panel } from "@/components/panel";
import { useAppState } from "@/lib/app-context";
import { screens } from "@/screens";

export default function Page() {
  const { state } = useAppState();

  const screenToDisplay = React.useMemo(() => {
    if (state.status !== "screen") {
      return null;
    }

    return screens.find((screen) => screen.id === state.screenId) ?? null;
  }, [state]);

  if (!screenToDisplay) {
    return <></>;
  }
  if (state.status !== "screen") {
    return <></>;
  }

  return (
    <Panel asChild className="min-w-xl">
      <motion.section
        initial={{ x: 500 }}
        animate={{ x: 0 }}
        transition={{ type: "tween" }}
      >
        {screenToDisplay.render(state.props)}
      </motion.section>
    </Panel>
  );
}
