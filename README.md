# Task Manager

A full-stack task management application with user authentication, priority-based task organization, and a modern responsive UI.

![Task Manager](https://img.shields.io/badge/Stack-MERN-blue)
![TypeScript](https://img.shields.io/badge/Language-TypeScript-blue)
![License](https://img.shields.io/badge/License-MIT-green)

## 📋 Features

- **User Authentication**
  - Secure user registration and login
  - JWT-based authentication with HTTP-only cookies
  - Persistent sessions

- **Task Management**
  - Create, read, update, and delete tasks
  - Mark tasks as complete/incomplete
  - Priority levels: Low, Medium, High

- **Task Organization**
  - Filter tasks by status (Active/Done)
  - Filter tasks by priority
  - Search tasks by name
  - Sort tasks by priority or creation date

- **Dashboard**
  - Task statistics (total, active, completed)
  - Visual progress indicators

- **UI/UX**
  - Dark mode support
  - Responsive design
  - Toast notifications
  - Confetti celebration on task completion

## 🛠 Tech Stack

### Backend

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: Zod, express-validator
- **Logging**: Winston

### Frontend

- **Framework**: React 19
- **Build Tool**: Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **Notifications**: React Toastify
- **Effects**: React Confetti

## 📁 Project Structure

```
Task-Manager/
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma      # Database schema
│   │   └── migrations/        # Database migrations
│   ├── src/
│   │   ├── config/            # Configuration files
│   │   ├── controllers/       # Request handlers
│   │   ├── middlewares/       # Express middlewares
│   │   ├── models/            # Database models
│   │   ├── routes/            # API routes
│   │   ├── types/             # TypeScript types
│   │   ├── server.ts          # Entry point
│   │   └── utils.ts           # Utility functions
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/
│   ├── src/
│   │   ├── components/        # React components
│   │   │   ├── ui/            # Reusable UI components
│   │   │   ├── AddTask.tsx
│   │   │   ├── Login.tsx
│   │   │   ├── Register.tsx
│   │   │   ├── TaskItem.tsx
│   │   │   ├── TaskList.tsx
│   │   │   ├── TaskStats.tsx
│   │   │   └── TaskTabs.tsx
│   │   ├── contexts/          # React contexts
│   │   ├── hooks/             # Custom React hooks
│   │   ├── services/          # API services
│   │   ├── types/             # TypeScript types
│   │   ├── App.tsx            # Main application
│   │   └── main.tsx           # Entry point
│   ├── package.json
│   ├── vite.config.ts
│   └── tailwind.config.js
│
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- PostgreSQL (v14 or higher)
- npm or yarn

### Environment Setup

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd Task-Manager
   ```

2. **Backend Setup**

   ```bash
   cd backend
   npm install
   ```

3. **Create environment file**

   ```bash
   cp .env.example .env
   ```

   Update the `.env` file with your database credentials:

   ```env
   PORT=5001
   DATABASE_URL="postgresql://user:password@localhost:5432/taskmanager"
   JWT_SECRET=your-secret-key
   NODE_ENV=development
   FRONTEND_APP_URL=http://localhost:5173
   ```

4. **Database Setup**

   ```bash
   # Run migrations
   npx prisma migrate dev

   # Generate Prisma client
   npx prisma generate

   # (Optional) Seed database with sample data
   npx prisma db seed
   ```

5. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   ```

### Running the Application

1. **Start the backend server**

   ```bash
   cd backend
   npm run dev
   ```

   Backend runs on: http://localhost:5001

2. **Start the frontend development server**

   ```bash
   cd frontend
   npm run dev
   ```

   Frontend runs on: http://localhost:5173

3. **Open your browser**
   Navigate to: http://localhost:5173

### Building for Production

**Backend:**

```bash
cd backend
npm run build
npm start
```

**Frontend:**

```bash
cd frontend
npm run build
npm run preview
```

## � API Endpoints

### Authentication

| Method | Endpoint             | Description         |
| ------ | -------------------- | ------------------- |
| POST   | `/api/auth/register` | Register a new user |
| POST   | `/api/auth/login`    | Login user          |
| POST   | `/api/auth/logout`   | Logout user         |
| GET    | `/api/auth/profile`  | Get current user    |

### Tasks

| Method | Endpoint                | Description                  |
| ------ | ----------------------- | ---------------------------- |
| GET    | `/api/tasks`            | Get all tasks (with filters) |
| GET    | `/api/tasks/stats`      | Get task statistics          |
| GET    | `/api/tasks/:id`        | Get single task              |
| POST   | `/api/tasks`            | Create new task              |
| PUT    | `/api/tasks/:id`        | Update task                  |
| DELETE | `/api/tasks/:id`        | Delete task                  |
| PATCH  | `/api/tasks/:id/toggle` | Toggle task completion       |

### Query Parameters

- `?done=true|false` - Filter by completion status
- `?priority=low|medium|high` - Filter by priority
- `?q=searchTerm` - Search tasks
- `?sortBy=createdAt|priority&order=asc|desc` - Sort tasks
- `?page=1&limit=10` - Pagination

### Health Check

| Method | Endpoint      | Description                      |
| ------ | ------------- | -------------------------------- |
| GET    | `/api/health` | Check server and database status |

## 🧪 Additional Commands

**Prisma Studio (Database GUI)**

```bash
cd backend
npx prisma studio
```

**Lint Frontend**

```bash
cd frontend
npm run lint
```

## 📝 License

This project is licensed under the MIT License.

## 👤 Author

Your Name - [GitHub Profile](https://github.com/krushna-ghuge)

---

Built with ❤️ using modern web technologies
