# Nuxt 3 Test App

This is a test app to try on Nuxt 3. This app uses the [MovieDB API](https://developers.themoviedb.org/3/getting-started/introduction) to display a list of popular movies.

## Deployed to Vercel

https://carlosgmi-nuxt3-test-app.vercel.app/

## Setup

1. Clone this repository
2. Make sure to install the dependencies:

```bash
# yarn
yarn install

# npm
npm install

# pnpm
pnpm install
```

3. This application uses [MovieDB API](https://developers.themoviedb.org/3/getting-started/introduction), so make sure to copy the `.env.example` file into a new `.env` file with a valid MovieDB API key.

You could also set different env variables for cookie secret and expiration time.

4. To login into the application you might want to use any of the existing dummy users:

```
--- User 1: ---
Email: user@test.com
Password: testuser

--- User 2: ---
Email: user2@test.com
Password: testuser2

--- User 3: ---
Email: user3@test.com
Password: testuser3
```

## Development Server

Start the development server on http://localhost:3000

```bash
npm run dev
```

## Production

Build the application for production:

```bash
npm run build
```

Locally preview production build:

```bash
npm run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
