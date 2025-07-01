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

## Getting Started

### Prerequisites

- Node.js >= 20
- Yarn package manager
- Supabase account and project
- OpenAI API key

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

1. **Create Guidelines**: Use the web interface to create coding guidelines that define your coding standards
2. **Ask Questions**: Use the chat interface to ask questions about code generation

## Development

### Available Scripts

- `yarn dev` - Start development servers
- `yarn build` - Build all packages
- `yarn test` - Run tests

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
