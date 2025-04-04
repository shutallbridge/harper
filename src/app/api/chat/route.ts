import { streamText, type CoreMessage, type Message } from "ai";
import { openai } from "@ai-sdk/openai";

import {
  type JsonToolManifest,
  toVercelManifestsAndServerHandlers,
} from "@/lib/tools";
import { serverAwareTools } from "@/lib/app-tools";

export const maxDuration = 30;

const initialMessages: CoreMessage[] | Omit<Message, "id">[] = [
  {
    role: "system",
    content: `
    You're an assistant to the user of an ERP application that currently provides an ATS (application tracking) system. Your task is to help the user use the software by answering questions or taking actions on the user's behalf such as navigating to different screens or filling in forms.

    When you navigate the user to a new screen, make sure to accompany your action with a message to let them know you can help. For example "Sure, let's help you register a new candidate"
    `,
  },
];

export async function POST(req: Request) {
  const { messages: requestMessages, toolManifests } = (await req.json()) as {
    messages: CoreMessage[] | Omit<Message, "id">[];
    toolManifests: JsonToolManifest[];
  };

  serverAwareTools.loadManifests(toolManifests);

  const vercelTools = toVercelManifestsAndServerHandlers(
    serverAwareTools.exportServerRelevant(),
    {}
  );

  // todo: not sure why there's a type error without type assertion
  const messages = [...initialMessages, ...requestMessages] as
    | CoreMessage[]
    | Omit<Message, "id">[];

  const result = streamText({
    maxSteps: 5,
    model: openai("gpt-4o"),
    tools: vercelTools,
    messages,
  });

  serverAwareTools.removeEphemerals();

  return result.toDataStreamResponse();
}
