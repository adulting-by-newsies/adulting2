import React from 'react';
import newsie from '../../assets/images/icon.png'

const styles = {
  center: {
    marginLeft: "auto",
    marginRight: "auto"
  }
}

export default function SavedPage() {
  return (
    <div className="welcome-page">
      <div className="section">
        <div className="container">
          <h1 className="title is-1">
            Saved Articles Page!
          </h1>
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
