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

  const [name, setName] = React.useState("");

  return (
    <div className="p-8 flex flex-col gap-14 items-start">
      <Button variant="primary" icon={<LuCircle />}>
        Button
      </Button>
      <Button asChild icon={<LuCircle />}>
        <a target="_blank" href="https://example.com">
          Link
        </a>
      </Button>
      <IconButton icon={<LuCircle />} />
      <IconButton asChild icon={<LuCircle />}>
        <a target="_blank" href="https://www.example.com"></a>
      </IconButton>
      <Input
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Input unwrapped />
      <div className="w-52 flex flex-col gap-y-10">
        <span>Uncontrolled</span>
        <Select
          label="Country"
          data={[
            { label: "New Zealand", value: "NZ" },
            { label: "Japan", value: "JP" },
            { label: "Australia", value: "AU" },
          ]}
        />
      </div>
      <div className="w-52 flex flex-col gap-y-10">
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
