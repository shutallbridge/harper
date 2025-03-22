import { type InputBaseProps, InputBase } from "@/components/input-base";
import {
  InputWrapperWithoutChildren,
  InputWrapper,
} from "@/components/input-wrapper";

type InputProps = InputBaseProps & InputWrapperWithoutChildren;

function Input(props: InputProps) {
  const { unwrapped, label, ...rest } = props;

  return (
    <InputWrapper unwrapped={unwrapped} label={label}>
      {({ id }) => <InputBase className="px-3 py-2" id={id} {...rest} />}
    </InputWrapper>
  );
}

export { type InputProps, Input };
