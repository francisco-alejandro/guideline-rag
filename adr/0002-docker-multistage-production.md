# ADR-0002: Use Docker Multistage Build for Production Deployment

## Title

Use Docker Multistage Build for Production Deployment

## Status

Accepted

## Context

To ensure reliable, reproducible, and efficient deployments, we need a way to package the application and its dependencies for production. Docker is widely used for containerizing applications, but naive Dockerfiles can result in large images with unnecessary build-time dependencies, security risks, and slower deployments.

A multistage Docker build allows us to:

- Separate build and runtime environments
- Reduce final image size by excluding build tools and intermediate files
- Improve security by minimizing the attack surface
- Optimize caching and build performance

## Decision

We will use a multistage Docker build for production deployments. The Dockerfile will:

1. Use a builder stage to install dependencies and build the application
2. Copy only the necessary artifacts to a minimal runtime image (e.g., `python:3.12-slim`)
3. Exclude development and build dependencies from the final image
4. Set up the entrypoint and environment for production
5. Use distroless images for the final runtime stage to minimize attack surface and reduce image size

## Consequences

### Positive

- Smaller, more secure production images
- Faster deployments and reduced bandwidth usage
- Clear separation between build and runtime environments
- Easier to maintain and update dependencies
- Follows best practices for containerized deployments
- Distroless images provide additional security by excluding package managers, shells, and other unnecessary tools
- Reduced attack surface due to minimal runtime environment

### Negative

- Slightly more complex Dockerfile
- Requires understanding of multistage builds for troubleshooting
- May need adjustments for specific dependencies or build tools
- Distroless images make debugging more challenging as they lack shells, package managers, and debugging tools
- Troubleshooting requires additional steps such as using debug images or mounting debugging tools
- Limited ability to inspect the container environment during runtime

### Neutral

- Multistage builds are widely supported and documented
- The approach is compatible with most CI/CD systems

## Alternatives Considered

- Single-stage Docker build
  - Rejected due to larger image size and security risks
- Using a different containerization tool (e.g., Podman)
  - Rejected due to team familiarity and ecosystem support for Docker

## References

- [Docker Multistage Builds Documentation](https://docs.docker.com/build/building/multi-stage/)
- [Google Distroless Images](https://github.com/GoogleContainerTools/distroless)
