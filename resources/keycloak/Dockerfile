# Use the official Keycloak image as the base image
FROM quay.io/keycloak/keycloak:latest

# Set environment variables for the Keycloak admin user
ENV KEYCLOAK_ADMIN=admin
ENV KEYCLOAK_ADMIN_PASSWORD=admin

# Use the H2 database for simplicity
ENV DB_VENDOR=h2

# Start Keycloak in development mode
CMD ["start-dev"]
