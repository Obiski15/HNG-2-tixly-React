# Tixly - React Edition

Modern ticket management made simple and efficient. Built with React, TypeScript, and Vite.

## 🚀 Tech Stack

- **Framework**: React
- **Build Tool**: Vite
- **Routing**: React Router
- **Styling**: Tailwind CSS

## 🛠️ Setup Instructions

### Prerequisites

- Node.js 18+ installed
- pnpm, npm, or yarn package manager
- Backend server running (see `../server/README.md`)

### Installation

1. **Install dependencies:**

```bash
pnpm install
# or
npm install
# or
yarn install
```

2. **Configure environment:**

Create a `.env` file:

```env
export const API_BASE_URL = "http://localhost:4000";
```

3. **Start the backend server:**

Make sure the backend API is running on port 4000:

```bash
cd ../server
pnpm dev
```

4. **Start development server:**

```bash
pnpm dev
```

The app will be available at `http://localhost:5173`

## 🎯 Key Features

- ✅ User authentication (signup/login/logout)
- ✅ Dashboard with ticket statistics
- ✅ Full CRUD operations for tickets
- ✅ Real-time form validation with Zod
- ✅ Responsive design with Tailwind CSS
