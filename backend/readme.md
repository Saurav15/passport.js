1. When a user visits the /auth/google route, the passport.authenticate('google') middleware is executed, which redirects the user to the Google authentication page.

2. After the user grants permission, Google redirects the user back to the /auth/google/callback route with an authentication code.

3. The passport.authenticate('google') middleware is executed again, which exchanges the authentication code for an access token and refresh token.

4. The GoogleStrategy function is called, which finds or creates the user in the database based on the Google profile information.

5. If the user is authenticated successfully, the serializeUser function is called, which serializes the user object to the user ID user.id and stores it in the session.

6. The user is then redirected to the /protected route.

7. On subsequent requests to the /protected route, the deserializeUser function is called, which retrieves the user ID from the session and deserializes the complete user object from the database using User.findById(id).

8. The deserialized user object is attached to the request object req.user.

9. The req.isAuthenticated() method checks if req.user exists, indicating that the user is authenticated.

10. If the user is authenticated, the protected content is rendered; otherwise, the user is redirected to the login page.

**More detailed flow**
Let me explain the complete backend flow for both scenarios: when the user initially logs in and when the user is already logged in.

User initially logs in:
a. The user clicks on a "Login with Google" button on your application's frontend.
b. The frontend sends a request to the backend's /auth/google endpoint to initiate the Google OAuth flow.
c. The backend route handler for /auth/google calls passport.authenticate('google'), which redirects the user to the Google login page.
d. The user enters their Google credentials and grants permission to your application.
e. Google redirects the user back to your application's backend, typically to a callback URL like /auth/google/callback, with an authorization code.
f. The backend route handler for /auth/google/callback calls passport.authenticate('google') again, which triggers the verify function of the GoogleStrategy.
g. Inside the verify function:
The authorization code is exchanged for an accessToken and refreshToken from Google.
The user's profile information is retrieved using the accessToken.
You find or create a user in your database based on the Google profile information.
You call the done callback, passing the user object.
h. Passport serializes the user object using serializeUser and stores the serialized data (e.g., user ID) in the session.
i. The session middleware creates a new session, assigns a unique session ID, and sends the session ID as a cookie to the client in the response.
j. The user is now authenticated, and the session ID cookie is set in the client's browser.
k. The backend sends a response to redirect the user to a protected page or returns a success status.

User is already logged in:
a. The user visits a protected page on your application's frontend.
b. The frontend sends a request to the backend to access the protected resource, including the session ID cookie in the request headers.
c. The session middleware extracts the session ID from the cookie and retrieves the corresponding session data from the session store.
d. Passport deserializes the user object using deserializeUser, which fetches the user data from the database based on the stored user ID.
e. The deserialized user object is attached to the req.user property.
f. The backend route handler for the protected resource can access the authenticated user via req.user.
g. The backend processes the request, utilizing the user information if needed, and sends a response back to the frontend.
h. The frontend receives the response and renders the protected page or updates the UI accordingly.

Cookie Transactions:
During the initial login process, after successful authentication, the session middleware creates a new session and sends the session ID as a cookie to the client in the response headers.
On subsequent requests, the client includes the session ID cookie in the request headers, allowing the backend to identify the user's session.
The session middleware extracts the session ID from the cookie, retrieves the session data from the session store, and makes it available in the req.session object.
If the user logs out, the session is destroyed, and the session ID cookie is cleared or invalidated.
