export const skillType = {
  name: "skill",
  title: "Skill",
  type: "document",
  fields: [
    { 
      name: "name", 
      title: "Skill Name", 
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },
    { 
      name: "category", 
      title: "Category", 
      type: "string",
      options: {
        list: [
          { title: "Frontend", value: "Frontend" },
          { title: "Backend", value: "Backend" },
          { title: "AI/ML", value: "AI/ML" },
          { title: "Tools", value: "Tools" },
        ],
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "proficiency",
      title: "Proficiency (%)",
      type: "number",
      description: "Skill proficiency level from 0-100",
      validation: (Rule: any) => Rule.min(0).max(100),
    },
  ],
};