import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from './UserContext';
import './Home1.css';

const Home = () => {
  const { isAdmin, toggleAdmin } = useContext(UserContext);

  return (
    <div>
      <header className='home-header'>
       <h1>Dobrodošli na volontersku aplikaciju</h1>
        <nav className='home-nav'>
          <ul>
            <li><Link to="/activities">Aktivnosti</Link></li>
            <li><Link to="/volunteers">Volonteri</Link></li>
            <li><Link to="/organizations">Udruge</Link></li>
          </ul>
          <label className='admin-toggle'>
            Admin:
            <input type="checkbox" checked={isAdmin} onChange={toggleAdmin} />
          </label>
        </nav>
      </header>
       {/* Ovdje je desni stupac */}
       <div className="component-container2">
          {/* <h3>Slike </h3> */}
          <br></br>
          <br></br>
          <img src='volonter2.png' alt=''  width="300" height="200"/>  
          <img src='volonter5.jpg' alt='' width="300" height="200" style={{ display: 'block' }} />
      </div>  
       {/* Ovdje je lijevi stupac */}
      <div className="component-container">
          <h2>Predstavljanje autora</h2>
          <p>Dobro došli na moju web stranicu o volonterina koja je napravljena kao </p>
          <p>projekt u sklopu završnog rada za tečaj pod organizacijom Digitalne Dalmacije.</p>
          <p>Digitalna Dalmacija pruža mogućnost stjecanja dodatnog znanja za sve polaznike </p>
          <p>na području web tehnologija.</p>
          <p>Moje ime je Antonela Ković i studentica sam 3.godine računarstva na </p>
          <p>Fakultetu elektrotehnike,strojarstva i brodogradnje.</p>
          <p>Pohađanje ovog tečaja je proširilo moje znanje i vještine programiranja za internet </p>
          <p>kao i motivaciju za daljnje napredovanje i istraživanje nekih novih tehnologija.</p>
          <br></br>
          <img src='volonter6.jpg' alt='' width="300" height="200" style={{ display: 'block' }} />
      </div>
      {/* Srednji dio */}
      <main className='container'>
        <div className="general-section">
          <h2 style={{ color:'green' }}>Općenito</h2>
          <p>
            Unutar ove web stranice možete pronaći trenutne volonterske aktivnosti, popis volontera i udruga.
            Potaknite posjetitelje i ljude u svojoj okolini da se uključe i postanu volonteri nudeći im jednostavan 
            način za prijavu ili informacije o nadolazećim događajima na kojima mogu sudjelovati.Sretno!!!
          </p>
        </div>
        <div className="dropdown">
          <h2 style={{ color:'green' }}>Saznajte više!</h2>
          {/* <button className="dropbtn">Poveznice na društvene mreže</button> */}
          <div className="dropdown-content2">
            <li><a href="https://www.vcz.hr/cesta-pitanja/">Česta pitanja</a></li>
            <li><a href="https://www.volonterski-centar-ri.org/mogucnosti-i-prednosti-volontiranja/">Mogućnosti i prednosti volontiranja</a></li>
            <li><a href="https://youth.europa.eu/go-abroad/volunteering/volunteer-around-world_hr">Volontirajte diljem svijeta</a></li>
          </div>
          {/* <h2>Antonela Ković</h2> */}
          <br></br>
          <button className="dropbtn">Poveznice na društvene mreže/Projekti autora stranice</button>
          <div className="dropdown-content">
            <li><a href="https://github.com/antonela-kovic">GitHub</a></li>
            <li><a href="https://www.linkedin.com/in/antonela-kovi%C4%87-706249308/">LinkedIn</a></li>
            {/* /*<li><a href="https://www.instagram.com">Instagram</a></li> */}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
