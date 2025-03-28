"use client";

import React from "react";
import { type AnyZodObject, z } from "zod";
import { useChat as useAiChat, type UseChatOptions } from "@ai-sdk/react";

import { type UnknownRecord, type ClientRunHandler, Tools } from "@/lib/tools";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const AssistantContext = React.createContext<Tools<any, any> | null>(null);

type AssistantProviderProps<
  TServerRunUtils extends UnknownRecord,
  TClientRunUtils extends UnknownRecord
> = {
  tools: Tools<TServerRunUtils, TClientRunUtils>;
  children: React.ReactNode;
};

function AssistantProvider<
  TServerRunUtils extends UnknownRecord,
  TClientRunUtils extends UnknownRecord
>(args: AssistantProviderProps<TServerRunUtils, TClientRunUtils>) {
  const { children, tools } = args;

  return (
    <AssistantContext.Provider value={tools}>
      {children}
    </AssistantContext.Provider>
  );
}

type UseAssistantArgs<TClientRunUtils extends UnknownRecord> =
  UseChatOptions & {
    utils: TClientRunUtils;
  };

function useAssistant<TClientRunUtils extends UnknownRecord>(
  args: UseAssistantArgs<TClientRunUtils>
) {
  const { utils: clientUtils } = args;

  const clientAwareTools = React.useContext(AssistantContext);

  if (!clientAwareTools) {
    throw new Error(
      "useAssistant must be used within a AssistantProvider component"
    );
  }

  const addClientRunDynamic = React.useCallback(
    <TParameters extends AnyZodObject>(args: {
      name: string;
      description: string;
      parameters: TParameters;
      handler: ClientRunHandler<z.TypeOf<TParameters>, TClientRunUtils>;
    }) => {
      const { name } = args;
      clientAwareTools.addClientRunDynamic(args);
      return () => clientAwareTools.remove({ name });
    },
    [clientAwareTools]
  );

  const remove = React.useCallback(
    (args: { name: string }) => {
      clientAwareTools.remove(args);
    },
    [clientAwareTools]
  );

  const { ...useAiChatRest } = useAiChat({
    maxSteps: 5,
    body: {
      toolManifests: clientAwareTools.exportManifests(),
    },
    onToolCall({ toolCall }) {
      const relevantTools = clientAwareTools.exportClientRelevant();
      const toolToRun = relevantTools?.find(
        (tool) => tool.name === toolCall.toolName
      );
      if (!toolToRun) {
        return;
      }

      if (
        toolToRun.type === "manifest_only" ||
        toolToRun.type === "server_run_static"
      ) {
        return;
      }

      const toolResult = toolToRun.handler({
        args: toolCall.args as UnknownRecord,
        utils: clientUtils,
      });
      return toolResult;
    },
    ...args,
  });

  return { addClientRunDynamic, remove, ...useAiChatRest };
}

export {
  type AssistantProviderProps,
  AssistantProvider,
  type UseAssistantArgs,
  useAssistant,
};
