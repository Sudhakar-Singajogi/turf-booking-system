import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NotFound.module.css'; // Import your CSS module

const NotFound = ({message}) => {
  return (
    <div className={`container ${styles.notFoundContainer}`}>
      <div className="row">
        <div className="col-md-6 offset-md-3 text-center">
          <h1 className={styles.title}>404</h1>
          <p className={styles.description}>{message}</p>
          <Link to="/" className={`btn btn-primary ${styles.homeButton}`}>Go to Home</Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
