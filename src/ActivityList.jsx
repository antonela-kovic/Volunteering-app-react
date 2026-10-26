import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from './UserContext';
import './ActivityList.css';

const EMPTY_ACTIVITY = {
  name: '',
  date: '',
  time: '',
  location: '',
  organization: '',
  description: '',
};

// Dates are stored as ISO strings (YYYY-MM-DD) so they sort correctly
const formatDate = (iso) => (iso ? new Date(iso).toLocaleDateString('en-GB') : '—');

const ActivityList = () => {
  const { isAdmin, toggleAdmin } = useContext(UserContext);

  const [activities, setActivities] = useState([
    {
      id: 1,
      name: 'Park clean-up',
      description: 'Volunteer clean-up of the park in the city centre',
      organization: 'Volunteer Centre Zagreb',
      date: '2024-04-02',
      time: '10:00',
      participants: [],
      latitude: 45.815399,
      longitude: 15.966568,
      location: 'Zagreb',
    },
    {
      id: 2,
      name: 'Playground renovation',
      description: 'Painting benches and play equipment at a children\'s playground',
      organization: 'Nature Protection Society',
      date: '2024-04-25',
      time: '14:00',
      participants: [],
      latitude: 43.508133,
      longitude: 16.440193,
      location: 'Split',
    },
  ]);

  const [selectedActivity, setSelectedActivity] = useState(null);
  const [participantName, setParticipantName] = useState('');
  const [newActivity, setNewActivity] = useState(EMPTY_ACTIVITY);
  const [sortBy, setSortBy] = useState('date');
  const [locationFilter, setLocationFilter] = useState('');

  const openModal = (activity) => setSelectedActivity({ ...activity, participants: [...activity.participants] });
  const closeModal = () => setSelectedActivity(null);

  // Participants are edited on a copy and saved with "Apply changes"
  const addParticipant = () => {
    const name = participantName.trim();
    if (!name) return;
    setSelectedActivity({ ...selectedActivity, participants: [...selectedActivity.participants, name] });
    setParticipantName('');
  };

  const deleteParticipant = (index) => {
    setSelectedActivity({
      ...selectedActivity,
      participants: selectedActivity.participants.filter((_, i) => i !== index),
    });
  };

  const applyChanges = () => {
    setActivities(activities.map((a) => (a.id === selectedActivity.id ? selectedActivity : a)));
    closeModal();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewActivity({ ...newActivity, [name]: value });
  };

  const addActivity = () => {
    if (!newActivity.name.trim() || !newActivity.date || !newActivity.location.trim()) {
      alert('Please enter at least the name, date and location.');
      return;
    }
    setActivities([...activities, { ...newActivity, id: Date.now(), participants: [] }]);
    setNewActivity(EMPTY_ACTIVITY);
  };

  const deleteActivity = (id) => {
    setActivities(activities.filter((a) => a.id !== id));
    closeModal();
  };

  const visibleActivities = activities
    .filter((a) => a.location.toLowerCase().includes(locationFilter.toLowerCase()))
    .sort((a, b) => (sortBy === 'date' ? a.date.localeCompare(b.date) : a.location.localeCompare(b.location)));

  const mapUrl = (activity) =>
    activity.latitude
      ? `https://maps.google.com/?q=${activity.latitude},${activity.longitude}`
      : `https://maps.google.com/?q=${encodeURIComponent(activity.location)}`;

  return (
    <div className="activity-list-container">
      <header>
        <h2>Activities</h2>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/volunteers">Volunteers</Link></li>
            <li><Link to="/organizations">Organisations</Link></li>
          </ul>
          <label className="admin-toggle">
            Admin:
            <input type="checkbox" checked={isAdmin} onChange={toggleAdmin} />
          </label>
        </nav>
      </header>

      <div>
        <label>Sort by:</label>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="date">Date</option>
          <option value="location">Location</option>
        </select>
      </div>
      <div>
        <label>Filter by location:</label>
        <input type="text" value={locationFilter} onChange={(e) => setLocationFilter(e.target.value)} />
      </div>

      <div className="activity-list">
        {visibleActivities.map((activity) => (
          <div key={activity.id} className="activity-card">
            <h3>{activity.name}</h3>
            <p><strong>Date:</strong> {formatDate(activity.date)}</p>
            <p><strong>Time:</strong> {activity.time}</p>
            <p><strong>Location:</strong> {activity.location}</p>
            <button onClick={() => openModal(activity)}>Details</button>
            {isAdmin && <button onClick={() => deleteActivity(activity.id)}>Delete activity</button>}
          </div>
        ))}
      </div>

      {selectedActivity && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <h2>{selectedActivity.name}</h2>
            <p><strong>Description:</strong> {selectedActivity.description}</p>
            <p><strong>Organisation:</strong> {selectedActivity.organization}</p>
            <p><strong>Date:</strong> {formatDate(selectedActivity.date)}</p>
            <p><strong>Time:</strong> {selectedActivity.time}</p>
            <p><strong>Location:</strong> {selectedActivity.location}</p>
            <p><strong>Participants:</strong> {selectedActivity.participants.length}</p>
            <div>
              <input
                type="text"
                placeholder="Participant name"
                value={participantName}
                onChange={(e) => setParticipantName(e.target.value)}
              />
              <button onClick={addParticipant}>Add participant</button>
            </div>
            <ul>
              {selectedActivity.participants.map((participant, index) => (
                <li key={`${participant}-${index}`}>
                  {participant}
                  {isAdmin && <button onClick={() => deleteParticipant(index)}>Remove</button>}
                </li>
              ))}
            </ul>
            <button onClick={applyChanges}>Apply changes</button>
            <button onClick={() => window.open(mapUrl(selectedActivity), '_blank', 'noopener')}>Show on map</button>
          </div>
        </div>
      )}

      <br />
      <div className="new-activity container">
        <h2>New activity</h2>
        <div className="input-group">
          <label>Activity:</label>
          <input type="text" name="name" value={newActivity.name} onChange={handleInputChange} />
        </div>
        <div className="input-group">
          <label>Date:</label>
          <input type="date" name="date" value={newActivity.date} onChange={handleInputChange} />
        </div>
        <div className="input-group">
          <label>Time:</label>
          <input type="time" name="time" value={newActivity.time} onChange={handleInputChange} />
        </div>
        <div className="input-group">
          <label>Location:</label>
          <input type="text" name="location" value={newActivity.location} onChange={handleInputChange} />
        </div>
        <div className="input-group">
          <label>Organisation:</label>
          <input type="text" name="organization" value={newActivity.organization} onChange={handleInputChange} />
        </div>
        <div className="input-group">
          <label>Description:</label>
          <textarea name="description" value={newActivity.description} onChange={handleInputChange} />
        </div>
        <button className="btn-add" onClick={addActivity}>Add activity</button>
      </div>
    </div>
  );
};

export default ActivityList;
