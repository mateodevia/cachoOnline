import { Mongo } from "meteor/mongo";
import { Meteor } from "meteor/meteor";

export const Partidas = new Mongo.Collection("games");

if (Meteor.isServer) {
  Meteor.publish("myGame", (id1) => {
    return Partidas.find({_id:id1});
  });
}

Meteor.methods({
  createPartida: function(admin){
    let a= Partidas.insert({
      admin:admin,
      comenzada: false,
      jugadores:[admin],
      terminada: false,
      ganador: undefined
    });
    let res2= Meteor.users.findOne({_id:this.userId});
    res2.profile.juegos.push(a);
    Meteor.users.update({_id:this.userId},res2);
    return a;
  },
  comenzarPartida: function(idPartida){
    let res= Partidas.findOne({_id:idPartida});
    res.comenzada=true;
    Partidas.update({_id:idPartida},res);
    return "OK";
  },
  joinPartida: function(idPartida, idJugador){
    let res= Partidas.findOne({_id:idPartida});
    if(res.jugadores.length>=6){
      return new Error("El juego esta lleno");
    }
    else if(typeof(res)==="undefined"){
      return new Error("No existe la partida");
    }
    else{
      res.jugadores.push(idJugador);
      Partidas.update({_id:idPartida},res);
      let res2= Meteor.users.findOne({username:idJugador});
      res2.profile.juegos.push(idPartida);
      Meteor.users.update({username:idJugador},res2);
    }
  }
});
