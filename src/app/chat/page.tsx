"use client";

import React from "react";
import {
  LuMessageSquare,
  LuHistory,
  LuPaperclip,
  LuArrowUp,
} from "react-icons/lu";
import { z } from "zod";

import { useAssistant } from "@/lib/assistant";
import { useAppState } from "@/lib/app-context";
import { Button } from "@/components/button";
import { IconButton } from "@/components/icon-button";
import { Textarea } from "@/components/textarea";
import { Panel, PanelHeader, PanelContent } from "@/components/panel";
import { Messages, MessageGroup, TextMessage } from "@/components/messages";

export default function Page() {
  const {} = useAppState();

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    addClientRunDynamic,
  } = useAssistant({
    utils: {},
  });

  const popConfetti = React.useCallback(() => {
    console.log("console confetti!");
    return "a confetti was popped";
  }, []);

  React.useEffect(() => {
    const remove = addClientRunDynamic({
      name: "popConfetti",
      description: "A function to pop confetti on the user's screen",
      parameters: z.object({}),
      handler: ({}) => popConfetti(),
    });

    return remove();
  }, [popConfetti, addClientRunDynamic]);

  const onTextareaKeyDown = (
    e:
      | React.KeyboardEvent<HTMLTextAreaElement>
      | React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <Panel className="flex-1 relative">
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
          onSubmit={handleSubmit}
        >
          <Textarea
            className="p-4 resize-none"
            unwrapped
            value={input}
            onChange={handleInputChange}
            onKeyDown={onTextareaKeyDown}
            rightElement={
              <div className="flex gap-x-2 self-start pr-4 pt-4">
                <IconButton variant="ghost" icon={<LuPaperclip />} />
                <IconButton type="submit" icon={<LuArrowUp />} />
              </div>
            }
          />
        </form>
      </PanelContent>
    </Panel>
  );
}
