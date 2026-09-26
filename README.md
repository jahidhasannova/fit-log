# 💪 B14-A6-Fit Log

**FitLog** is a responsive workout library built with Next.js where users can explore workouts, view detailed workout information, build a daily workout plan, and save workouts for later.

## 🔗 Live Website

https://fit-ht7tlrg27-jahid18.vercel.app/

## 📦 GitHub Repository

https://github.com/jahidhasannova/fit-log

## 🛠️ Technologies Used

* Next.js
* React
* JavaScript
* Tailwind CSS
* React Toastify
* Lucide React
* REST API
* LocalStorage

## ✨ Key Features

* 🏋️ Browse workouts from the FitLog REST API
* 📄 View detailed information for each workout
* 📋 Add workouts to today's plan
* 🔖 Save workouts for later
* 📊 Track exercises, total minutes, and calories
* 🔄 Sort workouts by duration, calories, and rating
* ✅ Mark workouts as completed
* ❌ Remove workouts from today's plan or saved list
* 🔔 Get toast notifications for important actions
* 💾 Keep plan and saved workouts using LocalStorage
* 📱 Fully responsive for mobile, tablet, and desktop
* 🚫 Custom 404 page for invalid routes
* ⏳ Loading state while workout data is being fetched

## 🔌 API Used

### All Workouts

```text
https://api.abcz.workers.dev/api/fitlog
```

Used to fetch the complete workout library.

### Single Workout

```text
https://api.abcz.workers.dev/api/fitlog/:id
```

Used to fetch details for a specific workout.

## 📁 Main Features

### Workout Library

Users can browse all available workouts and view important information such as:

* Muscle groups
* Equipment
* Duration
* Calories burned
* Rating

### Workout Details

Each workout has a dedicated details page containing:

* Workout description
* Muscle groups
* Equipment
* Difficulty
* Sets and reps
* Duration
* Calories
* Rating
* Step-by-step instructions

Users can also add a workout to today's plan or save it for later.

### My Plan

The My Plan page allows users to:

* View today's selected workouts
* View saved workouts
* Track total exercises, minutes, and calories
* Sort workouts by duration, calories, or rating
* Mark workouts as done
* Remove workouts from the list

## 📱 Responsive Design

FitLog is designed to work across:

* 📱 Mobile devices
* 📲 Tablets
* 💻 Desktop screens

## 🚀 Getting Started

Clone the repository:

```bash
git clone https://github.com/jahidhasannova/fit-log.git
```

Go to the project folder:

```bash
cd fit-log
```

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

## 👨‍💻 Developer

**Jahid Hasan**

