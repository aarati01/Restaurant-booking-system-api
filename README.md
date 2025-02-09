After cloning the repo and installing the dependencies, you can run the project by following the steps below:

# Restaurant API Setup Guide

Follow these steps to set up and run the Restaurant API:

1. **Start the MySQL Server**
   Ensure that your MySQL server is running.

2. **Create a `.env` File**

   Create a `.env` file in the root directory of your project and add the following lines, replacing `<YOUR_DB_NAME>` with the name of your database, and `<YOUR_REFRESH_TOKEN_SECRET>` and `<YOUR_ACCESS_TOKEN_SECRET>` with your generated secrets:

   ```bash
   DATABASE_URL="mysql://root:@localhost:3306/<YOUR_DB_NAME>"
   NODE_ENV=development
   JWT_REFRESH_TOKEN_SECRET=<YOUR_REFRESH_TOKEN_SECRET>
   JWT_ACCESS_TOKEN_SECRET=<YOUR_ACCESS_TOKEN_SECRET>
   ```

   To generate secret keys, you can use the following command twice to generate two different keys:

   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

3. **Run the Migrations**
   Run the following command to create the tables in your database:

```bash
npx prisma migrate dev
```

4. **Run the Application**
   Start your Node.js application using your preferred method (e.g., `npm start`).

5. **Access the Application**
   Open your browser and go to [http://localhost:3000](http://localhost:3000) to access the application.

## Dataflow

```
User --> app.ts --> router.ts --> middleware (optional) --> controller.ts --> service.ts --> response --> router.ts --> app.ts --> User
```

## API Endpoints

1. To create a new user:
   POST request on user/signup

Request Body:
username: min length is 5 and max 15
password: min length of 4
email:should be a valid email
phone: optional with length ten

Response:
201 for user created successfully
209 for duplicate username
500 for internal server error
422 for invalid user data

2. To Login a user:
   POST request on user/login

Request Body:
username: min length is 5 and max 15
password: min length of 4

Response:
400 for if not all the fields are filled
401 for unauthorised
For successful login this is the response:

```
res.cookie("restJWTRefreshToken", refreshToken, {
    httpOnly: true, //Flags the cookie to be accessible only by the web server not client
    secure: true, //https only
    sameSite: "none",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.json({
    accessToken,
    redirect: "home",
    userinfo: {
      username: matchedUser.username,
      role: matchedUser.role,
      email: matchedUser.email,
    },
  });

Note: access token shall be used with bearer token as headers while refresh token is automatically sent by the browser on every withcredentials=true request
```

3. To get new access token on browser refresh or session restart with cookie
   A Post request on user/loginwithcookie, with withcredentials of course, if no restJWTRefreshToken is found in the cookie, user would have to relogin to obtain one otherwise user would get a new access token which shall be used as auth header in future requests.

An OK request to /user/loginwithcookie will return

```
res.status(200).json({
          accessToken,
          userinfo: {
            username: foundUser.username,
            role: foundUser.role,
            email: foundUser.email,
          },
```
