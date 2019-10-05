import React, { useState, useRef } from "react";
import Login from "./Login.jsx";
import Signup from "./Signup.jsx";
import Home from "./Home.jsx";
import NavBar from "./Navbar.jsx";
import Join from "./Join.jsx";
import Game from "./Game.jsx";
import { Meteor } from "meteor/meteor";
import { BrowserRouter as Router, Route} from 'react-router-dom';


const App = (props) => {

  const login =()=>{
    props.history.push('/login');
  };

  const game=()=>{
    props.history.push("/game");
  }

  const leader=()=>{
    props.history.push("/leaderboard");
  }

  const register =()=>{
    props.history.push('/signup');
  };

  const home =()=>{
    props.history.push("/");
  }

  const joinGame =()=>{
    props.history.push("/joinGame");
  }

  const joinGameNow=(idGame)=>{
    props.history.push("/game/"+idGame);
  };

  const logout =()=>{
      Meteor.logout(()=>{});
  }

  return (<div>
    <Route path ="/" render={()=> <NavBar logout={logout} login={login} register={register}/>}/>
    <Route exact path="/" render={() => <Home game={game} leader={leader} joinGame={joinGame} joinGameNow={joinGameNow}/>}/>
    <Route exact path="/login" render={()=><Login home={home} />}/>
    <Route exact path="/signup" render={() => <Signup home={home}/>}/>
    <Route exact path="/joinGame" render={()=><Join joinGameNow={joinGameNow}/>}/>
    <Route path="/game/:gameId" component={Game}/>
  </div>);
};

export default () => (
  <div>
     <Router>
          <Route component={App} />
     </Router>
 </div>)
