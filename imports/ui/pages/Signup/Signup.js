import {Accounts} from 'meteor/accounts-base';
import React from 'react';
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';
import DatePicker from "react-datepicker";

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
            confirmPassword: '',
            errMsg: '',
            nom: '',
            prenom: '',
            birthdate: '',
            gender: '',
            phone: ''
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
        const {email, password, nom, prenom, birthdate, gender} = this.state;
        Accounts.createUser({email, password, profile: {nom, prenom, birthdate, gender}}, err => {
            if (err) {
                this.setState({errMsg: err.reason});
                return console.log(err);
            }
        });
    }

    render() {
        if (this.props.loggedIn) {
            return null;
        }

        const {errMsg} = this.state;
        return (
            <section className="signup-page">
                <div className="card signup-container">
                    <div className="card-header">
                        <div className="card-body">
                            <h4 className="card-title">Inscription</h4>
                            <form onSubmit={this.handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="email">Adresse Mail *</label>

                                    <input
                                        id="email"
                                        type="email"
                                        className="form-control"
                                        name="email"
                                        placeholder="email@netflix.com"
                                        value={this.state.email}
                                        onChange={e => this.setState({email: e.target.value})}
                                        required
                                    />
                                </div>

                                <div className="form-group row">
                                    <div className="col-6">
                                        <label htmlFor="password">Mot de Passe *</label>
                                        <input
                                            id="password"
                                            type="password"
                                            placeholder="Password"
                                            className="form-control"
                                            name="password"
                                            value={this.state.password}
                                            onChange={e => this.setState({password: e.target.value})}
                                            required
                                        />
                                    </div>
                                    <div className="col-6">
                                        <label htmlFor="password">Confirmer *</label>
                                        <input
                                            id="password"
                                            type="password"
                                            placeholder="Password"
                                            className="form-control"
                                            name="password"
                                            value={this.state.confirmPassword}
                                            onChange={e => this.setState({confirmPassword: e.target.value})}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-6"><label htmlFor="nom">Nom *</label>
                                        <input
                                            id="nom"
                                            type="text"
                                            className="form-control"
                                            name="nom"
                                            placeholder="Nom"
                                            value={this.state.nom}
                                            onChange={e => this.setState({nom: e.target.value})}
                                            required
                                        /></div>
                                    <div className="col-6">
                                        <label htmlFor="prenom">Prenom *</label>
                                        <input
                                            id="prenom"
                                            type="text"
                                            placeholder="Prenom"
                                            className="form-control"
                                            name="prenom"
                                            value={this.state.prenom}
                                            onChange={e => this.setState({prenom: e.target.value})}
                                            required
                                        />
                                    </div>

                                </div>
                                <div className="form-group row">
                                    <div className="col-6"><label htmlFor="nom">Telephone</label>
                                        <input
                                            id="phone"
                                            type="phone"
                                            className="form-control"
                                            name="phone"
                                            placeholder="06 XX XX XX XX"
                                            value={this.state.phone}
                                            onChange={e => this.setState({phone: e.target.value})}
                                        /></div>
                                    <div className="col-6">
                                        <label htmlFor="prenom">Sexe</label>
                                        <select name="gender" id="gender" class="custom-select" value={this.state.gender}
                                                onChange={e => this.setState({gender: e.target.value})}>
                                            <option value="0">Homme</option>
                                            <option value="1">Femme</option>
                                            <option value="2">Autre</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <DayPickerInput onDayChange={day => console.log(day)} />
                                </div>
                                <div className="form-group">
                                    <label>
                                        <input type="checkbox" name="aggree" className="mr-2" value="1" required/>
                                        <span>J'accepter les conditions d'utilisations</span>
                                    </label>
                                </div>
                                <div className="form-group no-margin">
                                    <button
                                        type="submit"
                                        className="btn btn-primary btn-block mb-2">
                                        S'inscrire
                                    </button>
                                    {errMsg && <Alert errMsg={errMsg}/>}
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
