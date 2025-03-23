import { cn } from "@/lib/utils";

type TextMessageProps = {
  variant?: "bubble" | "inline";
} & React.ComponentPropsWithRef<"div">;

function TextMessage(props: TextMessageProps) {
  const { variant = "bubble", className, children, ...rest } = props;

  return (
    <div
      className={cn(
        "text-gray-950 inline-block",
        [variant === "bubble" && "px-4 py-3 bg-gray-100 rounded-md"],
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
}

export { type TextMessageProps, TextMessage };
