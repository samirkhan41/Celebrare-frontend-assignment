# Celebrare Photo Gallery

A responsive, high-performance React photo gallery web application built for the Celebrare Frontend Internship Pre-Screening Assignment. The application fetches curated photos from the Picsum Photos API, provides immediate author-based search filtering, and allows users to manage and persist their favourite photos across sessions.

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Assignment Requirements](#2-assignment-requirements)
3. [Features](#3-features)
4. [Technology Stack](#4-technology-stack)
5. [Project Structure](#5-project-structure)
6. [Installation and Setup](#6-installation-and-setup)
7. [Environment Variables](#7-environment-variables)
8. [API Reference](#8-api-reference)
9. [How the Application Works](#9-how-the-application-works)
10. [Custom Hook Explanation (`useFetchPhotos`)](#10-custom-hook-explanation-usefetchphotos)
11. [`useReducer` Implementation](#11-usereducer-implementation)
12. [`localStorage` Persistence](#12-localstorage-persistence)
13. [Performance Optimizations: `useCallback` and `useMemo`](#13-performance-optimizations-usecallback-and-usememo)
14. [Responsive Design](#14-responsive-design)
15. [Manual Testing Checklist](#15-manual-testing-checklist)
16. [Five-Minute Screen Recording Guide](#16-five-minute-screen-recording-guide)
17. [Submission Checklist](#17-submission-checklist)
18. [Known Limitations](#18-known-limitations)

---

## 1. Project Overview

The **Celebrare Photo Gallery** is a clean, single-page React application designed to demonstrate foundational and intermediate React competencies:
- Consuming RESTful web APIs asynchronously with clean state transitions (loading, error, success).
- Creating responsive grid layouts across desktop, tablet, and mobile devices using Tailwind CSS.
- Encapsulating side effects and data retrieval inside reusable custom hooks (`useFetchPhotos`).
- Managing predictable state transitions with `useReducer` and browser storage persistence (`localStorage`).
- Optimizing search operations with React memoization hooks (`useCallback`, `useMemo`).

---

## 2. Assignment Requirements

The assignment specifies seven core areas from the pre-screening brief:

| # | Requirement | Implementation Status | Description |
|---|-------------|-----------------------|-------------|
| **1** | **Project Setup** | Completed | React + Vite with Tailwind CSS. Zero external component libraries (no MUI, Bootstrap, or Ant Design). |
| **2** | **Fetch Photos from API** | Completed | Fetches 30 photos on load from `https://picsum.photos/v2/list?limit=30`. Features loading spinner, error message display, and HTTP status checking. |
| **3** | **Responsive Grid** | Completed | Clean cards with photo, author name, and heart button. 4 columns on desktop, 2 columns on tablet, 1 column on mobile. |
| **4** | **Search Filter** | Completed | Real-time, case-insensitive author search at the top. Instant UI updates without page reloads or redundant API requests. |
| **5** | **Favourites with `useReducer`** | Completed | Heart icon toggles favourite state using a pure `useReducer` (no `useState` for favourites). IDs persist in `localStorage` across page refreshes. |
| **6** | **Custom Hook** | Completed | `useFetchPhotos` encapsulates all fetching, returning `{ photos, loading, error }`. Handled cleanup via `AbortController`. |
| **7** | **`useCallback` + `useMemo`** | Completed | `useCallback` handles the search input change event; `useMemo` computes the filtered photo array efficiently. |

---

## 3. Features

- **Automated Data Fetching**: Retrieves 30 photos immediately when the app mounts without requiring manual button triggers.
- **Loading Spinner & Error Resilience**: Displays an animated SVG spinner during fetch and an alert box with retry button on network or HTTP errors.
- **Responsive Layout**:
  - Desktop (`>= 1024px`): 4-column grid.
  - Tablet (`640px` - `1023px`): 2-column grid.
  - Mobile (`< 640px`): 1-column layout.
- **Real-Time Author Search**: Instant filtering as you type, with case-insensitive matching, active result counters, and dedicated empty-state feedback.
- **Favourites State Management**: Add/remove favourites with a single tap, accompanied by active visual styling (filled rose heart vs outline) and an animated top counter badge.
- **Persistent Storage**: Saved favourites are remembered across browser refreshes and tab closures using `localStorage`, with safe JSON parsing and fallback error handling.
- **Accessible & Semantic HTML**: Uses semantic `<header>`, `<main>`, `<article>`, accessible SVG icons, and `aria-label` / `aria-pressed` attributes.

---

## 4. Technology Stack

- **Core**: React 19 (Functional Components & Hooks)
- **Bundler & Dev Server**: Vite 7
- **Styling**: Tailwind CSS v4 (`@tailwindcss/vite`)
- **Language**: JavaScript (ES Modules, JSX)
- **Data Source**: Picsum Photos REST API
- **HTTP Client**: Native Browser `fetch` API with `AbortController`
- **State & Storage**: React `useReducer`, `useState`, `useEffect`, `useCallback`, `useMemo`, and browser `localStorage`

---

## 5. Project Structure

```
frontend/
├── public/
│   └── vite.svg                      # Vite favicon asset
├── src/
│   ├── hooks/
│   │   └── useFetchPhotos.js         # Custom hook: fetches 30 photos, manages loading, error, and AbortController
│   ├── reducers/
│   │   └── favoritesReducer.js       # Pure reducer for toggling favourite IDs + localStorage loader
│   ├── gallery/
│   │   └── Gallery.jsx               # Main gallery component (search, grid, card UI, favorites integration)
│   ├── App.jsx                       # Top-level application component
│   ├── main.jsx                      # React 19 entry point with React.StrictMode
│   └── index.css                     # Global CSS with Tailwind CSS v4 import
├── index.html                        # HTML entry point with metadata and Inter font
├── package.json                      # Project dependencies and npm scripts
├── vite.config.js                    # Vite configuration with React and Tailwind plugins
├── eslint.config.js                  # ESLint flat configuration for React & Hooks
└── README.md                         # Comprehensive project documentation
```

### Purpose of Key Source Files

- **`src/hooks/useFetchPhotos.js`**: Reusable custom hook isolating network requests from UI. Initializes `photos`, `loading`, and `error` states, handles HTTP failures, and cancels inflight requests on unmount using `AbortController`.
- **`src/reducers/favoritesReducer.js`**: Contains the pure reducer function `favoritesReducer` handling `TOGGLE_FAVORITE` actions, along with `getInitialFavorites()` for safely hydrating initial state from `localStorage`.
- **`src/gallery/Gallery.jsx`**: The core UI component connecting `useFetchPhotos`, `useReducer`, search state, and rendering the responsive CSS Grid of photo cards.
- **`src/App.jsx`**: Minimal root component rendering the `Gallery`.
- **`src/main.jsx`**: Bootstraps the React DOM root and wraps the application in `<StrictMode>`.

---

## 6. Installation and Setup

### Prerequisites

- **Node.js**: v18.0.0 or later (recommended: v20 LTS)
- **npm**: v9.0.0 or later

### Step-by-Step Instructions

1. **Clone the repository**:
   ```bash
   git clone <YOUR_GITHUB_REPOSITORY_URL>
   cd FrontendAssignment/frontend
   ```
   *(Or navigate directly into the project directory if working locally)*

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://127.0.0.1:5173/` or `http://localhost:5173/`.

4. **Run linting**:
   ```bash
   npm run lint
   ```

5. **Build for production**:
   ```bash
   npm run build
   ```

6. **Preview the production build locally**:
   ```bash
   npm run preview
   ```

---

## 7. Environment Variables

**No environment variables are required.**

The application connects directly to the public Picsum Photos API endpoint (`https://picsum.photos/v2/list?limit=30`) without requiring API keys or secret tokens.

---

## 8. API Reference

### Endpoint
`GET https://picsum.photos/v2/list?limit=30`

### Purpose
Fetches a list of 30 curated photographs from the Picsum service.

### Key Fields Used by the Application

| Field Name | Type | Purpose in Application |
|---|---|---|
| `id` | `string` | Unique identifier used as the React list `key` and stored in favourites. |
| `author` | `string` | Displayed photographer name and the query target for real-time search. |
| `download_url` | `string` | Source URL (`src`) rendered inside the `<img />` tag. |
| `url` | `string` | Target hyperlink (`href`) leading to the original photograph page on Unsplash/Picsum. |
| `width` / `height` | `number` | Original image dimensions (aspect ratio is normalized to 4:3 in cards). |

### Example API Response Item
```json
{
  "id": "0",
  "author": "Alejandro Escamilla",
  "width": 5616,
  "height": 3744,
  "url": "https://unsplash.com/photos/yC-YDelHvfQ",
  "download_url": "https://picsum.photos/id/0/5616/3744"
}
```

---

## 9. How the Application Works

1. **Mounting**: When `Gallery.jsx` mounts, the `useFetchPhotos` custom hook executes its `useEffect` hook.
2. **Data Retrieval**: `fetch()` issues a `GET` request to `https://picsum.photos/v2/list?limit=30` with an `AbortController.signal`.
3. **State Hydration**:
   - While the request is pending, `loading` is `true`, rendering a centered loading spinner.
   - Concurrently, `useReducer` initializes the favourites list by reading saved IDs from `localStorage` via `getInitialFavorites()`.
4. **Rendering the Grid**:
   - Upon successful fetch, `photos` is populated, `loading` becomes `false`, and the cards are rendered in a responsive grid.
5. **Real-Time Filtering**:
   - When the user types into the search input, `handleSearchChange` updates `searchTerm`.
   - `useMemo` immediately evaluates `photos.filter(...)` without triggering new API calls.
   - If no authors match the term, a friendly empty-state placeholder is shown.
6. **Toggling Favourites**:
   - Clicking a card's heart button dispatches `{ type: 'TOGGLE_FAVORITE', payload: photoId }` to `favoritesReducer`.
   - The reducer immutably returns an updated array of favourite IDs.
   - A `useEffect` hook listening to `favorites` writes the updated array back to `localStorage`.

---

## 10. Custom Hook Explanation (`useFetchPhotos`)

Located at: `src/hooks/useFetchPhotos.js`

### What it Returns
```javascript
const { photos, loading, error } = useFetchPhotos();
```
- **`photos`** (`Array`): Array of 30 photo objects returned by the Picsum API. Defaults to `[]`.
- **`loading`** (`boolean`): Indicates whether the network request is currently active. Starts at `true`, switches to `false` when finished.
- **`error`** (`string | null`): Contains a descriptive error message if the fetch failed (e.g. network outage, HTTP 404/500). Defaults to `null`.

### Error Handling & Unmount Protection
```javascript
useEffect(() => {
  const controller = new AbortController();

  const fetchPhotos = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('https://picsum.photos/v2/list?limit=30', {
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch photos (HTTP ${response.status}: ${response.statusText || 'Error'})`);
      }

      const data = await response.json();
      setPhotos(data);
    } catch (err) {
      if (err.name !== 'AbortError') {
        setError(err.message || 'An unexpected error occurred while fetching photos.');
      }
    } finally {
      if (!controller.signal.aborted) {
        setLoading(false);
      }
    }
  };

  fetchPhotos();

  return () => {
    controller.abort();
  };
}, []);
```

### Key Technical Aspects to Explain in Video:
1. **Separation of Concerns**: UI components should not know about HTTP headers, status codes, or parsing logic. The hook encapsulates network operations and exposes only ready-to-consume state.
2. **HTTP Status Validation**: Native `fetch` does not reject promises on HTTP 4xx or 5xx errors. We check `!response.ok` manually and throw an explicit error.
3. **`AbortController` Cleanup**: If the user navigates away or the component unmounts before the network request finishes (or during React 19 `StrictMode` mount cycles), `controller.abort()` cancels the fetch and prevents memory leaks or state updates on unmounted components.

---

## 11. `useReducer` Implementation

Located at: `src/reducers/favoritesReducer.js`

### Why `useReducer` Instead of `useState`?
- **Predictable State Transitions**: Favourites involve toggle operations (check existence -> add or filter out). A reducer centralizes this business logic in a pure JavaScript function outside of the component.
- **Immutability & Purity**: `favoritesReducer` never mutates the state array in place (e.g., using `.push()` or `.splice()`). It always returns a new array via `.filter()` or the spread operator `[...state, photoId]`.
- **Extensibility**: If future requirements demand features like `"CLEAR_ALL_FAVORITES"` or `"REORDER_FAVORITES"`, they can be added directly to the reducer without modifying card-level click handlers.

### Action Structure
```javascript
export const FAVORITES_ACTIONS = {
  TOGGLE_FAVORITE: 'TOGGLE_FAVORITE',
};

export function favoritesReducer(state, action) {
  switch (action.type) {
    case FAVORITES_ACTIONS.TOGGLE_FAVORITE: {
      const photoId = action.payload;
      if (state.includes(photoId)) {
        return state.filter((id) => id !== photoId);
      }
      return [...state, photoId];
    }
    default:
      return state;
  }
}
```

---

## 12. `localStorage` Persistence

### Safe Hydration
LocalStorage data can be missing, empty, or corrupted. The helper function `getInitialFavorites` wraps `localStorage.getItem` and `JSON.parse` in a `try...catch` block and validates that the parsed result is a genuine array:

```javascript
export const getInitialFavorites = () => {
  try {
    const saved = localStorage.getItem(FAVORITES_STORAGE_KEY);
    if (!saved) return [];
    const parsed = JSON.parse(saved);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error('Failed to load favorites from localStorage:', error);
    return [];
  }
};
```

### Lazy Initialization in `useReducer`
We pass `getInitialFavorites` as the 3rd argument to `useReducer`:
```javascript
const [favorites, dispatch] = useReducer(
  favoritesReducer,
  [],
  getInitialFavorites
);
```
This ensures `localStorage` is only accessed **once** during initial mount, rather than on every render.

### Synchronization
Whenever `favorites` updates, an effect writes the new state to `localStorage`:
```javascript
useEffect(() => {
  try {
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
  } catch (err) {
    console.error('Failed to persist favourites to localStorage:', err);
  }
}, [favorites]);
```

---

## 13. Performance Optimizations: `useCallback` and `useMemo`

### 1. `useCallback` for Search Input Handler
```javascript
const handleSearchChange = useCallback((event) => {
  setSearchTerm(event.target.value);
}, []);
```
- **What it does**: Memoizes the reference to `handleSearchChange`. Because its dependency array is empty (`[]`), the exact same function reference is preserved across renders.
- **Why it matters**: In React, functions defined inside a component body are re-created as new memory references on every render. Wrapping the handler in `useCallback` ensures stability, preventing unnecessary re-renders of child components that receive this callback.

### 2. `useMemo` for Filtered Photos
```javascript
const filteredPhotos = useMemo(() => {
  const cleanTerm = searchTerm.trim().toLowerCase();
  if (!cleanTerm) {
    return photos;
  }
  return photos.filter((photo) =>
    photo.author.toLowerCase().includes(cleanTerm)
  );
}, [photos, searchTerm]);
```
- **What it does**: Caches the filtered photo array. It only recalculates when either `photos` or `searchTerm` changes.
- **Why it matters**: When the user clicks the favourite heart button on a card, the component re-renders to update the heart icon and top badge. Without `useMemo`, the entire `.filter()` computation would run again unnecessarily. With `useMemo`, React reuses the cached array instantly.
- **Context Note**: While filtering 30 items is fast on modern machines, `useMemo` is an essential tool for preventing performance degradation when working with larger datasets, expensive computations, or complex nested structures.

---

## 14. Responsive Design

The gallery layout adheres strictly to the assignment's responsive grid specifications:

```jsx
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
```

| Device Viewport | Breakpoint | Columns | Tailwind Class |
|---|---|---|---|
| **Mobile** | `< 640px` | **1 Column** | `grid-cols-1` |
| **Tablet** | `640px` - `1023px` | **2 Columns** | `sm:grid-cols-2` |
| **Desktop** | `>= 1024px` | **4 Columns** | `lg:grid-cols-4` |

### Card Sizing & Uniformity
Each photo card utilizes an `aspect-4/3` container with `object-cover w-full h-full`. This guarantees that all cards maintain identical heights and consistent alignments regardless of variations in original image dimensions.

---

## 15. Manual Testing Checklist

Use this checklist to verify application behaviour manually in your browser:

- [x] **Initial Load**:
  - Open `http://localhost:5173/`.
  - Verify the loading spinner briefly displays before the photos appear.
  - Verify that exactly 30 photo cards are displayed.
- [x] **Card Contents**:
  - Verify each card shows an image, photographer name, and a heart button.
  - Click the external link icon on a card and verify it opens the original Picsum/Unsplash page in a new tab.
- [x] **Search Filtering**:
  - Type an existing author's name (e.g. `Alejandro`) in the search input.
  - Verify the grid updates immediately without a page reload or network request.
  - Test case-insensitivity: typing `alejandro` or `ALEJANDRO` yields the same results.
  - Clear the input using the `✕` button and verify all 30 photos reappear.
- [x] **Empty Search State**:
  - Type a non-existent name (e.g. `xyz123nonsense`).
  - Verify the empty-state message appears (*"No photos found"*).
  - Click the **"Clear Search"** button and confirm photos return.
- [x] **Favourites Toggle**:
  - Click the heart button on card 1. Verify the heart fills with red/rose color and the header badge displays `1 favourite`.
  - Click the heart button on card 2. Verify the header badge displays `2 favourites`.
  - Click the heart button on card 1 again. Verify it toggles off and the badge drops to `1 favourite`.
- [x] **`localStorage` Persistence**:
  - With 2 photos favourited, refresh the page (`Cmd + R` or `F5`).
  - Verify that both photos remain favourited and the top badge still reads `2 favourites`.
- [x] **Responsive Grid**:
  - Resize the browser window down to mobile size (`< 640px`): verify 1 column.
  - Resize to tablet width (`~768px`): verify 2 columns.
  - Expand to desktop width (`> 1024px`): verify 4 columns.
- [x] **Lint & Build**:
  - Run `npm run lint`: 0 errors, 0 warnings.
  - Run `npm run build`: successful production bundle generation.

---

## 16. Five-Minute Screen Recording Guide

Follow this suggested timeline and script structure during your 5-minute video recording:

### Minute 0:00 – 1:00: App Demonstration
- **Action**: Open the running app in your browser (`http://localhost:5173/`).
- **Talking Points**:
  - Show the 4-column responsive desktop grid.
  - Type an author's name in the search bar to demonstrate real-time filtering.
  - Click the heart icon on 2 different cards; point out the filled heart icon and the header counter updating.
  - Refresh the page to prove favourites persist from `localStorage`.
  - Quickly resize the browser window to show the layout adapting to 2 columns (tablet) and 1 column (mobile).

### Minute 1:00 – 2:00: Custom Hook (`useFetchPhotos.js`)
- **Action**: Switch to VS Code / editor and open `src/hooks/useFetchPhotos.js`.
- **Talking Points**:
  - *"Here is my custom hook `useFetchPhotos`. It returns three values: `photos`, `loading`, and `error`."*
  - Explain the `useEffect`: it runs once on mount, initiates a `fetch` to `https://picsum.photos/v2/list?limit=30`.
  - Point out HTTP error checking: `if (!response.ok) throw new Error(...)`.
  - Explain the `AbortController`: it cancels pending requests on unmount to prevent memory leaks and state updates on unmounted components.

### Minute 2:00 – 3:00: Reducer (`favoritesReducer.js`)
- **Action**: Open `src/reducers/favoritesReducer.js`.
- **Talking Points**:
  - *"Why did I choose `useReducer` instead of `useState`?"*
  - Explain that `useReducer` keeps state transition logic pure, predictable, and isolated from the UI.
  - Walk through `TOGGLE_FAVORITE`: if the ID already exists in the state array, it returns `state.filter(...)`; otherwise, it returns `[...state, photoId]`.
  - Highlight that it is a pure function that never mutates existing state.
  - Show `getInitialFavorites()` and how it safely parses `localStorage` with a fallback if data is malformed.

### Minute 3:00 – 4:00: `useCallback` & `useMemo` in `Gallery.jsx`
- **Action**: Open `src/gallery/Gallery.jsx`.
- **Talking Points**:
  - Highlight `handleSearchChange` wrapped in `useCallback`: *"This ensures the event handler function reference is preserved across renders."*
  - Highlight `filteredPhotos` computed with `useMemo`: *"This prevents re-filtering all 30 photos whenever another state changes, such as when toggling a favourite heart."*
  - State clearly: *"If I removed them, the app would still work for 30 items, but re-allocating handlers and re-calculating filters on every render causes performance bottlenecks on larger datasets."*

### Minute 4:00 – 5:00: Implementation Challenge & Conclusion
- **Action**: Share one real challenge you solved.
- **Talking Points**:
  - Example challenge: *"Handling React 19 `StrictMode` duplicate effect execution while synchronizing `localStorage` and `AbortController`. At first, an unhandled abort could throw an uncaught error in console, so I added explicit `err.name !== 'AbortError'` checks in the hook catch block to ensure clean execution."*
  - Mention that all 7 assignment requirements are fully satisfied.

---

## 17. Submission Checklist

- [ ] **GitHub Repository**:
  - Initialize git: `git init`
  - Commit all files: `git add . && git commit -m "Complete Celebrare React Photo Gallery assignment"`
  - Create a **Public** GitHub repository.
  - Push code: `git remote add origin <REPO_URL> && git push -u origin main`
- [ ] **Screen Recording**:
  - Record the 5-minute explanation video using QuickTime, Windows Game Bar (`Win + G`), or OBS Studio.
  - Upload to **Google Drive** (ensure link sharing is set to *"Anyone with the link can view"*) or **YouTube** (set to *"Unlisted"*).
- [ ] **Google Form**:
  - Paste your public GitHub repository URL.
  - Paste your video recording link.
  - Include a one-line summary of the most challenging part.
  - Submit before the 24-hour deadline.

---

## 18. Known Limitations

- **Public Picsum API**: The application depends on `picsum.photos` being available online. If the API experiences downtime or rate limits, the app presents the built-in error message and retry button.
- **Client-Side Storage**: Favourites are stored in the user's browser `localStorage`. Favourites do not sync across different browsers or separate devices.
- **Search Scope**: Search filters the 30 fetched photographs by author name in client memory; it does not query remote backend search endpoints.
