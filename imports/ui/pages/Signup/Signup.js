import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import React from 'react';
import { NavLink } from 'react-router-dom';

import './Signup.scss';

// meteor's error message
const EMAIL_EXISTS = 'Email already exists.';

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      err: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const { email, password } = this.state;
    Accounts.createUser({ email, password }, err => {
      if (err) {
        this.setState({ err: err.reason });
        return console.log(err);
      }
    });
  }

  render() {
    return (
      <section className="signup-page">
        <div className="card mx-auto" style={{ maxWidth: '28rem' }}>
          <div className="card-header">
            <div className="brand">
              <div className="text-center">
                <img
                  className="rounded-circle"
                  src="https://via.placeholder.com/150x150"
                  alt="logo"
                />
              </div>
            </div>
            <div className="card-body">
              <h4 className="card-title">Sign up</h4>
              <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <label htmlFor="email">E-Mail Address</label>

                  <input
                    id="email"
                    type="email"
                    className="form-control"
                    name="email"
                    value={this.state.email}
                    onChange={e => this.setState({ email: e.target.value })}
                    required
                    autoFocus
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    id="password"
                    type="password"
                    className="form-control"
                    name="password"
                    value={this.state.password}
                    onChange={e => this.setState({ password: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>
                    <input type="checkbox" name="aggree" value="1" required/> I agree to
                    the Terms and Conditions
                  </label>
                </div>
                <div className="form-group no-margin">
                  <button type="submit" className="btn btn-primary btn-block">
                    Sign up
                  </button>
                </div>
                <div className="margin-top20">
                  Already have an account? <NavLink to="/login">Login</NavLink>
                </div>
              </form>
            </div>
          </div>
          <div className="footer text-center">&copy; 2018</div>
        </div>
      </section>
    );
  }
}

export default Signup;