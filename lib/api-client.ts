const API_BASE_URL = 'http://localhost:3001/api';

// ==================== PROJECTS ====================

export const projectsAPI = {
  async getAll() {
    const res = await fetch(`${API_BASE_URL}/projects`);
    if (!res.ok) throw new Error('Failed to fetch projects');
    return res.json();
  },

  async create(data: any) {
    const res = await fetch(`${API_BASE_URL}/projects`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to create project');
    return res.json();
  },

  async update(id: string, data: any) {
    const res = await fetch(`${API_BASE_URL}/projects/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to update project');
    return res.json();
  },

  async delete(id: string) {
    const res = await fetch(`${API_BASE_URL}/projects/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to delete project');
    return res.json();
  },
};

// ==================== SKILLS ====================

export const skillsAPI = {
  async getAll() {
    const res = await fetch(`${API_BASE_URL}/skills`);
    if (!res.ok) throw new Error('Failed to fetch skills');
    return res.json();
  },

  async create(data: any) {
    const res = await fetch(`${API_BASE_URL}/skills`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to create skill');
    return res.json();
  },

  async update(id: string, data: any) {
    const res = await fetch(`${API_BASE_URL}/skills/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to update skill');
    return res.json();
  },

  async delete(id: string) {
    const res = await fetch(`${API_BASE_URL}/skills/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to delete skill');
    return res.json();
  },
};

// ==================== CERTIFICATES ====================

export const certificatesAPI = {
  async getAll() {
    const res = await fetch(`${API_BASE_URL}/certificates`);
    if (!res.ok) throw new Error('Failed to fetch certificates');
    return res.json();
  },

  async create(data: any) {
    const res = await fetch(`${API_BASE_URL}/certificates`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to create certificate');
    return res.json();
  },

  async update(id: string, data: any) {
    const res = await fetch(`${API_BASE_URL}/certificates/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to update certificate');
    return res.json();
  },

  async delete(id: string) {
    const res = await fetch(`${API_BASE_URL}/certificates/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to delete certificate');
    return res.json();
  },
};
