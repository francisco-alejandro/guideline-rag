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
cd bot
```

2. Install dependencies:

```bash
yarn install
```

3. Set up environment variables:

```bash
# Create .env files in apps/api and apps/web directories
# Add your Supabase and OpenAI credentials
```

4. Start the development servers:

```bash
yarn dev
```

This will start both the API server (port 3001) and the web application (port 3000).

## Usage

1. **Create Guidelines**: Use the web interface to create coding guidelines that define your coding standards
2. **Ask Questions**: Use the chat interface to ask questions about code generation
3. **Generate Functions**: The system will retrieve relevant guidelines and generate code that follows them

## Development

### Available Scripts

- `yarn dev` - Start development servers
- `yarn build` - Build all packages
- `yarn test` - Run tests
