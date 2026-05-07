const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const seedData = require('./data/seed-data');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Data directory
const dataDir = path.join(__dirname, 'data');

// Ensure data directory exists
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// File paths
const projectsFile = path.join(dataDir, 'projects.json');
const skillsFile = path.join(dataDir, 'skills.json');
const certificatesFile = path.join(dataDir, 'certificates.json');

// Initialize files if they don't exist
const initializeFiles = () => {
  if (!fs.existsSync(projectsFile)) {
    fs.writeFileSync(projectsFile, JSON.stringify([], null, 2));
  }
  if (!fs.existsSync(skillsFile)) {
    fs.writeFileSync(skillsFile, JSON.stringify([], null, 2));
  }
  if (!fs.existsSync(certificatesFile)) {
    fs.writeFileSync(certificatesFile, JSON.stringify([], null, 2));
  }
};

initializeFiles();

// Utility functions
const readData = (file) => {
  try {
    return JSON.parse(fs.readFileSync(file, 'utf-8'));
  } catch (error) {
    return [];
  }
};

const writeData = (file, data) => {
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
};

const generateId = () => {
  return Math.random().toString(36).substr(2, 9);
};

const mergeById = (baseItems, incomingItems) => {
  const itemsById = new Map();

  baseItems.forEach((item) => {
    itemsById.set(item._id, item);
  });

  incomingItems.forEach((item) => {
    itemsById.set(item._id, item);
  });

  return Array.from(itemsById.values());
};

const seedFileIfNeeded = (file, defaults) => {
  const existing = readData(file);
  if (existing.length === 0) {
    writeData(file, defaults);
  }
};

seedFileIfNeeded(projectsFile, seedData.projects);
seedFileIfNeeded(skillsFile, seedData.skills);
seedFileIfNeeded(certificatesFile, seedData.certificates);

// ==================== PROJECTS ====================

app.get('/api/projects', (req, res) => {
  const projects = readData(projectsFile);
  res.json(projects);
});

app.post('/api/projects', (req, res) => {
  try {
    const projects = readData(projectsFile);
    const newProject = {
      _id: generateId(),
      _type: 'project',
      _createdAt: new Date().toISOString(),
      _updatedAt: new Date().toISOString(),
      ...req.body,
    };
    projects.push(newProject);
    writeData(projectsFile, projects);
    res.json(newProject);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.patch('/api/projects/:id', (req, res) => {
  try {
    const projects = readData(projectsFile);
    const projectIndex = projects.findIndex((p) => p._id === req.params.id);

    if (projectIndex === -1) {
      return res.status(404).json({ error: 'Project not found' });
    }

    projects[projectIndex] = {
      ...projects[projectIndex],
      ...req.body,
      _updatedAt: new Date().toISOString(),
    };

    writeData(projectsFile, projects);
    res.json(projects[projectIndex]);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.delete('/api/projects/:id', (req, res) => {
  try {
    const projects = readData(projectsFile);
    const filteredProjects = projects.filter((p) => p._id !== req.params.id);

    if (filteredProjects.length === projects.length) {
      return res.status(404).json({ error: 'Project not found' });
    }

    writeData(projectsFile, filteredProjects);
    res.json({ message: 'Project deleted' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ==================== SKILLS ====================

app.get('/api/skills', (req, res) => {
  const skills = readData(skillsFile);
  res.json(skills);
});

app.post('/api/skills', (req, res) => {
  try {
    const skills = readData(skillsFile);
    const newSkill = {
      _id: generateId(),
      _type: 'skill',
      _createdAt: new Date().toISOString(),
      _updatedAt: new Date().toISOString(),
      ...req.body,
    };
    skills.push(newSkill);
    writeData(skillsFile, skills);
    res.json(newSkill);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.patch('/api/skills/:id', (req, res) => {
  try {
    const skills = readData(skillsFile);
    const skillIndex = skills.findIndex((s) => s._id === req.params.id);

    if (skillIndex === -1) {
      return res.status(404).json({ error: 'Skill not found' });
    }

    skills[skillIndex] = {
      ...skills[skillIndex],
      ...req.body,
      _updatedAt: new Date().toISOString(),
    };

    writeData(skillsFile, skills);
    res.json(skills[skillIndex]);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.delete('/api/skills/:id', (req, res) => {
  try {
    const skills = readData(skillsFile);
    const filteredSkills = skills.filter((s) => s._id !== req.params.id);

    if (filteredSkills.length === skills.length) {
      return res.status(404).json({ error: 'Skill not found' });
    }

    writeData(skillsFile, filteredSkills);
    res.json({ message: 'Skill deleted' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ==================== CERTIFICATES ====================

app.get('/api/certificates', (req, res) => {
  const certificates = readData(certificatesFile);
  res.json(certificates);
});

app.post('/api/certificates', (req, res) => {
  try {
    const certificates = readData(certificatesFile);
    const newCertificate = {
      _id: generateId(),
      _type: 'certificate',
      _createdAt: new Date().toISOString(),
      _updatedAt: new Date().toISOString(),
      ...req.body,
    };
    certificates.push(newCertificate);
    writeData(certificatesFile, certificates);
    res.json(newCertificate);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.patch('/api/certificates/:id', (req, res) => {
  try {
    const certificates = readData(certificatesFile);
    const certIndex = certificates.findIndex((c) => c._id === req.params.id);

    if (certIndex === -1) {
      return res.status(404).json({ error: 'Certificate not found' });
    }

    certificates[certIndex] = {
      ...certificates[certIndex],
      ...req.body,
      _updatedAt: new Date().toISOString(),
    };

    writeData(certificatesFile, certificates);
    res.json(certificates[certIndex]);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.delete('/api/certificates/:id', (req, res) => {
  try {
    const certificates = readData(certificatesFile);
    const filteredCerts = certificates.filter((c) => c._id !== req.params.id);

    if (filteredCerts.length === certificates.length) {
      return res.status(404).json({ error: 'Certificate not found' });
    }

    writeData(certificatesFile, filteredCerts);
    res.json({ message: 'Certificate deleted' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ==================== HEALTH CHECK ====================

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`\n✅ Portfolio API Server running at http://localhost:${PORT}`);
  console.log(`📁 Data stored in: ${dataDir}\n`);
});
