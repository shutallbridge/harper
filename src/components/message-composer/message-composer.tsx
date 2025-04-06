import React from "react";
import { LuPaperclip, LuArrowUp, LuX } from "react-icons/lu";
import { MdPictureAsPdf } from "react-icons/md";

import { cn } from "@/lib/utils";
import { IconButton } from "@/components/icon-button";
import { Textarea } from "@/components/textarea";
import { ResourceMessage } from "@/components/messages";
import { FullModal } from "@/components/full-modal";

type PdfPreviewState =
  | {
      isOpen: false;
    }
  | {
      isOpen: true;
      title: string;
      url: string;
    };

type PdfPreviewAction =
  | { type: "open"; title: string; url: string }
  | { type: "close" };

function pdfPreviewReducer(
  state: PdfPreviewState,
  action: PdfPreviewAction
): PdfPreviewState {
  switch (action.type) {
    case "open":
      return {
        isOpen: true,
        title: action.title,
        url: action.url,
      };
    case "close":
      return { isOpen: false };
  }
}

type MessageComposerProps = {
  onMessageComposerSubmit: (args: {
    message: string;
    files?: FileList;
  }) => void;
} & React.ComponentPropsWithoutRef<"form">;

function MessageComposer(props: MessageComposerProps) {
  const { onMessageComposerSubmit, className, ...rest } = props;

  const [filePreview, filePreviewDispatch] = React.useReducer(
    pdfPreviewReducer,
    {
      isOpen: false,
    }
  );

  const [message, setMessage] = React.useState<string>("");
  const [files, setFiles] = React.useState<FileList | undefined>(undefined);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleMessageComposerSubmit = React.useCallback(() => {
    onMessageComposerSubmit({ message, files });
    setFiles(undefined);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, [files, message, onMessageComposerSubmit]);

  const onTextareaChange = React.useCallback(
    (
      e:
        | React.ChangeEvent<HTMLInputElement>
        | React.ChangeEvent<HTMLTextAreaElement>
    ) => {
      setMessage(e.target.value);
    },
    []
  );

  const onFormSubmit = React.useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      handleMessageComposerSubmit();
    },
    [handleMessageComposerSubmit]
  );

  const onTextareaKeyDown = React.useCallback(
    (
      e:
        | React.KeyboardEvent<HTMLTextAreaElement>
        | React.KeyboardEvent<HTMLInputElement>
    ) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleMessageComposerSubmit();
      }
    },
    [handleMessageComposerSubmit]
  );

  const onFileInputChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        setFiles(e.target.files);
      }
    },
    []
  );

  const onFileRemove = React.useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();
      setFiles(undefined);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    },
    []
  );

  // todo: manage with a modal manager
  const openFilePreview = React.useCallback(
    (args: { title: string; url: string }) => {
      const { title, url } = args;
      filePreviewDispatch({ type: "open", title, url });
    },
    []
  );
  const closeFilePreview = React.useCallback(() => {
    filePreviewDispatch({ type: "close" });
  }, []);

  const onFilePreviewClick = React.useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();
      if (!files) return;

      openFilePreview({
        title: files[0].name,
        url: URL.createObjectURL(files[0]),
      });
    },
    [files, openFilePreview]
  );

  return (
    <>
      <form className={cn(className)} onSubmit={onFormSubmit} {...rest}>
        <Textarea
          className="p-4 resize-none"
          unwrapped
          minRows={1}
          value={message}
          onChange={onTextareaChange}
          onKeyDown={onTextareaKeyDown}
          bottomElement={
            <div className="flex flex-col">
              <div className="flex gap-x-2 self-end p-3">
                <IconButton
                  asChild
                  size="sm"
                  variant="ghost"
                  icon={<LuPaperclip />}
                >
                  <div className="relative">
                    <input
                      type="file"
                      accept=".pdf,application/pdf"
                      className="absolute inset-0 opacity-0"
                      onChange={onFileInputChange}
                      ref={fileInputRef}
                    />
                  </div>
                </IconButton>
                <IconButton size="sm" type="submit" icon={<LuArrowUp />} />
              </div>
              {files ? (
                <div className="bg-fuchsia-50 p-4 border-t border-gray-300">
                  {Array.from(files).map((file, i) => (
                    <div key={i} className="inline-block relative group">
                      <ResourceMessage
                        title={file.name}
                        subtitle={`${
                          file.type === "application/pdf" ? "PDF" : ""
                        }`}
                        icon={<MdPictureAsPdf />}
                        onClick={onFilePreviewClick}
                      />
                      <button
                        onClick={onFileRemove}
                        className="absolute hidden group-hover:block cursor-pointer top-0 left-0 -translate-x-1/2 -translate-y-1/2 bg-fuchsia-950 text-white rounded-full p-0.5"
                      >
                        <LuX />
                      </button>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          }
        />
      </form>

      {/* full-modal PDF */}
      <FullModal
        open={filePreview.isOpen}
        onCloseClick={closeFilePreview}
        title={filePreview.isOpen ? filePreview.title : ""}
      >
        {filePreview.isOpen && (
          <embed
            src={filePreview.url}
            type="application/pdf"
            className="w-full h-full"
          />
        )}
      </FullModal>
    </>
  );
}

export { type MessageComposerProps, MessageComposer };
