import { Slottable } from "@radix-ui/react-slot";

import { cn } from "@/lib/utils";
import { type ButtonBaseProps, ButtonBase } from "@/components/button-base";

type IconButtonProps = {
  icon: React.ReactNode;
  size?: "sm" | "md";
} & ButtonBaseProps;

function IconButton(props: IconButtonProps) {
  const { icon, size = "md", className, children, ...rest } = props;

  return (
    <ButtonBase
      className={cn(
        "p-2",
        [size === "sm" && "text-xl"],
        [size === "md" && "text-2xl"],
        className
      )}
      {...rest}
    >
      {icon}
      <Slottable>{children}</Slottable>
    </ButtonBase>
  );
}

export { type IconButtonProps, IconButton };
