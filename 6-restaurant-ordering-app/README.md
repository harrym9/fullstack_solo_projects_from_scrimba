# Harry's Dinner — Restaurant Ordering App

An interactive online food ordering web application where users can browse a menu, manage their cart, and complete checkout via a payment modal.

## Features

- **Dynamic Menu Rendering**: Loads menu items (images, ingredients, prices) from `data.js`.
- **Cart Management**: Add items with `+`, increment quantities automatically, remove items one by one, and view real-time total price updates.
- **Payment Modal & Validation**: Completing an order opens a card details modal with automatic 4-digit card number spacing, CVV/expiration validation, and a personalized order confirmation message.
- **Modular JavaScript**: Uses ES modules to separate menu data (`data.js`) from UI and cart logic (`script.js`).

## Tech Stack

- HTML5
- CSS3
- Vanilla JavaScript (ES Modules)
- Google Fonts (`Smythe`)

## Project Structure

```text
6-restaurant-ordering-app/
├── assets/
│   └── images/
├── data.js
├── index.html
├── style.css
├── script.js
└── README.md
```

## Getting Started

Because this project uses ES modules (`<script type="module">`), it must be served over HTTP rather than opened directly via `file://`.

1. Clone the repository and navigate to this project folder:
   ```bash
   cd 6-restaurant-ordering-app
   ```
2. Start a local development server (e.g., VS Code Live Server, `python3 -m http.server`, or `npx serve`):
   ```bash
   python3 -m http.server 8000
   ```
3. Open `http://localhost:8000` in your browser.

