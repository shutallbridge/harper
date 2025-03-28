import { type JSX } from "react";
import { AnyZodObject } from "zod";

type Screen<
  TComponentType extends
    | keyof JSX.IntrinsicElements
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    | React.JSXElementConstructor<any>
> = {
  id: string;
  description: string;
  propsSchema: AnyZodObject;
  render: (props: React.ComponentProps<TComponentType>) => JSX.Element;
};

export { type Screen };
