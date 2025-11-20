# 🎉 Birthday Tracker - Frontend

A modern, elegant web application to track and manage birthdays of your friends and family. Built with React 19, TypeScript, and Vite.

![React](https://img.shields.io/badge/React-19.2.0-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-7.2.2-646CFF?logo=vite)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.1.17-38B2AC?logo=tailwind-css)

## ✨ Features

- 🎂 **Birthday Management** - Add, edit, and delete friend birthdays
- 📅 **Upcoming Birthdays** - See who's celebrating soon
- 🔍 **Advanced Filtering** - Search by name and filter by birth month
- 📄 **Pagination** - Handle large friend lists efficiently
- 🌓 **Dark Mode** - Toggle between light and dark themes
- 📱 **Responsive Design** - Works seamlessly on all devices
- 🔐 **Authentication** - Secure login and registration
- 💾 **Persistent Storage** - Your data is saved securely

## 🛠️ Tech Stack

- **Frontend Framework:** React 19.2.0
- **Language:** TypeScript 5.9.3
- **Build Tool:** Vite 7.2.2
- **Styling:** Tailwind CSS 4.1.17
- **UI Components:** shadcn/ui (Radix UI)
- **State Management:** React Context API + TanStack Query 5.90.10
- **Form Handling:** React Hook Form 7.66.1 + Zod 4.1.12
- **HTTP Client:** Axios 1.13.2
- **Date Utilities:** date-fns 4.1.0
- **Routing:** React Router DOM 7.9.6
- **Icons:** Lucide React 0.554.0
- **Notifications:** Sonner 2.0.7

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **pnpm** (v8 or higher) - [Installation Guide](https://pnpm.io/installation)
- **Backend API** - The Birthday Tracker backend must be running

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/OtmaneTouhami/birthday-tracker.git
cd birthday-tracker/frontend
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Environment Setup

Create a `.env` file in the root directory (if needed):

```env
VITE_API_URL=http://localhost:8080
```

> **Note:** The default API URL is configured in `src/services/api.ts`. Update it if your backend runs on a different port.

### 4. Run the Development Server

```bash
pnpm dev
```

The application will start on `http://localhost:5173` (or next available port).

### 5. Build for Production

```bash
pnpm build
```

The optimized production build will be in the `dist/` directory.

### 6. Preview Production Build

```bash
pnpm preview
```

## 📂 Project Structure

```
frontend/
├── public/              # Static assets
├── src/
│   ├── assets/          # Images, fonts, etc.
│   ├── components/      # React components
│   │   ├── auth/        # Authentication components
│   │   ├── friends/     # Friend-related components
│   │   ├── layout/      # Layout components (Navbar, etc.)
│   │   └── ui/          # shadcn/ui components
│   ├── context/         # React Context providers
│   │   ├── AuthContext.tsx
│   │   └── ThemeContext.tsx
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Utility functions
│   ├── pages/           # Page components
│   │   ├── DashboardPage.tsx
│   │   ├── FriendsPage.tsx
│   │   ├── LoginPage.tsx
│   │   ├── ProfilePage.tsx
│   │   └── RegisterPage.tsx
│   ├── routes/          # Route configuration
│   ├── services/        # API services
│   │   ├── api.ts
│   │   ├── authService.ts
│   │   ├── friendService.ts
│   │   └── profileService.ts
│   ├── types/           # TypeScript type definitions
│   ├── utils/           # Helper utilities
│   ├── App.tsx          # Main App component
│   └── main.tsx         # Application entry point
├── index.html           # HTML template
├── package.json         # Dependencies and scripts
├── tsconfig.json        # TypeScript configuration
├── vite.config.ts       # Vite configuration
└── tailwind.config.js   # Tailwind CSS configuration
```

## 🎨 Key Features Explained

### Authentication

- Secure JWT-based authentication
- Protected routes with automatic redirects
- Guest routes (login/register) redirect authenticated users
- Persistent login across sessions

### Friend Management

- CRUD operations for friends
- Search by name
- Filter by birth month
- Pagination (6, 12, 24, or 48 per page)
- Sort by upcoming birthdays

### User Interface

- Modern, elegant design with purple-indigo-blue gradients
- Glassmorphism effects and backdrop blur
- Smooth animations and transitions
- Responsive mobile sidebar
- Toast notifications for user feedback

### Dark Mode

- System preference detection
- Manual toggle with localStorage persistence
- Smooth theme transitions

## 🔧 Available Scripts

| Command        | Description                       |
| -------------- | --------------------------------- |
| `pnpm dev`     | Start development server with HMR |
| `pnpm build`   | Build for production              |
| `pnpm preview` | Preview production build locally  |
| `pnpm lint`    | Run ESLint to check code quality  |

## 🌐 API Integration

The frontend communicates with the backend API at `http://localhost:8080/api` by default.

### API Endpoints Used:

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/friends` - Get all friends
- `GET /api/friends/upcoming` - Get upcoming birthdays
- `POST /api/friends` - Create a friend
- `PUT /api/friends/:id` - Update a friend
- `DELETE /api/friends/:id` - Delete a friend
- `GET /api/profile` - Get user profile
- `PUT /api/profile` - Update user profile
- `PUT /api/profile/password` - Change password
- `DELETE /api/profile` - Delete account

## 🐛 Troubleshooting

### Port Already in Use

If port 5173 is busy:

```bash
# Vite will automatically use the next available port
# Or specify a custom port:
pnpm dev --port 3000
```

### API Connection Issues

- Ensure the backend server is running
- Check the API URL in `src/services/api.ts`
- Verify CORS settings on the backend

### Build Errors

```bash
# Clear node_modules and reinstall
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Otmane Touhami**

- GitHub: [@OtmaneTouhami](https://github.com/OtmaneTouhami)

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for beautiful UI components
- [Lucide](https://lucide.dev/) for icons
- [Tailwind CSS](https://tailwindcss.com/) for styling utilities
- [Vite](https://vitejs.dev/) for blazing fast development
