import React, { useState, useRef } from "react";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";


const Historial = (props) => {

  return props.user?
  <div >
    <h1>Histórico de juegos de {props.user.username}</h1>
    {
 props.user.profile.juegos.map((element, i) => {
          return <div className="bienvenida">
          <h5 className="juego" key={i}><strong>id Juego:</strong> {element} </h5>
          </div>;
        })
      }
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