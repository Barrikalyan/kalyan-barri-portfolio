import { createClient } from "@sanity/client";
import { createImageUrlBuilder } from "@sanity/image-url";

const runtimeEnv =
  typeof import.meta !== "undefined" && typeof import.meta.env !== "undefined"
    ? import.meta.env
    : {};

export const projectId = runtimeEnv.VITE_SANITY_PROJECT_ID ?? runtimeEnv.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "demo-project";
const dataset = runtimeEnv.VITE_SANITY_DATASET ?? runtimeEnv.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const apiVersion = runtimeEnv.VITE_SANITY_API_VERSION ?? runtimeEnv.NEXT_PUBLIC_SANITY_API_VERSION ?? "2024-01-01";

export const hasWriteToken = Boolean(runtimeEnv.VITE_SANITY_API_TOKEN ?? runtimeEnv.NEXT_PUBLIC_SANITY_API_TOKEN);

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: runtimeEnv.VITE_SANITY_API_TOKEN ?? runtimeEnv.NEXT_PUBLIC_SANITY_API_TOKEN,
});

export const builder = createImageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}
