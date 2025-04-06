import {
  type DialogProps,
  Dialog,
  DialogPortal,
  DialogContent,
  DialogTitle,
} from "@radix-ui/react-dialog";
import { LuX } from "react-icons/lu";

import { cn } from "@/lib/utils";
import { IconButton } from "@/components/icon-button";

type FullModalProps = {
  title: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  onCloseClick?: () => void;
} & DialogProps;

function FullModal(props: FullModalProps) {
  const { title, children, className, onCloseClick, ...rest } = props;

  return (
    <Dialog {...rest}>
      <DialogPortal>
        <DialogContent
          className={cn("bg-white absolute inset-0 flex flex-col", className)}
        >
          <div className="flex-none flex justify-between items-center p-6 border-b border-gray-300">
            <DialogTitle>{title}</DialogTitle>
            <IconButton
              onClick={onCloseClick}
              variant="secondary"
              size="sm"
              icon={<LuX />}
            />
          </div>
          <div className="flex-1 min-h-0 overflow-auto">{children}</div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}

export { type FullModalProps, FullModal };
