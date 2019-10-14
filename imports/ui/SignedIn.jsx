import React from "react";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";
import Leaderboard from "./LeaderBoard";
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
          <div className="row" id="containerSignedIn">
            <div className="col">
             <button className="btn btn-dark" onClick={this.props.historial}>Histórico</button>
             <Leaderboard></Leaderboard>
             {/* <button className="btn btn-dark" onClick={this.props.leader}>Leaderboard</button> */}
            </div>
            <div className="col text-center" id="text-center">
              <button className="btn btn-dark" onClick={this.crearJuego.bind(this)}>Nuevo Juego</button>
              <button className="btn btn-dark" onClick={this.props.joinGame}>Únete a un juego</button>
            </div>
            
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