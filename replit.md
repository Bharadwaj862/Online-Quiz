# Overview

This is a QuizMaster web application - an interactive quiz platform that allows users to take quizzes across different categories like Science & Nature, History, and Technology. The application provides a comprehensive quiz-taking experience with features like real-time progress tracking, question marking for review, score calculation, and results analysis with detailed explanations.

The system is built as a full-stack TypeScript application with a React frontend and Express backend, featuring a clean separation between client and server code with shared type definitions.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript using Vite as the build tool
- **Routing**: Wouter for client-side routing with three main routes: home, quiz taking, and results
- **State Management**: TanStack Query (React Query) for server state management and caching
- **Styling**: TailwindCSS with shadcn/ui component library for consistent UI components
- **Form Handling**: React Hook Form with Zod validation for type-safe form management

## Backend Architecture
- **Runtime**: Node.js with Express.js REST API
- **Language**: TypeScript with ES modules
- **Storage Pattern**: Interface-based storage abstraction (IStorage) with in-memory implementation for development
- **API Design**: RESTful endpoints for categories, questions, and quiz sessions with proper error handling
- **Validation**: Zod schemas for request/response validation shared between frontend and backend

## Data Storage Solutions
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Connection**: Neon Database serverless PostgreSQL for cloud hosting
- **Migrations**: Drizzle Kit for database schema migrations and management
- **Schema Design**: Three main entities - quiz categories, questions (with JSON options), and quiz sessions (with JSON answers and review tracking)

## Authentication and Authorization
- **Current State**: Basic session-based structure prepared but not fully implemented
- **Session Storage**: PostgreSQL sessions using connect-pg-simple middleware
- **User Context**: User ID tracking in quiz sessions for future user-specific features

## External Dependencies
- **Database**: Neon Database (@neondatabase/serverless) for PostgreSQL hosting
- **UI Components**: Extensive Radix UI primitives for accessible component building
- **Styling**: TailwindCSS with custom CSS variables for theming
- **Development**: Replit-specific plugins for development environment integration
- **Fonts**: Google Fonts integration (Inter, Geist Mono, Architects Daughter, DM Sans, Fira Code)
- **Icons**: Font Awesome icons for category and UI elements