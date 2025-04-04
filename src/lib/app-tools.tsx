// treating tools.ts like a library
// this file is an instance of the tool library
import { z } from "zod";

import { Tools } from "@/lib/tools";
import { ClientUtils } from "@/app/providers";
import { screens } from "@/screens";

// nothing for now
type ServerUtils = Record<string, never>;

const serverAwareTools = new Tools<ServerUtils, ClientUtils>();

serverAwareTools.addServerRunStatic({
  name: "getWeather",
  description: "Get the current weather",
  parameters: z.object({}),
  handler: () => {
    return "It is currently sunny";
  },
});

serverAwareTools.addClientRunStatic({
  name: "getLocation",
  description: "Get the user's location",
  parameters: z.object({}),
  handler: () => {
    return "The user is in Sydney";
  },
});

screens.forEach((screen) => {
  const { id: screenId, description, propsSchema } = screen;
  serverAwareTools.addClientRunStatic({
    name: screenId,
    description,
    parameters: propsSchema,
    handler: ({ utils }) => {
      // console.log(`navigation handler: ${screenId}`);
      utils.dispatch({ type: "open_screen", screenId, props: {} });
      return "Successfully navigated the user";
    },
  });
});

const exportedClientTools = serverAwareTools.exportClientRelevant();

export { serverAwareTools, exportedClientTools, type ServerUtils };
