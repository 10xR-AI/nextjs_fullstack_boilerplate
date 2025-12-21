# Modern Next.js Boilerplate

A production-ready Next.js starter with authentication, MongoDB, background job processing, and modern tooling.

---

## Features

| Feature | Technology | Description |
|---------|------------|-------------|
| **Authentication** | Better Auth | Email/password + Google OAuth with session management |
| **Database** | MongoDB | Type-safe operations with singleton connection pattern |
| **Job Queues** | BullMQ + Redis | Reliable background job processing with retries |
| **UI Components** | shadcn/ui | Pre-built accessible components with Radix UI |
| **Styling** | Tailwind CSS v4 | Utility-first CSS with CVA variants |
| **File Uploads** | Uploadthing | Easy file upload handling |
| **Email** | Resend | Transactional email service |
| **Testing** | Vitest + Playwright | Unit, integration, and E2E testing |
| **Containerization** | Docker | Development environment with Redis |

## Tech Stack

- **Framework**: Next.js 16 (App Router), React 19
- **Styling**: Tailwind CSS v4, shadcn/ui, Radix UI
- **Auth**: Better Auth with MongoDB adapter
- **Database**: MongoDB (Atlas recommended)
- **Job Queue**: BullMQ with Redis
- **Testing**: Vitest, Playwright, Storybook
- **Package Manager**: pnpm (via Corepack)

## Quick Start

### Prerequisites

- Node.js >= 20.9.0
- pnpm (via Corepack)
- Docker (optional, for Redis)

### Installation

```bash
# Enable Corepack for pnpm
corepack enable

# Clone and install
git clone <your-repo-url>
cd modern-nextjs-boilerplate
pnpm install

# Configure environment
cp .env.example .env.local
# Edit .env.local with your values

# Start development server
pnpm dev
```

### With Docker (Recommended)

```bash
# Copy environment file
cp .env.example .env.local
# Edit .env.local with your MongoDB URI and secrets

# Start all services (app + worker + redis)
docker compose up
```

## Available Commands

```bash
# Development
pnpm dev              # Start dev server with Turbopack
pnpm build            # Production build
pnpm start            # Start production server
pnpm worker           # Start background job workers

# Testing
pnpm test             # Run unit tests
pnpm test:watch       # Watch mode
pnpm e2e:headless     # Run E2E tests
pnpm storybook        # Component development

# Code Quality
pnpm lint             # Run ESLint
pnpm lint:fix         # Auto-fix linting
pnpm prettier         # Check formatting
pnpm prettier:fix     # Fix formatting
```

## Project Structure

```
├── app/                    # Next.js App Router
│   ├── (auth)/             # Auth pages (login, register)
│   ├── api/                # API routes
│   └── page.tsx            # Home page
├── components/
│   ├── auth/               # Auth components
│   ├── providers/          # React providers
│   └── ui/                 # shadcn/ui components
├── lib/
│   ├── auth/               # Better Auth config
│   ├── db/                 # MongoDB connection
│   ├── queue/              # BullMQ job queues
│   └── utils/              # Utilities
├── scripts/
│   └── worker.ts           # Background worker
└── docker-compose.yml      # Docker services
```

## Background Job Processing

This boilerplate includes BullMQ + Redis for reliable background task processing.

### Pre-configured Queues

| Queue | Purpose | Use Case |
|-------|---------|----------|
| `email` | Email sending | Welcome emails, notifications |
| `processing` | Long-running tasks | File processing, reports |
| `webhooks` | External HTTP calls | Third-party integrations |

### Usage Example

```typescript
import { queueEmail, queueProcessing, queueWebhook } from "@/lib/queue"

// Queue an email
await queueEmail({
  to: "user@example.com",
  subject: "Welcome!",
  body: "<p>Thanks for signing up</p>",
})

// Queue a processing task
await queueProcessing({
  userId: "user-123",
  taskId: "task-456",
  payload: { data: "your-data" },
})

// Queue a webhook
await queueWebhook({
  url: "https://api.example.com/webhook",
  method: "POST",
  body: { event: "user.created" },
})
```

### Running Workers

```bash
# Local development (separate terminal)
pnpm worker

# With Docker (automatically included)
docker compose up
```

## Authentication

Better Auth is pre-configured with:
- Email/password authentication
- Google OAuth (optional)
- Email verification
- MongoDB session storage

### Protecting Routes

Edit `middleware.ts` to add protected routes:

```typescript
const protectedRoutes = [
  "/dashboard",
  "/settings",
  // Add your protected routes here
]
```

## Docker Services

The `docker-compose.yml` includes:

| Service | Port | Description |
|---------|------|-------------|
| `app` | 3000 | Next.js dev server |
| `worker` | - | Background job processor |
| `redis` | 6379 | Redis for job queues |

```bash
# Start all services
docker compose up

# Start in background
docker compose up -d

# View logs
docker compose logs -f worker

# Stop services
docker compose down
```

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `MONGODB_URI` | Yes | MongoDB connection string |
| `BETTER_AUTH_SECRET` | Yes | Auth secret (32+ chars) |
| `BETTER_AUTH_URL` | Yes | App URL (e.g., http://localhost:3000) |
| `REDIS_URL` | No | Redis URL (default: localhost:6379) |
| `GOOGLE_CLIENT_ID` | No | Google OAuth client ID |
| `GOOGLE_CLIENT_SECRET` | No | Google OAuth secret |
| `RESEND_API_KEY` | No | Resend email API key |
| `EMAIL_FROM` | No | From email address |
| `UPLOADTHING_TOKEN` | No | Uploadthing API token |

## Brand Assets

Brand assets are located in:
- `brand/` - Complete brand guidelines
- `public/logos/` - Logo variations (9 SVG files)
- `public/icons/` - App icons and patterns

### Brand Colors

| Color | Hex | Usage |
|-------|-----|-------|
| Cornflower Blue | `#568AFF` | Primary brand color |
| Green-Blue | `#0665BA` | Secondary / gradients |
| Rich Black | `#001320` | Text / dark backgrounds |

## Documentation

- [CLAUDE.md](CLAUDE.md) - AI assistant context and detailed architecture
- [brand/brand.md](brand/brand.md) - Complete brand guidelines

## License

MIT

---

**Modern Next.js Boilerplate** - Built for rapid development.
