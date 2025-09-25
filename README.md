# CertifyHub - Employee Certification Repository

A modern, responsive React frontend application for managing and showcasing employee certifications. Built with React, Tailwind CSS, and Framer Motion for a polished, production-ready user experience.

![CertifyHub](https://img.shields.io/badge/React-18.2.0-blue)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4.11-38B2AC)
![Framer Motion](https://img.shields.io/badge/FramerMotion-11.5.4-FF0055)
![Recharts](https://img.shields.io/badge/Recharts-2.12.7-8884D8)

## 🚀 Features

### Core Functionality
- **Certificate Management**: Add, edit, delete, and view certificates
- **Smart Search & Filtering**: Search by title, category, issuer, tags, or author with real-time filtering
- **Analytics Dashboard**: Comprehensive charts showing certification trends and insights
- **User Profiles**: Detailed user profiles with skills, bio, and certification history
- **Manager Dashboard**: Team certification tracking and reporting for managers

### User Experience
- **Responsive Design**: Mobile-first approach with seamless tablet and desktop experience
- **Modern UI**: Soft shadows, rounded cards, gradient accents, and thoughtful spacing
- **Smooth Animations**: Framer Motion powered micro-interactions and transitions
- **Accessible**: ARIA attributes, keyboard navigation, and proper color contrast
- **Toast Notifications**: User feedback for actions and error handling

### Technical Features
- **Mock API**: Fully functional mock data layer simulating real backend
- **State Management**: React Context for global state with TypeScript-like prop validation
- **Custom Hooks**: Reusable hooks for debounced search, mock API calls, and more
- **Error Boundaries**: Graceful error handling and fallback UI
- **Loading States**: Skeleton loaders and progress indicators

## 📦 Tech Stack

- **Frontend Framework**: React 18.2.0 with functional components and hooks
- **Build Tool**: Vite for fast development and optimized builds
- **Styling**: Tailwind CSS for utility-first, consistent styling
- **Animations**: Framer Motion for smooth micro-interactions
- **Charts**: Recharts for beautiful, responsive data visualizations
- **Routing**: React Router v6 for client-side navigation
- **Icons**: Lucide React for consistent, beautiful icons
- **Date Handling**: date-fns for robust date formatting and manipulation

## 🎯 Project Structure

```
src/
├── assets/                 # Static assets (images, icons)
├── components/            # Reusable React components
│   ├── Skeletons/        # Loading skeleton components
│   ├── NavBar.jsx        # Main navigation component
│   ├── CertificateCard.jsx # Certificate display card
│   ├── CertificateForm.jsx # Add/edit certificate form
│   ├── CertificateGrid.jsx # Grid layout for certificates
│   ├── FiltersPanel.jsx  # Search and filter sidebar
│   ├── ProfileDrawer.jsx # User profile drawer
│   ├── ErrorBoundary.jsx # Error handling component
│   └── Toast.jsx         # Notification system
├── pages/                 # Page components
│   ├── Feed.jsx          # Main certificate feed
│   ├── MyCerts.jsx       # User's certificates
│   ├── AddCertificate.jsx # Add/edit certificate page
│   ├── CertificateDetails.jsx # Certificate detail view
│   ├── Analytics.jsx     # Analytics dashboard
│   ├── ManagerView.jsx   # Manager dashboard
│   ├── Profile.jsx       # User profile page
│   └── NotFound.jsx      # 404 page
├── context/               # React Context providers
│   ├── AuthContext.jsx   # Authentication state
│   └── CertContext.jsx   # Certificate data state
├── hooks/                 # Custom React hooks
│   ├── useDebouncedSearch.js # Debounced search hook
│   └── useMockApi.js     # Mock API utilities
├── data/                  # Mock data and utilities
│   ├── mockCerts.js      # Sample certificate data
│   └── mockUsers.js      # Sample user data
├── utils/                 # Utility functions
│   └── formatDate.js     # Date formatting utilities
├── App.jsx               # Main app component
├── main.jsx              # App entry point
└── index.css             # Global styles and Tailwind imports
```

## 🚀 Getting Started

### Prerequisites
- Node.js 16.0 or higher
- npm or yarn package manager

### Installation

1. **Clone or download the project**
   ```bash
   cd path/to/project
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000` to view the application.

### Build for Production

```bash
npm run build
```

The optimized build will be available in the `dist/` directory.

## 🎨 Design System

### Color Palette
- **Primary**: Teal gradient (#14b8a6 to #0d9488)
- **Secondary**: Purple gradient (#d946ef to #c026d3)
- **Accent**: Coral/Red for actions (#ef4444)
- **Neutral**: Comprehensive gray scale for text and backgrounds
- **Semantic**: Green for success, Red for errors, Yellow for warnings, Blue for info

### Typography
- **Font Family**: Inter (Google Fonts)
- **Scale**: 
  - Headings: 3xl, 2xl, xl, lg
  - Body: base, sm, xs
  - Weight: 300, 400, 500, 600, 700

### Components
- **Cards**: 12-16px padding, 12px border-radius, soft shadows
- **Buttons**: Primary gradient, secondary outline, consistent hover states
- **Inputs**: Focus rings, proper validation states
- **Badges**: Category-specific colors, rounded corners

## 🗂️ Data Models

### Certificate Model
```javascript
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
  remarks: "Comprehensive course covering...",
  links: ["https://course.example.com"],
  tags: ["spring", "backend", "java"],
  contactsEnabled: true,
  likes: 12,
  views: 123,
  visibility: "public"
}
```

### User Model
```javascript
{
  id: "u_001",
  name: "Radhe Ambhure",
  jobTitle: "Software Engineer",
  unit: "Platform",
  email: "radhe@example.com",
  avatarUrl: "/avatars/radhe.jpg",
  bio: "Full-stack developer with 3+ years experience...",
  joinDate: "2022-01-15",
  certificationCount: 3,
  isManager: false,
  skills: ["React", "Spring Boot", "Java"],
  socialLinks: {
    linkedin: "https://linkedin.com/in/radhe-ambhure",
    github: "https://github.com/radhe"
  }
}
```

## 🔧 Configuration

### Mock Data Customization

To modify the mock data:

1. **Certificates**: Edit `src/data/mockCerts.js`
   - Add/remove certificates
   - Modify categories and tags
   - Update sample data

2. **Users**: Edit `src/data/mockUsers.js`
   - Add/remove users
   - Modify units and roles
   - Update user profiles

### Styling Customization

1. **Colors**: Modify `tailwind.config.js` theme.extend.colors
2. **Fonts**: Update font imports in `index.html` and `tailwind.config.js`
3. **Components**: Edit component styles in `src/index.css`

## 📱 Pages & Routes

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | Feed | Main certificate feed with search and filters |
| `/my` | MyCerts | User's own certificates with edit/delete |
| `/add` | AddCertificate | Add new certificate form |
| `/cert/:id` | CertificateDetails | Detailed certificate view |
| `/analytics` | Analytics | Data visualization dashboard |
| `/manager` | ManagerView | Team management for managers |
| `/profile/:userId` | Profile | User profile and certificates |

## 🎭 Key Components

### CertificateCard
Displays certificate information in multiple variants (default, wide, large) with like/bookmark functionality.

### FiltersPanel
Comprehensive filtering interface with categories, tags, units, date ranges, and sorting options.

### CertificateForm
Complex form with file upload, validation, tags management, and settings configuration.

### Analytics Dashboard
Interactive charts using Recharts showing certification trends, category distribution, and KPIs.

### NavBar
Responsive navigation with search, user menu, and mobile hamburger menu.

## 🔄 State Management

### AuthContext
- User authentication state
- Permission checking
- Profile management
- Login/logout simulation

### CertContext
- Certificate data management
- Search and filtering state
- CRUD operations
- Analytics data generation

## 🎨 Animations & Interactions

### Framer Motion Features
- **Page Transitions**: Smooth enter/exit animations
- **Card Interactions**: Hover effects and stagger animations
- **Modal/Drawer**: Slide and fade transitions
- **Loading States**: Skeleton animations
- **Micro-interactions**: Button hover, form focus states

### Interaction Patterns
- **Hover Effects**: Card lift, button color changes
- **Click Feedback**: Button press animations
- **Loading States**: Progress bars, spinners, skeletons
- **Success/Error**: Toast notifications with animations

## 🔍 Search & Filtering

### Search Capabilities
- **Global Search**: Search across title, category, issuer, tags, author
- **Debounced Input**: 300ms delay for performance
- **Real-time Results**: Instant filtering as you type

### Filter Options
- **Categories**: Multiple selection with counts
- **Tags**: Popular tags with toggle selection
- **Units**: Department-based filtering
- **Date Range**: Custom date range picker
- **Sorting**: Date, likes, views, title with asc/desc

## 📊 Analytics Features

### Chart Types
- **Bar Chart**: Certificates by category
- **Pie Chart**: Top issuers distribution
- **Area Chart**: Certification trends over time
- **Heatmap**: Unit activity visualization

### KPIs
- Total certificates
- Total views and likes
- Active users
- Growth metrics

## 🎯 Accessibility Features

- **ARIA Labels**: Proper labeling for screen readers
- **Keyboard Navigation**: Full keyboard support
- **Focus Management**: Visible focus indicators
- **Color Contrast**: WCAG AA compliant colors
- **Semantic HTML**: Proper heading hierarchy and landmarks

## 🔧 Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linting
npm run lint
```

## 🚀 Deployment

The project is built with Vite and can be deployed to any static hosting service:

1. **Build the project**:
   ```bash
   npm run build
   ```

2. **Deploy the `dist/` folder** to your hosting service:
   - Netlify
   - Vercel
   - GitHub Pages
   - AWS S3 + CloudFront
   - Any static file server

## 🤝 Contributing

### Development Guidelines
1. Follow the existing code structure and naming conventions
2. Use TypeScript-style prop validation with PropTypes if extending
3. Ensure all new components are responsive and accessible
4. Add loading states and error handling for new features
5. Use Tailwind CSS classes consistently
6. Test across different screen sizes

### Adding New Features
1. **Components**: Add to appropriate directory in `src/components/`
2. **Pages**: Add route in `App.jsx` and create component in `src/pages/`
3. **Context**: Extend existing contexts or create new ones if needed
4. **Mock Data**: Update relevant files in `src/data/`

## 📄 License

This project is created as a demonstration and learning resource. Feel free to use and modify as needed.

## 🙏 Acknowledgments

- **React Team** for the amazing framework
- **Tailwind CSS** for the utility-first CSS framework
- **Framer Motion** for smooth animations
- **Recharts** for beautiful charts
- **Lucide** for the icon library
- **Vite** for the blazing fast build tool

---

**Built with ❤️ for the modern web**
