import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';

class Info extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.user) {
      return (
        <div>
          <nav className="navbar navbar-light bg-light">
            <a className="navbar-brand" href="/">Cacho</a>
            <div className="form-inline my-2 my-lg-0">
              <button className="btn" className="btn btn-outline-success my-2 my-sm-0" type="submit" onClick={this.props.logout}>Cerrar sesión</button>
            </div>


          </nav>
        </div>
      );
    }
    else {
      return (
        <div>
          <nav className="navbar navbar-light bg-light">
            <a className="navbar-brand" href="/">Cacho</a>
            <form className="form-inline">
              <button className="btn" className="btn btn-outline-success my-2 my-sm-0" type="submit" onClick={this.props.register}>Regístrate</button>
              <button className="btn" className="btn btn-outline-success my-2 my-sm-0" type="submit" onClick={this.props.login}>Inicia sesión</button>
            </form>
          </nav>
        </div>
      );
    }
  }
}

export default AppWrapper = withTracker(() => {
  return {
    user: Meteor.user()
  };
})(Info);


