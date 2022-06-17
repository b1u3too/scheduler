# Interview Scheduler Project
Interview Scheduler is a single-page React app for booking, updating, and deleting interviews between students and interviewers. 

The project was built beginning from [this](https://github.com/lighthouse-labs/scheduler) repository as a base, and relies on [this](https://github.com/lighthouse-labs/scheduler-api) repository for its back-end functionality, both of which provided by Lighthouse Labs. Throughout this project I learned the basics of React (props, prop drilling, React library and custom hooks, state management, immutable patterns) using Storybook as a visual testbed in early development. Throughout the project I practiced Unit, Integration, and End-to-End Testing using Jest and Cypress to ensure that each change was bug-free, functional, and beautiful.

## Setup and run locally

1. Fork and clone this repository locally.
2. Install dependencies with `npm install`.
3. Repeat 1 and 2 for the [scheduler-api](https://github.com/lighthouse-labs/scheduler-api) repository provided by Lighthouse Labs. 
4. Run both the Webpack Development Server and scheduler-api server. 
5. The app will be served at [http://localhost:8000/](http://localhost:8000/), click around, and enjoy!

## Command Options

- Running Webpack Development Server: `npm start`

- Running Jest Test Framework: `npm test`

- Running Storybook Visual Testbed: `npm run storybook`

## Look and Feel
!["Days Navigation"](https://github.com/b1u3too/scheduler/blob/master/docs/Overview.png)
- Pick a day, any day!

!["Booking Demo"](https://github.com/b1u3too/scheduler/blob/master/docs/Book.gif)
- Book an Interview

!["Cancel Demo"](https://github.com/b1u3too/scheduler/blob/master/docs/Delete.gif)
- Darn, actually need to change dates

!["Error Message"](https://github.com/b1u3too/scheduler/blob/master/docs/Error.png)
- Sometimes even servers make mistakes

## Dependencies
- axios
- classnames
- normalize.css
- prop-types
- react
- react DOM
- react-test-renderer
