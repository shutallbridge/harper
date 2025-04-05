import { cn } from "@/lib/utils";

type PanelContentProps = React.ComponentPropsWithoutRef<"div">;

function PanelContent(props: PanelContentProps) {
  const { children, className, ...rest } = props;

  return (
    <div className={cn("flex-1 overflow-auto", className)} {...rest}>
      {children}
    </div>
  );
}

export { type PanelContentProps, PanelContent };
