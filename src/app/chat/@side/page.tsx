"use client";

import React from "react";
import { useAppState } from "@/lib/app-context";
import { screens } from "@/screens";

export default function Page() {
  const { state } = useAppState();

  const screenToDisplay = React.useMemo(() => {
    if (state.status !== "screen") {
      return null;
    }

    return screens.find((screen) => screen.id === state.screenId) ?? null;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.status]);

  if (!screenToDisplay) {
    return <></>;
  }
  if (state.status !== "screen") {
    return <></>;
  }

  return <>{screenToDisplay.render(state.props)}</>;
}
