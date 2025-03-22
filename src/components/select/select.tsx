import React from "react";
import { LuChevronDown } from "react-icons/lu";

import { cn } from "@/lib/utils";
import {
  type InputBaseProps,
  InputBase,
  styles,
} from "@/components/input-base";

type SelectItem = { label: string; value: string; disabled?: boolean };

type SelectProps = {
  data: SelectItem[];
  selectedValue?: string;
  onSelectedValueChange?: (value: string) => void;
} & InputBaseProps;

function Select(props: SelectProps) {
  const {
    data,
    selectedValue: controlledSelectedValue,
    onSelectedValueChange: controlledOnSelectedValueChange,
    ...rest
  } = props;

  const isControlled =
    typeof controlledSelectedValue !== "undefined" &&
    typeof controlledOnSelectedValueChange !== "undefined";

  return (
    <InputBase asChild className="w-full relative" {...rest}>
      <div>
        <select
          className={cn(
            "w-full px-3 py-2 appearance-none rounded-md",
            styles.input
          )}
          value={isControlled ? controlledSelectedValue : undefined}
          onChange={(e) =>
            isControlled
              ? controlledOnSelectedValueChange(e.target.value)
              : undefined
          }
        >
          {data.map(({ label, value }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute right-0 top-0 translate-y-1/2 px-3 text-xl">
          <LuChevronDown />
        </div>
      </div>
    </InputBase>
  );
}

export { type SelectProps, Select, type SelectItem };
