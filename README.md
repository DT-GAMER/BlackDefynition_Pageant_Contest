# BlackDefynition Pageant Contest

## Project Purpose

The BlackDefynition Pageant Contest is a full-stack web application designed to facilitate live voting for pageant contests. It allows voters to sign up, view contestants, vote for their favorites, and view contest results. Contestants can sign up for contests, and administrators can manage categories, end voting, and view results. The application is built using the MERN stack (MongoDB, Express.js, React, Node.js) with Tailwind CSS for the user interface.

## Table of Contents

- [Setup](#setup)
- [API Operations](#api-operations)
- [Advanced Information](#advanced-information)
- [Contributing](#contributing)
- [License](#license)

## Setup

Follow these steps to set up the BlackDefynition Pageant Contest application locally:

### Prerequisites

- Node.js and npm (Node Package Manager) installed
- MongoDB installed and running

### Installation

1. Clone the repository to your local machine:

```
git clone https://github.com/yourusername/BlackDefynition_Pageant_Contest.git
cd BlackDefynition_Pageant_Contest
```

2. Install the server-side dependencies:

```
npm install
```

4. Create a `.env` file in the server directory and add your MongoDB connection string:

```env
MONGODB_URI=your_mongodb_uri_here
```

5. Start the server:

```
npm start
```

Your application should now be running at [http://localhost:3000](http://localhost:3000).

## API Operations

### Authentication

- `/auth/signup/voter`: Sign up as a voter.
- `/auth/signup/contestant`: Sign up as a contestant.
- `/auth/login/voter`: Log in as a voter.
- `/auth/login/contestant`: Log in as a contestant.

### Contest Operations

- `/contest/categories`: Get all contest categories.
- `/contest/categories/:categoryId/contestants`: Get contestants by category.
- `/contest/categories`: Create a new category (Admin privilege required).
- `/contest/categories/:categoryId/vote`: Vote for a contestant (Authenticated voter privilege required).

### Admin Operations

- `/admin/signup/admin`: Sign up as an admin.
- `/admin/login/admin`: Log in as an admin.
- `/admin/categories`: Create a new category (Admin privilege required).
- `/admin/categories/:categoryId/end`: End voting for a category (Admin privilege required).
- `/admin/categories/:categoryId/results`: View results for a category (Admin privilege required).

## Advanced Information

- Logging: The application uses a logging middleware to log incoming requests and outgoing responses. Logs can be found in the console.
- Error Handling: Error handling middleware is in place to handle internal server errors and provide appropriate responses.
- Middleware: Middleware functions, such as authentication and logging, are defined in the middleware directory.
- Database Schema: Database schema models for users, contestants, categories, and votes are defined in the models directory.
- Frontend: The frontend is built using React with a responsive design using Tailwind CSS.
- Admin Privileges: Certain operations, like creating categories and ending voting, require admin privileges.
- MongoDB: MongoDB is used as the database. Ensure you have it installed and running.

## Contributing

Contributions to this project are welcome! To contribute, follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and commit them.
4. Push your changes to your forked repository.
5. Create a pull request to merge your changes into the main repository.

Please make sure to follow the project's coding standards and guidelines.

## License

This project is licensed under the MIT License.

You can copy and paste this content into your `README.md` file in your GitHub repository, and it should provide a clear and organized structure for your project's documentation.
