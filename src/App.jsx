import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import ActivityList from './ActivityList';
import VolunteerList from './VolunteerList';
import Organizations from './Organizations';
import { UserProvider } from './UserContext';
import './App.css';

function App() {
  return (
    <Router>
      {/* UserProvider shares the admin flag (isAdmin, toggleAdmin) with all pages */}
      <UserProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/activities" element={<ActivityList />} />
          <Route path="/volunteers" element={<VolunteerList />} />
          <Route path="/organizations" element={<Organizations />} />
        </Routes>
      </UserProvider>
    </Router>
  );
}

export default App;
