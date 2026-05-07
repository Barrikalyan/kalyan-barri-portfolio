import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./sanity/schemaTypes";

const runtimeEnv =
  typeof import.meta !== "undefined" && typeof import.meta.env !== "undefined"
    ? import.meta.env
    : {};

export default defineConfig({
  name: "portfolio-studio",
  title: "Portfolio Studio",
  projectId: runtimeEnv.VITE_SANITY_PROJECT_ID ?? runtimeEnv.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "demo-project",
  dataset: runtimeEnv.VITE_SANITY_DATASET ?? runtimeEnv.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  plugins: [structureTool()],
  schema: {
    types: schemaTypes,
  },
});