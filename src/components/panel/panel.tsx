import { cn } from "@/lib/utils";

type PanelProps = {
  children: React.ReactNode;
} & React.ComponentPropsWithoutRef<"section">;

function Panel(props: PanelProps) {
  const { children, className, ...rest } = props;

  return (
    <section
      className={cn(
        "flex flex-col bg-white border border-gray-200 rounded-md",
        className
      )}
      {...rest}
    >
      {children}
    </section>
  );
}

export { type PanelProps, Panel };
