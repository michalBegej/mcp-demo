import {
  ClientBuilder,
  type HttpMiddlewareOptions,
  type AuthMiddlewareOptions,
} from "@commercetools/ts-client";
import { createApiBuilderFromCtpClient } from "@commercetools/platform-sdk";
import type { ByProjectKeyRequestBuilder } from "@commercetools/platform-sdk";

export interface CommercetoolsConfig {
  apiBaseAddress: string;
  authBaseAddress: string;
  clientId: string;
  clientSecret: string;
  projectKey: string;
  scopes: string;
}

export function loadCommercetoolsConfig(): CommercetoolsConfig {
  const clientId = process.env.CT_CLIENT_ID ?? "";
  const clientSecret = process.env.CT_CLIENT_SECRET ?? "";
  const projectKey = process.env.CT_PROJECT_KEY ?? "";

  if (!clientId || !clientSecret || !projectKey) {
    throw new Error(
      "Commercetools not configured. Set CT_CLIENT_ID, CT_CLIENT_SECRET, CT_PROJECT_KEY in .env"
    );
  }

  return {
    apiBaseAddress:
      process.env.CT_API_BASE_ADDRESS ??
      "https://api.europe-west1.gcp.commercetools.com",
    authBaseAddress:
      process.env.CT_AUTH_BASE_ADDRESS ??
      "https://auth.europe-west1.gcp.commercetools.com",
    clientId,
    clientSecret,
    projectKey,
    scopes: process.env.CT_SCOPES ?? "",
  };
}

export function createCommercetoolsClient(
  config: CommercetoolsConfig
): ByProjectKeyRequestBuilder {
  const authMiddlewareOptions: AuthMiddlewareOptions = {
    host: config.authBaseAddress,
    projectKey: config.projectKey,
    credentials: {
      clientId: config.clientId,
      clientSecret: config.clientSecret,
    },
    scopes: config.scopes ? config.scopes.split(" ") : [],
  };

  const httpMiddlewareOptions: HttpMiddlewareOptions = {
    host: config.apiBaseAddress,
  };

  const client = new ClientBuilder()
    .withClientCredentialsFlow(authMiddlewareOptions)
    .withHttpMiddleware(httpMiddlewareOptions)
    .build();

  return createApiBuilderFromCtpClient(client).withProjectKey({
    projectKey: config.projectKey,
  });
}
