import {Meteor} from 'meteor/meteor';
import React from 'react';
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';

import './Navbar.scss';

const PublicNav = () => [
    <li key="login" className="nav-item">
    <span className="nav-link">
      <NavLink to="/login">Se connecter</NavLink>
    </span>
    </li>,
    <li key="signup" className="nav-item">
    <span className="nav-link">
      <NavLink to="/signup">S'inscrire</NavLink>
    </span>
    </li>,
];

const SearchBar = () => (
    <form className="form-inline">
        <input
            className="form-control mr-sm-2"
            type="search"
            placeholder="Search.."
            aria-label="Search"
        />
        <button className="btn btn-secondary my-2 my-sm-0" type="button">
            <i className="fa fa-search"/>
        </button>
    </form>
);

const LoggedInNav = () => [
    <SearchBar key="searchbar"/>,
    <li key="dropdown" className="nav-item dropdown ml-4">
    <span
        className="nav-link dropdown-toggle"
        id="navbarDropdownMenuLink"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
    />
        <div
            className="dropdown-menu dropdown-menu-right z-depth-1"
            aria-labelledby="navbarDropdownMenuLink"
        >
            <NavLink to="/profile">
                <button className="dropdown-item"><i className="fa fa-user"/>Profile</button>
            </NavLink>
            <div className="dropdown-divider"/>
            <NavLink to="/login" onClick={() => Meteor.logout()}>
                <button className="dropdown-item"><i className="fa fa-sign-out"/>Se déconnecter</button>
            </NavLink>
        </div>
    </li>,
];

const Navbar = ({loggedIn}) => (
    <nav className="navbar navbar-expand-md justify-content-between py-0 z-depth-1">
        <span className="navbar-brand my-2">
      <NavLink to="/"><img src="/images/logo_full.png" alt="netflix logo" className={'logo'}/></NavLink>
    </span>
        <button
            className="navbar-toggler my-2"
            type="button"
            data-toggle="collapse"
            data-target="#navbarContent"
            aria-controls="navbarContent"
            aria-expanded="false"
            aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"/>
        </button>
        <div className="collapse navbar-collapse" id="navbarContent">
            <ul className="navbar-nav ml-auto">
                {loggedIn ? <LoggedInNav/> : <PublicNav/>}
            </ul>
        </div>
    </nav>
);

Navbar.propTypes = {
    loggedIn: PropTypes.bool.isRequired,
};

export default Navbar;
