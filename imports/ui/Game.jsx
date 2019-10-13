import React, { useState, useRef, useEffect } from "react";
import { withTracker } from "meteor/react-meteor-data";
import { Partidas } from '../api/partidas.js';
import { Meteor } from "meteor/meteor";

const Game = (props) => {

  const [miTurno, setMiTurno] = useState(-1);
  const [cantidad, setCantidad] = useState(0);
  const [pinta, setPinta] = useState("");
  const [sentido, setSentido] = useState(-1);
  const [numDados, setNumDados] = useState(6);



  if (props.game && props.game.comenzada && miTurno === -1) {
    let u;
    for (u = 0; u < props.game.jugadores.length; ++u) {
      if (props.game.turnos[u] === props.user.username) {
        setMiTurno(u);
        break;
      }
    }
  }

  const comenzar = () => {
    if (props.game.jugadores.length <= 1) {
      alert("Deben agregarse jugadores a la partida para continuar");
    }
    else {
      Meteor.call("comenzarPartida", props.game._id);
      for (let i = 0; i < props.game.numDados.length; ++i) {
        setNumDados(numDados + props.game.numDados[i]);
      }

    }
  }

  const salir = () => {

  }

  const proponerJugadaPrimera = async (e) => {
    e.preventDefault();
    cuidado = false;
    Meteor.call("asignarSentido", props.game._id, sentido);
    await apostar();
  }

  const proponerJugada = async (e) => {
    e.preventDefault();
    cuidado = false;
    await apostar();
  }

  const apostar = () => {
    let ultima = props.game.ultimaJugada;
    let ultimaCantidad = parseInt(ultima.split(" ")[0]);
    let ultimaPinta = ultima.split(" ")[1];
    let valorPinta = 0;
    let valorUltimaPinta = 0;

    if (pinta === 'as') {
      valorPinta = 1;
    }
    else if (pinta === 'pato') {
      valorPinta = 2;
    }
    else if (pinta === 'tren') {
      valorPinta = 3;
    }
    else if (pinta === 'perro') {
      valorPinta = 4;
    }
    else if (pinta === 'quina') {
      valorPinta = 5;
    }
    else if (pinta === 'cena') {
      valorPinta = 6;
    }

    if (ultimaPinta === 'as') {
      valorUltimaPinta = 1;
    }
    else if (ultimaPinta === 'pato') {
      valorUltimaPinta = 2;
    }
    else if (ultimaPinta === 'tren') {
      valorUltimaPinta = 3;
    }
    else if (ultimaPinta === 'perro') {
      valorUltimaPinta = 4;
    }
    else if (ultimaPinta === 'quina') {
      valorUltimaPinta = 5;
    }
    else if (ultimaPinta === 'cena') {
      valorUltimaPinta = 6;
    }

    let x = (ultimaCantidad * 2) + 1;
    if ((valorUltimaPinta === 0) ||
      (cantidad > ultimaCantidad && valorPinta !== 1 && valorUltimaPinta !== 1) ||
      (cantidad > ultimaCantidad && valorPinta === 1 && valorUltimaPinta === 1) ||
      (cantidad >= Math.floor(ultimaCantidad / 2) + 1 && valorPinta === 1 && valorUltimaPinta !== 1) ||
      (cantidad === ultimaCantidad && valorPinta > valorUltimaPinta) ||
      (cantidad >= Math.floor(ultimaCantidad / 2) + 1 && valorPinta === 1 && valorUltimaPinta !== 1) ||
      (cantidad >= x && valorPinta !== 1 && valorUltimaPinta === 1))
    {
      Meteor.call("apostar", cantidad, pinta, props.game._id);
      Meteor.call("cambiarTurno", props.game._id);
      cantidadDados();
    }
    else{
      alert("Apuesta no valida! Repita la apuesta")
    }
  }

  const onChangeCantidad = (e) => {
    cuidado = true;
    cantidadDados();
    cantidadTemp = parseInt(e.target.value);
    setCantidad(parseInt(e.target.value));
  }

  const onChangePinta = (e) => {
    setPinta(e.target.value);
  }

  const onChangeSentido = (e) => {
    setSentido(parseInt(e.target.value));
  }

  const cantidadDados = () => {
    let a = props.game.dados.length;
    let dados = 0;
    for (let i = 0; i < a; ++i) {
      let b = props.game.dados[i];
      dados += b.length;
    }
    setNumDados(dados);
  }

  const dudar = () => {
    Meteor.call("setDudarFalse", props.game._id, (error, result) => {
      if (error) {
        return alert(error.reason);
      }
      console.log("antes", props.game.ultimaJugadaAprobada);
      let ultima = props.game.ultimaJugada;
      let ultimaCantidad = parseInt(ultima.split(" ")[0]);
      let ultimaPinta = ultima.split(" ")[1];
      Meteor.call("dudar", ultimaCantidad, ultimaPinta, props.game._id, (error, result) => {
        if (error) {
          return alert(error.reason);
        }
        else {
          console.log("despues", props.game.ultimaJugadaAprobada);
          console.log("Jugada no aprobada:", props.game.ultimaJugadaAprobada);
        }
      });
    });
  }
  return props.user && props.game && !props.game.comenzada ?
    // Inicio juego
    <div>
      <h1>Bienvenido al juego {props.game._id}, {props.user.username}</h1>
      <button className="btn btn-outline-success salir" onClick={salir}>Salir de partida</button>
      <h2>Administrador: {props.game.admin}</h2>
      <h2>Jugadores Actuales:</h2>
      {
        props.game.jugadores.map((element, i) => {
          return <h5 className="jugador" key={i}><strong>Usuario:</strong> {element} </h5>;
        })
      }
      {
        props.game.admin === props.user.username ?
          <div>
            <button className="btn btn-outline-success" onClick={comenzar}>Comenzar partida</button>
          </div>
          :
          <div>
            Espere a que el administrador de la partida comience el juego!!
          </div>
      }
    </div>
    :
    props.game && props.game.comenzada && props.user.username === props.game.turnos[props.game.turnoActual] && props.game.sentidoRonda === -1
      ?
      // Vista de jugador en turno cuando no hay sentido definido
      <div>
        <button className="btn btn-outline-success salir" onClick={salir}>Salir de partida</button>
        <h3>Administrador: {props.game.admin}</h3>
        <h4>Jugadores Actuales:</h4>
        {
          props.game.jugadores.map((element, i) => {
            return <h5 className="jugador" key={i}><strong>Usuario:</strong> {element} </h5>;
          })
        }
        <h5><strong>Jugador Turno actual:</strong> {props.game.turnos[props.game.turnoActual]}</h5>
        <h5><strong>Mi turno:</strong> {miTurno}</h5>
        <h5><strong>Ultima jugada:</strong> {props.game.ultimaJugada !== "" ? props.game.ultimaJugada : "No existe ultima jugada"}</h5>
        <h5>Hay {numDados} dados en juego</h5>
        <h5>Proponer jugada:</h5>
        <form className="form">
          <select onChange={onChangeSentido} className="browser-default custom-select custom-select-lg mb-3 form-control" required>
            <option value="">Selecciona la dirección de tu apuesta</option>
            <option value="0">Derecha</option>
            <option value="1">Izquierda</option>
          </select>
          <input type="number" placeholder="Selecciona la cantidad" className="form-control" onChange={onChangeCantidad} step="1" max={numDados} min="1" required></input>
          <select onChange={onChangePinta} className="browser-default custom-select custom-select-lg mb-3 form-control" required>
            <option value="">Selecciona pinta</option>
            <option value="as">As</option>
            <option value="pato">Pato</option>
            <option value="tren">Tren</option>
            <option value="perro">Perro</option>
            <option value="quina">Quina</option>
            <option value="cena">Cena</option>
          </select>
          <button type="submit" onClick={proponerJugadaPrimera} className="btn btn-primary">Apostar</button>
        </form>
      </div>

      :
      props.game && props.game.comenzada && props.user.username === props.game.turnos[props.game.turnoActual] && props.game.sentidoRonda !== -1
        ?
        // Vista de jugador en turno cuando hay sentido definido
        <div>
          <button className="btn btn-outline-success salir" onClick={salir}>Salir de partida</button>
          <h3>Administrador: {props.game.admin}</h3>
          <h4>Jugadores Actuales:</h4>
          {
            props.game.jugadores.map((element, i) => {
              return <h5 className="jugador" key={i}><strong>Usuario:</strong> {element} </h5>;
            })
          }
          <h5><strong>Jugador Turno actual:</strong> {props.game.turnos[props.game.turnoActual]}</h5>
          <h5><strong>Mi turno:</strong> {miTurno}</h5>
          <h5><strong>Ultima jugada:</strong> {props.game.ultimaJugada !== "" ? props.game.ultimaJugada : "No existe ultima jugada"}</h5>
          <button onClick={dudar} className="btn btn-primary">Dudar</button>
          <h5>Hay {numDados} dados en juego</h5>
          <h5>Proponer jugada:</h5>

          <form className="form">
            <input required type="number" placeholder="Selecciona la cantidad" className="form-control" onChange={onChangeCantidad} step="1" max={numDados} min="1"></input>

            <select required onChange={onChangePinta} className="browser-default custom-select custom-select-lg mb-3 form-control">
              <option value="">Selecciona pinta</option>
              <option value="as">As</option>
              <option value="pato">Pato</option>
              <option value="tren">Tren</option>
              <option value="perro">Perro</option>
              <option value="quina">Quina</option>
              <option value="cena">Cena</option>
            </select>
            <button type="submit" onClick={proponerJugada} className="btn btn-primary">Apostar</button>
          </form>
        </div>
        :
        props.game && props.game.comenzada && props.game.sentidoRonda !== -1 ?
          <div>
            <button className="btn btn-outline-success salir" onClick={salir}>Salir de partida</button>
            <h3>Administrador: {props.game.admin}</h3>
            <h4>Jugadores Actuales:</h4>
            {
              props.game.jugadores.map((element, i) => {
                return <h5 className="jugador" key={i}><strong>Usuario:</strong> {element} </h5>;
              })
            }
            <h5><strong>Jugador Turno actual:</strong> {props.game.turnos[props.game.turnoActual]}</h5>
            <h5><strong>Mi turno:</strong> {miTurno}</h5>
            <h5><strong>Ultima jugada:</strong> {props.game.ultimaJugada !== "" ? props.game.ultimaJugada : "No existe ultima jugada"}</h5>
            <button onClick={dudar} className="btn btn-primary">Dudar</button>
            <h5>Hay {numDados} dados en juego</h5>
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