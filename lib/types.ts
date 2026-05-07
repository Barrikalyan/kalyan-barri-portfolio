export interface Project {
  _id: string
  title: string
  description: string
  image: {
    asset: {
      url: string
    }
  }
  technologies: string[]
  githubUrl: string
  liveUrl: string
  featured: boolean
}

export interface Certificate {
  _id: string
  title: string
  issuer: string
  date: string
  image: {
    asset: {
      url: string
    }
  }
  certificateUrl?: string
}

export interface PersonalInfo {
  _id: string
  name: string
  role: string
  bio: string
  email: string
  phone?: string
  image: {
    asset: {
      url: string
    }
  }
  socialLinks: {
    github?: string
    linkedin?: string
    twitter?: string
  }
}

export interface Skill {
  _id: string
  name: string
  category: string
  proficiency?: number
}

export interface SkillsWithProficiency {
  skill: Skill
  proficiency: number
}
