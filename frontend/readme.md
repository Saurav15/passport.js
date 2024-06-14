**Implementing OAUTH just using FE**
Yes, it is possible to implement OAuth without a backend by using the OAuth implicit grant flow. The implicit grant flow is designed for client-side applications, such as single-page applications (SPAs), where the authentication and authorization process is handled entirely in the browser.
Here's a general overview of how the OAuth implicit grant flow works without a backend:

1. The user clicks on a "Login with Google" button on your application's frontend.
2. The frontend redirects the user to the Google OAuth authorization endpoint, including the necessary parameters such as the client ID, redirect URI, and desired scopes.
3. The user enters their Google credentials and grants permission to your application.
4. Google redirects the user back to your application's frontend, typically to a designated redirect URI, with an access token included in the URL fragment (e.g., https://example.com/callback#access_token=...).
5. The frontend extracts the access token from the URL fragment using JavaScript.
6. The frontend can now use the access token to make authenticated requests to Google's APIs directly from the browser.
7. The frontend can store the access token in the browser's local storage or session storage for subsequent requests.
