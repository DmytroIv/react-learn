import React from 'react';
import {BrowserRouter as Router} from "react-router-dom";
//
import {CurrentUserProvider} from 'contexts/currentUser';
import Routes from 'routes';
import TopBar from 'components/topBar';
import CurrentUserChecker from 'components/currentUserChecker';

function App() {
  return (
    <CurrentUserProvider className="App">
      <CurrentUserChecker>
        <Router>
          <TopBar/>
          <Routes/>
        </Router>
      </CurrentUserChecker>
    </CurrentUserProvider>
  );
}

export default App;
