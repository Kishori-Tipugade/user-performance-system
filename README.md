# User Performance System (Elescript Assignment)

## Overview

This project processes user data, computes performance scores, and provides APIs along with a React UI to view and filter users.

The goal was to handle real-world messy data, support dynamic fields, and build a clean backend-driven system.

---

## Project Structure

```
project/
│
├── backend/     → Express API (data processing & scoring)
├── frontend/    → React UI (data visualization)
└── README.md
```

---

## Features

* Clean and standardize user data
* Handle missing values (name, activity fields)
* Dynamically process nested JSON fields (posts, comments, shares, likes, etc.)
* Compute performance score
* Categorize users:

  * High
  * Medium
  * Low
* REST APIs:

  * `/api/users`
  * `/api/score/:id`
  * `/api/filter?category=High`
* React UI with filtering and clear data display
* Total activity shown for better understanding of score

---

## My Approach

* First, I cleaned the user data and handled missing values (like null names and missing activity fields)
* Then I designed the backend to calculate the score instead of doing it in the frontend
* I used dynamic handling (`Object.values`) so that new fields like **shares** and **likes** are automatically included
* Initially, I made a mistake by flattening the activity object, which broke dynamic handling — I fixed it by keeping the full nested structure
* Finally, I connected the React frontend and added filtering, sorting, and UI improvements

---

## Setup Instructions

### 1. Clone Repository

```
git clone https://github.com/Kishori-Tipugade/user-performance-system.git
cd user-performance-system

---

### 2. Start Backend

cd backend
npm install
npm run dev

Server runs at:

http://localhost:5000

---

### 3. Start Frontend

cd frontend
npm install
npm start

App runs at:

http://localhost:3000

---

## API Endpoints

### GET `/api/users`

Returns all users with:

* cleaned data
* computed score
* category
* sorted by score (descending)

---

### GET `/api/score/:id`

Example:

{
  "score": 30,
  "category": "High"
}

---

### GET `/api/filter?category=High`

Returns users filtered by category.

---

## Edge Cases Handled

* Missing name → "Unknown"
* Missing activity → treated as empty object
* Missing fields inside activity → treated as 0
* Invalid category → validation error
* New activity fields → automatically included in score

---

## Example (Dynamic Handling)

Input:

```
"activity": {
  "posts": 3,
  "comments": 2,
  "shares": 10,
  "likes": 15
}
```

Output:

```
Total Activity = 30
Score = 30
Category = High
```

---

## UI Highlights

* Clean card-based layout
* Responsive table
* Category color coding:

  * High → Green
  * Medium → Orange
  * Low → Red
* Hover effects
* Clear display of total activity and score

---

## Conclusion

This project helped me understand how to handle dynamic data structures, design backend-driven logic, and build a clean integration between API and UI.
