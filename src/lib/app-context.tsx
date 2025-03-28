"use client";

import React from "react";

type AnyObject = Record<string, unknown>;

type AppStateType =
  | {
      status: "closed";
    }
  | {
      status: "screen";
      screenId: string;
      props: AnyObject;
    }
  | {
      status: "chat";
    };

type AppStateAction =
  | { type: "close" }
  | {
      type: "open_screen";
      screenId: string;
      props: AnyObject;
    }
  | {
      type: "open_chat";
    };

function appStateReducer(
  state: AppStateType,
  action: AppStateAction
): AppStateType {
  switch (action.type) {
    case "open_screen": {
      return {
        status: "screen",
        screenId: action.screenId,
        props: action.props,
      };
    }
    case "open_chat": {
      return { status: "chat" };
    }
    case "close": {
      return { status: "closed" };
    }
    default: {
      return state;
    }
  }
}

type AppContextType = {
  state: AppStateType;
  dispatch: React.Dispatch<AppStateAction>;
};

const AppStateContext = React.createContext<AppContextType | null>(null);

function useAppState() {
  const context = React.useContext(AppStateContext);
  if (!context) {
    throw new Error("useAppState must be used within a SideStateProvider");
  }
  return context;
}

type AppStateProviderProps = {
  children: React.ReactNode;
};

function AppStateProvider(props: AppStateProviderProps) {
  const { children } = props;

  const [state, dispatch] = React.useReducer(appStateReducer, {
    status: "screen",
    screenId: "",
    props: {},
  });

  return (
    <AppStateContext value={{ state, dispatch }}>{children}</AppStateContext>
  );
}

export {
  type AppStateProviderProps,
  AppStateProvider,
  useAppState,
  type AppStateAction,
};
