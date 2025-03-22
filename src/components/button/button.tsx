import { cn } from "@/lib/utils";
import { type ButtonBaseProps, ButtonBase } from "@/components/button-base";

type ButtonProps = {
  size?: "sm" | "md";
  icon?: React.ReactNode;
} & ButtonBaseProps;

function Button(props: ButtonProps) {
  const { children, className, size = "md", icon, ...rest } = props;

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
            // prettier-ignore
            [size === "md" && "text-2xl"],
            [size === "sm" && "text-xl"]
          )}
        >
          {icon}
        </div>
      ) : null}
      <div
        className={cn(
          // prettier-ignore
          [size === "md" && "py-3"],
          [size === "sm" && "py-2"]
        )}
      >
        {children}
      </div>
    </ButtonBase>
  );
}

export { type ButtonProps, Button };
