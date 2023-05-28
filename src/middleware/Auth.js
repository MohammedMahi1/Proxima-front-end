import React from 'react';
import Redirect from './Redirect';


const Auth = (Component) => {
  const isAuthenticated = localStorage.getItem('access_token') // Implement your authentication check logic
  return class extends React.Component {
    render() {
      if (isAuthenticated) {
        return <Component {...this.props} />;
      } else if (isAuthenticated === "undefined" || isAuthenticated === undefined || isAuthenticated === null || !isAuthenticated) {
        return <Redirect to={"/login"} />;
      }
    }
  };
};

export default Auth;