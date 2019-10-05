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
            <button className="btn btn-outline-success my-2 my-sm-0" type="submit" onClick={this.props.logout}>Logout</button>
          </nav>
        </div>
      );
    }
    else {
      return (
        <div>
          <nav className="navbar navbar-light bg-light">
            <form className="form-inline">
              <button className="btn btn-outline-success my-2 my-sm-0" type="submit" onClick={this.props.login}>Login</button>
              <button className="btn btn-outline-success my-2 my-sm-0" type="submit" onClick={this.props.register}>Signup</button>
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


