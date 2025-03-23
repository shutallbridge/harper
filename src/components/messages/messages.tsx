import { cn } from "@/lib/utils";

type MessagesProps = React.ComponentPropsWithoutRef<"div">;

function Messages(props: MessagesProps) {
  const { className, children, ...rest } = props;

  return (
    <div className={cn("space-y-10", className)} {...rest}>
      {children}
    </div>
  );
}

export { type MessagesProps, Messages };
