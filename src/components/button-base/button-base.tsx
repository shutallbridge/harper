import { cn } from "@/lib/utils";

type ButtonBaseProps = {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
} & React.ComponentPropsWithoutRef<"button">;

function ButtonBase(props: ButtonBaseProps) {
  const { children, variant = "primary", className } = props;

  return (
    <button
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
    >
      {children}
    </button>
  );
}

export { type ButtonBaseProps, ButtonBase };
