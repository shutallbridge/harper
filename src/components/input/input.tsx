import { type InputBaseProps, InputBase } from "@/components/input-base";

type InputProps = InputBaseProps;

function Input(props: InputProps) {
  const { ...rest } = props;

  return <InputBase className="px-3 py-2" {...rest} />;
}

export { type InputProps, Input };
