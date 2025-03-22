import React from "react";

import { DimorphicChildren, dimorphicRender } from "@/lib/render-props";

type InputWrapperProps = {
  children: DimorphicChildren<[{ id: string }]>;
  id?: string;
  unwrapped?: boolean;
  label?: string;
};

// useful for extending props
type InputWrapperWithoutChildren = Omit<InputWrapperProps, "children">;

function InputWrapper(props: InputWrapperProps) {
  const { children, id: providedId, unwrapped = false, label } = props;

  const autoId = React.useId();
  const id = providedId ? providedId : autoId;

  if (unwrapped) {
    return dimorphicRender(children, [{ id }]);
  }

  return (
    <div className="w-full space-y-2">
      <label htmlFor={id}>{label}</label>
      {dimorphicRender(children, [{ id }])}
    </div>
  );
}

export {
  type InputWrapperProps,
  type InputWrapperWithoutChildren,
  InputWrapper,
};
