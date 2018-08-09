import React from 'react';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer" style={{background: '#B0C4DE'}}>
      <div className="container">
        <div className="content has-text-centered">
          <p style={{fontFamily: 'Permanent Marker',}}>
            {`Copyright ${year} Adulting. All Rights Reserved.`}
          </p>
        </div>
      </div>
    </footer>
  );
}
