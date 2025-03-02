# Docker Setup for React Frontend

Simple instructions for running the React app with Docker.

## Environment Variables

Copy the example environment file and modify as needed:

```bash
cp .env.example .env
```

## Using Docker Compose

```bash
# Build and start
docker-compose up

# Stop
docker-compose down
```

## Using Docker Directly

```bash
# Build
docker build -t react-app .

# Run
docker run -p 3001:3001 --env-file .env react-app
```

Access the app at http://localhost:3001 