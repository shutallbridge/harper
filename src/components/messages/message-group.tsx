import { cn } from "@/lib/utils";

type MessageGroupProps = {
  align: "left" | "right";
} & React.ComponentPropsWithoutRef<"div">;

function MessageGroup(props: MessageGroupProps) {
  const { align = "left", className, children, ...rest } = props;

  return (
    <div
      className={cn(
        "flex",
        [align === "left" && "justify-start"],
        [align === "right" && "justify-end"],
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
}

export { type MessageGroupProps, MessageGroup };
