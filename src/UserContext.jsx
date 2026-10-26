import { createContext, useState } from 'react';
import PropTypes from 'prop-types';

// React Context shares the admin flag between pages without passing props
// through every level of the component tree. The "Admin" checkbox in the
// navigation simulates logging in as an administrator.
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);

  const toggleAdmin = () => {
    setIsAdmin((prevState) => !prevState);
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
