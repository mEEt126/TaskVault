# Use the official PostgreSQL 12 image as the base image
FROM postgres:12

# Set environment variables for the PostgreSQL user and password
ENV POSTGRES_USER=postgres
ENV POSTGRES_PASSWORD=root

# Copy the initialization script into the Docker image
COPY init-db.sh /docker-entrypoint-initdb.d/
