import React from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';

import NavBar from './components/NavBar.js';
import Profile from './components/Profile.js';

import LoginPage from './pages/Login';
import SignUpPage from './pages/SignUpPage';
import ProfilePage from './pages/ProfilePage';
import EventsPage from './pages/EventsPage';
import MyEventsPage from './pages/MyEventsPage';
import EventPage from './pages/EventPage';
import CreateEventPage from './pages/CreateEventPage';
import Feed from './pages/Feed';
import MapPage from "./pages/MapPage"
import ActivitiesPage from "./pages/ActivitiesPage"
import NewActivityPage from "./pages/NewActivityPage"
import AdminPage from "./pages/AdminPage"
import AddLocationPage from "./pages/AddLocationPage"

export const AuthContext = React.createContext();

const initialState = {
  isAuthenticated: false,
  user: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("token", JSON.stringify(action.payload.token));
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user
      };
    case "LOGOUT":
      localStorage.clear();
      return {
        ...state,
        isAuthenticated: false,
        user: null
      };
    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  return (
    <BrowserRouter>
      <AuthContext.Provider
      value={{
        state,
        dispatch
      }}>
        <div className="grid-container">
            <NavBar/> 
            {!state.isAuthenticated ? null : <Profile/> }
          <main className = "main">
          {!state.isAuthenticated ? <Switch>
              <Route path="/login" > <LoginPage/> </Route>
              <Route path="/signup"> <SignUpPage/> </Route>
              </Switch> : <Switch>
              <Route path="/profile" > <ProfilePage/> </Route>
              <Route path="/feed" > <Feed/> </Route>
              <Route path="/activities"> <ActivitiesPage/> </Route>
              <Route path="/events" > <EventsPage/> </Route>
              <Route path="/myevents" > <MyEventsPage/> </Route>
              <Route path="/createevent" > <CreateEventPage/> </Route>
              <Route path="/event/:id" component={EventPage} />
              <Route path="/map" > <MapPage/> </Route>
              <Route path="/newactivity" > <NewActivityPage/> </Route>
              <Route path="/admin" > <AdminPage/> </Route>
              <Route path="/addlocation" > <AddLocationPage/> </Route>
            </Switch>}
          </main>
          <footer className="footer">
            All rights reserved.
          </footer>
        </div>
      </AuthContext.Provider>
    </BrowserRouter>
  );
}

export default App;
