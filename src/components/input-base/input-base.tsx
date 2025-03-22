import { Slot } from "@radix-ui/react-slot";

import { cn } from "@/lib/utils";

type InputBaseProps = {
  asChild?: boolean;
} & React.ComponentPropsWithoutRef<"input">;

const styles = {
  input: "focus:outline-2 focus:-outline-offset-2 focus:outline-fuchsia-500/50",
};

function InputBase(props: InputBaseProps) {
  const { asChild = false, className, ...rest } = props;

  const Comp = asChild ? Slot : "input";

  return (
    <Comp
      className={cn(
        "block w-full bg-white border border-gray-400 rounded-md text-gray-950 placeholder:text-gray-500",
        styles.input,
        className
      )}
      {...rest}
    />
  );
}

export { type InputBaseProps, InputBase, styles };
