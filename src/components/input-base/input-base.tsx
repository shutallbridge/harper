import { Slot } from "@radix-ui/react-slot";

import { cn } from "@/lib/utils";

type InputBaseProps = {
  asChild?: boolean;
  leftElement?: React.ReactNode;
  rightElement?: React.ReactNode;
  topElement?: React.ReactNode;
  bottomElement?: React.ReactNode;
} & React.ComponentPropsWithoutRef<"input">;

const styles = {
  // input: "focus:outline-2 focus:-outline-offset-2 focus:outline-fuchsia-500/50",
  input: "",
};

function InputBase(props: InputBaseProps) {
  const {
    asChild = false,
    className,
    leftElement,
    rightElement,
    topElement,
    bottomElement,
    ...rest
  } = props;

  const Comp = asChild ? Slot : "input";

  return (
    <div
      className={cn(
        "w-full flex flex-col bg-white border border-gray-300 rounded-md overflow-hidden focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-fuchsia-500/50"
      )}
    >
      {topElement ? topElement : null}
      <div className="w-full flex">
        {leftElement ? leftElement : null}
        <Comp
          className={cn(
            "w-full text-gray-950 placeholder:text-gray-500 outline-none",
            className
          )}
          {...rest}
        />
        {rightElement ? rightElement : null}
      </div>
      {bottomElement ? bottomElement : null}
    </div>
  );
}

export { type InputBaseProps, InputBase, styles };
