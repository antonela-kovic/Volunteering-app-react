import { useState, useContext } from 'react';
import { UserContext } from './UserContext';
import { Link } from 'react-router-dom';
import './VolonteerList.css';

const VolunteerList = () => {
  const { isAdmin,toggleAdmin } = useContext(UserContext);

  const [volunteers, setVolunteers] = useState([
    {
      id: 1,
      firstName: "Ana",
      lastName: "Smajlo",
      city: "Split",
      contact: "anasmajloo@gmail.com",
      activities: ["Ekologija", "Edukacija"],
      ratings: [3, 5],
      comments: ["Super volonter!", "Osoba voljna pomoći."]
    },
    {
      id: 2,
      firstName: "Ivan",
      lastName: "Horvat",
      city: "Zagreb",
      contact: "ivan.horvat@gmail.com",
      activities: ["Ekologija", "Prijevoz"],
      ratings: [4, 5],
      comments: ["Uvijek točan i na vrijeme obavlja obaveze-ž.", "Sjajan sa psima!"]
    },
    {
      id: 3,
      firstName: "Maja",
      lastName: "Stojković",
      city: "Zadar",
      contact: "majastojkovic@gmail.com",
      activities: ["Ekologija"],
      ratings: [3, 5],
      comments: ["Uvijek točna i na vrijeme obavlja obaveze."]
    },
    {
      id: 4,
      firstName: "Matea",
      lastName: "Šarić",
      city: "Gospić",
      contact: "matea.saric@gmail.com",
      activities: ["Razno"],
      ratings: [2, 5],
      comments: ["Uvijek nasmijana i voljna pomoći.", "Sjajno se snalazi u novim izazovima."]
    }
  ]);

  const [filterCity, setFilterCity] = useState('');
  const [filterActivity, setFilterActivity] = useState('');
  const [showAll, setShowAll] = useState(true);

  const [newVolunteer, setNewVolunteer] = useState({
    id: null,
    firstName: '',
    lastName: '',
    city: '',
    contact: '',
    activities: [],
    ratings: [],
    comments: []
  });

  const [editMode, setEditMode] = useState(false);
  const [editVolunteerData, setEditVolunteerData] = useState({
    id: null,
    firstName: '',
    lastName: '',
    city: '',
    contact: '',
    activities: [],
    ratings: [],
    comments: []
  });

  const activitiesOptions = ["Ekologija", "Edukacija", "Prijevoz", "Razno"];

  const addVolunteer = () => {
    setVolunteers([...volunteers, { ...newVolunteer, id: volunteers.length + 1 }]);
    setNewVolunteer({
      id: null,
      firstName: '',
      lastName: '',
      city: '',
      contact: '',
      activities: [],
      ratings: [],
      comments: []
    });
  };

  const addComment = (id, comment) => {
    setVolunteers(volunteers.map(volunteer => {
      if (volunteer.id === id) {
        const updatedComments = volunteer.comments ? [...volunteer.comments, comment] : [comment];
        return { ...volunteer, comments: updatedComments };
      }
      return volunteer;
    }));
  };

  const deleteVolunteer = (id) => {
    if (isAdmin) {
      setVolunteers(volunteers.filter(volunteer => volunteer.id !== id));
    } else {
      alert('Nemate dozvolu za brisanje volontera.');
    }
  };

  const rateVolunteer = (id, rating) => {
    setVolunteers(volunteers.map(volunteer => {
      if (volunteer.id === id) {
        return { ...volunteer, ratings: [...volunteer.ratings, rating] };
      }
      return volunteer;
    }));
  };

  const editVolunteer = () => {
    if (isAdmin) {
      setVolunteers(volunteers.map(volunteer => volunteer.id === editVolunteerData.id ? { ...editVolunteerData } : volunteer));
      setEditMode(false);
      setEditVolunteerData({
        id: null,
        firstName: '',
        lastName: '',
        city: '',
        contact: '',
        activities: [],
        ratings: [],
        comments: []
      });
    } else {
      alert('Nemate dozvolu za uređivanje volontera.');
    }
  };

  const filterVolunteers = (volunteer) => {
    if (!showAll) {
      if (filterCity && volunteer.city.toLowerCase() !== filterCity.toLowerCase()) {
        return false;
      }
      if (filterActivity && !volunteer.activities.includes(filterActivity)) {
        return false;
      }
    }
    return true;
  };

  return (
    <div>
      <header>
      <h2>Popis volontera</h2>
       <nav>
          <ul>
            <li><Link to="/activities">Aktivnosti</Link></li>
            <li><Link to="/">Početna</Link></li>
            <li><Link to="/organizations">Udruge</Link></li>
          </ul>
          <label className='admin-toggle-volonter'>
            Admin:
            <input type="checkbox" checked={isAdmin} onChange={toggleAdmin} />
          </label>
      </nav>
      </header>
      <br></br>
      {/* <h2>Popis volontera</h2> */}
      <div className="filters">
        <input type="text" placeholder="Filter po gradu" value={filterCity} onChange={(e) => setFilterCity(e.target.value)} />
        <select value={filterActivity} onChange={(e) => setFilterActivity(e.target.value)}>
          <option value="">Filter po aktivnosti</option>
          {activitiesOptions.map((activity, index) => (
            <option key={index} value={activity}>{activity}</option>
          ))}
        </select>
        <label>
          <input type="checkbox" checked={showAll} onChange={() => setShowAll(!showAll)} />
          Prikaži sve
        </label>
      </div>
      <div className="volunteer-list">
        {volunteers.filter(filterVolunteers).map(volunteer => (
          <div key={volunteer.id} className="volunteer-card">
            <h3>{volunteer.firstName} {volunteer.lastName}</h3>
            <p><strong>Grad:</strong> {volunteer.city}</p>
            <p><strong>Kontakt:</strong> {volunteer.contact}</p>
            <p><strong>Aktivnosti:</strong> {volunteer.activities.join(', ')}</p>
            <p><strong>Ocjena:</strong> {volunteer.ratings.length > 0 ? volunteer.ratings.reduce((a, b) => a + b, 0) / volunteer.ratings.length : 'Nema ocjene'}</p>
            <p><strong>Komentari:</strong></p>
            <ul>
              {volunteer.comments && volunteer.comments.map((comment, index) => (
                <li key={index}>{comment}</li>
              ))}
            </ul>
            {isAdmin && (
              <>
                <button onClick={() => deleteVolunteer(volunteer.id)}>Izbriši</button>
                <button onClick={() => {
                  setEditMode(true);
                  setEditVolunteerData({ ...volunteer });
                }}>Uredi</button>
              </>
            )}
            <button onClick={() => {
              const newComment = prompt('Unesite novi komentar:');
              if (newComment) {
                addComment(volunteer.id, newComment);
              }
            }}>Dodaj komentar</button>
            <button onClick={() => {
             const newRating = parseInt(prompt('Ocijenite volontera (od 1 do 5):'));
             if (!isNaN(newRating) && newRating >= 1 && newRating <= 5) {
                 rateVolunteer(volunteer.id, newRating);
            } else {
          alert('Ocjena mora biti broj od 1 do 5.');
          }
        }}>Ocijeni</button>
          </div>
        ))}
      </div>
      <br></br>
      {isAdmin && (
        <div className="add-volunteer-container">
          <h3>{editMode ? 'Uredi volontera' : 'Dodaj novog volontera'}</h3>
          <input
            type="text"
            placeholder="Ime"
            value={editMode ? editVolunteerData.firstName : newVolunteer.firstName}
            onChange={(e) => {
              if (editMode) {
                setEditVolunteerData({ ...editVolunteerData, firstName: e.target.value });
              } else {
                setNewVolunteer({ ...newVolunteer, firstName: e.target.value });
              }
            }}
          />
          {/* Ostatak input polja za ostale podatke */}
          <input
            type="text"
            placeholder="Prezime"
            value={editMode ? editVolunteerData.lastName : newVolunteer.lastName}
            onChange={(e) => {
              if (editMode) {
                setEditVolunteerData({ ...editVolunteerData, lastName: e.target.value });
              } else {
                setNewVolunteer({ ...newVolunteer, lastName: e.target.value });
              }
            }}
          />

          <input
            type="text"
            placeholder="Grad"
            value={editMode ? editVolunteerData.city : newVolunteer.city}
            onChange={(e) => {
              if (editMode) {
                setEditVolunteerData({ ...editVolunteerData, city: e.target.value });
              } else {
                setNewVolunteer({ ...newVolunteer, city: e.target.value });
              }
            }}
          />

          <input
            type="text"
            placeholder="Kontakt"
            value={editMode ? editVolunteerData.contact : newVolunteer.contact}
            onChange={(e) => {
              if (editMode) {
                setEditVolunteerData({ ...editVolunteerData, contact: e.target.value });
              } else {
                setNewVolunteer({ ...newVolunteer, contact: e.target.value });
              }
            }}
          />

          <div>
            <h4>Aktivnosti:</h4>
            {activitiesOptions.map((activity, index) => (
              <label key={index}>
                <input
                  type="checkbox"
                  value={activity}
                  checked={editMode ? editVolunteerData.activities.includes(activity) : newVolunteer.activities.includes(activity)}
                  onChange={(e) => {
                    const isChecked = e.target.checked;
                    const activityName = e.target.value;
                    if (isChecked) {
                      if (editMode) {
                        setEditVolunteerData(prevData => ({ ...prevData, activities: [...prevData.activities, activityName] }));
                      } else {
                        setNewVolunteer(prevData => ({ ...prevData, activities: [...prevData.activities, activityName] }));
                      }
                    } else {
                      if (editMode) {
                        setEditVolunteerData(prevData => ({ ...prevData, activities: prevData.activities.filter(a => a !== activityName) }));
                      } else {
                        setNewVolunteer(prevData => ({ ...prevData, activities: prevData.activities.filter(a => a !== activityName) }));
                      }
                    }
                  }}
                />
                {activity}
              </label>
            ))}
          </div>
          <button onClick={editMode ? editVolunteer : addVolunteer}>{editMode ? 'Spremi promjene' : 'Dodaj volontera'}</button>

        </div>
      )}
    </div>
  );
};

export default VolunteerList;
