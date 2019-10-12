import React, { useState, useRef } from "react";
import SignedIn from "./SignedIn.jsx";
import { withTracker } from "meteor/react-meteor-data";


const Home = (props) => {
  return props.user?
  <div>
    <h1>Bienvenido a Cacho {props.user.profile.nombre}</h1>
    <SignedIn game={props.game} leader={props.leader} joinGame={props.joinGame} joinGameNow={props.joinGameNow} historial={props.historial}/>
  </div>
  :
  <div id="welcome">
  <div className="d-flex justify-content-center" >
    <h1>Bienvenido a Cacho</h1>
  </div>
  <div className="d-flex justify-content-center" >
    <h4>Inicia sesión e inicia la diversión!</h4>
  </div>
  </div>
}

 export default AppWrapper = withTracker(() => {
  return {
    user: Meteor.user()
  };
})(Home);