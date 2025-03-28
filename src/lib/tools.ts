import { type AnyZodObject, z } from "zod";
import { tool as aiTool, zodSchema, Schema, jsonSchema } from "ai";

type UnknownRecord = Record<string, unknown>;

type ServerRunHandler<
  THandlerArgs extends UnknownRecord,
  TServerRunUtils extends UnknownRecord
> = (argsAndUtils: { args: THandlerArgs; utils: TServerRunUtils }) => unknown;

type ClientRunHandler<
  THandlerArgs extends UnknownRecord,
  TClientRunUtils extends UnknownRecord
> = (argsAndUtils: { args: THandlerArgs; utils: TClientRunUtils }) => unknown;

type JsonToolManifest = {
  ephemeral: boolean;
  type:
    | "server_run_static"
    | "client_run_static"
    | "client_run_dynamic"
    | "manifest_only";
  name: string;
  description: string;
  jsonParameters: Schema;
};

type Tool<
  TParameters extends AnyZodObject,
  TServerRunUtils extends UnknownRecord,
  TClientRunUtils extends UnknownRecord
> = {
  ephemeral: boolean;
  name: string;
  description: string;
} & (
  | {
      type: "server_run_static";
      parameters: TParameters;
      handler: ServerRunHandler<z.infer<TParameters>, TServerRunUtils>;
    }
  | {
      type: "client_run_static";
      parameters: TParameters;
      handler: ClientRunHandler<z.infer<TParameters>, TClientRunUtils>;
    }
  | {
      type: "client_run_dynamic";
      parameters: TParameters;
      handler: ClientRunHandler<z.infer<TParameters>, TClientRunUtils>;
    }
  | {
      type: "manifest_only";
      parameters: Schema;
    }
);

class Tools<
  TServerRunUtils extends UnknownRecord,
  TClientRunUtils extends UnknownRecord
> {
  private tools: Tool<AnyZodObject, TServerRunUtils, TClientRunUtils>[];

  public constructor() {
    this.tools = [];
  }

  public addServerRunStatic<TParameters extends AnyZodObject>(args: {
    name: string;
    description: string;
    parameters: TParameters;
    handler: ServerRunHandler<z.infer<TParameters>, TServerRunUtils>;
  }) {
    const { name, description, parameters, handler } = args;
    this.tools.push({
      type: "server_run_static",
      ephemeral: false,
      name,
      description,
      parameters,
      handler,
    });
  }

  public addClientRunStatic<TParameters extends AnyZodObject>(args: {
    name: string;
    description: string;
    parameters: TParameters;
    handler: ClientRunHandler<z.infer<TParameters>, TClientRunUtils>;
  }) {
    const { name, description, parameters, handler } = args;
    this.tools.push({
      type: "client_run_static",
      ephemeral: false,
      name,
      description,
      parameters,
      handler,
    });
  }

  public addClientRunDynamic<TParameters extends AnyZodObject>(args: {
    name: string;
    description: string;
    parameters: TParameters;
    handler: ClientRunHandler<z.infer<TParameters>, TClientRunUtils>;
  }) {
    const { name, description, parameters, handler } = args;
    this.tools.push({
      type: "client_run_dynamic",
      ephemeral: true,
      name,
      description,
      parameters,
      handler,
    });
  }

  public remove(args: { name: string }) {
    const { name } = args;
    this.tools.filter((tool) => tool.name !== name);
  }

  public removeEphemerals() {
    this.tools = this.tools.filter((tool) => !tool.ephemeral);
  }

  public exportManifests(): JsonToolManifest[] {
    return this.tools.map<JsonToolManifest>((tool) => {
      const { type, ephemeral, name, description, parameters } = tool;

      const jsonParameters =
        type === "manifest_only" ? parameters : zodSchema(parameters);

      return {
        type,
        ephemeral,
        name,
        description,
        jsonParameters,
      };
    });
  }

  public loadManifests(jsonToolManifests: JsonToolManifest[]) {
    jsonToolManifests.forEach((jsonToolManifest) => {
      const { ephemeral, name, description, jsonParameters } = jsonToolManifest;
      this.tools.push({
        type: "manifest_only",
        ephemeral,
        name,
        description,
        parameters: jsonSchema(jsonParameters.jsonSchema),
      });
    });
  }

  public load(tools: Tool<AnyZodObject, TServerRunUtils, TClientRunUtils>[]) {
    this.tools.push(...tools);
  }

  public exportServerRelevant() {
    return this.tools.map<Tool<AnyZodObject, TServerRunUtils, TClientRunUtils>>(
      (tool) => {
        switch (tool.type) {
          case "server_run_static":
          case "manifest_only": {
            return tool;
          }

          case "client_run_dynamic":
          case "client_run_static": {
            const { parameters: zodParameters, ...rest } = tool;
            const jsonParameters = zodSchema(zodParameters);
            return {
              ...rest,
              type: "manifest_only",
              parameters: jsonParameters,
            };
          }
        }
      }
    );
  }

  public exportClientRelevant() {
    return this.tools.filter(
      (tool) =>
        tool.type === "client_run_dynamic" || tool.type === "client_run_static"
    ) as Tool<AnyZodObject, TServerRunUtils, TClientRunUtils>[];
  }
}

function toVercelManifestsAndServerHandlers<
  TServerRunUtils extends UnknownRecord,
  TClientRunUtils extends UnknownRecord
>(
  tools: Tool<AnyZodObject, TServerRunUtils, TClientRunUtils>[],
  utils: TServerRunUtils
) {
  return tools.reduce<Record<string, unknown>>((acc, currentTool) => {
    switch (currentTool.type) {
      case "client_run_dynamic":
      case "client_run_static": {
        throw new Error(
          "Client-run tools cannot be run inside the stream functions. Export to manifests first using exportServerRelevant()"
        );
      }
      case "server_run_static": {
        const { name, description, parameters, handler } = currentTool;
        acc[name] = aiTool({
          description,
          parameters,
          execute: async (args) => handler({ args, utils }),
        });
        return acc;
      }
      case "manifest_only": {
        const { name, description, parameters } = currentTool;
        acc[name] = aiTool({
          description,
          parameters,
        });
        return acc;
      }
    }
    // todo: not sure why this doesn't satify the return type
  }, {}) as Record<string, ReturnType<typeof aiTool>>;
}

export {
  type UnknownRecord,
  type ServerRunHandler,
  type ClientRunHandler,
  type JsonToolManifest,
  Tools,
  toVercelManifestsAndServerHandlers,
};
