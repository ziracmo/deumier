import { Accounts } from 'meteor/accounts-base';
import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

// import components
import Alert from '../../components/Alert';

// import styles
import './Signup.scss';

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errMsg: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    if (this.props.loggedIn) {
      return this.props.history.push('/profile');
    }
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.loggedIn) {
      nextProps.history.push('/profile');
      return false;
    }
    return true;
  }

  handleSubmit(e) {
    e.preventDefault();
    const { email, password } = this.state;
    Accounts.createUser({ email, password }, err => {
      if (err) {
        this.setState({ errMsg: err.reason });
        return console.log(err);
      }
    });
  }

  render() {
    if (this.props.loggedIn) {
      return null;
    }

    const { errMsg } = this.state;
    return (
      <section className="signup-page">
        <div className="card signup-container" style={{ maxWidth: '28rem' }}>
          <div className="card-header">
            <div className="card-body">
              <h4 className="card-title">Inscription</h4>
              <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <label htmlFor="email">Adresse Mail</label>

                  <input
                    id="email"
                    type="email"
                    className="form-control"
                    name="email"
                    value={this.state.email}
                    onChange={e => this.setState({ email: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password">Mot de Passe</label>
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
                    <input type="checkbox" name="aggree" value="1" required /> I
                    Accepter les conditions d'utilisations
                  </label>
                </div>
                <div className="form-group no-margin">
                  <button
                    type="submit"
                    className="btn btn-primary btn-block mb-2"
                  >
                    S'inscrire
                  </button>
                  {errMsg && <Alert errMsg={errMsg} />}
                </div>
                <div className="margin-top20">
                  J'ai déjà un compte ? <NavLink to="/login">Se connecter</NavLink>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

Signup.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Signup;
