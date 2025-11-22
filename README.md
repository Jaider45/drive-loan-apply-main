# Drive Loan Apply — Local dev & deploy

This repository contains a Vite + React frontend and an Express backend in the same project. The repo is configured to run both locally and to be built into a single Docker image for production.

Quick start (local):

1. Copy example env and edit values:

```powershell
Copy-Item .env.example .env
notepad .env
```

2. Install dependencies:

```powershell
npm install
```

3. Run backend and frontend concurrently (development):

```powershell
npm run dev:all
```

4. Backend health check:

Open `http://localhost:<PORT>/api/health` (PORT is the backend `PORT` or `BACKEND_PORT` defined in `.env`).

Production build & run locally:

```powershell
npm run build
npm start
```

Or build and run with Docker:

```powershell
docker build -t drive-loan-app .
docker run -p 5000:5000 --env-file .env drive-loan-app
```

Notes
- The frontend uses Vite dev server on port 8080 during development and proxies `/api` to the backend. The proxy reads `BACKEND_PORT` or `PORT` from `.env`.
- The admin panel is available at `/admin` and is protected by `VITE_ADMIN_PASSWORD` (client-side check). For secure production auth, add a server-side auth layer.
# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/cfb3d260-a7f9-4381-84a4-b1f945b889fd

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/cfb3d260-a7f9-4381-84a4-b1f945b889fd) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/cfb3d260-a7f9-4381-84a4-b1f945b889fd) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
