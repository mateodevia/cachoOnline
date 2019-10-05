import React, { useState, useRef } from "react";
import { withTracker } from "meteor/react-meteor-data";
import { Partidas } from '../api/partidas.js';


const Game = (props) => {
  const comenzar =()=>{

  }
  return props.user && props.game && !props.game.comenzada?
  <div>
    <h1>Bienvenido al juego {props.game._id}, {props.user.username}</h1>
    <h2>Administrador: {props.game.admin}</h2>
    <h2>Jugadores Actuales:</h2>
    {
      props.game.jugadores.map((element, i) => {
        return <div className="jugador" key={i}>Usuario: {element} </div>;
      })
    }
    {
      props.game.admin===props.user.username?
      <div>
        <button onClick={comenzar}>Comenzar partida</button>
      </div>
      :
      <div>
        Espere a que el administrador de la partida comience el juego!!
      </div>
    }
  </div>
  :
  props.game && props.game.comenzada?
  <div>

  </div>
  :
  <div>
  </div>
}

 export default AppWrapper = withTracker((props) => {
  Meteor.subscribe("myGame", props.match.params.gameId);
  return {
    user: Meteor.user(),
    game: Partidas.findOne({_id:props.match.params.gameId})
  };
})(Game);