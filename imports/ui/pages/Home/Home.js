import React from 'react';

import './Home.scss';

class Home extends React.Component {
    componentWillMount() {
        if (this.props.loggedIn) {
            return this.props.history.push('/accueil');
        }
    }

    render() {
        return (
            <section className="home-page">
                <h1>Landing Page</h1>
            </section>
        );
    }
}

export default Home;
