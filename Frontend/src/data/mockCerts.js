// Mock certificate data for CertifyHub
export const mockCertificates = [
  {
    id: "cert_001",
    title: "Spring Boot Professional Certificate",
    category: "Development",
    subcategory: "Backend",
    issuer: "Coursera",
    date: "2025-06-12",
    fileUrl: "/mock/certs/springboot.pdf",
    author: {
      id: "u_001",
      name: "Radhe Ambhure",
      jobTitle: "Software Engineer",
      unit: "Platform",
      email: "radhe@example.com",
      avatarUrl: "/avatars/radhe.jpg"
    },
    remarks: "Completed the Coursera specialization on Spring Boot. This course covered advanced topics including security, testing, and microservices architecture. Helpful resources: https://spring.io/guides",
    links: ["https://course.example.com", "https://spring.io/guides"],
    tags: ["spring", "backend", "java", "microservices"],
    contactsEnabled: true,
    likes: 12,
    views: 123,
    visibility: "public"
  },
  {
    id: "cert_002",
    title: "AWS Solutions Architect Associate",
    category: "Cloud",
    subcategory: "Architecture",
    issuer: "Amazon Web Services",
    date: "2025-05-20",
    fileUrl: "/mock/certs/aws-saa.pdf",
    author: {
      id: "u_002",
      name: "Sarah Chen",
      jobTitle: "Cloud Architect",
      unit: "Infrastructure",
      email: "sarah.chen@example.com",
      avatarUrl: "/avatars/sarah.jpg"
    },
    remarks: "Comprehensive certification covering AWS cloud services, architecture patterns, and best practices. Highly recommend the official AWS training materials.",
    links: ["https://aws.amazon.com/certification/", "https://acloud.guru"],
    tags: ["aws", "cloud", "architecture", "solutions"],
    contactsEnabled: true,
    likes: 24,
    views: 234,
    visibility: "public"
  },
  {
    id: "cert_003",
    title: "React Advanced Patterns",
    category: "Development",
    subcategory: "Frontend",
    issuer: "Epic React",
    date: "2025-04-15",
    fileUrl: "/mock/certs/react-advanced.pdf",
    author: {
      id: "u_003",
      name: "Mike Rodriguez",
      jobTitle: "Frontend Developer",
      unit: "User Experience",
      email: "mike.r@example.com",
      avatarUrl: "/avatars/mike.jpg"
    },
    remarks: "Advanced React patterns including compound components, render props, and custom hooks. Excellent for senior developers looking to level up.",
    links: ["https://epicreact.dev", "https://reactjs.org/docs"],
    tags: ["react", "frontend", "javascript", "patterns"],
    contactsEnabled: true,
    likes: 18,
    views: 156,
    visibility: "public"
  },
  {
    id: "cert_004",
    title: "Cybersecurity Fundamentals",
    category: "Security",
    subcategory: "General",
    issuer: "CompTIA",
    date: "2025-03-28",
    fileUrl: "/mock/certs/security-plus.pdf",
    author: {
      id: "u_004",
      name: "Alex Thompson",
      jobTitle: "Security Analyst",
      unit: "Security",
      email: "alex.t@example.com",
      avatarUrl: "/avatars/alex.jpg"
    },
    remarks: "Foundation certification covering network security, cryptography, and incident response. Great starting point for security careers.",
    links: ["https://comptia.org", "https://cybrary.it"],
    tags: ["security", "comptia", "networking", "fundamentals"],
    contactsEnabled: true,
    likes: 15,
    views: 189,
    visibility: "public"
  },
  {
    id: "cert_005",
    title: "Data Science with Python",
    category: "Data Science",
    subcategory: "Analytics",
    issuer: "Coursera",
    date: "2025-02-14",
    fileUrl: "/mock/certs/data-science-python.pdf",
    author: {
      id: "u_005",
      name: "Emily Wang",
      jobTitle: "Data Scientist",
      unit: "Analytics",
      email: "emily.w@example.com",
      avatarUrl: "/avatars/emily.jpg"
    },
    remarks: "Comprehensive course covering pandas, numpy, matplotlib, and scikit-learn. Perfect for analysts transitioning to data science.",
    links: ["https://coursera.org/learn/python-data-science", "https://kaggle.com/learn"],
    tags: ["python", "data-science", "pandas", "machine-learning"],
    contactsEnabled: true,
    likes: 31,
    views: 278,
    visibility: "public"
  },
  {
    id: "cert_006",
    title: "Kubernetes Administration",
    category: "DevOps",
    subcategory: "Container Orchestration",
    issuer: "Cloud Native Computing Foundation",
    date: "2025-01-30",
    fileUrl: "/mock/certs/cka.pdf",
    author: {
      id: "u_006",
      name: "David Kim",
      jobTitle: "DevOps Engineer",
      unit: "Platform",
      email: "david.k@example.com",
      avatarUrl: "/avatars/david.jpg"
    },
    remarks: "Hands-on certification for Kubernetes cluster administration. Covers installation, configuration, and troubleshooting.",
    links: ["https://kubernetes.io/training/", "https://github.com/cncf/curriculum"],
    tags: ["kubernetes", "devops", "containers", "orchestration"],
    contactsEnabled: true,
    likes: 22,
    views: 167,
    visibility: "public"
  },
  {
    id: "cert_007",
    title: "Product Management Fundamentals",
    category: "Business",
    subcategory: "Product",
    issuer: "Product School",
    date: "2024-12-10",
    fileUrl: "/mock/certs/product-mgmt.pdf",
    author: {
      id: "u_007",
      name: "Lisa Martinez",
      jobTitle: "Product Manager",
      unit: "Product",
      email: "lisa.m@example.com",
      avatarUrl: "/avatars/lisa.jpg"
    },
    remarks: "Essential skills for product management including user research, roadmap planning, and stakeholder communication.",
    links: ["https://productschool.com", "https://productplan.com/learn/"],
    tags: ["product-management", "strategy", "user-research", "roadmap"],
    contactsEnabled: true,
    likes: 19,
    views: 145,
    visibility: "public"
  },
  {
    id: "cert_008",
    title: "Machine Learning Specialization",
    category: "Data Science",
    subcategory: "Machine Learning",
    issuer: "Stanford Online",
    date: "2024-11-22",
    fileUrl: "/mock/certs/ml-stanford.pdf",
    author: {
      id: "u_008",
      name: "James Wilson",
      jobTitle: "ML Engineer",
      unit: "AI Research",
      email: "james.w@example.com",
      avatarUrl: "/avatars/james.jpg"
    },
    remarks: "Stanford's comprehensive ML course covering supervised and unsupervised learning, neural networks, and practical applications.",
    links: ["https://coursera.org/learn/machine-learning", "https://cs229.stanford.edu"],
    tags: ["machine-learning", "stanford", "neural-networks", "algorithms"],
    contactsEnabled: true,
    likes: 45,
    views: 389,
    visibility: "public"
  },
  {
    id: "cert_009",
    title: "UX Design Certificate",
    category: "Design",
    subcategory: "User Experience",
    issuer: "Google",
    date: "2024-10-15",
    fileUrl: "/mock/certs/google-ux.pdf",
    author: {
      id: "u_009",
      name: "Anna Foster",
      jobTitle: "UX Designer",
      unit: "User Experience",
      email: "anna.f@example.com",
      avatarUrl: "/avatars/anna.jpg"
    },
    remarks: "Google's UX Design Certificate covering user research, wireframing, prototyping, and usability testing.",
    links: ["https://grow.google/certificates/ux-design/", "https://figma.com/resources/"],
    tags: ["ux-design", "google", "figma", "user-research"],
    contactsEnabled: true,
    likes: 28,
    views: 203,
    visibility: "public"
  },
  {
    id: "cert_010",
    title: "Agile Project Management",
    category: "Management",
    subcategory: "Project Management",
    issuer: "Scrum Alliance",
    date: "2024-09-08",
    fileUrl: "/mock/certs/scrum-master.pdf",
    author: {
      id: "u_010",
      name: "Robert Brown",
      jobTitle: "Scrum Master",
      unit: "Delivery",
      email: "robert.b@example.com",
      avatarUrl: "/avatars/robert.jpg"
    },
    remarks: "Certified Scrum Master training covering agile principles, sprint planning, and team facilitation techniques.",
    links: ["https://scrumalliance.org", "https://agilemanifesto.org"],
    tags: ["agile", "scrum", "project-management", "facilitation"],
    contactsEnabled: true,
    likes: 16,
    views: 134,
    visibility: "public"
  }
];

