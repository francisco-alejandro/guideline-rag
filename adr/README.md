# Architecture Decision Records (ADRs)

This directory contains Architecture Decision Records (ADRs) for the project. ADRs are used to document important architectural decisions made along with their context and consequences.

## What is an ADR?

An Architecture Decision Record is a document that captures an important architectural decision made along with its context and consequences. It is a way to track architectural decisions over time.

## ADR Structure

Each ADR is stored as a Markdown file in this directory. The filename format is `NNNN-title-with-dashes.md`, where:

- `NNNN` is a sequential number (0001, 0002, etc.)
- The rest of the filename is a short description of the decision, with words separated by dashes

## ADR Template

The template for new ADRs is in `template.md`. To create a new ADR:

1. Copy the template file
2. Rename it to the next number in sequence
3. Fill in the details
4. Add it to version control

## ADR List

- [ADR-0001](0001-env.md) - Use .env Files for Local Environment Dependencies
- [ADR-0002](0002-docker-multistage-production.md) - Use Docker Multistage Build for Production Deployment
- [ADR-0003](0003-backend-domain-drive-design.md) - Backend Domain-Driven Design
- [ADR-0004](0004-frontend-domain-driven-design.md) - Frontend Domain-Driven Design
- [ADR-0005](0005-supabase-for-early-validation.md) - Use Supabase for Early Product Validation
- [ADR-0006](0006-command-query-responsibility-segregation.md) - Command Query Responsibility Segregation (CQRS)
- [ADR-0007](0007-event-sourcing.md) - Event Sourcing
