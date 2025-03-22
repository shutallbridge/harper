"use client";

import React from "react";
import { LuCircle, LuArrowUp, LuPaperclip } from "react-icons/lu";

import { Button } from "@/components/button";
import { IconButton } from "@/components/icon-button";
import { Input } from "@/components/input";
import { Select } from "@/components/select";
import { Textarea } from "@/components/textarea";

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
      <Button asChild variant="secondary" icon={<LuCircle />}>
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
      <Input
        label="Website"
        leftElement={
          <div className="bg-gray-100 flex items-center px-5 text-gray-500 select-none">
            https://
          </div>
        }
      />
      <Textarea label="Feedback" />
      <Textarea
        unwrapped
        className="p-4 resize-none"
        rightElement={
          <div className="flex gap-x-2 self-start pr-4 pt-4">
            <IconButton variant="ghost" icon={<LuPaperclip />} />
            <IconButton type="submit" icon={<LuArrowUp />} />
          </div>
        }
      />
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
