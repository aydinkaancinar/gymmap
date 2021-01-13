# team26
Try out the deployed demo for [GymMap](https://infinite-garden-43562.herokuapp.com)

## Libraries

    @testing-library/jest-dom": "^4.2.4",
    "@testing-library/react": "^9.5.0",
    "@testing-library/user-event": "^7.2.1",
    "google-map-react": "^2.1.8",
    "google-maps-react": "^2.0.6",
    "react": "^17.0.0",
    "react-datepicker": "^3.3.0",
    "react-dom": "^17.0.0",
    "react-images-upload": "^1.2.8",
    "react-router-dom": "^5.2.0",
    "react-scripts": "3.4.4",
    "react-select": "^3.1.0"

## Login Credentials

For user: 
- username: user
- password: user

For admin:
- username: admin
- password: admin

## Features

For user: 
- create or join an event
- display a feed composed of activities and events
- change profile features (height, weight, favorite activities, etc.)
- log activities and display them
- display a map showing nearby locations for various activities
- search for events

For admin:
- create an event
- deleting activities and events
- change profile features (height, weight, favorite activities, etc.)
- log activities and display them
- display a map showing nearby locations for various activities
- add new locations to the map
- search for events

## Instructions

For user: 
- click on the login button on the top right and enter your login and password to sign in. If you are a new user, click on signup.
- If you logged in, you would now be greeted with a feed composed of activities and events. For events, you can click on the "join" button to view more detail and join that particular event. If you signed up, you will be redirected to your profile features which you are welcome to change.
- If you want to create a new event, simply click on the Events tab on the right and then "Add an event" button. You can customize all the options and then simply click "create event" button.
- If you want to log a recent activity, click on the Activities tab on the right and then click on "log new activity". Fill the required fields and then click on "log activity".
- If you want to view nearby activities & events, simply click on the Map tab and browse through it.
- If you want to find a particular event, simply search for it on the search bar at the top.
- Finally, if you want to change your weight, age, profile pic etc, simply click on the profile tab and modify them.

For admin: 
- click on the login button on the top right and enter your login and password to sign in. 
- If you logged in, you would now be greeted with a feed composed of activities and events. For events, you can click on the "check" button to view more detail about that particular event.
- If you are unhappy with any particular event or activity, simply click on the Admin controls tab on the left and click the cross button to delete.
- If you want to log a recent activity, click on the Activities tab on the right and then click on "log new activity". Fill the required fields and then click on "log activity".
- If you want to view nearby activities & events, simply click on the Map tab and browse through it.
- If you want to find a particular event, simply search for it on the search bar at the top.
- Finally, if you want to change your weight, age, profile pic etc, simply click on the profile tab and modify them.

## Routes

- POST /api/user: Required body with form:
{
    "username": "example username",
    "password": "example password"
}
 Creates a new user in the database with the given username and password and returns the user. 
- POST /api/users/login:  Required body with form:
{
    "username": "example username",
    "password": "example password"
}. Logs in an existing user, adds the user id and username to the session cookie and returns the user.
- GET /api/users/logout: Requires no body and Logs out the existing user by destroying the session cookie.
- PATCH /api/users/:id: Requires a valid user id as a parameter. Accepts body of the form :
{
    "property name": "property value"
}
Where property name is a valid property of a user and the value is the new value for that property. Can update multiple properties at once but cannot update the events, username, and password properties. Returns the newly updated user.
- GET /api/activities: Returns all activities in the database as an array sorted by id (note the first few values of a mongo id represent creation time so this is sorted by when the activity was created).
- GET /api/activities/:id: Has request parameter of a valid activity id. Returns the given activity.
- POST /api/activities: Required body of the form: 
{
	"description": "example description",
	"img": "Link to image",
    "detail": "Example descriptions ",
    "username": "A valid username",
    "userimg": "Link to the users image"
} Creates a new activity by this user and returns it.
- DELETE /api/activities/:id : Has request parameter of a valid activity id. Deletes the activity with given id and returns it. 
- GET /api/events: Returns all events in the database as an array sorted by id (note the first few values of a mongo id represent creation time so this is sorted by when the activity was created).
- GET /api/events/:id: Has request parameter of a valid event id. Returns the given event.
- POST /api/events: Required body of the form {  
    "name": "example name",
    "time": "a given time",
    "place": "example place",
    "category": "a valid category",
    "capacity": 10, - a number
    "attending": 7, - a numer
    "img": "Link to image"
    }. Creates a new event and returns it.
- DELETE /api/events/:id : Required request parameter id which is a valid event id. Deletes the event with given id and returns it. 
- PATCH /api/events/:id/:attendantid : Required request parameters id(valid event id) and attendantid(valid user id). Adds the given userid to the events list of attendants (list of ids) and adds the eventid to the users list of events (list of ids) then returns the updated event and user as a json.
- GET /api/maplocations: Returns all map locations.
- POST /api/maplocations: Required body of the form  { 
    "coord": {
            "lat": 43.664782, - a number
            "lng": -79.392657 - a number 
        },
        "icon": {
            "url": "link to icon",
            "scaledSize": 25 - a number 
        },
        "name": "example name",
        "description": "example description
    }
    adds a new maplocation(pin on the map in frontend) to the databased and returns it.
- DELETE /api/maplocations/:id : Required request parameter of a valid maplocation id. Deletes the maplocation with given id and returns it. 

## Available Scripts

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:5000](http://localhost:5000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm run server`

Runs the app server on http://localhost:5000

### `npm run client`

Runs the app client (react app) on http://localhost:3000

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.


### `npm client-install`

This is functionally the same as running npm install from within the client folder. It will download any necessary packages and node modules via npm within the client folder.


### Overview of Routes