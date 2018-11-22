import React from 'react';
import VideoCard from '../../components/Video-Card'

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
                <VideoCard/>
            </section>
        );
    }
}

export default Home;
