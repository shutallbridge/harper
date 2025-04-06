"use client";

import React from "react";
import {
  LuMessageSquare,
  LuHistory,
  LuPaperclip,
  LuArrowUp,
  LuX,
} from "react-icons/lu";
import { MdPictureAsPdf } from "react-icons/md";

import { useAssistant } from "@/lib/assistant";
import { useAppState } from "@/lib/app-context";
import { Button } from "@/components/button";
import { IconButton } from "@/components/icon-button";
import { Textarea } from "@/components/textarea";
import { PanelHeader, PanelContent } from "@/components/panel";
import {
  Messages,
  MessageGroup,
  TextMessage,
  ResourceMessage,
} from "@/components/messages";
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

export default function Page() {
  const [pdfPreview, pdfPreviewDispatch] = React.useReducer(pdfPreviewReducer, {
    isOpen: false,
  });

  const { dispatch: appDispatch } = useAppState();

  const { messages, input, handleInputChange, handleSubmit } = useAssistant({
    utils: { dispatch: appDispatch },
  });

  const [files, setFiles] = React.useState<FileList | undefined>(undefined);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

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

  const onPdfPreviewOpen = React.useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();
      if (!files) return;

      pdfPreviewDispatch({
        type: "open",
        title: files[0].name,
        url: URL.createObjectURL(files[0]),
      });
    },
    [files]
  );

  const onPdfPreviewClose = React.useCallback(() => {
    pdfPreviewDispatch({ type: "close" });
  }, []);

  const handleNewMessage = React.useCallback(() => {
    handleSubmit(
      { preventDefault: () => null },
      { experimental_attachments: files }
    );
    setFiles(undefined);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, [files, handleSubmit]);

  const onFormSubmit = React.useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      handleNewMessage();
    },
    [handleNewMessage]
  );

  const onTextareaKeyDown = React.useCallback(
    (
      e:
        | React.KeyboardEvent<HTMLTextAreaElement>
        | React.KeyboardEvent<HTMLInputElement>
    ) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleNewMessage();
      }
    },
    [handleNewMessage]
  );

  return (
    <>
      <PanelHeader className="flex justify-between items-center">
        <div className="flex gap-x-3 items-center">
          <div className="w-6 h-6 rounded-full bg-fuchsia-300" />
          <h1 className="text-base font-medium text-gray-950">Harper</h1>
        </div>
        <div className="flex gap-x-3">
          <Button icon={<LuMessageSquare />} size="sm" variant="secondary">
            New Chat
          </Button>
          <Button icon={<LuHistory />} size="sm" variant="secondary">
            Past Chats
          </Button>
        </div>
      </PanelHeader>
      <PanelContent className="flex flex-col">
        <Messages className="flex-1 px-8 pt-6">
          {messages.map((message) => (
            <MessageGroup
              key={message.id}
              align={message.role === "user" ? "right" : "left"}
            >
              {message.parts.map((part, i) => {
                switch (part.type) {
                  case "text": {
                    return (
                      <TextMessage
                        variant={message.role === "user" ? "bubble" : "inline"}
                        key={`${message.id}-${i}`}
                      >
                        {part.text}
                      </TextMessage>
                    );
                  }
                }
              })}

              {/* attachments */}
              {message.experimental_attachments
                ? message.experimental_attachments
                    .filter((attachment) =>
                      attachment.contentType?.startsWith("application/pdf")
                    )
                    .map((attachment, index) => (
                      <ResourceMessage
                        key={`${message.id}-${index}`}
                        title={attachment.name ?? ""}
                        subtitle="PDF"
                        icon={<MdPictureAsPdf />}
                        onClick={() => {
                          pdfPreviewDispatch({
                            type: "open",
                            title: attachment.name ?? "",
                            url: attachment.url,
                          });
                        }}
                      />
                    ))
                : null}
            </MessageGroup>
          ))}
        </Messages>

        {/* absolute element */}
        <form
          className="sticky bottom-0 inset-x-0 px-14 pb-6"
          onSubmit={onFormSubmit}
        >
          <Textarea
            className="p-4 resize-none"
            unwrapped
            minRows={2}
            value={input}
            onChange={handleInputChange}
            onKeyDown={onTextareaKeyDown}
            bottomElement={
              <div className="flex flex-col">
                <div className="flex gap-x-2 self-end p-4">
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
                          subtitle={`${file.type} / ${(
                            file.size /
                            (1024 * 1024)
                          ).toFixed(1)}MB`}
                          icon={<MdPictureAsPdf />}
                          onClick={onPdfPreviewOpen}
                        />
                        <button
                          onClick={onFileRemove}
                          className="absolute hidden group-hover:block top-0 left-0 -translate-x-1/2 -translate-y-1/2 bg-fuchsia-950 text-white rounded-full p-0.5"
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
      </PanelContent>

      {/* full-modal PDF */}
      <FullModal
        open={pdfPreview.isOpen}
        onCloseClick={onPdfPreviewClose}
        title={pdfPreview.isOpen ? pdfPreview.title : ""}
      >
        {pdfPreview.isOpen && (
          <embed
            src={pdfPreview.url}
            type="application/pdf"
            className="w-full h-full"
          />
        )}
      </FullModal>
    </>
  );
}
