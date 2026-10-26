import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from './UserContext';
import './VolunteerList.css';

const ACTIVITY_OPTIONS = ['Environment', 'Education', 'Transport', 'Other'];

const EMPTY_FORM = { firstName: '', lastName: '', city: '', contact: '', activities: [] };

// Sample data (fictional people and example.com addresses)
const INITIAL_VOLUNTEERS = [
  {
    id: 1,
    firstName: 'Ana',
    lastName: 'Horvat',
    city: 'Split',
    contact: 'ana.horvat@example.com',
    activities: ['Environment', 'Education'],
    ratings: [3, 5],
    comments: ['Great volunteer!', 'Always willing to help.'],
  },
  {
    id: 2,
    firstName: 'Ivan',
    lastName: 'Kovač',
    city: 'Zagreb',
    contact: 'ivan.kovac@example.com',
    activities: ['Environment', 'Transport'],
    ratings: [4, 5],
    comments: ['Always punctual and reliable.', 'Great with dogs!'],
  },
  {
    id: 3,
    firstName: 'Maja',
    lastName: 'Babić',
    city: 'Zadar',
    contact: 'maja.babic@example.com',
    activities: ['Environment'],
    ratings: [3, 5],
    comments: ['Always on time.'],
  },
  {
    id: 4,
    firstName: 'Matea',
    lastName: 'Jurić',
    city: 'Gospić',
    contact: 'matea.juric@example.com',
    activities: ['Other'],
    ratings: [2, 5],
    comments: ['Always smiling and ready to help.', 'Handles new challenges well.'],
  },
];

const averageRating = (ratings) =>
  ratings.length > 0 ? (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(1) : 'No rating yet';

const VolunteerList = () => {
  const { isAdmin, toggleAdmin } = useContext(UserContext);

  const [volunteers, setVolunteers] = useState(INITIAL_VOLUNTEERS);
  const [cityFilter, setCityFilter] = useState('');
  const [activityFilter, setActivityFilter] = useState('');
  const [showAll, setShowAll] = useState(true);
  const [form, setForm] = useState(EMPTY_FORM);
  const [editingId, setEditingId] = useState(null); // null = adding a new volunteer

  const updateVolunteer = (id, change) =>
    setVolunteers(volunteers.map((v) => (v.id === id ? { ...v, ...change(v) } : v)));

  const saveVolunteer = () => {
    if (!form.firstName.trim() || !form.lastName.trim()) {
      alert('Please enter the first and last name.');
      return;
    }
    if (editingId === null) {
      setVolunteers([...volunteers, { ...form, id: Date.now(), ratings: [], comments: [] }]);
    } else {
      updateVolunteer(editingId, () => form);
      setEditingId(null);
    }
    setForm(EMPTY_FORM);
  };

  const startEditing = (volunteer) => {
    const { firstName, lastName, city, contact, activities } = volunteer;
    setForm({ firstName, lastName, city, contact, activities: [...activities] });
    setEditingId(volunteer.id);
  };

  const toggleFormActivity = (activity, checked) =>
    setForm((prev) => ({
      ...prev,
      activities: checked ? [...prev.activities, activity] : prev.activities.filter((a) => a !== activity),
    }));

  const addComment = (id) => {
    const comment = prompt('Enter a comment:');
    if (comment && comment.trim()) {
      updateVolunteer(id, (v) => ({ comments: [...v.comments, comment.trim()] }));
    }
  };

  const rate = (id) => {
    const rating = parseInt(prompt('Rate the volunteer (1 to 5):'), 10);
    if (rating >= 1 && rating <= 5) {
      updateVolunteer(id, (v) => ({ ratings: [...v.ratings, rating] }));
    } else {
      alert('The rating must be a number from 1 to 5.');
    }
  };

  const matchesFilters = (volunteer) => {
    if (showAll) return true;
    if (cityFilter && volunteer.city.toLowerCase() !== cityFilter.toLowerCase()) return false;
    if (activityFilter && !volunteer.activities.includes(activityFilter)) return false;
    return true;
  };

  const formField = (field, placeholder) => (
    <input
      type="text"
      placeholder={placeholder}
      value={form[field]}
      onChange={(e) => setForm({ ...form, [field]: e.target.value })}
    />
  );

  return (
    <div>
      <header>
        <h2>Volunteers</h2>
        <nav>
          <ul>
            <li><Link to="/activities">Activities</Link></li>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/organizations">Organisations</Link></li>
          </ul>
          <label className="admin-toggle-volunteer">
            Admin:
            <input type="checkbox" checked={isAdmin} onChange={toggleAdmin} />
          </label>
        </nav>
      </header>
      <br />

      <div className="filters">
        <input type="text" placeholder="Filter by city" value={cityFilter} onChange={(e) => setCityFilter(e.target.value)} />
        <select value={activityFilter} onChange={(e) => setActivityFilter(e.target.value)}>
          <option value="">Filter by activity</option>
          {ACTIVITY_OPTIONS.map((activity) => (
            <option key={activity} value={activity}>{activity}</option>
          ))}
        </select>
        <label>
          <input type="checkbox" checked={showAll} onChange={() => setShowAll(!showAll)} />
          Show all
        </label>
      </div>

      <div className="volunteer-list">
        {volunteers.filter(matchesFilters).map((volunteer) => (
          <div key={volunteer.id} className="volunteer-card">
            <h3>{volunteer.firstName} {volunteer.lastName}</h3>
            <p><strong>City:</strong> {volunteer.city}</p>
            <p><strong>Contact:</strong> {volunteer.contact}</p>
            <p><strong>Activities:</strong> {volunteer.activities.join(', ')}</p>
            <p><strong>Rating:</strong> {averageRating(volunteer.ratings)}</p>
            <p><strong>Comments:</strong></p>
            <ul>
              {volunteer.comments.map((comment, index) => (
                <li key={`${volunteer.id}-${index}`}>{comment}</li>
              ))}
            </ul>
            {isAdmin && (
              <>
                <button onClick={() => setVolunteers(volunteers.filter((v) => v.id !== volunteer.id))}>Delete</button>
                <button onClick={() => startEditing(volunteer)}>Edit</button>
              </>
            )}
            <button onClick={() => addComment(volunteer.id)}>Add comment</button>
            <button onClick={() => rate(volunteer.id)}>Rate</button>
          </div>
        ))}
      </div>
      <br />

      {isAdmin && (
        <div className="add-volunteer-container">
          <h3>{editingId === null ? 'Add a volunteer' : 'Edit volunteer'}</h3>
          {formField('firstName', 'First name')}
          {formField('lastName', 'Last name')}
          {formField('city', 'City')}
          {formField('contact', 'Contact')}
          <div>
            <h4>Activities:</h4>
            {ACTIVITY_OPTIONS.map((activity) => (
              <label key={activity}>
                <input
                  type="checkbox"
                  checked={form.activities.includes(activity)}
                  onChange={(e) => toggleFormActivity(activity, e.target.checked)}
                />
                {activity}
              </label>
            ))}
          </div>
          <button onClick={saveVolunteer}>{editingId === null ? 'Add volunteer' : 'Save changes'}</button>
        </div>
      )}
    </div>
  );
};

export default VolunteerList;
