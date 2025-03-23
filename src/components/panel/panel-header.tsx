import { cn } from "@/lib/utils";

type PanelHeaderProps = React.ComponentPropsWithoutRef<"div">;

function PanelHeader(props: PanelHeaderProps) {
  const { children, className, ...rest } = props;

  return (
    <div
      className={cn("flex-none p-6 border-b border-gray-200", className)}
      {...rest}
    >
      {children}
    </div>
  );
}

export { type PanelHeaderProps, PanelHeader };
