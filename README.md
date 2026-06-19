# Fitness RPG

A mobile-friendly, RPG-themed weekly workout tracker. The app includes a Monday-through-Sunday workout plan, exercise checkboxes, XP, coins, level-ups, local-storage persistence, streak tracking, and a simulated AI weekly plan generator.

## Run locally

1. Install Node.js 18 or newer from <https://nodejs.org/>.
2. Install the project dependencies:

   ```bash
   npm install
   ```

3. Start the local web server:

   ```bash
   npm start
   ```

4. Open <http://localhost:5173> in your browser.

## Build locally

Run the same build command Vercel uses:

```bash
npm run build
```

The build checks the JavaScript syntax and copies the static app into the `dist/` folder.

## Deploy to Vercel

This app is configured for Vercel with `vercel.json`:

- **Build Command:** `npm run build`
- **Output Directory:** `dist`

### Beginner-friendly Vercel steps

1. Create a free Vercel account at <https://vercel.com/>.
2. Push this project to a GitHub, GitLab, or Bitbucket repository.
3. In Vercel, choose **Add New...** → **Project**.
4. Import the repository that contains this app.
5. On the project settings screen, confirm these values:
   - **Framework Preset:** Other
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
6. Click **Deploy**.
7. When the deployment finishes, open the Vercel-provided URL to view the app.

### Updating the deployed app

After the first deployment, push changes to the connected Git branch. Vercel will automatically run `npm run build` and publish the contents of `dist/` again.
