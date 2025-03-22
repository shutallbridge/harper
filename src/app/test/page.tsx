import { LuCircle } from "react-icons/lu";

import { Button } from "@/components/button";
import { IconButton } from "@/components/icon-button";

export default function Page() {
  return (
    <div className="p-8 flex flex-col gap-4 items-start">
      <Button variant="primary" icon={<LuCircle />}>
        Button
      </Button>
      <IconButton size="md" variant="ghost" icon={<LuCircle />} />
    </div>
  );
}
