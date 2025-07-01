.PHONY: install dev deploy-local

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