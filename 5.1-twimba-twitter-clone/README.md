# Twimba — Twitter Clone

An interactive microblogging web app inspired by Twitter, allowing users to compose tweets, like, retweet, and reply to conversations.

## Features

- **Compose Tweets**: Create new posts with unique IDs generated via `uuid`.
- **Like & Retweet**: Toggle likes and retweets on any tweet with live count updates and active icon styling.
- **Expandable Replies & Comments**: Click the comment icon to toggle reply threads and submit new replies directly to any tweet.
- **Modular JavaScript**: Separates feed data (`data.js`) from application logic (`index.js`) using ES modules.

## Tech Stack

- HTML5
- CSS3
- Vanilla JavaScript (ES Modules)
- Font Awesome 6
- Google Fonts (`Roboto`)
- `uuid` (loaded via `jspm.dev`)

## Project Structure

```text
5.1-twimba-twitter-clone/
├── images/
├── data.js
├── index.html
├── index.css
├── index.js
└── README.md
```

## Getting Started

Because this project uses ES modules (`<script type="module">`), it must be served over HTTP rather than opened directly via `file://`.

1. Clone the repository and navigate to this project folder:
   ```bash
   cd 5.1-twimba-twitter-clone
   ```
2. Start a local development server (e.g., VS Code Live Server, `python3 -m http.server`, or `npx serve`):
   ```bash
   python3 -m http.server 8000
   ```
3. Open `http://localhost:8000` in your browser.
