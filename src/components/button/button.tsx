import React from "react";
import { Slottable } from "@radix-ui/react-slot";

import { cn } from "@/lib/utils";
import { type ButtonBaseProps, ButtonBase } from "@/components/button-base";

type ButtonProps = {
  icon?: React.ReactNode;
  size?: "sm" | "md";
} & ButtonBaseProps;

function Button(props: ButtonProps) {
  const { icon, size = "md", className, children, ...rest } = props;

  return (
    <ButtonBase
      className={cn(
        "flex items-center gap-x-3",
        // p-*
        [size === "md" && "px-4"],
        [size === "sm" && "px-3"],
        className
      )}
      {...rest}
    >
      {icon ? (
        <div
          className={cn(
            [size === "md" && "text-2xl"],
            [size === "sm" && "text-xl"]
          )}
        >
          {icon}
        </div>
      ) : null}
      <Slottable>
        <div
          className={cn(
            // p-*
            [size === "md" && "py-3"],
            [size === "sm" && "py-2"]
          )}
        >
          {children}
        </div>
      </Slottable>
    </ButtonBase>
  );
}

export { type ButtonProps, Button };
