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
    if(props.game.jugadores.length<=1){
      alert("Deben agregarse jugadores a la partida para continuar");
    }
    else{
      Meteor.call("comenzarPartida", props.game._id);
    }
  }

  const salir = () => {

  }

  const envioIzq = () => {

  }

  const envioDer = () => {

  }

  console.log(miTurno);
  return props.user && props.game && !props.game.comenzada ?
    <div>
      <h1>Bienvenido al juego {props.game._id}, {props.user.username}</h1>
      <button class="btn"onClick={salir}>Salir de partida</button>
      <h2>Administrador: {props.game.admin}</h2>
      <h2>Jugadores Actuales:</h2>
      {
        props.game.jugadores.map((element, i) => {
          return <div className="jugador" key={i}><strong>Usuario:</strong> {element} </div>;
        })
      }
      {
        props.game.admin === props.user.username ?
          <div>
            <button class="btn"onClick={comenzar}>Comenzar partida</button>
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
        <button class="btn"onClick={salir}>Salir de partida</button>
        <h2>Administrador: {props.game.admin}</h2>
        <h2>Jugadores Actuales:</h2>
        {
          props.game.jugadores.map((element, i) => {
            return <div className="jugador" key={i}><strong>Usuario:</strong> {element} </div>;
          })
        }
        <div><strong>Jugador Turno actual:</strong> {props.game.turnos[props.game.turnoActual]}</div>
        <div><strong>Mi turno:</strong> {miTurno}</div>
        <div><strong>Ultima jugada:</strong> {props.game.ultimaJugada!==""? props.game.ultimaJugada:"No existe ultima jugada"}</div>
        <div>Proponer jugada:</div>
        <form className="form-inline">
        <select className="browser-default custom-select custom-select-lg mb-3 form-control">
          <option defaultValue>Selecciona cantidad</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
        </select>
        <select className="browser-default custom-select custom-select-lg mb-3 form-control">
          <option defaultValue>Selecciona pinta</option>
          <option value="as">As</option>
          <option value="pato">Pato</option>
          <option value="tren">Tren</option>
          <option value="perro">Perro</option>
          <option value="quina">Quina</option>
          <option value="cena">Cena</option>
        </select>
          </form>

      </div>
      :
      props.game && props.game.comenzada && props.game.sentidoRonda === 0 ?
        <div>
          <button className="btn btn-outline-success" onClick={salir}>Salir de partida</button>
          <h2>Administrador: {props.game.admin}</h2>
          <h2>Jugadores Actuales:</h2>
          {
            props.game.jugadores.map((element, i) => {
              return <div className="jugador" key={i}><strong>Usuario:</strong> {element} </div>;
            })
          }
          <div><strong>Jugador Turno actual:</strong> {props.game.turnos[props.game.turnoActual]}</div>
          <div><strong>Mi turno</strong>: {miTurno}</div>
          <div><strong>Ultima jugada:</strong> {props.game.ultimaJugada!==""? props.game.ultimaJugada:"No existe ultima jugada"}</div>
          <div>Proponer jugada:</div>

        </div>
        : props.game && props.game.comenzada && props.game.sentidoRonda === 1 ?
        <div>
          <button className="btn btn-outline-success" onClick={salir}>Salir de partida</button>
          <h2>Administrador: {props.game.admin}</h2>
          <h2>Jugadores Actuales:</h2>
          {
            props.game.jugadores.map((element, i) => {
              return <div className="jugador" key={i}><strong>Usuario:</strong> {element} </div>;
            })
          }
          <div><strong>Jugador Turno actual:</strong> {props.game.turnos[props.game.turnoActual]}</div>
          <div><strong>Mi turno</strong>: {miTurno}</div>
          <div><strong>Ultima jugada:</strong> {props.game.ultimaJugada!==""? props.game.ultimaJugada:"No existe ultima jugada"}</div>
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