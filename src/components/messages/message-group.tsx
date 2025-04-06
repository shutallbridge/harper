import { cn } from "@/lib/utils";

type MessageGroupProps = {
  align: "left" | "right";
} & React.ComponentPropsWithoutRef<"div">;

function MessageGroup(props: MessageGroupProps) {
  const { align = "left", className, children, ...rest } = props;

  return (
    <div
      className={cn(
        "flex flex-col gap-y-2",
        [align === "left" && "items-start"],
        [align === "right" && "items-end"],
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
}

export { type MessageGroupProps, MessageGroup };
