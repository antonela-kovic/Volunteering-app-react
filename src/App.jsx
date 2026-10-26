// App.jsx
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
//import { Switch } from 'react-router-dom';
import Home from './Home';
import ActivityList from "./ActivityList";
import VolunteerList from "./VolonteerList";
import Organizations from './Organizations';
import { UserProvider } from './UserContext'; 

function App() {
  return (
    <Router>
      <UserProvider> {/* Dodajemo UserProvider kako bismo omogućili pristup isAdmin i toggleAdmin */}
        <div>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/activities" element={<ActivityList />} />
            <Route path="/volunteers" element={<VolunteerList />} />
            <Route path="/organizations" element={<Organizations />} />
          </Routes>
        </div>
      </UserProvider>
    </Router>
  );
}

export default App;
