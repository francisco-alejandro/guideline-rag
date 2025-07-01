.PHONY: install dev deploy-local lint test

# Install dependencies and setup environment files
install:
	@echo "Installing dependencies..."
	yarn install
	@echo "Setting up environment files..."
	cp apps/api/sample.env apps/api/.env
	cp apps/web/sample.env apps/web/.env
	@echo "Installation complete!"
	@echo ""
	@echo "⚠️  IMPORTANT: Please ensure to define your environment variables in:"
	@echo "   - apps/api/.env"
	@echo "   - apps/web/.env"
	@echo "   Check the sample.env files for required variables."

# Start development environment
dev:
	@echo "Starting development environment..."
	yarn dev

# Deploy locally using Docker Compose
deploy-local:
	@echo "Starting local deployment with Docker Compose..."
	docker-compose up

# Run linting across all workspaces
lint:
	@echo "Running linting across all workspaces..."
	yarn lint

# Run tests across all workspaces
test:
	@echo "Running tests across all workspaces..."
	yarn test 