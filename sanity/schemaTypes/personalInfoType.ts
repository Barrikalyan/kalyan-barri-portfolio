export const personalInfoType = {
  name: "personalInfo",
  title: "Personal Info",
  type: "document",
  fields: [
    { name: "name", title: "Name", type: "string" },
    { name: "role", title: "Role", type: "string" },
    { name: "bio", title: "Bio", type: "text" },
    { name: "email", title: "Email", type: "string" },
    { name: "phone", title: "Phone", type: "string" },
    {
      name: "image",
      title: "Profile Image",
      type: "image",
      options: { hotspot: true },
    },
    {
      name: "socialLinks",
      title: "Social Links",
      type: "object",
      fields: [
        { name: "github", title: "GitHub", type: "url" },
        { name: "linkedin", title: "LinkedIn", type: "url" },
        { name: "twitter", title: "Twitter / X", type: "url" },
      ],
    },
  ],
};