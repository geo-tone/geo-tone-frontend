import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getTotalUsers, getTotalProjects } from '../../services/aggregate';
import shapes from '../../assets/shapes.png';
import styles from './Home.css';

export default function Home() {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalProjects, setTotalProjects] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const userAggregate = await getTotalUsers();
      setTotalUsers(userAggregate);
      const projectAggregate = await getTotalProjects();
      setTotalProjects(projectAggregate);
    };
    fetchData();
  }, []);

  return (
    <>
      <section className={styles.homeContainer}>
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
        <p>
          Join the {totalUsers} other synth wizards who have created{' '}
          {totalProjects} projects!
        </p>
      </section>
    </>
  );
}
