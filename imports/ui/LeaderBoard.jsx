import React, { useState, useRef } from "react";

import { withTracker } from "meteor/react-meteor-data";
import { Board } from '../api/board.js';


const LeaderBoard = (props) => {
  return props.user ?
    <div className="leaderboard">
      <h3 >LeaderBoard</h3>
      {
        props.board.map((element, i) => {
          if(element.username===props.user.username){
            return <h5 className="jugador" key={i}><strong>Usuario:</strong> {element.username} <strong>Victorias:</strong> {element.juegosGanados}</h5>;
          }
          else{
            return <h5 className="jugador" key={i}>Usuario: {element.username} Victorias: {element.juegosGanados}</h5>;
          }
        })
      }
    </div>
    :
    <div>

    </div>
}

export default AppWrapper = withTracker(() => {
  Meteor.subscribe("theBoard");
  return {
    user: Meteor.user(),
    board: Board.find({}, { sort: { juegosGanados: 1 } }).fetch()
  };
})(LeaderBoard);