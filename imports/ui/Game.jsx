import React, { useState, useRef } from "react";
import { withTracker } from "meteor/react-meteor-data";
import { Partidas } from '../api/partidas.js';
import { Meteor } from "meteor/meteor";


const Game = (props) => {

  const [miTurno, setMiTurno] = useState(-1);
  const [izq, setIzq] = useState("");
  const [der, setDer] = useState("");
  if (props.game && props.game.comenzada && miTurno===-1) {
    let u;
    for (u = 0; u < props.game.jugadores.length; ++u) {
      if (props.game.turnos[u] === props.user.username) {
        setMiTurno(u);
        if (u === 0) {
          setIzq(props.game.turnos[props.game.jugadores.length - 1]);
          setDer(props.game.turnos[u + 1]);
        }
        else if (u === props.game.jugadores.length - 1) {
          setIzq(props.game.turnos[u - 1]);
          setDer(props.game.turnos[0]);
        }
        else {
          setIzq(props.game.turnos[u - 1]);
          setDer(props.game.turnos[u + 1]);
        }
        break;
      }
    }
  }

  const comenzar = () => {
    Meteor.call("comenzarPartida", props.game._id);
  }

  const envioIzq = () => {

  }

  const envioDer = () => {

  }


  return props.user && props.game && !props.game.comenzada ?
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
        props.game.admin === props.user.username ?
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
    props.game && props.game.comenzada && props.game.sentidoRonda === -1 ?
      <div>
        <h2>Administrador: {props.game.admin}</h2>
        <h2>Jugadores Actuales:</h2>
        {
          props.game.jugadores.map((element, i) => {
            return <div className="jugador" key={i}>Usuario: {element} </div>;
          })
        }
        <div>Jugador Turno actual: {props.game.turnos[props.game.turnoActual]}</div>
        <div>Mi turno: {miTurno}</div>
        <div>Ultima jugada: {props.game.ultimaJugada}</div>
        <div>Proponer jugada:</div>

      </div>
      :
      props.game && props.game.comenzada && props.game.sentidoRonda === 0 ?
        <div>
          <h2>Administrador: {props.game.admin}</h2>
          <h2>Jugadores Actuales:</h2>
          {
            props.game.jugadores.map((element, i) => {
              return <div className="jugador" key={i}>Usuario: {element} </div>;
            })
          }
          <div>Jugador Turno actual: {props.game.turnos[props.game.turnoActual]}</div>
          <div>Mi turno: {miTurno}</div>
          <div>Ultima jugada: {props.game.ultimaJugada}</div>
          <div>Proponer jugada:</div>

        </div>
        : props.game && props.game.comenzada && props.game.sentidoRonda === 1 ?
        <div>
          <h2>Administrador: {props.game.admin}</h2>
          <h2>Jugadores Actuales:</h2>
          {
            props.game.jugadores.map((element, i) => {
              return <div className="jugador" key={i}>Usuario: {element} </div>;
            })
          }
          <div>Jugador Turno actual: {props.game.turnos[props.game.turnoActual]}</div>
          <div>Mi turno: {miTurno}</div>
          <div>Ultima jugada: {props.game.ultimaJugada}</div>
          <div>Proponer jugada:</div>
        </div>
        :
        <div>

        </div>
}

export default AppWrapper = withTracker((props) => {
  Meteor.subscribe("myGame", props.match.params.gameId);
  return {
    user: Meteor.user(),
    game: Partidas.findOne({ _id: props.match.params.gameId })
  };
})(Game);