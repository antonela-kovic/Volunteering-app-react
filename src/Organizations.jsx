import  { useState, useContext } from 'react';
import { UserContext } from './UserContext';
import './Organizations.css';
import { Link } from 'react-router-dom';


const Organizations = () => {
  const { isAdmin ,toggleAdmin} = useContext(UserContext);

  const [organizations, setOrganizations] = useState([
    { id: 1, name: 'Volonterski centar Zagreb', address: 'Ul. grada Vukovara 271', city: 'Zagreb' },
    { id: 2, name: 'Društvo za zaštitu prirode', address: 'Trg Republike 1', city: 'Split' },
    { id: 3, name: 'Crveni križ', address: 'Ulica Kneza Mislava 10', city: 'Osijek' }
  ]);

  const [requests, setRequests] = useState([]);
  const [newOrganization, setNewOrganization] = useState({ name: '', address: '', city: '' });
  const [message, setMessage] = useState('');
  const [filter, setFilter] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewOrganization({ ...newOrganization, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setRequests([...requests, newOrganization]);
    setNewOrganization({ name: '', address: '', city: '' });
    setMessage('Zahtjev poslan na odobrenje.');
    setShowModal(false);
  };

  const handleApprove = (id) => {
    const approvedOrganization = requests.find(org => org.id === id);
    setOrganizations([...organizations, approvedOrganization]);
    setRequests(requests.filter(org => org.id !== id));
  };

  const handleReject = (id) => {
    setRequests(requests.filter(org => org.id !== id));
  };

  const handleFilter = (e) => {
    setFilter(e.target.value);
  };

  const filteredOrganizations = organizations.filter(org => {
    return org.name.toLowerCase().includes(filter.toLowerCase()) ||
           org.address.toLowerCase().includes(filter.toLowerCase()) ||
           org.city.toLowerCase().includes(filter.toLowerCase());
  });

  return (
    <div className="organizations-container">
      <header>
       <h2>Popis volonterskih udruga</h2>
       <nav className='nav-organizations'>
          <ul>
            <li><Link to="/activities">Aktivnosti</Link></li>
            <li><Link to="/volunteers">Volonteri</Link></li> 
            <li><Link to="/">Početna</Link></li>
          </ul>
          <label className='admin-toggle'>
            Admin:
            <input type="checkbox" checked={isAdmin} onChange={toggleAdmin} />
          </label>
      </nav>
      </header>
      <br></br>
      {/* <h2>Popis volonterskih udruga</h2> */}
      <input type="text" placeholder="Filtriraj po imenu, adresi ili gradu" value={filter} onChange={handleFilter} />
      <ul>
        {filteredOrganizations.map(org => (
          <li key={org.id} className="hover-effect">
            {org.name} - {org.address}, {org.city}
          </li>
        ))}
      </ul>
      {isAdmin && (
        <div>
          <h2>Zahtjevi za odobrenje</h2>
          <ul>
            {requests.map(request => (
              <li key={request.id}>
                {request.name} - {request.address}, {request.city}
                <button onClick={() => handleApprove(request.id)}>Prihvati</button>
                <button onClick={() => handleReject(request.id)}>Odbaci</button>
              </li>
            ))}
          </ul>
        </div>
      )}
      <h2>Dodaj novu udrugu</h2>
      <button onClick={() => setShowModal(true)} style={{ display: 'block', margin: 'auto' }}>Nova udruga</button>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowModal(false)}>&times;</span>
            <h2>Unos nove ustanove</h2>
            <form onSubmit={handleSubmit}>
              <label>
                Ime:
                <input type="text" name="name" value={newOrganization.name} onChange={handleChange} />
              </label>
              <label>
                Adresa:
                <input type="text" name="address" value={newOrganization.address} onChange={handleChange} />
              </label>
              <label>
                Grad:
                <input type="text" name="city" value={newOrganization.city} onChange={handleChange} />
              </label>
              <button type="submit">Pošalji zahtjev</button>
            </form>
          </div>
        </div>
      )}
      {message && <p>{message}</p>}
    </div>
  );
};

export default Organizations;
