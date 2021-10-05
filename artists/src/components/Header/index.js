import React from 'react';
import {NavLink} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHome} from '@fortawesome/free-solid-svg-icons'

import './styles.scss';


const Header = () => {
  return (
    <header>
      <nav>
        <ul>
          <li><NavLink to="/" exact><FontAwesomeIcon icon={faHome}/> </NavLink></li>
          <li><NavLink to="/search">Search</NavLink></li>
          <li><NavLink to="/artists">Artists</NavLink></li>
          <li><NavLink to="/albums">Albums</NavLink></li>
          <li><NavLink to="/tracks">Tracks</NavLink></li>
          <li><NavLink to="/genres">Genres</NavLink></li>
          <li><NavLink to="/chart">Chart</NavLink></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;