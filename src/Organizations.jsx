import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from './UserContext';
import './Organizations.css';

const EMPTY_ORGANIZATION = { name: '', address: '', city: '' };

const Organizations = () => {
  const { isAdmin, toggleAdmin } = useContext(UserContext);

  const [organizations, setOrganizations] = useState([
    { id: 1, name: 'Volunteer Centre Zagreb', address: 'Ul. grada Vukovara 271', city: 'Zagreb' },
    { id: 2, name: 'Nature Protection Society', address: 'Trg Republike 1', city: 'Split' },
    { id: 3, name: 'Red Cross', address: 'Ulica Kneza Mislava 10', city: 'Osijek' },
  ]);
  const [requests, setRequests] = useState([]); // organisations waiting for admin approval
  const [newOrganization, setNewOrganization] = useState(EMPTY_ORGANIZATION);
  const [message, setMessage] = useState('');
  const [filter, setFilter] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewOrganization({ ...newOrganization, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newOrganization.name.trim() || !newOrganization.city.trim()) {
      setMessage('Please enter at least the name and the city.');
      return;
    }
    setRequests([...requests, { ...newOrganization, id: Date.now() }]);
    setNewOrganization(EMPTY_ORGANIZATION);
    setMessage('Request sent for approval.');
    setShowModal(false);
  };

  const handleApprove = (id) => {
    const approved = requests.find((org) => org.id === id);
    setOrganizations([...organizations, approved]);
    setRequests(requests.filter((org) => org.id !== id));
  };

  const handleReject = (id) => {
    setRequests(requests.filter((org) => org.id !== id));
  };

  const query = filter.toLowerCase();
  const filteredOrganizations = organizations.filter((org) =>
    [org.name, org.address, org.city].some((field) => field.toLowerCase().includes(query)),
  );

  return (
    <div className="organizations-container">
      <header>
        <h2>Volunteer organisations</h2>
        <nav className="nav-organizations">
          <ul>
            <li><Link to="/activities">Activities</Link></li>
            <li><Link to="/volunteers">Volunteers</Link></li>
            <li><Link to="/">Home</Link></li>
          </ul>
          <label className="admin-toggle">
            Admin:
            <input type="checkbox" checked={isAdmin} onChange={toggleAdmin} />
          </label>
        </nav>
      </header>
      <br />
      <input
        type="text"
        placeholder="Filter by name, address or city"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <ul>
        {filteredOrganizations.map((org) => (
          <li key={org.id} className="hover-effect">
            {org.name} - {org.address}, {org.city}
          </li>
        ))}
      </ul>

      {isAdmin && (
        <div>
          <h2>Requests for approval</h2>
          {requests.length === 0 && <p>No pending requests.</p>}
          <ul>
            {requests.map((request) => (
              <li key={request.id}>
                {request.name} - {request.address}, {request.city}
                <button onClick={() => handleApprove(request.id)}>Approve</button>
                <button onClick={() => handleReject(request.id)}>Reject</button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <h2>Add an organisation</h2>
      <button onClick={() => setShowModal(true)} style={{ display: 'block', margin: 'auto' }}>New organisation</button>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowModal(false)}>&times;</span>
            <h2>New organisation</h2>
            <form onSubmit={handleSubmit}>
              <label>
                Name:
                <input type="text" name="name" value={newOrganization.name} onChange={handleChange} />
              </label>
              <label>
                Address:
                <input type="text" name="address" value={newOrganization.address} onChange={handleChange} />
              </label>
              <label>
                City:
                <input type="text" name="city" value={newOrganization.city} onChange={handleChange} />
              </label>
              <button type="submit">Send request</button>
            </form>
          </div>
        </div>
      )}
      {message && <p>{message}</p>}
    </div>
  );
};

export default Organizations;
