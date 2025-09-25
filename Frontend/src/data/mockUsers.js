// Mock user data for CertifyHub
export const mockUsers = [
  {
    id: "u_001",
    name: "Radhe Ambhure",
    jobTitle: "Software Engineer",
    unit: "Platform",
    email: "radhe@example.com",
    avatarUrl: "/avatars/radhe.jpg",
    isManager: false,
    joinDate: "2023-03-15",
    certificationCount: 3,
    bio: "Passionate software engineer with expertise in Spring Boot and backend development. Love building scalable systems and sharing knowledge with the team.",
    skills: ["Java", "Spring Boot", "Microservices", "API Development", "Docker", "Kubernetes"],
    socialLinks: {
      linkedin: "https://linkedin.com/in/radhe-ambhure",
      github: "https://github.com/radheambhure"
    }
  },
  {
    id: "u_002",
    name: "Sarah Chen",
    jobTitle: "Cloud Architect",
    unit: "Infrastructure",
    email: "sarah.chen@example.com",
    avatarUrl: "/avatars/sarah.jpg",
    isManager: true,
    joinDate: "2022-01-10",
    certificationCount: 5,
    bio: "Senior Cloud Architect specializing in AWS solutions and infrastructure automation. Leading the cloud transformation initiative at our organization.",
    skills: ["AWS", "Terraform", "CloudFormation", "Docker", "Kubernetes", "Python", "Infrastructure as Code"],
    socialLinks: {
      linkedin: "https://linkedin.com/in/sarah-chen-cloud",
      twitter: "https://twitter.com/sarahcloudarch"
    }
  },
  {
    id: "u_003",
    name: "Mike Rodriguez",
    jobTitle: "Frontend Developer",
    unit: "User Experience",
    email: "mike.r@example.com",
    avatarUrl: "/avatars/mike.jpg",
    isManager: false,
    joinDate: "2023-07-20",
    certificationCount: 4,
    bio: "Frontend developer passionate about creating amazing user experiences with React and modern web technologies.",
    skills: ["React", "JavaScript", "TypeScript", "CSS", "HTML", "Redux", "Next.js"],
    socialLinks: {
      github: "https://github.com/mikerodriguez",
      portfolio: "https://mikerodev.com"
    }
  },
  {
    id: "u_004",
    name: "Alex Thompson",
    jobTitle: "Security Analyst",
    unit: "Security",
    email: "alex.t@example.com",
    avatarUrl: "/avatars/alex.jpg",
    isManager: false,
    joinDate: "2022-11-05",
    certificationCount: 6,
    bio: "Cybersecurity professional focused on threat detection and incident response. Continuously learning about emerging security threats.",
    skills: ["Network Security", "Incident Response", "SIEM", "Penetration Testing", "Risk Assessment", "Compliance"],
    socialLinks: {
      linkedin: "https://linkedin.com/in/alex-thompson-security"
    }
  },
  {
    id: "u_005",
    name: "Emily Wang",
    jobTitle: "Data Scientist",
    unit: "Analytics",
    email: "emily.w@example.com",
    avatarUrl: "/avatars/emily.jpg",
    isManager: true,
    joinDate: "2021-09-12",
    certificationCount: 7,
    bio: "Data scientist with a passion for extracting insights from complex datasets. Leading data-driven decision making across the organization.",
    skills: ["Python", "R", "Machine Learning", "Statistics", "SQL", "Tableau", "TensorFlow", "Scikit-learn"],
    socialLinks: {
      linkedin: "https://linkedin.com/in/emily-wang-data",
      github: "https://github.com/emilywang"
    }
  },
  {
    id: "u_006",
    name: "David Kim",
    jobTitle: "DevOps Engineer",
    unit: "Platform",
    email: "david.k@example.com",
    avatarUrl: "/avatars/david.jpg",
    isManager: false,
    joinDate: "2022-05-18",
    certificationCount: 5,
    bio: "DevOps engineer focused on container orchestration and CI/CD automation. Love building reliable deployment pipelines.",
    skills: ["Kubernetes", "Docker", "Jenkins", "GitLab CI", "Monitoring", "Logging", "Infrastructure Automation"],
    socialLinks: {
      github: "https://github.com/davidkim-devops",
      linkedin: "https://linkedin.com/in/david-kim-devops"
    }
  },
  {
    id: "u_007",
    name: "Lisa Martinez",
    jobTitle: "Product Manager",
    unit: "Product",
    email: "lisa.m@example.com",
    avatarUrl: "/avatars/lisa.jpg",
    isManager: true,
    joinDate: "2021-12-03",
    certificationCount: 4,
    bio: "Product manager driving user-centric product development. Passionate about understanding customer needs and delivering value.",
    skills: ["Product Strategy", "User Research", "Roadmap Planning", "Agile Methodologies", "Analytics", "Stakeholder Management"],
    socialLinks: {
      linkedin: "https://linkedin.com/in/lisa-martinez-pm",
      twitter: "https://twitter.com/lisamartinezpm"
    }
  },
  {
    id: "u_008",
    name: "James Wilson",
    jobTitle: "ML Engineer",
    unit: "AI Research",
    email: "james.w@example.com",
    avatarUrl: "/avatars/james.jpg",
    isManager: false,
    joinDate: "2023-02-14",
    certificationCount: 6,
    bio: "Machine learning engineer working on cutting-edge AI solutions. Fascinated by the intersection of research and practical applications.",
    skills: ["Machine Learning", "Deep Learning", "Python", "TensorFlow", "PyTorch", "MLOps", "Computer Vision", "NLP"],
    socialLinks: {
      github: "https://github.com/jameswilson-ml",
      linkedin: "https://linkedin.com/in/james-wilson-ml"
    }
  },
  {
    id: "u_009",
    name: "Anna Foster",
    jobTitle: "UX Designer",
    unit: "User Experience",
    email: "anna.f@example.com",
    avatarUrl: "/avatars/anna.jpg",
    isManager: true,
    joinDate: "2022-08-22",
    certificationCount: 3,
    bio: "UX designer passionate about creating intuitive and accessible user experiences. Always advocating for user-centered design principles.",
    skills: ["User Research", "Wireframing", "Prototyping", "Figma", "Sketch", "Usability Testing", "Design Systems"],
    socialLinks: {
      portfolio: "https://annafoster.design",
      linkedin: "https://linkedin.com/in/anna-foster-ux",
      dribbble: "https://dribbble.com/annafoster"
    }
  },
  {
    id: "u_010",
    name: "Robert Brown",
    jobTitle: "Scrum Master",
    unit: "Delivery",
    email: "robert.b@example.com",
    avatarUrl: "/avatars/robert.jpg",
    isManager: false,
    joinDate: "2021-06-30",
    certificationCount: 4,
    bio: "Certified Scrum Master helping teams deliver value through agile practices. Passionate about continuous improvement and team dynamics.",
    skills: ["Scrum", "Agile Coaching", "Team Facilitation", "Project Management", "Stakeholder Management", "Process Improvement"],
    socialLinks: {
      linkedin: "https://linkedin.com/in/robert-brown-scrum"
    }
  },
  // Additional team members for better demo data
  {
    id: "u_011",
    name: "Jessica Park",
    jobTitle: "Backend Developer",
    unit: "Platform",
    email: "jessica.p@example.com",
    avatarUrl: "/avatars/jessica.jpg",
    isManager: false,
    joinDate: "2023-04-10",
    certificationCount: 2,
    bio: "Backend developer specializing in scalable API development and database optimization.",
    skills: ["Node.js", "Python", "PostgreSQL", "MongoDB", "REST APIs", "GraphQL"],
    socialLinks: {
      github: "https://github.com/jessicapark"
    }
  },
  {
    id: "u_012",
    name: "Carlos Santos",
    jobTitle: "Infrastructure Engineer",
    unit: "Infrastructure",
    email: "carlos.s@example.com",
    avatarUrl: "/avatars/carlos.jpg",
    isManager: false,
    joinDate: "2022-09-15",
    certificationCount: 3,
    bio: "Infrastructure engineer focused on cloud migration and automation solutions.",
    skills: ["AWS", "Azure", "Terraform", "Ansible", "Linux", "Networking"],
    socialLinks: {
      linkedin: "https://linkedin.com/in/carlos-santos-infra"
    }
  },
  {
    id: "u_013",
    name: "Rachel Kim",
    jobTitle: "Data Analyst",
    unit: "Analytics",
    email: "rachel.k@example.com",
    avatarUrl: "/avatars/rachel.jpg",
    isManager: false,
    joinDate: "2023-01-20",
    certificationCount: 3,
    bio: "Data analyst passionate about turning data into actionable business insights.",
    skills: ["SQL", "Python", "Tableau", "Excel", "Statistics", "Data Visualization"],
    socialLinks: {
      linkedin: "https://linkedin.com/in/rachel-kim-analyst"
    }
  },
  {
    id: "u_014",
    name: "Tom Johnson",
    jobTitle: "Security Engineer",
    unit: "Security",
    email: "tom.j@example.com",
    avatarUrl: "/avatars/tom.jpg",
    isManager: true,
    joinDate: "2021-04-05",
    certificationCount: 8,
    bio: "Senior security engineer leading our cybersecurity initiatives and compliance efforts.",
    skills: ["Information Security", "Compliance", "Risk Management", "Security Architecture", "Cloud Security"],
    socialLinks: {
      linkedin: "https://linkedin.com/in/tom-johnson-security"
    }
  },
  {
    id: "u_015",
    name: "Maya Patel",
    jobTitle: "Product Designer",
    unit: "User Experience",
    email: "maya.p@example.com",
    avatarUrl: "/avatars/maya.jpg",
    isManager: false,
    joinDate: "2023-06-01",
    certificationCount: 2,
    bio: "Product designer focused on creating beautiful and functional user interfaces.",
    skills: ["UI Design", "Design Systems", "Adobe Creative Suite", "Figma", "User Testing"],
    socialLinks: {
      portfolio: "https://mayapatel.design",
      behance: "https://behance.net/mayapatel"
    }
  }
];

