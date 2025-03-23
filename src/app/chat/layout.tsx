"use client";

import React from "react";

type LayoutProps = {
  children: React.ReactNode;
  side: React.ReactNode;
};

export default function Layout(props: LayoutProps) {
  const { children, side } = props;

  // const [sidebarIsOpen, setSidebarIsOpen] = React.useState<boolean>(true);

  return (
    <main className="flex-1 flex gap-x-4">
      {children}
      {side}
    </main>
  );
}
