"use client";

import { Tools } from "@/lib/tools";
import { AssistantProvider } from "@/lib/assistant";
import { AppStateProvider, type AppStateAction } from "@/lib/app-context";
import { type ServerUtils, exportedClientTools } from "@/lib/app-tools";

type ClientUtils = {
  dispatch: React.Dispatch<AppStateAction>;
};

const clientAwareTools = new Tools<ServerUtils, ClientUtils>();
clientAwareTools.load(exportedClientTools);

type ProvidersProps = {
  children: React.ReactNode;
};

function Providers(props: ProvidersProps) {
  const { children } = props;

  return (
    <AppStateProvider>
      <AssistantProvider tools={clientAwareTools}>{children}</AssistantProvider>
    </AppStateProvider>
  );
}

export { type ProvidersProps, Providers, type ClientUtils };
