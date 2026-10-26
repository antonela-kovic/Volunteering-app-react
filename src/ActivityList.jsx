import  { useState, useContext } from 'react';
import './ActivityList.css';
import { UserContext } from './UserContext';
import { Link } from 'react-router-dom';



const ActivityList = () => {
  // const { isAdmin } = useContext(UserContext);
  const { isAdmin, toggleAdmin } = useContext(UserContext);

  const [activities, setActivities] = useState([
    {
      id: 1,
      name: "Čišćenje parka",
      description: "Volontersko čišćenje parka u centru grada",
      organization: "Volonterski centar Zagreb",
      date: "02.04.2024",
      time: "10:00",
      participants: [],
      latitude: 45.815399,
      longitude: 15.966568,
      location: "Zagreb"
    },
    {
      id: 2,
      name: "Uređenje dječjeg igrališta",
      description: "Slikanje klupa i igračaka na dječjem igralištu",
      organization: "Društvo za zaštitu prirode",
      date: "25.04.2024",
      time: "14:00",
      participants: [],
      latitude: 43.508133,
      longitude: 16.440193,
      location: "Split"
    }
  ]);

  const [selectedActivity, setSelectedActivity] = useState(null);
  const [participantName, setParticipantName] = useState('');
  const [newActivity, setNewActivity] = useState({
    name: "",
    date: "",
    time: "",
    location: "",
    organization: "",
    description: "",
    approved: false
  });

  const [sortBy, setSortBy] = useState('date');
  const [filterByLocation, setFilterByLocation] = useState('');


  const handleOpenModal = (activity) => {
    setSelectedActivity(activity);
  };
  
  const closeModal = () => {
    setSelectedActivity(null);
  };

  const handleParticipantChange = (e) => {
    setParticipantName(e.target.value);
  };

  const handleDeleteParticipant = (index) => {
    const updatedActivity = { ...selectedActivity };
    updatedActivity.participants.splice(index, 1);
    setSelectedActivity(updatedActivity);
  };

  const addParticipant = () => {
    if (participantName.trim() !== '') {
      const updatedActivity = { ...selectedActivity };
      updatedActivity.participants.push(participantName.trim());
      setSelectedActivity(updatedActivity);
      setParticipantName('');
    }
  };

  const applyChanges = () => {
    const isNewActivity = !selectedActivity.id;
  
    if (isNewActivity) {
      setActivities([...activities, selectedActivity]);
    } else {
      const updatedActivities = activities.map(activity => {
        if (activity.id === selectedActivity.id) {
          return selectedActivity;
        }
        return activity;
      });
      setActivities(updatedActivities);
    }
  
    closeModal();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewActivity({
      ...newActivity,
      [name]: value
    });
  };

  const handleAddNewActivity = () => {
    setActivities([...activities, { ...newActivity, id: activities.length + 1 }]);
    setNewActivity({
      name: "",
      date: "",
      time: "",
      location: "",
      organization: "",
      description: "",
      approved: false
    });
  };

  const handleDeleteActivity = (activityId) => {
    const updatedActivities = activities.filter(activity => activity.id !== activityId);
    setActivities(updatedActivities);
    closeModal();
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const handleLocationFilterChange = (e) => {
    setFilterByLocation(e.target.value);
  };

  let filteredActivities = activities.filter(activity => {
    if (filterByLocation !== '') {
      return activity.location.toLowerCase().includes(filterByLocation.toLowerCase());
    }
    return true;
  });

  if (sortBy === 'date') {
    filteredActivities = filteredActivities.sort((a, b) => new Date(a.date) - new Date(b.date));
  } else if (sortBy === 'location') {
    filteredActivities = filteredActivities.sort((a, b) => a.location.localeCompare(b.location));
  }

  return (
    <div className="activity-list-container">
      <header>
       <h2>Popis aktivnosti</h2>
      <nav>
          <ul>
            <li><Link to="/">Početna</Link></li>
            <li><Link to="/volunteers">Volonteri</Link></li>
            <li><Link to="/organizations">Udruge</Link></li>
          </ul>
          <label className='admin-toggle'>
            Admin:
            <input type="checkbox" checked={isAdmin} onChange={toggleAdmin} />
          </label>
        </nav>
        </header>
      <div>
      {/* <h2>Popis aktivnosti</h2> */}
        <label>Sortiraj po:</label>
        <select value={sortBy} onChange={handleSortChange}>
          <option value="date">Datumu</option>
          <option value="location">Lokaciji</option>
        </select>
      </div>
      <div>
        <label>Filtriraj po lokaciji:</label>
        <input type="text" value={filterByLocation} onChange={handleLocationFilterChange} />
      </div>
      {/* <h2>Popis aktivnosti</h2> */}
      <div className="activity-list">
        {filteredActivities.map(activity => (
          <div key={activity.id} className="activity-card">
            <h3>{activity.name}</h3>
            <p><strong>Datum:</strong> {activity.date}</p>
            <p><strong>Vrijeme:</strong> {activity.time}</p>
            <p><strong>Lokacija:</strong> {activity.location}</p>
            <button onClick={() => handleOpenModal(activity)}>Opširno</button>
            {isAdmin && (
              <button onClick={() => handleDeleteActivity(activity.id)}>Obriši aktivnost</button>
            )}
          </div>
        ))}
      </div>
      {selectedActivity && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <h2>{selectedActivity.name}</h2>
            <p><strong>Opis:</strong> {selectedActivity.description}</p>
            <p><strong>Organizacija:</strong> {selectedActivity.organization}</p>
            <p><strong>Datum:</strong> {selectedActivity.date}</p>
            <p><strong>Vrijeme:</strong> {selectedActivity.time}</p>
            <p><strong>Lokacija:</strong> {selectedActivity.location}</p>
            <p><strong>Broj sudionika:</strong> {selectedActivity.participants.length}</p>
            <div>
              <input
                type="text"
                placeholder="Ime sudionika"
                value={participantName}
                onChange={handleParticipantChange}
              />
              <button onClick={addParticipant}>Dodaj sudionika</button>
            </div>
            <ul>
              {selectedActivity.participants.map((participant, index) => (
                <li key={index}>
                  {participant}
                  {isAdmin && (
                    <button onClick={() => handleDeleteParticipant(index)}>Obriši</button>
                  )}
                </li>
              ))}
            </ul>
            <button onClick={applyChanges}>Primjeni promjene</button>
            <button onClick={() => window.open(`https://maps.google.com/?q=${selectedActivity.latitude},${selectedActivity.longitude}`, "_blank")}>Prikaži na karti</button>
          </div>
        </div>
      )}
     <br></br>
     <div className='nova-aktivnost container'>
       <h2>Unos nove aktivnosti</h2>
       <div className="input-group">
         <label>Aktivnost:</label>
         <input type="text" name="name" value={newActivity.name} onChange={handleInputChange} />
      </div>
      <div className="input-group">
         <label>Datum:</label>
        <input type="text" name="date" value={newActivity.date} onChange={handleInputChange} />
    </div>
    <div className="input-group">
       <label>Vrijeme:</label>
       <input type="text" name="time" value={newActivity.time} onChange={handleInputChange} placeholder="HH:MM" />
    </div>
    <div className="input-group">
       <label>Lokacija:</label>
       <input type="text" name="location" value={newActivity.location} onChange={handleInputChange} />
    </div>
    <div className="input-group">
      <label>Organizacija:</label>
      <input type="text" name="organization" value={newActivity.organization} onChange={handleInputChange} />
   </div>
   <div className="input-group">
      <label>Opis:</label>
      <textarea name="description" value={newActivity.description} onChange={handleInputChange} />
  </div>
     <button className="btn-add" onClick={handleAddNewActivity}>Dodaj aktivnost</button>
  </div>
</div>
  );
};

export default ActivityList;
