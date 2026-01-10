# URL SHORTENER SERVICE

- A simple and fast URL shortener application built with **PERN stack (PostgreSQL, Express, React, Node.js)**. Users can shorten long URLs, track clicks, and manage URLs via a dashboard with authentication.

## Features

- Shorten long URLs to custom short codes  
- Track URL usage and Clicks
- User Authentication (Signup/Login)
- Free and premium tiers with URL Limits
- Dashboard to manage URLs
- Responsive UI built with **React** and **Tailwind CSS**

## Tech Stack

- **Frontend:** React, TypeScript, Tailwind CSS, React Router
- **Backend:** Node.js, Express, JWT Authentication
- **Database:** PostgreSQL
- **API:** Restful API with secure authentication

## Set Up Instruction

### Backend Setup

1. Clone the repository
   ```bash
   git clone git@github.com:your user name/url-shortener-service.git

2. Navigate to the server folder:
    ```bash
    cd server

3. Install Dependencies
    ```bash
    npm install

4. create a .env file:
    ```bash
    PORT=your port
    ALLOWED_ORIGIN=your allowed origin
    DATABASE_URL=your database
    JWT_SECRET=your secret key
    BASE_URL=your base url

5. Start the Server
    ```bash
    npm run dev


### Client Set up

1. Open a new terminal and navigate to the client folder:
    ```bash
    cd client

2. Install dependencies
    ```bash
    npm install

3. Create a .env file
    ```bash
    VITE_BASE_URL=your vite base url
    VITE_CURRENT_USER_KEY=your current user key

4. Start the frontend development server:
    ```bash
    npm run dev

## Folder Structure

    server/
        src/
            config/
            constants/
            controllers/
            db/
            middleware/
            routes/
            services/
            types/
            utils/
            validations

    client/
        src/
            api/
            auth/
            common/
            components/
            contexts/
            hooks/
            pages/
            router/
            types/

## Usage

- Open the app at http://localhost:5173/
- Signup and login
- Create short URLs via the dashboard
- Track URL usage and manage URLs


## API Endpoint

- POST /api/auth/signup - Register new users
- POST /api/auth/login - Login and getJWT Tokens
- POST /api/url/shorten - Create a short url
- GET /api/url/my-urls/?page=1&limit=10 - User get all short URLs lists
- DELETE /api/url/:id - Delete a user URL 


# Thank you



