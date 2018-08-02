import React from 'react';
import newsie from '../../assets/images/icon.png'

export default function WelcomePage() {
  return (
    <div className="welcome-page">
      <div className="section">
        <div className="container">
          <h1 className="title is-1">
            Welcome to Adulting!
          </h1>
          <h5 className="title is-5">
            We are the site that will help you get informed, and stay informed, about all the things 
            happening in the world that you should know about!
          </h5>
          <img  src={newsie}
          style={{
            position: 'absolute',
            top: 150,
            left: 400,
            width: 300,
            height: 300,}}
          />
        </div>
      </div>
    </div>
  );
}