// Categories for filtering
export const categories = [
  { value: "Development", label: "Development", count: 2 },
  { value: "Cloud", label: "Cloud", count: 1 },
  { value: "Security", label: "Security", count: 1 },
  { value: "Data Science", label: "Data Science", count: 2 },
  { value: "DevOps", label: "DevOps", count: 1 },
  { value: "Business", label: "Business", count: 1 },
  { value: "Design", label: "Design", count: 1 },
  { value: "Management", label: "Management", count: 1 }
];

// Popular tags
export const popularTags = [
  "react", "javascript", "python", "aws", "kubernetes", "machine-learning", 
  "security", "agile", "ux-design", "data-science", "backend", "frontend"
];

// Units/Departments
export const units = [
  "Platform", "Infrastructure", "User Experience", "Security", "Analytics", 
  "Product", "AI Research", "Delivery"
];

// Helper function to get certificates by category
export const getCertificatesByCategory = (category) => {
  return mockCertificates.filter(cert => cert.category === category);
};

// Helper function to get certificates by author
export const getCertificatesByAuthor = (authorId) => {
  return mockCertificates.filter(cert => cert.author.id === authorId);
};

// Helper function to search certificates
export const searchCertificates = (query) => {
  const searchTerm = query.toLowerCase();
  return mockCertificates.filter(cert => 
    cert.title.toLowerCase().includes(searchTerm) ||
    cert.category.toLowerCase().includes(searchTerm) ||
    cert.issuer.toLowerCase().includes(searchTerm) ||
    cert.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
    cert.author.name.toLowerCase().includes(searchTerm)
  );
};

