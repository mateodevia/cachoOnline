import React, { Component } from 'react';
import { Meteor } from "meteor/meteor";

class Login extends Component {
  constructor(props) {
    super(props);
    this.valueUser = "";
    this.valuePass = "";
    this.state={error:false};
  }

  logIn() {
    Meteor.loginWithPassword(this.valueUser, this.valuePass, (err) => {
      if(err){
        this.setState({error:true});
      }
      else{
        this.props.home();
      }
    });
  }

  onChangeUser(e) {
    this.valueUser = e.target.value;
  }

  onChangePass(e) {
    this.valuePass = e.target.value;
  }

  render() {
    if (this.state.error) {
      return (
        <div>
          <div>
            Inténtelo de nuevo
          </div>
          <form>
            User: <input className="form-control" onChange={this.onChangeUser.bind(this)} type="text" />
            Password: <input className="form-control" onChange={this.onChangePass.bind(this)} type="password" />
          </form>
          <button className="btn btn-outline-success" onClick={this.logIn.bind(this)}>Log in</button>
        </div>
      );
    }
    return (
      <div>
        <form>
          User: <input className="form-control" onChange={this.onChangeUser.bind(this)} type="text" />
          Password: <input className="form-control" onChange={this.onChangePass.bind(this)} type="password" />
        </form>
        <button className="btn btn-outline-success" onClick={this.logIn.bind(this)}>Log in</button>
      </div>
    );
  }
}

export default Login;
