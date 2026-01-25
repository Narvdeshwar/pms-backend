# Backend Implementation Plan

## Goal
Establish a robust, scalable backend architecture for the PMS application using Node.js and TypeScript. The structure will mirror the frontend's modular design to ensure mental model consistency for developers working across the stack.

## Tech Stack
- **Runtime:** Node.js
- **Language:** TypeScript
- **Framework:** Express.js (Structured using Controller-Service-Repository pattern)
- **Databases:**
  - **PostgreSQL:** Primary relational data (Users, Job Orders, Inventory, Departments, Targets).
  - **MongoDB:** Unstructured data, heavily nested documents, or high-volume logs (Activity Logs, Report Snapshots, Form Templates).
- **ORM/ODM:**
  - **Prisma:** For PostgreSQL (Type-safe database access).
  - **Mongoose:** For MongoDB (Schema-based modeling).
- **Validation:** Zod (Matching frontend validation).

## Architecture Pattern: Modular Monolith
To mirror the `frontend/src/modules/*` structure, the backend will be organized by **Domain Modules**.

### Folder Structure
```text
backend/
├── src/
│   ├── config/                  # Environment variables, DB connection factories
│   │   ├── postgres.ts
│   │   └── mongo.ts
│   ├── modules/                 # DISCRETE DOMAIN MODULES
│   │   ├── auth/                # Auth (Controllers, Services, Routes)
│   │   ├── dashboard/           # Dashboard aggregations
│   │   ├── job-order/           # Job Order management
│   │   │   ├── controllers/
│   │   │   │   └── job-order.controller.ts
│   │   │   ├── services/
│   │   │   │   └── job-order.service.ts
│   │   │   ├── routes/
│   │   │   │   └── job-order.routes.ts
│   │   │   ├── types/
│   │   │   │   └── job-order.types.ts
│   │   │   └── models/          # Specific DB models if needed
│   │   ├── inventory/
│   │   ├── users/
│   │   └── ... (matches frontend modules)
│   ├── shared/                  # Shared resources
│   │   ├── middleware/          # Auth, Validation, Error Handling
│   │   ├── utils/               # Helper functions
│   │   └── types/               # Global types
│   ├── app.ts                   # Express App configuration
│   └── server.ts                # Server entry point
├── prisma/                      # Prisma Schema Setup
├── package.json
└── tsconfig.json
```

## Module Mapping (Frontend ↔ Backend)
We will create backend modules corresponding to these existing frontend modules:

| Frontend Module | Backend Responsibility | Storage Config (Proposed) |
| :--- | :--- | :--- |
| `analytics` | Aggregation Services | Read-heavy from PG + Mongo |
| `auth` | Authentication, JWT, Permissions | Postgres (Users, Roles) |
| `dashboard` | KPI Calculations | Aggregated Data |
| `departments` | Department Management | Postgres |
| `inventory` | Stock, Items, Suppliers | Postgres |
| `issues` | Issue Tracking | Postgres |
| `job-order` | Jobs, Schedules, Workflow | Postgres (Core) + Mongo (Complex Logs) |
| `permissions` | Role Based Access Control | Postgres |
| `quality` | QA Checks & Standards | Postgres |
| `reports` | Report Generation | Postgres (Meta) + Mongo (Snapshots) |
| `settings` | System Config | Postgres/Mongo |
| `targets` | Goals & KKPIs | Postgres |
| `templates` | Form/Process Templates | MongoDB (Flexible Schemas) |
| `users` | User Profiles | Postgres |
| `work-queue` | Operator Views | Postgres |

## Implementation Steps

### Phase 1: Foundation Setup
1.  **Initialize Project**: Setup `package.json` with TypeScript, `nodemon`, `ts-node`.
2.  **Linting & Formatting**: Setup ESLint and Prettier.
3.  **Database Connection**:
    -   Setup Prisma with PostgreSQL connection.
    -   Setup Mongoose with MongoDB connection.
4.  **Server Scaffold**: Create `app.ts` with global middleware (CORS, JSON Body Parser, Error Handler).

### Phase 2: Core Modules & Auth
1.  **User & Auth Module**: Implement Login, Register, Middleware for Route Protection.
2.  **Shared Utils**: Response helpers, Zod validation middleware.

### Phase 3: Feature Parity (Iterative)
Implement modules in priority order (likely dependencies first):
1.  **Departments & Settings** (Base data)
2.  **Inventory** (Resource dependencies)
3.  **Job Order & Work Queue** (Core business logic)
4.  **Dashboard & Reports** (Data consumption)

## Key Design Principles
1.  **Separation of Concerns**: Controllers only handle HTTP (req/res). Services hold logic. Repositories/ORMs handle DB.
2.  **Unified Error Handling**: A centralized error handler to send consistent JSON responses.
3.  **DTOs with Zod**: Validate all incoming request bodies using Zod schemas (can potentially share schemas with frontend if in a monorepo setup, or duplicate for now).
4.  **Dependency Injection (Loose)**: Keep services testable.

## Next Action
- Run the **Project Initialization** commands to create the file structure and install dependencies.
