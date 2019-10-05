import React, { useState, useRef } from "react";
import SignedIn from "./SignedIn.jsx";
import { withTracker } from "meteor/react-meteor-data";


const Home = (props) => {
  return props.user?
  <div>
    <h1>Welcome to Cacho, {props.user.username}</h1>
    <SignedIn game={props.game} leader={props.leader} joinGame={props.joinGame} joinGameNow={props.joinGameNow}/>
  </div>
  :
  <div>
    <p>Welcome to Cacho!</p>
    <p>Please Log in or Sign up!</p>
  </div>
}

 export default AppWrapper = withTracker(() => {
  return {
    user: Meteor.user()
  };
})(Home);