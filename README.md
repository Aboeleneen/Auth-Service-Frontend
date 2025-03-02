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

- Node.js (v14 or higher)
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd <repository-name>/frontend
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env` file in the root directory and add the following environment variables:
```
REACT_APP_API_URL=http://localhost:3001/api
```

## Running the Application

To start the development server:

```bash
npm start
# or
yarn start
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## Building for Production

To create a production build:

```bash
npm run build
# or
yarn build
```

The build artifacts will be stored in the `build/` directory.

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
2. Upon successful authentication, the backend returns a JWT token
3. The token is stored in localStorage and included in subsequent API requests
4. Protected routes check for authentication status before rendering
5. The token is removed from localStorage upon sign-out

## Form Validation

- Email: Valid email format
- Name: Minimum of 3 characters
- Password:
  - Minimum length of 8 characters
  - At least one letter
  - At least one number
  - At least one special character
