[README.md](https://github.com/user-attachments/files/26069283/README.md)
# 🍴 Forkify — Recipe Search & Management Application

> Search over **1,000,000 recipes**, adjust servings dynamically, bookmark your favourites, and even upload your own custom recipes — all in one sleek, JavaScript-powered web application.

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Live Demo](#-live-demo)
- [Features](#-features)
- [Architecture](#-architecture)
- [Project Structure](#-project-structure)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [API Reference](#-api-reference)
- [Design Patterns](#-design-patterns)
- [Flowcharts](#-flowcharts)
- [Author](#-author)
- [License](#-license)

---

## 🌐 Overview

**Forkify** is a modern, single-page recipe application built with vanilla JavaScript using a clean **MVC (Model-View-Controller)** architecture. It integrates with the [Forkify API](https://forkify-api.jonas.io) to fetch, display, and manage recipes. Users can search for dishes, view ingredient lists with auto-scaled quantities, bookmark recipes across browser sessions via `localStorage`, and contribute their own recipes through a guided upload form.

This project was built as part of Jonas Schmedtmann's **"The Complete JavaScript Course"** and demonstrates advanced JavaScript concepts including asynchronous programming, modular architecture, the Publisher-Subscriber pattern, and ES6+ syntax.

---

## 🚀 Live Demo

> To run locally, see [Getting Started](#-getting-started) below.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🔍 **Recipe Search** | Search across 1,000,000+ recipes using the Forkify REST API |
| 📄 **Paginated Results** | Results displayed 10 per page with intuitive prev/next navigation |
| 🍳 **Recipe Details** | View full recipe info: cooking time, servings, ingredients, and a link to full directions |
| ➕➖ **Dynamic Servings** | Adjust serving count and watch ingredient quantities recalculate in real time |
| 🔖 **Bookmarks** | Save favourite recipes; bookmarks persist across sessions via `localStorage` |
| 📤 **Recipe Upload** | Submit your own recipe through a modal form (supports up to 6 ingredients) |
| ⚡ **Request Timeout** | API calls time out after 10 seconds with a descriptive user-facing error |
| 🔄 **Hot Module Reload** | Parcel HMR enabled in development for instant feedback |

---

## 🏗️ Architecture

Forkify follows a strict **MVC pattern** to separate concerns:

```
┌─────────────────────────────────────────────────────┐
│                    CONTROLLER                       │
│  controller.js  ─  orchestrates model ↔ views       │
└──────────────────┬──────────────┬───────────────────┘
                   │              │
          ┌────────▼───┐    ┌─────▼──────────┐
          │   MODEL    │    │     VIEWS      │
          │ model.js   │    │  (8 view files)│
          │ state mgmt │    │  DOM rendering │
          └────────────┘    └────────────────┘
```

- **Model** (`model.js`) — Application state, API communication, `localStorage` persistence.
- **Controller** (`controller.js`) — Wires model and views together; handles all user events via the Publisher-Subscriber pattern.
- **Views** (`src/js/views/`) — Each UI component is its own class. Views know nothing about business logic.

---

## 📁 Project Structure

```
forkify/
├── index.html                          # App shell & static HTML
├── package.json                        # Dependencies & scripts
├── .prettierrc                         # Code formatting config
│
├── forkify-architecture-recipe-loading.png   # Architecture diagram
├── forkify-flowchart-part-1.png              # Flowchart part 1
├── forkify-flowchart-part-2.png              # Flowchart part 2
├── forkify-flowchart-part-3.png              # Flowchart part 3
│
└── src/
    ├── img/                            # Logo, icons SVG sprite, favicons
    │
    ├── sass/                           # SCSS stylesheets (modular)
    │   ├── main.scss                   # Entry point, imports all partials
    │   ├── _base.scss                  # Reset, global variables, typography
    │   ├── _header.scss                # Top navigation & search bar
    │   ├── _components.scss            # Buttons, spinner, messages, overlays
    │   ├── _preview.scss               # Recipe card previews in results list
    │   ├── _recipe.scss                # Full recipe detail view
    │   ├── _searchResults.scss         # Left-panel results layout
    │   └── _upload.scss                # Add-recipe modal form
    │
    └── js/                             # JavaScript source (ES Modules)
        ├── config.js                   # Global constants (API URL, pagination, key)
        ├── helpers.js                  # Reusable AJAX utility with timeout
        ├── model.js                    # State management & API layer
        ├── controller.js               # Event handlers & MVC glue
        └── views/
            ├── view.js                 # Abstract base View class
            ├── recipeView.js           # Recipe detail rendering & events
            ├── searchView.js           # Search input handler
            ├── resultsView.js          # Search results list
            ├── previewView.js          # Individual recipe preview card
            ├── paginationView.js       # Pagination button logic
            ├── bookmarksView.js        # Bookmarks dropdown panel
            └── addRecipeView.js        # Upload modal form
```

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| **HTML5** | Application shell & semantic markup |
| **SCSS / Sass** | Modular, maintainable styling with partials |
| **JavaScript (ES2022+)** | Core application logic; ES Modules, async/await |
| **Parcel v2** | Zero-config bundler, dev server, SASS transformer |
| **Forkify REST API** | Recipe data source (v2) |
| **core-js** | Polyfills for broad browser compatibility |
| **regenerator-runtime** | Async/await transpilation support |
| **fracty** | Converts decimal quantities to readable fractions (e.g. `0.5` → `1/2`) |
| **localStorage** | Client-side bookmark persistence across sessions |

---

## ⚙️ Getting Started

### Prerequisites

- **Node.js** ≥ 16.x
- **npm** ≥ 8.x

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/Fady-Wagih-Hares/forkify-APP.git

# 2. Navigate to the project directory
cd forkify-APP

# 3. Install dependencies
npm install
```

### Running in Development

```bash
npm start
```

Parcel will start a local dev server (default: `http://localhost:1234`) with Hot Module Replacement enabled.

### Building for Production

```bash
npm run build
```

The optimised, minified output is generated in the `./dist` folder.

---

## 🔌 API Reference

Base URL: `https://forkify-api.jonas.io/api/v2/recipes/`

| Endpoint | Method | Description |
|---|---|---|
| `/?search={query}&key={KEY}` | `GET` | Search recipes by keyword |
| `/{id}?key={KEY}` | `GET` | Fetch a single recipe by ID |
| `/?key={KEY}` | `POST` | Upload a new custom recipe |

> **Timeout:** All requests are raced against a 10-second timeout via `Promise.race()` to prevent hanging UI states.

---

## 🎨 Design Patterns

### Publisher-Subscriber (Observer)
Views **publish** user events (clicks, form submits) via `addHandler*` methods. The controller **subscribes** to these events without either side having direct knowledge of the other — keeping the architecture cleanly decoupled.

### State Management
A single `state` object in `model.js` serves as the single source of truth for:
- Current recipe
- Search query, results, current page
- Bookmarks array

### Abstract Base View
`view.js` provides a base `View` class with shared rendering methods (`render`, `update`, `renderSpinner`, `renderError`, `renderMessage`). All concrete views extend this class, ensuring a consistent interface.

### DOM Diffing (`update`)
The `update()` method on the base `View` class performs a lightweight DOM diff — comparing new and current DOM nodes and updating only changed attributes/text, avoiding costly full re-renders.

---

## 📊 Flowcharts

The following diagrams document the complete application flow:

| Diagram | Description |
|---|---|
| `forkify-architecture-recipe-loading.png` | How a recipe is loaded end-to-end |
| `forkify-flowchart-part-1.png` | Search and results flow |
| `forkify-flowchart-part-2.png` | Bookmarks and servings update flow |
| `forkify-flowchart-part-3.png` | Recipe upload flow |

---

## 👤 Author

**Fady Wagih**

Built as a capstone project from [Jonas Schmedtmann's The Complete JavaScript Course](https://www.udemy.com/course/the-complete-javascript-course/).

> Original course design and API © Jonas Schmedtmann. Used for learning and portfolio purposes. Not for resale or re-teaching.

---

## 📄 License

This project is licensed under the **ISC License**.

---
