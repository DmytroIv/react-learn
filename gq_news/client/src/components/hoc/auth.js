import React, {useState, useEffect} from 'react';
import {useSelector} from "react-redux";

const Auth = (ComposedComponent) => {

  const AuthenticationCheck = (props) => {
    const [isAuth, setIsAuth] = useState(false);
    const user = useSelector((state) => state.user);

    useEffect(() => {
      setIsAuth(false);

      const isSignInPage = props.history.location.pathname === '/sign_in';

      if ((!user.auth && !isSignInPage) || (user.auth && isSignInPage)) {
        props.history.push('/');
      } else {
        setIsAuth(true);
      }
    }, [props, user]);

    if (!isAuth) {
      return (
        <div className="main_loader">
          <div className="lds-heart">
            <div/>
          </div>
        </div>
      );
    } else {
      return (
        <ComposedComponent {...props} />
      );
    }
  }

  return AuthenticationCheck;
};

export default Auth;