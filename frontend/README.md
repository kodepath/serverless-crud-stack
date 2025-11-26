# Serverless CRUD Frontend

A modern React application built with Vite, providing a responsive user interface for managing items through a serverless backend.

## Features

- 🚀 Built with React 18 and Vite
- 🎨 Styled with Tailwind CSS
- 🔄 Real-time CRUD operations
- 📱 Fully responsive design
- 🎯 Modern UI/UX with loading states and error handling
- 🔒 Environment-based configuration
- 📊 Toast notifications for user feedback

## Prerequisites

- Node.js 18.x or later
- npm or yarn
- Backend API (see [backend README](../backend/README.md))

## Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/serverless-crud-stack.git
   cd serverless-crud-stack/frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn
   ```

3. **Configure environment variables**
   Create a `.env` file in the frontend directory:
   ```env
   VITE_API_URL=https://your-api-gateway-url.com/dev
   ```

4. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```
   The application will be available at [http://localhost:5173](http://localhost:5173)

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run test` - Run tests
- `npm run lint` - Run ESLint

## Project Structure

```
frontend/
├── public/               # Static files
├── src/
│   ├── api/             # API client and configuration
│   ├── assets/          # Images, fonts, etc.
│   ├── Components/      # Reusable UI components
│   │   ├── TodoForm.jsx # Form for adding/editing items
│   │   └── TodoList.jsx # List of todo items
│   ├── pages/           # Page components
│   │   └── Home.jsx     # Main page component
│   ├── App.jsx          # Root component
│   └── main.jsx         # Application entry point
├── .env                 # Environment variables
├── .eslintrc.cjs        # ESLint configuration
├── index.html           # HTML template
├── package.json         # Dependencies and scripts
└── vite.config.js       # Vite configuration
```

## Styling

This project uses [Tailwind CSS](https://tailwindcss.com/) for styling, providing a utility-first approach to building responsive designs.

### Customization

- Theme colors and styles can be customized in `tailwind.config.js`
- Global styles can be added to `src/index.css`

## API Integration

The frontend communicates with a serverless backend API. The API client is configured in `src/api/`.

### Available API Methods

- `getTodos()` - Fetch all items
- `createTodo(todo)` - Create a new item
- `updateTodo(id, updatedTodo)` - Update an existing item
- `deleteTodo(id)` - Delete an item

## State Management

- React Context API for global state
- Local state management with React hooks

## Responsive Design

The application is designed to work on all device sizes:
- Mobile (up to 640px)
- Tablet (641px - 1024px)
- Laptop (1025px - 1280px)
- Desktop (1281px and up)

## Deployment

The application is configured for deployment to Vercel. It will automatically build and deploy when changes are pushed to the `main` branch.

### Manual Deployment

1. Install Vercel CLI (if not already installed):
   ```bash
   npm install -g vercel
   ```

2. Deploy to Vercel:
   ```bash
   vercel --prod
   ```
![alt text](image.png)
