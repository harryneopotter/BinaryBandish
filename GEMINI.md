# The Binary Bandish Site

A lightweight, auto-updating landing page for **The Binary Bandish** YouTube channel, featuring raga-based progressive fusion compositions.

## Project Overview

This project is a static web application designed to showcase the latest tracks from the "The Binary Bandish" YouTube channel. It features a minimalist, responsive design and automates content updates using the YouTube Data API.

### Key Technologies
- **Frontend:** Vanilla HTML5, CSS3, and JavaScript (ES6+).
- **Backend/Automation:** Node.js (running in GitHub Actions).
- **Data Source:** YouTube Data API v3.
- **Hosting & CI/CD:** GitHub Pages and GitHub Actions.

## Project Structure

- `site/`: The main web application directory.
  - `index.html`: Main entry point and layout.
  - `app.js`: Frontend logic for fetching and rendering video cards.
  - `styles.css`: Responsive design and custom styling.
  - `videos.json`: Data file containing the latest video metadata (auto-generated).
- `scripts/`: Utility scripts.
  - `update_videos.js`: Node.js script that fetches the latest videos from YouTube and updates `site/videos.json`.
- `.github/workflows/`:
  - `update-and-deploy.yml`: Automates the execution of `update_videos.js` every 12 hours and deploys the `site/` directory to GitHub Pages.
- `.genkit/`: Contains Genkit-related metadata and traces (internal tool usage).

## Building and Running

### Prerequisites
- Node.js 18 or later (for native `fetch` support in scripts).

### Local Development
1.  **Serve the site:**
    Use any static file server to serve the `site/` directory.
    ```bash
    npx serve site
    ```
2.  **Update video data:**
    To manually refresh the video list, run the update script with a valid YouTube API key.
    ```bash
    $env:YT_API_KEY="your_api_key"; node scripts/update_videos.js
    ```
    *(Note: The script outputs to `site/videos.json`.)*

### Deployment
Deployment is fully automated via GitHub Actions on every push to the `main` branch and on a 12-hour schedule.

## Development Conventions

- **Minimalism:** No external npm dependencies are used in the production site or the update script.
- **Native APIs:** Leverages native `fetch` for both frontend and script-side network requests.
- **Decoupled Data:** The frontend renders based on the content of `site/videos.json`, allowing the UI to remain static while content updates dynamically.
- **Style:** Uses standard CSS with a focus on CSS Grid for layouts and system fonts for performance.
