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
            <button onClick={this.props.leader}>Leaderboard</button>
            <button onClick={this.crearJuego.bind(this)}>New Game</button>
            <button onClick={this.props.joinGame}>Join Game</button>
            <button onClick={this.props.historial}>History</button>
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