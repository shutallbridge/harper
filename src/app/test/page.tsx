"use client";

import React from "react";
import { LuCircle } from "react-icons/lu";

import { Button } from "@/components/button";
import { IconButton } from "@/components/icon-button";
import { Input } from "@/components/input";
import { Select } from "@/components/select";

export default function Page() {
  const [value, setValue] = React.useState<string>("AU");

  const onValueChange = (newValue: string) => {
    setValue(newValue);
  };

  return (
    <div className="p-8 flex flex-col gap-4 items-start">
      <Button variant="primary" icon={<LuCircle />}>
        Button
      </Button>
      <IconButton size="md" variant="ghost" icon={<LuCircle />} />
      <Input />
      <div className="w-52">
        <span>Uncontrolled</span>
        <Select
          data={[
            { label: "New Zealand", value: "NZ" },
            { label: "Japan", value: "JP" },
            { label: "Australia", value: "AU" },
          ]}
        />
      </div>
      <div className="w-52">
        <span>Controlled value: {value}</span>
        <Select
          data={[
            { label: "New Zealand", value: "NZ" },
            { label: "Japan", value: "JP" },
            { label: "Australia", value: "AU" },
          ]}
          selectedValue={value}
          onSelectedValueChange={onValueChange}
        />
      </div>
    </div>
  );
}
