# 📖 Bhagavad Gita API Project

A simple, clean, and responsive **Bhagavad Gita web application** built using **HTML, CSS, and JavaScript**, powered by a public Bhagavad Gita API. The project allows users to browse chapters and read verses in a structured and user‑friendly way.

---

## ✨ Features

- 📚 List of all Bhagavad Gita chapters
- 🧾 View verses of each chapter on a separate page
- 🔄 Clickable logo to return to Home page
- 🎨 Clean and minimal UI
- 📱 Fully responsive layout using CSS Grid
- 🌐 Data fetched dynamically using a public API

---

## 🛠️ Tech Stack

- **HTML5** – Structure
- **CSS3** – Styling & responsive layout
- **JavaScript (Vanilla)** – API calls & DOM manipulation
- **Public API** – Bhagavad Gita verses

---

## 🔗 API Used

Data is fetched from the Bhagavad Gita API hosted on GitHub:

```
https://vedicscriptures.github.io/slok/{chapter}/{verse}
```

Example:

```
https://vedicscriptures.github.io/slok/1/1
```

---

## 📂 Project Structure

```
Bhagavad-Gita-Project/
│
├── index.html        # Home page (chapters list)
├── verses.html       # Verses page
├── style.css         # Global styles
├── script.js         # Chapters logic
├── images/
│   ├── bhagavad-gita.webp
│   └── banner.jpg
└── README.md
```

---

## 🚀 How to Run the Project

1. Download or clone the repository
2. Open `index.html` in your browser
3. Click on any chapter to view its verses
4. Click the logo anytime to return to Home

> No server or build setup required — runs directly in the browser.

---

## 🧠 How It Works

- Chapters are loaded dynamically using JavaScript
- Clicking a chapter redirects to `verses.html` with URL parameters
- Verses are fetched using `fetch()` API
- Content is rendered dynamically on the page

---

## 📸 Screenshots

img(ss1.png)
img(ss2.png)

---

## ⚠️ Notes

- This project depends on a public API. Internet connection is required.
- API availability depends on the external source.

---

## 🙌 Credits

- Bhagavad Gita verses: Public GitHub API
- Project built for learning and educational purposes

---

## 📜 License

This project is open‑source and free to use for educational purposes.

---

✨ _Feel free to modify, improve, and expand this project!_
