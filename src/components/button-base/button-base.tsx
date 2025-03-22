import { Slot } from "@radix-ui/react-slot";

import { cn } from "@/lib/utils";

type ButtonBaseProps = {
  asChild?: boolean;
  variant?: "primary" | "secondary" | "ghost";
} & React.ComponentPropsWithoutRef<"button">;

function ButtonBase(props: ButtonBaseProps) {
  const { asChild = false, variant = "primary", className, ...rest } = props;

  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      className={cn(
        "rounded-md cursor-pointer",
        // text-*
        [variant === "primary" && "text-white"],
        [variant === "secondary" && "text-gray-950"],
        [variant === "ghost" && "text-gray-950"],
        // bg-*
        [variant === "primary" && "bg-fuchsia-950 hover:bg-fuchsia-900"],
        [variant === "secondary" && "bg-white hover:bg-gray-50"],
        [variant === "ghost" && "bg-none hover:bg-gray-50"],
        // border-*
        [variant === "primary" && "border-none"],
        [variant === "secondary" && "border border-gray-200"],
        [variant === "ghost" && "border-none"],
        className
      )}
      {...rest}
    />
  );
}

export { type ButtonBaseProps, ButtonBase };
