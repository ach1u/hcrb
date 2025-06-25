# Health Carousel Resume Builder (HCRB)

A comprehensive profile management and resume generation system built for healthcare staffing with AI-powered features and role-based access control.

## Features

- **Profile Management**: Comprehensive candidate profile system with employment history, education, certifications, and skills tracking
- **Resume Generation**: AI-powered resume creation with multiple templates and customization options
- **Approval Workflow**: Multi-step approval process for resumes with role-based permissions
- **Employment Validation**: Automatic validation of work history with gap detection and chronology verification
- **Skills Management**: Dynamic keyword tagging and specialty mapping for healthcare professionals
- **Role-based Access**: Different interfaces for candidates, account managers, compliance team, and administrators
- **Document Management**: Version control for resumes and supporting documents
- **AI Integration**: OpenAI-powered sizzle statement generation and content enhancement

## Technology Stack

- **Frontend**: Next.js 14 with App Router, TypeScript, Material-UI (MUI)
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js with JWT tokens
- **State Management**: TanStack Query (React Query)
- **AI Integration**: OpenAI API
- **Form Handling**: React Hook Form with Zod validation
- **PDF Generation**: DocMosis integration (planned)
- **Drag & Drop**: @dnd-kit for sortable lists

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- PostgreSQL database
- OpenAI API key (for AI features)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
Edit `.env.local` with your configuration:
```env
DATABASE_URL="postgresql://username:password@localhost:5432/health_carousel_db"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"
OPENAI_API_KEY="your-openai-api-key-here"
```

3. Set up the database:
```bash
npx prisma migrate dev --name init
npx prisma generate
```

4. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
src/
├── app/                    # Next.js 14 App Router
│   ├── api/               # API routes
│   ├── auth/              # Authentication pages
│   ├── profile/           # Profile management pages
│   ├── resumes/           # Resume generation pages
│   └── admin/             # Admin dashboard pages
├── components/            # Reusable UI components
├── lib/                   # Utility functions and configurations
├── hooks/                 # Custom React hooks
├── services/              # API service functions
├── types/                 # TypeScript type definitions
└── utils/                 # Utility functions
```

## User Roles

### Candidates
- Manage personal and professional profiles
- View and approve generated resumes
- Track application status

### Account Managers
- Bulk resume generation for multiple candidates
- Candidate search and filtering
- Resume template management

### Compliance Team
- Final resume approval
- Audit trail access
- Document verification

### Administrators
- System configuration
- User role management
- Analytics and reporting

## Development

Run the development server:
```bash
npm run dev
```

Build for production:
```bash
npm run build
```

## License

This project is proprietary software owned by Health Carousel.
