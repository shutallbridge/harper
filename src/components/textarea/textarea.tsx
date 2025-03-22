import TextareaAutosize, {
  type TextareaAutosizeProps,
} from "react-textarea-autosize";

import { type InputBaseProps, InputBase } from "@/components/input-base";
import {
  InputWrapper,
  type InputWrapperWithoutChildren,
} from "@/components/input-wrapper";

type TextareaProps = TextareaAutosizeProps &
  InputBaseProps &
  InputWrapperWithoutChildren;

function Textarea(props: TextareaProps) {
  const {
    maxRows = 12,
    minRows = 4,
    onHeightChange,
    cacheMeasurements,
    style,
    unwrapped,
    label,
    ...rest
  } = props;

  return (
    <InputWrapper unwrapped={unwrapped} label={label}>
      {({ id }) => (
        <InputBase asChild className="px-3 py-2 resize-none" {...rest}>
          <TextareaAutosize
            maxRows={maxRows}
            minRows={minRows}
            onHeightChange={onHeightChange}
            cacheMeasurements={cacheMeasurements}
            style={style}
            id={id}
          />
        </InputBase>
      )}
    </InputWrapper>
  );
}

export { type TextareaProps, Textarea };
