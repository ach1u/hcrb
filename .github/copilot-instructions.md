# Health Carousel Resume Builder - Copilot Instructions

<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

## Project Overview
This is a Health Carousel profile management and resume generation system built with Next.js 14, TypeScript, and Material-UI (MUI). The application is designed for healthcare staffing with role-based access control and AI-powered resume generation.

## Key Technologies
- **Frontend**: Next.js 14 with App Router, TypeScript, Material-UI (MUI)
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js with role-based access control
- **State Management**: React Query (TanStack Query)
- **AI Integration**: OpenAI API for resume generation and content enhancement
- **PDF Generation**: DocMosis for professional resume templates
- **Form Validation**: React Hook Form with Zod validation

## Architecture Patterns
- Follow Next.js 14 App Router conventions
- Use TypeScript strictly with proper type definitions
- Implement clean architecture with separated concerns
- Use custom hooks for business logic
- Implement proper error boundaries and loading states

## Code Style Guidelines
- Use functional components with TypeScript
- Prefer React Query for server state management
- Use MUI's sx prop for styling over custom CSS when possible
- Implement proper loading and error states for all async operations
- Use Zod schemas for form validation and API request/response validation
- Follow RESTful API design patterns for API routes

## Key Features to Remember
1. **Profile Management**: Complex employment history with validation
2. **Resume Generation**: AI-powered with multiple templates
3. **Approval Workflow**: Multi-step approval process with role-based permissions
4. **Skills Management**: Dynamic keyword tagging and specialty mapping
5. **Employment Validation**: Gap detection and chronology verification
6. **Document Management**: Version control for resumes and supporting documents

## User Roles
- **Candidates**: Manage profiles, view resumes, approve generated content
- **Account Managers**: Bulk resume generation, candidate management
- **Compliance Team**: Final approval workflow, audit trail access
- **Administrators**: System management, user role assignment

## Security Considerations
- Implement proper RBAC (Role-Based Access Control)
- Validate all inputs on both client and server
- Ensure GDPR and HIPAA compliance for healthcare data
- Implement audit logging for sensitive operations
- Use proper session management and CSRF protection

## Performance Optimization
- Implement proper caching strategies with React Query
- Use Next.js Image optimization for profile photos
- Implement pagination for large data sets
- Use proper database indexing strategies
- Implement background job processing for AI operations

## Testing Strategy
- Write unit tests for utility functions and validation logic
- Create component tests for UI elements using React Testing Library
- Implement integration tests for API endpoints
- Use MSW (Mock Service Worker) for API mocking in tests

## Common Patterns
When generating code, prefer these patterns:
- Use `useQuery` and `useMutation` from React Query for API calls
- Implement proper TypeScript interfaces for all data structures
- Use MUI's `Box`, `Stack`, and `Grid` components for layouts
- Implement proper form validation with React Hook Form and Zod
- Use Next.js dynamic imports for code splitting
- Implement proper error handling with try-catch blocks and error boundaries

## File Organization
- `/src/app/` - Next.js App Router pages and layouts
- `/src/components/` - Reusable UI components
- `/src/lib/` - Utility functions, API clients, and configurations
- `/src/types/` - TypeScript type definitions
- `/src/hooks/` - Custom React hooks
- `/src/services/` - API service functions
- `/prisma/` - Database schema and migrations
