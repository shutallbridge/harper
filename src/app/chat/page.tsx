"use client";

import React from "react";
import Image from "next/image";
import Balancer from "react-wrap-balancer";
import { LuMessageSquare, LuHistory } from "react-icons/lu";
import { MdPictureAsPdf } from "react-icons/md";

import { useAssistant } from "@/lib/assistant";
import { useAppState } from "@/lib/app-context";
import { Button } from "@/components/button";
import { MessageComposer } from "@/components/message-composer";
import { PanelHeader, PanelContent } from "@/components/panel";
import {
  Messages,
  MessageGroup,
  TextMessage,
  ResourceMessage,
} from "@/components/messages";
import { FullModal } from "@/components/full-modal";

type StarterPrompt = {
  image: string;
  prompt: string;
  file?: {
    fileUrl: string;
    fileName: string;
  };
};

const starterPrompts: StarterPrompt[] = [
  {
    image: "/resume.png",
    prompt: "Help me register this candidate based on their PDF resume.",
    file: {
      fileUrl: "/202504 Shu Takahashi Resume.pdf",
      fileName: "202504 Shu Takahashi Resume.pdf",
    },
  },
  {
    image: "/list.png",
    prompt: "Show me a list of all candidates",
  },
  {
    image: "/question.png",
    prompt: "I'm curious. Tell me what this app is about.",
  },
];

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
  const [filePreview, filePreviewDispatch] = React.useReducer(
    pdfPreviewReducer,
    {
      isOpen: false,
    }
  );

  const { dispatch: appDispatch } = useAppState();

  const { messages, append } = useAssistant({
    utils: { dispatch: appDispatch },
  });

  const handleNewMessage = React.useCallback(
    (args: { message: string; files?: FileList }) => {
      const { message, files } = args;
      append(
        { role: "user", content: message },
        { experimental_attachments: files }
      );
    },
    [append]
  );

  const onStarterPromptClick = React.useCallback(
    async (args: StarterPrompt) => {
      const { prompt, file: starterFile } = args;

      if (starterFile) {
        const response = await fetch(starterFile.fileUrl);
        const blob = await response.blob();
        const file = new File([blob], starterFile.fileName, {
          type: "application/pdf",
        });
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(file);
        handleNewMessage({ message: prompt, files: dataTransfer.files });
      } else {
        handleNewMessage({ message: prompt });
      }
    },
    [handleNewMessage]
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
      <PanelContent className="flex flex-col items-center px-6">
        {/* new chat content */}
        {messages.length === 0 ? (
          <div className="max-w-3xl space-y-8 mt-10 mb-10">
            <h2 className="text-2xl font-medium text-center">
              Hi there, how can I help you today?
            </h2>
            {/* message composer */}
            <MessageComposer
              onMessageComposerSubmit={({ message, files }) =>
                handleNewMessage({ message, files })
              }
              className="sticky bottom-0 inset-x-0 w-full"
            />

            {/* starter prompts */}
            <div className="space-y-4">
              <div className="relative flex items-center justify-center">
                <hr className="absolute w-full border-gray-200" />
                <div className="relative bg-white px-3 py-2 text-sm font-medium text-fuchsia-900 border border-y-fuchsia-900 rounded-full">
                  Or try these
                </div>
              </div>
              <div className="flex gap-x-3 items-start">
                {starterPrompts.map((starterPrompt, index) => (
                  <button
                    key={index}
                    onClick={() => onStarterPromptClick(starterPrompt)}
                    className="space-y-2 group cursor-pointer"
                  >
                    <div className="border border-gray-300 rounded-md px-8 py-4 transition group-hover:shadow">
                      <Image
                        src={starterPrompt.image}
                        width={621}
                        height={465}
                        alt=""
                        className="group-hover:scale-[1.05] transition"
                      />
                    </div>
                    <div className="text-gray-800">{starterPrompt.prompt}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* more information section */}
            <article className="space-y-2">
              <p className="text-sm text-gray-600 text-center">
                <Balancer>
                  Harper is a fictional ERP platform designed to help businesses
                  with various operations. It serves as a demo app for a library
                  providing AI-native interface features to Typescript
                  developers.
                </Balancer>
              </p>
              <a
                href="https://github.com/shutallbridge/harper"
                className="block text-sm text-gray-600 underline text-center"
              >
                Learn more about it here
              </a>
            </article>
          </div>
        ) : null}

        {/* existing chat content */}
        {messages.length > 0 ? (
          <>
            {/* message content */}
            <Messages className="flex-1 pt-6 w-full max-w-3xl">
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
                            variant={
                              message.role === "user" ? "bubble" : "inline"
                            }
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
                              openFilePreview({
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

            {/* message composer sticky element */}
            <MessageComposer
              onMessageComposerSubmit={({ message, files }) =>
                handleNewMessage({ message, files })
              }
              className="sticky bottom-0 inset-x-0 pb-4 pt-4 w-full max-w-3xl"
            />
          </>
        ) : null}
      </PanelContent>

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
