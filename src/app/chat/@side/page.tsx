"use client";

import { screens, EmptyScreen } from "@/screens";

function getCurrentScreen() {
  return (
    screens.find((screen) => (screen.id = "candidates-new"))?.screen ??
    EmptyScreen
  );
}

export default function Page() {
  const Comp = getCurrentScreen();

  return <Comp />;
}
