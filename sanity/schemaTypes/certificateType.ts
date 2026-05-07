export const certificateType = {
  name: "certificate",
  title: "Certificate",
  type: "document",
  fields: [
    { name: "title", title: "Title", type: "string" },
    { name: "issuer", title: "Issuer", type: "string" },
    { name: "date", title: "Date", type: "string" },
    {
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
    },
    { name: "certificateUrl", title: "Certificate URL", type: "url" },
  ],
};