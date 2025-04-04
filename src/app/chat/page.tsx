"use client";

import React from "react";
import {
  LuMessageSquare,
  LuHistory,
  LuPaperclip,
  LuArrowUp,
} from "react-icons/lu";

import { useAssistant } from "@/lib/assistant";
import { useAppState } from "@/lib/app-context";
import { Button } from "@/components/button";
import { IconButton } from "@/components/icon-button";
import { Textarea } from "@/components/textarea";
import { PanelHeader, PanelContent } from "@/components/panel";
import { Messages, MessageGroup, TextMessage } from "@/components/messages";

export default function Page() {
  const { dispatch } = useAppState();

  const { messages, input, handleInputChange, handleSubmit } = useAssistant({
    utils: { dispatch },
  });

  const [files, setFiles] = React.useState<FileList | undefined>(undefined);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const onFileInputChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        console.log("file attachment change");
        setFiles(e.target.files);
      }
    },
    []
  );

  const onFormSubmit = React.useCallback(
    (e?: React.FormEvent<HTMLFormElement>) => {
      e?.preventDefault();
      handleSubmit(
        { preventDefault: () => null },
        { experimental_attachments: files }
      );
      setFiles(undefined);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    },
    [files, handleSubmit]
  );

  const onTextareaKeyDown = (
    e:
      | React.KeyboardEvent<HTMLTextAreaElement>
      | React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onFormSubmit();
    }
  };

  return (
    <>
      <PanelHeader className="flex justify-between items-center">
        <div className="flex gap-x-3">
          <div className="w-6 h-6 rounded-full bg-fuchsia-300" />
          <h1 className="text-base font-medium text-gray-950">Harper</h1>
        </div>
        <div className="flex gap-x-3">
          <Button icon={<LuMessageSquare />} variant="secondary">
            New Chat
          </Button>
          <Button icon={<LuHistory />} variant="secondary">
            Past Chats
          </Button>
        </div>
      </PanelHeader>
      <PanelContent>
        <Messages className="px-14 pt-6">
          {messages.map((message) => (
            <MessageGroup
              key={message.id}
              align={message.role === "user" ? "right" : "left"}
            >
              {message.parts.map((part, i) => {
                switch (part.type) {
                  case "text":
                    return (
                      <TextMessage
                        variant={message.role === "user" ? "bubble" : "inline"}
                        key={`${message.id}-${i}`}
                      >
                        {part.text}
                      </TextMessage>
                    );
                }
              })}
            </MessageGroup>
          ))}
        </Messages>

        {/* absolute element */}
        <form
          className="absolute bottom-0 inset-x-0 px-14 pb-6"
          onSubmit={onFormSubmit}
        >
          <Textarea
            className="p-4 resize-none"
            unwrapped
            value={input}
            onChange={handleInputChange}
            onKeyDown={onTextareaKeyDown}
            rightElement={
              <div className="flex gap-x-2 self-start pr-4 pt-4">
                <IconButton asChild variant="ghost" icon={<LuPaperclip />}>
                  <div className="relative">
                    <input
                      type="file"
                      className="absolute inset-0 opacity-0"
                      onChange={onFileInputChange}
                      ref={fileInputRef}
                    />
                  </div>
                </IconButton>
                <IconButton type="submit" icon={<LuArrowUp />} />
              </div>
            }
          />
        </form>
      </PanelContent>
    </>
  );
}
