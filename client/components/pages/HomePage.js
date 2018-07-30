import React from 'react';
import CardOne from '../Homepage/CardOne.js';
import CardTwo from '../Homepage/CardTwo.js';
import CardThree from '../Homepage/CardThree.js';
import CardFour from '../Homepage/CardFour.js';
import CardFive from '../Homepage/CardFive.js';

export default function HomePage() {
  return (
    <div className="home-page">
      <div className="section">
        <div className="container">
          <h1 className="title is-1">
            Welcome to your personalized article feed!
          </h1>
          <CardOne />
          <CardTwo />
          <CardThree />
          <CardFour />
          <CardFive />
        </div>
      </div>
    </div>
  );
}