// Current user (used for authentication context)
export const currentUser = mockUsers[0]; // Radhe Ambhure

// Helper function to get users by unit
export const getUsersByUnit = (unit) => {
  return mockUsers.filter(user => user.unit === unit);
};

// Helper function to get user by ID
export const getUserById = (id) => {
  return mockUsers.find(user => user.id === id);
};

// Helper function to get all units
export const getAllUnits = () => {
  return [...new Set(mockUsers.map(user => user.unit))];
};

// Helper function to get managers
export const getManagers = () => {
  return mockUsers.filter(user => user.isManager);
};

// Helper function to search users
export const searchUsers = (query) => {
  const searchTerm = query.toLowerCase();
  return mockUsers.filter(user => 
    user.name.toLowerCase().includes(searchTerm) ||
    user.jobTitle.toLowerCase().includes(searchTerm) ||
    user.unit.toLowerCase().includes(searchTerm) ||
    user.skills?.some(skill => skill.toLowerCase().includes(searchTerm))
  );
};

// Helper function to get team statistics
export const getTeamStats = () => {
  return {
    totalUsers: mockUsers.length,
    totalCertifications: mockUsers.reduce((sum, user) => sum + user.certificationCount, 0),
    averageCertifications: (mockUsers.reduce((sum, user) => sum + user.certificationCount, 0) / mockUsers.length).toFixed(1),
    managerCount: mockUsers.filter(user => user.isManager).length,
    unitsCount: getAllUnits().length
  };
};
