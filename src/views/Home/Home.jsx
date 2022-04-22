import React, { useEffect, useState } from 'react';
import styles from './Home.css';
import shapes from '../../assets/shapes.png';
import { Link } from 'react-router-dom';

export default function Home() {
  const [aggregate, setAggregate] = useState({
    totalProjects: 0,
    totalUsers: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAggregate();
      setAggregate(data);
    };
    fetchData();
  }, []);

  return (
    <>
      <div className={styles.homeContainer}>
        <p>
          Join the {aggregate.totalUsers} users who have created{' '}
          {aggregate.totalProjects} projects!
        </p>
        <div className={styles.homeBanner}>
          <img src={shapes} alt="Colorful squares" />
          <h1>Welcome to GEo TONe.</h1>
          <img src={shapes} alt="Colorful squares" />
        </div>
        <p>A browser-based audio sequencer, built with creativity in mind.</p>
        <p>
          Love music? Us, too!{' '}
          <Link to="/register" className={styles.registerLink}>
            Sign up
          </Link>{' '}
          to play.
        </p>
      </div>
    </>
  );
}
