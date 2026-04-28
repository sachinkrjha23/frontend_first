# 🍔 Swiggy Clone - Food Delivery App

A fully functional Swiggy clone built with React that lets you browse restaurants, explore menus, filter by preferences, and manage your cart.

**Live Demo:** https://swiggyfrontend.netlify.app/

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🏠 **Restaurant Listing** | Browse restaurants with ratings, cuisines, and delivery times |
| ⭐ **Smart Filters** | Filter by rating 4.5+, fast delivery (≤30 min), or pure veg |
| 📋 **Restaurant Menu** | View categorized menu with expandable sections |
| 🟢 **Veg/Non-Veg Filter** | Toggle between veg and non-veg items in menu |
| 🛒 **Cart Management** | Add/remove items, adjust quantities in real-time |
| 💳 **Checkout Page** | View cart summary with price breakdown (subtotal + GST) |
| 🔍 **Search Dishes** | Search for specific dishes across restaurant menu |
| 💾 **Persistent Cart** | Cart saves automatically to localStorage |

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **React 19** | UI framework for building components |
| **Redux Toolkit** | State management for cart functionality |
| **React Router v7** | Routing and navigation between pages |
| **Tailwind CSS v4** | Styling with utility-first CSS framework |
| **Parcel** | Fast build tool and bundler |
| **Swiggy API** | Real restaurant and menu data |

---

## 📁 Folder Structure
SWIGGY/
├── src/
│ ├── Components/
│ │ ├── Header.js # Main navigation bar
│ │ ├── RestHeader.js # Restaurant page header with cart
│ │ ├── Home.js # Home page with all options
│ │ ├── Restaurant.js # Restaurant listing with filters
│ │ ├── RestCard.js # Individual restaurant card
│ │ ├── RestaurantMenu.js # Menu page with filters
│ │ ├── MenuCard.js # Menu category display
│ │ ├── RestInfo.js # Individual menu item with add to cart
│ │ ├── SearchFood.js # Search dishes functionality
│ │ ├── Checkout.js # Cart checkout page
│ │ ├── Shimmer.js # Loading skeleton for restaurants
│ │ ├── MenuShimmer.js # Loading skeleton for menu
│ │ ├── FoodOption.js # Food categories grid
│ │ ├── GroceryOption.js # Instamart categories
│ │ ├── DineOption.js # Dineout restaurants
│ │ └── SecondaryHome.js # Layout wrapper for nested routes
│ ├── Stored/
│ │ ├── stores.js # Redux store configuration
│ │ └── CartSlicer.js # Cart slice with localStorage
│ ├── Utils/
│ │ ├── FoodData.js # Food categories mock data
│ │ ├── Grocery.js # Grocery categories mock data
│ │ └── DineData.js # Dineout restaurants mock data
│ └── App.js # Main app with route definitions
├── dist/ # Production build folder
├── index.html # Entry HTML file
├── index.css # Tailwind CSS imports
├── package.json # Dependencies and scripts
└── README.md # Project documentation

text

---

## 🌐 API Architecture

This app fetches live data from Swiggy's public API through a **custom Node.js proxy server** deployed on Render.com, eliminating CORS restrictions and manual user intervention.

**How it works:**
- Frontend calls my custom proxy server instead of calling Swiggy directly
- Proxy server adds required headers and forwards the request to Swiggy
- Response is returned to frontend with proper CORS headers

**No more "Request temporary access" needed** — restaurants load automatically.

| Component | Technology | Deployment |
|-----------|------------|------------|
| Frontend | React + Redux + Tailwind | Netlify |
| API Proxy | Node.js + Express | Render.com |

**Proxy Server Repository:** [github.com/sachinkrjha23/swiggy-proxy](https://github.com/sachinkrjha23/swiggy-proxy)

---

## 📱 Responsive Design

| Device | Layout |
|--------|--------|
| **Mobile** | Hamburger menu, stacked layout |
| **Tablet** | 2-3 column grid |
| **Desktop** | 4 column grid, horizontal navigation |

---

## 📞 Connect

**Sachin Kumar Jha**

- GitHub: [@sachinkrjha23](https://github.com/sachinkrjha23)
- Project: [github.com/sachinkrjha23/frontend_first](https://github.com/sachinkrjha23/frontend_first)
