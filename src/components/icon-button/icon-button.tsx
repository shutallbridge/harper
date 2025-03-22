import { cn } from "@/lib/utils";
import { type ButtonBaseProps, ButtonBase } from "@/components/button-base";

type IconButtonProps = Omit<
  {
    icon: React.ReactNode;
    size?: "sm" | "md";
  } & ButtonBaseProps,
  "children"
>;

function IconButton(props: IconButtonProps) {
  const { icon, className, size = "md", ...rest } = props;

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
    </ButtonBase>
  );
}

export { type IconButtonProps, IconButton };
