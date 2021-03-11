import React, {useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
//
import {autoSignIn} from "../../store/actions";

const AutoSign = ({children}) => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(autoSignIn()).then(() => {
      setLoading(false);
    });
  }, [dispatch]);

  if (loading) {
    return (
      <div className="main_loader">
        <div className="lds-heart">
          <div />
        </div>
      </div>
    )
  } else {
    return (
      <>
        {children}
      </>
    );
  }
};

export default AutoSign;