# Assignment & Review Dashboard

A responsive student-assignment management dashboard built using React.js and Tailwind CSS.

This project was developed as part of the **Joineazy – Frontend Intern Task 1**.

The application provides separate workflows for **Students** and **Admins/Professors**. Students can view their assignments, track progress, and confirm submissions. Admins can create and manage assignments and monitor student submission progress.

## Project Overview

The Assignment & Review Dashboard is designed to simplify assignment management between students and professors/admins.

The application supports:

- Role-based login
- Student assignment management
- Assignment submission confirmation
- Student progress tracking
- Admin assignment creation
- Submission status monitoring
- Individual student progress
- External Google Drive submission links
- Search and filtering
- Responsive design for desktop and mobile

The project uses **mock data and LocalStorage** instead of a backend, as required by the task.

## Features

###  Student Features

- Student login
- Student dashboard
- View assigned assignments
- Search assignments
- Filter assignments
- View assignment details
- View assignment description
- View deadline
- Open external submission/Drive link
- Double-confirmation submission flow
- Submission status
- Track assignment progress
- View overall progress

### Admin / Professor Features

- Admin login
- Admin dashboard
- View assignments
- Create new assignments
- Add assignment title
- Add assignment description
- Set deadline
- Add external Drive/submission link
- View student submission status
- View individual student progress
- Search assignments
- Filter assignments
- Delete assignments
- View overall submission statistics

## Tech Stack

| Technology | Purpose |
|------------|---------|
| React.js | Frontend UI |
| JavaScript | Application logic |
| Tailwind CSS | Styling and responsive design |
| React Router | Client-side routing |
| LocalStorage | Data persistence |
| Vite | Development and build tool |

## User Roles

The application has two main user roles.

### Student

Students can:

1. Login to the application
2. View their dashboard
3. View assigned assignments
4. Open assignment details
5. Access the external submission link
6. Confirm that they have submitted an assignment
7. Track their progress


### Admin / Professor

Admins can:

1. Login to the application
2. View the admin dashboard
3. Create assignments
4. Add assignment details
5. Add an external Drive/submission link
6. Monitor student submissions
7. View individual progress
8. Delete assignments


## Application Flow

```text
                         LOGIN
                           |
             +-------------+-------------+
             |                           |
          STUDENT                      ADMIN
             |                           |
      Student Dashboard          Admin Dashboard
             |                           |
      View Assignments           Create Assignment
             |                           |
      Assignment Details         Assignment List
             |                           |
      Open Drive Link            Student Submissions
             |                           |
      Confirm Submission         Progress Tracking
             |
      Student Progress







      ## Project Structure

assignment-review-dashboard/
│
├── public/
│
├── src/
│   │
│   ├── components/
│   │   ├── Navbar.jsx
│   │   └── Sidebar.jsx
│   │
│   ├── pages/
│   │   ├── Login.jsx
│   │   ├── StudentDashboard.jsx
│   │   ├── StudentAssignments.jsx
│   │   ├── AssignmentDetails.jsx
│   │   ├── StudentProgress.jsx
│   │   ├── AdminDashboard.jsx
│   │   └── CreateAssignment.jsx
│   │
│   ├── data/
│   │   └── mockData.js
│   │
│   ├── utils/
│   │   └── storage.js
│   │
│   ├── App.jsx
│   └── main.jsx
│
├── .gitignore
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md


### Component Architecture

The application follows a component-based React architecture.

App.jsx

App.jsx is responsible for:
-Application routing
-Protected routes
-Role-based route protection
-Connecting different pages

Navbar
-The Navbar provides common navigation functionality across the application.

Sidebar
-The Sidebar provides navigation between dashboard sections.

Login
-The Login page handles user authentication using the available mock user data.

Student Pages

Student-related pages include:
-Student Dashboard
-Student Assignments
-Assignment Details
-Student Progress

Admin Pages
Admin-related pages include:
-Admin Dashboard
-Create Assignment


Storage Utility
-The storage.js utility manages application data using browser LocalStorage.


###Data Management

This project does not use a backend.

Instead, application data is simulated using:

Mock JSON/JavaScript data
Browser LocalStorage

The main data categories include:
LocalStorage
│
├── currentUser
│
├── assignments
│
└── submissions

This allows the application to maintain data even after refreshing the browser.

###Role-Based Access

Protected routes are implemented using React Router.

For example:
/student
/student/assignments
/student/assignments/:id
/student/progress

/admin
/admin/create

Users are redirected to the login page if they are not authenticated.

Role validation ensures that students cannot access admin-only pages and admins cannot access student-only pages.



⚙️ Installation & Setup

1. Clone the Repository
   git clone https://github.com/Jitendra9430/Jitendra-Kumar-Task01.git

2. Navigate to the Project
   cd assignment-review-dashboard

3. Install Dependencies
   npm install

4. Start the Development Server
   npm run dev

The application will normally be available at:
http://localhost:5173


🖥️ Production Build

To create a production build:
-npm run build

To preview the production build locally:
-npm run preview


###Responsive Design

The dashboard is designed using Tailwind CSS and supports different screen sizes.

The interface is intended to work across:
-Desktop
-Laptop
-Tablet
-Mobile

Responsive layouts are implemented using Tailwind CSS utility classes.


🎯 Design Decisions
React Component Architecture
The application is divided into reusable components and pages to keep the code organized and maintainable.

React Router
React Router is used for navigation between different sections of the application.

LocalStorage
LocalStorage is used because the task does not require a backend.
It allows assignment and submission information to persist between browser refreshes.

Tailwind CSS
Tailwind CSS is used to build the responsive UI without maintaining a large separate CSS file.

Mock Data
Mock data is used to simulate users, assignments, and submission information.

📌 Task Requirements Covered

The project addresses the main requirements of the Joineazy Frontend Task:

 React.js application
 Responsive dashboard
 Student workflow
 Admin/Professor workflow
 Assignment management
 Assignment submission confirmation
 Progress indicators
 Student submission status
 External Drive/submission link
 Mock data
 LocalStorage
 Component-based architecture
 React Router
 Tailwind CSS


 📹 Demo Video

Add your project demonstration video link here:

YOUR_DEMO_VIDEO_LINK- 

The demo video should demonstrate:

Student login
Student dashboard
Assignment list
Assignment details
Submission confirmation
Student progress
Admin login
Admin dashboard
Assignment creation
Student submission status
Progress indicators
Responsive UI

🌐 Working Demo

Live deployed application:

YOUR_DEPLOYED_APPLICATION_LINK- jitendra-kumar-task01-db3z1ddry.vercel.app