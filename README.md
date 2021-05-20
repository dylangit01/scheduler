# Interview Scheduler

Interviewer Scheduler is a single-page React application allows students to book and manage an interview with a mentor appointment. 

# Project Deployment
## Server
The server of this project has been deployed to Heroku: 
https://interview-app-scheduler.herokuapp.com/
- Notice: it only supports three GET endpoints on the server. The / path will return a 404 error. (Also all localhost urls have been replaced by heroku link in order to make WebSockets work properly and to pass all the tests.)

	- /api/days/
	- /api/appointments/
	- /api/interviewers/

## Client
The client has been deployed to Netlify:
https://interview-app-scheduler.netlify.app/


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
- This project implemented Pipeline that combines two new services:
	1. CircleCI will manage the continuous integration process
	2. Netlify will serve the static client assets
- Apply useReducer and action dispatch to manage single source of truth
- The client application communicates with a WebSocket server.
- When a user books or cancels an interview, all connected users see the update in their browser.

# Technical Specifications 
- React, Node
- Webpack, Babel, 
- Axios, WebSocket, Webpack Dev Server, 
- PostgreSQL, Storybook,
- Integration and E2E testing using: Jest and Cypress
- Heroku, CircleCI, Netlify

# Screenshots
#### When a user books or cancels an interview, all connected users see the update in their browser
!["screenshot of WebSockets_demo"](https://github.com/dylangit01/scheduler/blob/master/docs/WebSockets_demo.gif?raw=true)
#### The list of days informs how many slots are available for each day
!["screenshot of appointment_show"](https://github.com/dylangit01/scheduler/blob/master/docs/appointment_show.png?raw=true)
#### Status indicator while asynchronous operations are in progress
!["screenshot of appointment_saving"](https://github.com/dylangit01/scheduler/blob/master/docs/appointment_saving.png?raw=true)
#### A user can book an interview in an empty appointment slot.
!["screenshot of appointment_form"](https://github.com/dylangit01/scheduler/blob/master/docs/appointment_form.png?raw=true)
#### A user is shown an error if an interview cannot be saved or deleted.
!["screenshot of appointment_error"](https://github.com/dylangit01/scheduler/blob/master/docs/appointment_error.png?raw=true)
#### A user is presented with a confirmation to cancel an interview.
!["screenshot of appointment_confirm"](https://github.com/dylangit01/scheduler/blob/master/docs/appointment_confirm.png?raw=true)


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

