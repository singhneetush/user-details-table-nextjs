# User Authentication Portal

This project is a simple **User Authentication Portal** built using **React**, **Next.js**, and **Tailwind CSS**. The portal allows users to sign up, log in, and access a table with posts. The posts can be searched and paginated.

## Features

1. **User Authentication**:

   - Sign up page for new users.
   - Login page for existing users.
   - Password validation with both front-end and back-end checks.
   - User details are stored in `localStorage`.

2. **User Dashboard**:

   - After login, users are redirected to the dashboard.
   - Displays a paginated list of posts fetched from a public API (`jsonplaceholder.typicode.com`).
   - Search functionality allows filtering posts by title or ID.
   - Logout button for user session management.

3. **Pagination**:
   - Posts are displayed with pagination support (10 posts per page).
   - Buttons for navigating between pages.

## Installation

Follow these steps to set up the project locally:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/singhneetush/user-details-table-nextjs.git
   cd userdetailtable
   ```

2. **Install dependencies:**

   ```bash
   npm install

   ```

3. **Start the development server:**

   ```bash
   npm run dev
   ```

4. Open the application in your browser at http://localhost:3000.


## Technologies Used

- **Next.js**: React framework for building the application.
- **React**: JavaScript library for building user interfaces.
- **Shadowcn**: Tailwind library for getting custom UI components.
- **Tailwind CSS**: A utility-first CSS framework.
- **Lucide Icons**: A set of icons for user interface.
- **LocalStorage**: To persist user data like login credentials and posts.

## Pages & Navigation

- **Homepage (`/`)**: Displays welcome message and options to login or sign up.
- **Sign Up (`/sign-up`)**: Allows users to register by providing name, email, and password.
- **Login (`/login`)**: Users can log in with their credentials.
- **Items Page (`/items`)**: Displays posts in a paginated table with search functionality.

## Folder Structure

- `/src/components/ui`: Contains reusable UI components like buttons, cards, inputs, and table components.
- `/src/pages`: Holds the page components for different views of your application (home, sign-up, login, items).
- `/src/lib/utils.ts`: Utility functions like `cn` (for handling class names) and other helper functions.
- `/src/styles`: Contains global CSS styles used across the application.
- `/public/assets`: Folder for static assets like images or logos.

### Code Explanation

#### 1. **SignUpForm** (User Registration):

The **SignUpForm** component handles user registration with input fields for name, email, password, and confirm password. It validates the user input and stores the new user data in `localStorage` upon successful registration.

#### 2. **LoginForm** (User Login):

The **LoginForm** component allows users to log in by entering their email and password. If the user exists in `localStorage`, they are logged in and redirected to the items page.

#### 3. **ItemsPage** (Post Listing with Search and Pagination):

The **ItemsPage** fetches a list of posts from a public API and displays them in a table format. The table supports search (by title or ID) and pagination (10 posts per page). It also shows the logged-in user's name.

### Styling

- **Tailwind CSS** is used for styling, which allows for utility-first, responsive layouts.
- Custom components such as buttons, cards, and inputs are built using Tailwind’s utility classes.
- Additional styling features include hover effects, responsive layouts, and error messages for form validation.

## Usage

1. **Sign up**:
   - Go to the sign-up page (`/sign-up`), and create an account by providing a name, email, and password.
2. **Login**:

   - After signing up, go to the login page (`/login`) and log in with your credentials.
   - Upon successful login, you will be redirected to the items page (`/items`), where you can view a list of posts and search through them.

3. **Post Search**:

   - Use the search bar to filter posts by title or ID.
   - You can clear the search input by clicking the "X" icon.

4. **Pagination**:
   - Navigate through the paginated list of posts using the "Previous" and "Next" buttons.
5. **Logout**:
   - Click the logout button to clear the logged-in user data from `localStorage` and redirect back to the login page.

## Contribution

1. **Fork the repository**.
2. **Clone your fork**: `git clone https://github.com/yourusername/user-auth-portal.git`.
3. **Create a new branch**: `git checkout -b feature/your-feature`.
4. **Make your changes**.
5. **Push to your fork**: `git push origin feature/your-feature`.
6. **Submit a pull request**.

## Author 
- Neetu Singh
- Deployed Link : https://userauthportal.netlify.app/
