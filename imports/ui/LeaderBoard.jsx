import React, { useState, useRef } from "react";

import { withTracker } from "meteor/react-meteor-data";


const LeaderBoard = (props) => {
  return props.user?
  <div className="leaderboard">
    <h3>LeaderBoard</h3>
  </div>
  :
  <div>

  </div>
}

 export default AppWrapper = withTracker(() => {
  return {
    user: Meteor.user()
  };
})(LeaderBoard);