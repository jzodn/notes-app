# Notes Web App

## About The Project
This web application allows users to create an account and manage their personal notes. Built with TypeScript and Next.js, it leverages PostgreSQL and Prisma for database management, and utilises NextAuth for secure user authentication.

### Built With
- **[Next.js](https://nextjs.org/)** - The React framework for production.
- **[TypeScript](https://www.typescriptlang.org/)** - A typed superset of JavaScript that compiles to plain JavaScript.
- **[PostgreSQL](https://www.postgresql.org/)** - Open source relational database.
- **[Prisma](https://www.prisma.io/)** - Next-generation ORM for Node.js and TypeScript.
- **[NextAuth.js](https://next-auth.js.org/)** - Authentication for Next.js.

## Getting Started

To get a local copy up and running follow these simple example steps.

### Prerequisites

Before running this project locally, make sure you have the following installed:
- Node.js
- npm
  ```sh
  npm install npm@latest -g

### Installation

1. ```git clone https://github.com/jzodn/notes-app.git```

2. ```npm install```

3. Create a .env file in the root directory with the necessary environment variables:
```
DATABASE_URL="postgresql://postgres:yourpassword@localhost:5432/notes-app?schema=public"
NEXTAUTH_SECRET="YOURSECRET"
```

4. Run the migration to set up your database schema:
```npx prisma migrate dev```

5. Run the server
```npm run dev```