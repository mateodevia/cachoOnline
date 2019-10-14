import { Mongo } from "meteor/mongo";
import { Meteor } from "meteor/meteor";

export const Board = new Mongo.Collection("board");

if (Meteor.isServer) {
  Meteor.publish("theBoard", () => {
    return Board.find();
  });
}

Meteor.methods({
  createLog: function(user){
    let a= Board.insert({
      username:user,
      juegosGanados:0,
    });
  },
  actualizarVictoria: function(user){
    let res= Board.findOne({username:user});
    let a=res.juegosGanados;
    res.juegosGanados=a+1;
    Board.update({username:user},res);
  }
})


