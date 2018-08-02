import React from 'react';
import newsie from '../../assets/images/icon.png'

const styles = {
  center: {
    marginLeft: "auto",
    marginRight: "auto"
  }
}

export default function WelcomePage() {
  return (
    <div className="welcome-page">
      <div className="section">
        <div className="container">
          <h1 className="title is-1">
            Welcome to Adulting!
          </h1>
          <h4 className="title is-4">
            We are the site that will help you get informed, and stay informed, about all the things 
            happening in the world that you should know about!
          </h4>
          <h4 className="title is-4">
            Just choose up to five categories of news you'd like to see, and we'll take care of the rest!
          </h4>
          <div className={styles.center}>
            <img  src={newsie}
            style={{
              width: 300,
              height: 300,}}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
