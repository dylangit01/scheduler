# Interview Scheduler

Interviewer Scheduler is a single-page React application allows students to book and manage an interview with a mentor appointment.

# Functional Behavioural
- Interviews can be booked between Monday and Friday.
- A user can book an interview in an empty appointment slot.
- Interviews are booked by typing in a student name and clicking on an interviewer from a list of available interviewers.
- A user can cancel or edit the details of an existing interview.
- The list of days informs the user how many slots are available for each day.
- The expected day updates the number of spots available when an interview is booked or canceled.
- A user is shown a status indicator while asynchronous operations are in progress.
- The application makes API requests to load and persist data.

# Special Features
- Apply useReducer and action dispatch to manage single source of truth
- The client application communicates with a WebSocket server.
- When a user books or cancels an interview, all connected users see the update in their browser.

# Technical Specifications 
- React, Node
- Webpack, Babel, 
- Axios, WebSocket, Webpack Dev Server, 
- PostgreSQL, Storybook,
- Integration and E2E testing using: Jest and Cypress

## Screenshots
!["screenshot of "]()
!["screenshot of "]()
!["screenshot of "]()
!["screenshot of "]()
!["screenshot of "]()
!["screenshot of "]()
!["screenshot of "]()


## Getting Started

Install dependencies with `npm install`.

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```

