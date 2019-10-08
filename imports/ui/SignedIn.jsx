import React from "react";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";

class SignedIn extends React.Component {

  constructor(props) {
    super(props);
  }

  crearJuego(){
    let a= this.props.joinGameNow;
    Meteor.call("createPartida", this.props.user.username, function(error, result) {
      if(error){
        throw error;
      }
      a(result);
    });
  }


  render() {
    return (
      <div>
        {this.props.user
          ?
          <div>
            <button className="btn btn-outline-success" onClick={this.props.leader}>Leaderboard</button>
            <button className="btn btn-outline-success" onClick={this.crearJuego.bind(this)}>Nuevo Juego</button>
            <button className="btn btn-outline-success" onClick={this.props.joinGame}>Únete a un juego</button>
            <button className="btn btn-outline-success" onClick={this.props.historial}>Histórico</button>
          </div>
          :
          //Loading here
          <div>

          </div>
        }
      </div>
    )
  }
}

export default withTracker(() => {
  return {
    user: Meteor.user()
  };
})(SignedIn)