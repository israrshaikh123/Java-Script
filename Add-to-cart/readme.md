🛒 JavaScript Add to Cart Project
📌 Project Description

This is a pure JavaScript Add to Cart web project that allows users to:

View products

See product details on a separate page

Add products to cart

Increase/decrease quantity

Remove items from cart

Add, edit, and delete products using localStorage

No backend is used — everything works using localStorage.

🧱 Folder Structure
project-folder/
│
├── index.html              # Home page (product listing)
├── product-detail.html     # Single product details page
├── cart.html               # Cart page
├── add-product.html        # Add new product
├── edit.html               # Edit product
├── view.html               # View all products
│
├── assets/
│   ├── images/             # All product images
│   │   ├── product-01-2.webp
│   │   ├── product-03-3.webp
│   │   ├── product-04-3.webp
│   │   └── product-05-1.webp
│   │
│   ├── script.js           # Main JavaScript logic
│   └── style.css           # CSS styling
│
└── README.md

⚙️ Technologies Used

HTML5

CSS3

JavaScript (Vanilla JS)

Bootstrap (for layout & UI)

localStorage (for data persistence)

🧩 Features
✅ Product Listing

Products load dynamically from localStorage

Default products load on first run

✅ Product Details Page

Uses URL parameter (?id=)

Loads correct product using pid

✅ Add to Cart

Add items to cart

Quantity control (+ / −)

Prevents duplicate products

Calculates total price

✅ Cart Page

View cart items

Change quantity

Remove items

Grand total calculation

✅ Admin Features

Add new product

Edit product

Delete product

View all products

🖼️ How to Add Images (IMPORTANT)
📍 Step 1: Put image file here
assets/images/


Example:

assets/images/product-01-2.webp

📍 Step 2: In Add Product page

In the Image input field, type ONLY:

assets/images/product-01-2.webp


❌ Do NOT use:

./assets/images/...

../assets/images/...

C:\Users\...

🧠 Important Rules

Image paths are relative to HTML, not JS

JS file runs on multiple pages → always check element exists

Do NOT modify original product price when adding to cart

Clear localStorage when paths are wrong

🧹 Reset Project Data (If Something Breaks)

Open browser console (F12) and run:

localStorage.clear();
location.reload();

🚀 How to Run the Project

Open the project folder

Double-click index.html

Use navigation links to explore features

No server required — works directly in browser

🎯 Learning Outcomes

DOM manipulation

Event handling

localStorage usage

URL parameters

Dynamic HTML rendering

Real-world project structure

👨‍💻 Author

Israr
Full Stack Development Student
JavaScript Project