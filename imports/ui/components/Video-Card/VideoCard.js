import React from 'react';

import './VideoCard.scss';

const VideoCard = () => (
  <div className="card video-card shadow">
    <div className="card-body">
        <iframe src="https://www.youtube.com/embed/HOUjkcKMF-U" frameBorder="0" allowFullScreen />
    </div>
  </div>
);

export default VideoCard;
