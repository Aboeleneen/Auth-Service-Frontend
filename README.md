# Authentication Module Frontend

This is the frontend part of a full-stack authentication module built with React, TypeScript, and Material UI. It provides user sign-up, sign-in, and protected routes functionality.

## Features

- User sign-up with validation
- User sign-in with validation
- Protected routes
- Responsive design
- Form validation
- Error handling
- Toast notifications

## Prerequisites

- Docker and Docker Compose

## Running with Docker Compose

1. Clone the repository:
```bash
git clone https://github.com/Aboeleneen/Auth-Service-Frontend.git
cd Auth-Service-Frontend
```

2. Create a `.env` file in the root directory (you can copy from `.env.example`):
```bash
cp .env.example .env
```

3. Update the `.env` file with your backend API URL:
```
REACT_APP_API_URL=http://your-backend-url/api
```

4. Start the application using Docker Compose:
```bash
docker-compose up -d
```

The application will be available at [http://localhost:3001](http://localhost:3001).

To stop the application:
```bash
docker-compose down
```

## Project Structure

- `src/components`: Reusable UI components
- `src/pages`: Page components
- `src/context`: React context for state management
- `src/services`: API services
- `src/utils`: Utility functions
- `src/types`: TypeScript type definitions

## Backend Integration

This frontend is designed to work with a NestJS backend. Make sure the backend server is running and accessible at the URL specified in the `.env` file.

## Authentication Flow

1. User signs up or signs in through the respective forms
2. Upon successful authentication, the backend returns user data and sets HTTP-only cookies for authentication
3. Authentication state is managed through React Context (AuthContext)
4. All API requests are made with credentials to include the HTTP-only cookies
5. Protected routes check authentication status before rendering content
6. Automatic token refresh is implemented to maintain the user's session
7. When the user signs out, the cookies are cleared from the browser

## Form Validation

- Email: Valid email format
- Name: Minimum of 3 characters
- Password:
  - Minimum length of 8 characters
  - At least one letter
  - At least one number
  - At least one special character
