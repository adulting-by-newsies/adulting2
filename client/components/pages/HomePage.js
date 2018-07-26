import React from 'react';
import Slider from '../Homepage/Slider.js'
export default function HomePage() {
  return (
    <div className="home-page">
      <div className="section">
        <div className="container">
          <h1 className="title is-1">
            Home Page
            <Slider/>
          </h1>
        </div>
      </div>
    </div>
  );
}
