export const projectType = {
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    { name: "title", title: "Title", type: "string" },
    { name: "description", title: "Description", type: "text" },
    {
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
    },
    {
      name: "technologies",
      title: "Technologies",
      type: "array",
      of: [{ type: "string" }],
    },
    { name: "githubUrl", title: "GitHub URL", type: "url" },
    { name: "liveUrl", title: "Live URL", type: "url" },
    { name: "featured", title: "Featured", type: "boolean", initialValue: false },
  ],
};