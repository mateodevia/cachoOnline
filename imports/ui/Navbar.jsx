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
            <div className="form-inline">
              Hello, {this.props.user.username}
            </div>
            <button class="btn" className="btn btn-outline-success my-2 my-sm-0" type="submit" onClick={this.props.logout}>Cerrar sesión</button>
          </nav>
        </div>
      );
    }
    else {
      return (
        <div>
          <nav class="navbar navbar-light bg-light">
            <a class="navbar-brand" href="/">Cacho</a>
            <form class="form-inline">
              <button class="btn" className="btn btn-outline-success my-2 my-sm-0" type="submit" onClick={this.props.register}>Regístrate</button>
              <button class="btn" className="btn btn-outline-success my-2 my-sm-0" type="submit" onClick={this.props.login}>Inicia sesión</button>
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


