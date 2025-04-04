"use client";

import {
  LuPanelLeft,
  LuArrowRightLeft,
  LuArrowRightFromLine,
} from "react-icons/lu";

import { useAppState } from "@/lib/app-context";
import { IconButton } from "@/components/icon-button";

function TopNavbar() {
  const { dispatch } = useAppState();

  const handleSideCollapse = () => {
    dispatch({ type: "close" });
  };

  return (
    <nav className="flex justify-between items-center">
      <IconButton
        className="bg-fuchsia-200 hover:bg-fuchsia-100 text-fuchsia-900"
        icon={<LuPanelLeft />}
      />
      <div className="space-x-3">
        <IconButton
          className="bg-fuchsia-200 hover:bg-fuchsia-100 text-fuchsia-900"
          icon={<LuArrowRightLeft />}
        />
        <IconButton
          className="bg-fuchsia-200 hover:bg-fuchsia-100 text-fuchsia-900"
          icon={<LuArrowRightFromLine />}
          onClick={handleSideCollapse}
        />
      </div>
    </nav>
  );
}

export { TopNavbar };
