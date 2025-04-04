import { Slot } from "@radix-ui/react-slot";

import { cn } from "@/lib/utils";

type PanelProps = {
  asChild?: boolean;
  children: React.ReactNode;
} & React.ComponentPropsWithoutRef<"section">;

function Panel(props: PanelProps) {
  const { asChild = false, children, className, ...rest } = props;

  const Comp = asChild ? Slot : "section";

  return (
    <Comp
      className={cn(
        "flex flex-col bg-white border border-gray-200 rounded-md",
        className
      )}
      {...rest}
    >
      {children}
    </Comp>
  );
}

export { type PanelProps, Panel };
