import React, { useState, useRef } from "react";
import { withTracker } from "meteor/react-meteor-data";


const Historial = (props) => {
  return props.user?
  <div>
    <h1>Historic games of {props.user.username}</h1>
  </div>
  :
  <div>

  </div>
}

 export default AppWrapper = withTracker(() => {
  return {
    user: Meteor.user()
  };
})(Historial);