import  { createContext, useState } from 'react';
import PropTypes from 'prop-types';

// createContext: Ova funkcija stvara kontekst koji će se koristiti za dijeljenje podataka između komponenti u React aplikaciji.
// Kontekst omogućuje komponentama da komuniciraju bez potrebe za proslijeđivanjem props-ova kroz svaku razinu hijerarhije komponenata.
// export: Ovaj ključna riječ označava da se UserContext izvozi iz datoteke, što znači da će biti dostupan drugim dijelovima aplikacije koji ga uvezu.

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);

  const toggleAdmin = () => {
    setIsAdmin(prevState => !prevState);
  };

  return (
    <UserContext.Provider value={{ isAdmin, toggleAdmin }}>
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default UserContext;