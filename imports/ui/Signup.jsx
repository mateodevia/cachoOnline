import React, { Component } from 'react';
import { Meteor } from "meteor/meteor";

class Login extends Component {
  constructor(props){
    super(props);
    this.valueUser="";
    this.valueId="";
    this.valuePass="";
    this.valueRPass="";
    this.state={error:false}
  }

  logIn() {
    if(this.valuePass!==this.valueRPass){
      this.setState({error:true})
    }
    else{
      Meteor.call("crearUsuario",this.valueUser,this.valueId, this.valuePass);
      Meteor.loginWithPassword(this.valueUser, this.valuePass,(err)=>{
        if(err) throw err;
        this.props.home();
      })
    }
  }

  onChangeUser(e){
    this.valueUser=e.target.value;
  }

  onChangeId(e){
    this.valueId=e.target.value;
  }

  onChangePass(e){
    this.valuePass=e.target.value;
  }

  onChangeRPass(e){
    this.valueRPass=e.target.value;
  }

  render() {
    if(this.state.error){
      return (
        <div>
          <div>
            Error al crear usuario
          </div>
          <div className="d-flex justify-content-center">
          <form>
          Usuario: <input className="form-control" onChange={this.onChangeUser.bind(this)} type="text" />
          Nombre: <input className="form-control" onChange={this.onChangeId.bind(this)} type="text" />
          Contraseña:<input className="form-control" onChange={this.onChangePass.bind(this)} type="password" />
          Repetir Contraseña: <input className="form-control" onChange={this.onChangeRPass.bind(this)} type="password" />
          </form>
          <button className="btn btn-success" onClick={this.logIn.bind(this)}>Sign up</button>
          </div>
        </div>
      );
    }
    else{
    return (
      <div>
        <form>
          Usuario: <input className="form-control" onChange={this.onChangeUser.bind(this)} type="text" />
          Nombre: <input className="form-control" onChange={this.onChangeId.bind(this)} type="text" />
          Contraseña:<input className="form-control" onChange={this.onChangePass.bind(this)} type="password" />
          Repetir Contraseña: <input className="form-control" onChange={this.onChangeRPass.bind(this)} type="password" />
        </form>
        <button className="btn btn-success" onClick={this.logIn.bind(this)}>Sign up</button>
      </div>
    );
    }
  }
}

export default Login;
