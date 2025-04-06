import { Slot, Slottable } from "@radix-ui/react-slot";

import { cn } from "@/lib/utils";

type ResourceMessageProps = {
  asChild?: boolean;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  styles?: ResourceMessageStyles;
  children?: React.ReactNode;
} & React.ComponentPropsWithoutRef<"button">;

type ResourceMessageStyles = {
  iconContainer?: string;
};

function ResourceMessage(props: ResourceMessageProps) {
  const {
    asChild = false,
    title,
    subtitle,
    icon,
    styles,
    className,
    children,
    ...rest
  } = props;
  const { iconContainer: iconContainerStyles } = styles ?? {};

  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      className={cn(
        "inline-flex max-w-96 bg-white border border-gray-200 rounded-md cursor-pointer",
        className
      )}
      {...rest}
    >
      <Slottable>{children}</Slottable>
      <div
        className={cn(
          "flex bg-gray-50 justify-center items-center px-6 text-2xl",
          iconContainerStyles
        )}
      >
        {icon}
      </div>
      <div className="flex-1 flex flex-col items-start gap-y-1.5 px-4 py-3 min-w-0">
        <div className="text-gray-950 whitespace-nowrap overflow-hidden text-ellipsis w-full text-left">
          {title}
        </div>
        <div className="text-gray-700 whitespace-nowrap overflow-hidden text-ellipsis w-full text-left">
          {subtitle}
        </div>
      </div>
    </Comp>
  );
}

export {
  type ResourceMessageProps,
  type ResourceMessageStyles,
  ResourceMessage,
};
