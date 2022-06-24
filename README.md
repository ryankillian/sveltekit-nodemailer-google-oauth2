# sveltekit with nodemailer and google oath2

Deployed and tested on Vercel.

Basic email app for sending emails with gmail. Configured to use Google Oauth2.

You will need an .env file with the following...

CLIENT_ID=your-value-from-google
CLIENT_SECRET=your-value-from-google
REDIRECT_URI=https://developers.google.com/oauthplayground
REFRESH_TOKEN=your-value-from-google
AUTH_USER=your-email
FROM=your-email

I recommend these videos for help setting up Google Oauth2...

https://www.youtube.com/watch?v=-rcRf7yswfM

https://www.youtube.com/watch?v=lkDy8hJWyc4
