import { Meteor } from 'meteor/meteor';
import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

// import components
import Alert from '../../components/Alert';

// import styles
import './Login.scss';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errMsg: null,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    if (this.props.loggedIn) {
      return this.props.history.push('/accueil');
    }
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.loggedIn) {
      nextProps.history.push('/accueil');
      return false;
    }
    return true;
  }

  handleSubmit(e) {
    e.preventDefault();
    const { email, password } = this.state;
    Meteor.loginWithPassword(email, password, err => {
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
      <section className="login-page">
        <div className="card login-container" style={{ maxWidth: '28rem' }}>
          <div className="card-header">
            <div className="card-body">
              <h4 className="card-title">Connexion</h4>
              <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <label htmlFor="email">Adresse Mail</label>
                  <input
                    id="email"
                    type="email"
                    className="form-control"
                    placeholder="exemple@netflix.com"
                    name="email"
                    value={this.state.email}
                    onChange={e => this.setState({ email: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <div className="spread-container">
                    <label htmlFor="password">Mot de Passe</label>
                  </div>
                  <input
                    id="password"
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    name="password"
                    value={this.state.password}
                    onChange={e => this.setState({ password: e.target.value })}
                    required
                  />
                  <NavLink to="/recover-password">Mot de passe oublié ?</NavLink>
                </div>
                <div className="form-group no-margin">
                  <button
                    type="submit"
                    className="btn btn-primary btn-block mb-2">
                    Se connecter
                  </button>
                  {errMsg && <Alert errMsg={errMsg} />}
                </div>
                <div className="margin-top20">
                  Je n'ai pas de compte ?{' '}
                  <NavLink to="/signup">Créer un compte</NavLink>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Login;

Login.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
