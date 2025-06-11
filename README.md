# Green Leaf Traceability POC

## Overview
This is a proof-of-concept web application for traceability of green leaf supplied by agents and small tea growers.

## Project Structure
- `frontend/` — React + Vite application (Climetz branding)
- `backend/` — FastAPI backend with JWT auth and auto-allocation logic
- `.github/workflows/` — GitHub Actions for CI/CD to Azure
- `deploy/` — (optional) Infra-as-code for Azure

## Deployment to Azure

### Frontend (Static Web App)
1. Create an Azure Static Web App in the portal.
2. Link to this repo and set:
   - App location: `/frontend`
   - Output location: `dist`

### Backend (App Service)
1. Create an App Service (Linux) with Python 3.11.
2. Set deployment to GitHub Actions.
3. Add environment variables:
   - `DATABASE_URL`
   - `SECRET_KEY`
4. Deploy.

## Usage
- Login at `/auth/login` with:
  - Email: `balraj.agashe@gmail.com`
  - Password: `balraj@123`
- Protected routes: `/agents`, `/stgs`, `/leaf-entry`