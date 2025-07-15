

### ✅ `README.md`

```md
# 🔗 Afford Medical URL Shortener

A sleek, modern, and simple web application to shorten URLs and track statistics – built using **React**, **Node.js**, **Express**, and **Material UI**.

> 📸 Screenshots are provided in this repository for visual reference.

---

## 🚀 Features

- ✅ Shorten long URLs with optional custom shortcodes.
- 🕒 Set expiration time in minutes (default: 30 mins).
- 🔢 Limit of 5 shortened URLs per user session.
- 📊 View stats by entering a shortcode.
- 📋 One-click copy to clipboard.
- 🧾 Clean UI with Material UI components.
- 🌐 Built-in logging with external log service integration.

---

## 🗂️ Folder Structure

```

url-shortener/
├── backend/                  # Express server
│   ├── server.js            # Main API and redirect logic
│   └── logging-middleware/
│       └── logger.js        # Custom logger with token auth
│
├── frontend/                # React app
│   ├── App.jsx              # Main entry component
│   ├── index.js             # React DOM render
│   └── components/          # UI components
│       ├── Header.js
│       ├── ShortenerForm.js
│       ├── ShortenedResult.js
│       ├── StatsPage.js
│       └── SnackbarMessage.js
│
├── README.md                # You're here!
└── package.json             # Project metadata and dependencies

````

---

## ⚙️ How to Run

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/url-shortener.git
cd url-shortener
````

### 2. Backend Setup

```bash
cd backend
npm install
node server.js
```

### 3. Frontend Setup

```bash
cd ../frontend
npm install
npm start
```

---

## 🌍 API Endpoints (Backend)

| Endpoint           | Method | Description                |
| ------------------ | ------ | -------------------------- |
| `/shorturls`       | POST   | Create a new shortened URL |
| `/shorturls/:code` | GET    | Get stats for a shortcode  |
| `/:shortcode`      | GET    | Redirect to original URL   |

---

## 🛡️ Logging Middleware

All requests and API activities are logged using a centralized external service via `logger.js`.
Make sure to add your valid `ACCESS_TOKEN` in `backend/logging-middleware/logger.js`.

---

## 💡 Notes

* The project is designed with simplicity, usability, and readability in mind.
* Works great on both desktop and mobile screens.
* Screenshot folder includes visuals for both URL shortening and stats features.

---

## 📷 Screenshots

Please refer to the `screenshots/` folder in this repo to view:

* UI home page
* Shortener form in action
* Stats lookup panel
* Success/error messages

---

## 👩‍💻 Developed By

Radha Gupta – with ❤️ and attention to detail.

---

=
