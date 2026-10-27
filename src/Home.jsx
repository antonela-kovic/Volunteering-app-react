import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from './UserContext';
import './Home.css';

const Home = () => {
  const { isAdmin, toggleAdmin } = useContext(UserContext);

  return (
    <div>
      <header className="home-header">
        <h1>Welcome to the volunteering app</h1>
        <nav className="home-nav">
          <ul>
            <li><Link to="/activities">Activities</Link></li>
            <li><Link to="/volunteers">Volunteers</Link></li>
            <li><Link to="/organizations">Organisations</Link></li>
          </ul>
          <label className="admin-toggle">
            Admin:
            <input type="checkbox" checked={isAdmin} onChange={toggleAdmin} />
          </label>
        </nav>
      </header>

      <div className="home-layout">
        {/* Left column */}
        <aside className="home-left">
          <h2>About the project</h2>
          <p>
            This web app for volunteers was built by Antonela Ković as the final project of a web
            development course organised by Digitalna Dalmacija.
          </p>
          <p>
            The course expanded my web programming skills and my motivation to keep learning new technologies.
          </p>
          <img src="/images/volunteers-3.jpg" alt="Volunteering" width="300" height="200" />
        </aside>

        {/* Middle column */}
        <main className="container">
          <div className="general-section">
            <h2 style={{ color: 'green' }}>Overview</h2>
            <p>
              Here you can find current volunteering activities and lists of volunteers and organisations.
              Encourage the people around you to get involved: they can sign up for an activity or find out
              about upcoming events in a few clicks.
            </p>
          </div>
          <div className="dropdown">
            <h2 style={{ color: 'green' }}>Learn more</h2>
            <ul className="dropdown-content2">
              <li><a href="https://www.vcz.hr/cesta-pitanja/">Frequently asked questions (Volunteer Centre Zagreb)</a></li>
              <li><a href="https://www.volonterski-centar-ri.org/mogucnosti-i-prednosti-volontiranja/">Benefits of volunteering</a></li>
              <li><a href="https://youth.europa.eu/go-abroad/volunteering/volunteer-around-world_en">Volunteer around the world</a></li>
            </ul>
            <br />
            <button className="dropbtn">Author&apos;s profiles and projects</button>
            <ul className="dropdown-content">
              <li><a href="https://github.com/antonela-kovic">GitHub</a></li>
              <li><a href="https://www.linkedin.com/in/antonela-kovic/">LinkedIn</a></li>            
            </ul>
          </div>
        </main>

        {/* Right column */}
        <aside className="home-right">
          <img src="/images/volunteers-1.png" alt="Volunteers at work" width="300" height="200" />
          <img src="/images/volunteers-2.jpg" alt="Volunteers" width="300" height="200" />
        </aside>
      </div>
    </div>
  );
};

export default Home;
