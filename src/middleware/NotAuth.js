import React from 'react';
import Redirect from './Redirect';


const NotAuth = (Component) => {
  const isAuthenticated = localStorage.getItem('access_token') // Implement your authentication check logic

  return class extends React.Component {
    render() {
      if (isAuthenticated === "undefined" || isAuthenticated === undefined || isAuthenticated === null || !isAuthenticated) {
        return <Component {...this.props} />;
      } else { 
          return <Redirect to={"/"}/>;
      }
    }
  };
};

export default NotAuth;