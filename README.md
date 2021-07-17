# Scytale

## Install

Run npm install

## Development server (SSR)

Run `npm run dev:ssr` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build (SSR)

Run `npm run build:ssr` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Notes

1. Data base is local (mockups), data folder in root.
2. Client app is SSR and runs on same port as api endpoints (prefixed with api), ideally would be separate.
3. If ADMIN vs USER, the account data will be displayed differently.
3. there is a partial implementation of authentication/login page (no tokens or session).

    Valid user id required.
    
    Every password is valid.
    
    If MFA required then every 6 chars is valid.
4. Haven't implemented any unit tests or automatation, just an approval check before merge. 
    I am familiar with gitlab cicd pipelines, mocha, chai and other tools and flows for tests.
