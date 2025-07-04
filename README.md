# Guideline RAG

> **⚠️ Development Purpose Only**  
> This repository is intended for development and learning purposes only. It is not production-ready and should not be used in production environments.

## Overview

Guideline RAG is a web application that leverages Retrieval-Augmented Generation (RAG) to help users generate code functions based on predefined guidelines. The system uses semantic search to retrieve relevant guidelines and then generates code that adheres to those guidelines.

## Features

- **Chat Interface**: Interactive web interface for asking questions and generating code

## Architecture

This project follows a monorepo structure with the following components:

### Apps

- **Web App** (`apps/web/`): Next.js frontend with React and Tailwind CSS
- **API** (`apps/api/`): NestJS backend with CQRS pattern and domain-driven design

### Packages

- **UI** (`packages/ui/`): Shared React components

### Technical Decisions

Technical decisions and architectural choices are documented in the [Architecture Decision Records (ADR)](./adr/) directory. These records provide context and rationale for key design decisions made throughout the project's development.

## Getting Started

### Prerequisites

- Node.js >= 20
- Yarn package manager
- Supabase account and project
- OpenAI API key

### Supabase Setup

Before running the application, you need to set up your Supabase database with the required schema and extensions:

1. **Create a new Supabase project** at [supabase.com](https://supabase.com)

2. **Enable the PostgreSQL Vector Extension**:
   - Go to your Supabase project dashboard
   - Navigate to Database → Extensions
   - Enable the `vector` extension

3. **Create the Role Type**:
   - Go to SQL Editor in your Supabase dashboard
   - Execute the SQL from `sql/enums/role.sql`

4. **Create Database Tables**:
   - Execute the SQL files from `sql/tables/` in the following order:
     - `events.sql`
     - `guidelines.sql`
     - `messages.sql`

5. **Create PostgreSQL Functions**:
   - Execute the SQL files from `sql/functions/`:
     - `match_guidelines.sql`
     - `match_messages.sql`

> **Note**: In future versions, these manual database setup steps will be replaced by a proper migration tool for easier deployment and version control.

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd guideline-rag
```

2. Install dependencies and set up environment files:

```bash
make install
```

This command will:

- Install all dependencies using `yarn install`
- Copy sample environment files to create `.env` files in both `apps/api/` and `apps/web/` directories

⚠️ **Important**: After running `make install`, you must manually configure your environment variables in:

- `apps/api/.env`
- `apps/web/.env`

Check the `sample.env` files in each directory for the required variables (Supabase and OpenAI credentials).

### Starting Development

Start the development servers:

```bash
make dev
```

Or alternatively:

```bash
yarn dev
```

This will start both the API server (port 4000) and the web application (port 3000).

### Local Deployment

To deploy locally using Docker Compose:

```bash
make deploy-local
```

This will start all services using Docker Compose.

## Usage

### Creating Guidelines (Admin Only)

Guidelines are intended to be created by administrators and should be done through API calls. The API endpoints are defined in the Bruno collection located in the `rest/` directory.

**Example: Creating a Guideline**

```bash
curl -X POST http://localhost:4000/guidelines \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Just the function",
    "content": "Return just the code generated. As markdown",
    "tags": ["coding"]
  }'
```

### Asking Questions

Users can ask questions and generate code through the web application's chat interface. The system will retrieve relevant guidelines and generate code that adheres to those guidelines.

## Development

### Makefile Commands

The project includes a Makefile with convenient commands:

- `make install` - Install dependencies and set up environment files
- `make dev` - Start development environment
- `make deploy-local` - Deploy locally using Docker Compose
- `make lint` - Run linting across all workspaces
- `make test` - Run tests across all workspaces

## Roadmap

### Next Steps

1. **Code Generation Tools Integration**
   - Add tools call functionality to execute generated code
   - Implement code validation and testing frameworks
   - Support for multiple programming languages and frameworks

2. **User Authentication & Management**
   - User login and registration system
   - User profile management
   - Role-based access control

3. **Enhanced Chat Experience**
   - Chat threads and conversation history
   - Message persistence and retrieval
   - Real-time chat capabilities

### Future Enhancements

4. **CI/CD Pipeline**
   - Automated testing and deployment
   - Environment-specific deployments

5. **Infrastructure as Code**
   - Terraform configurations
   - Automated infrastructure provisioning

6. **Advanced Features**
   - Code review and collaboration tools
   - Advanced analytics and usage metrics
