import React from "react";

/**
 * render props function invoked with its props
 */
type RenderPropsChildren<PropsArray extends Array<unknown>> = (
  ...props: PropsArray
) => React.ReactNode;

/**
 * `children` can be passed with JSX as usual, or be a render
 * props function
 */
type DimorphicChildren<PropsArray extends Array<unknown>> =
  | React.ReactNode
  | RenderPropsChildren<PropsArray>;

function dimorphicRender<PropsArray extends Array<unknown>>(
  children: DimorphicChildren<PropsArray>,
  propsArray: PropsArray
) {
  if (React.isValidElement(children)) {
    return children;
  }

  if (typeof children === "function") {
    return children(...propsArray);
  }

  return children;
}

export { type RenderPropsChildren, type DimorphicChildren, dimorphicRender };
