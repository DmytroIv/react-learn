import { NavLink } from 'react-router-dom';
import { ReactComponent as OfferIcon } from '@/assets/svg/localOfferIcon.svg';
import { ReactComponent as ExploreIcon } from '@/assets/svg/exploreIcon.svg';
import { ReactComponent as PersonIcon } from '@/assets/svg/personOutlineIcon.svg';

export const Navbar = () => {
  return (
    <div className="navbar">
      <nav className="navbarNav">
        <ul className="navbarListItems">
          <NavLink to="/">
            <li className="navbarListItem">
              <ExploreIcon width="30px" height="30px" />
              <p>Explore</p>
            </li>
          </NavLink>
          <NavLink to="/offers">
            <li className="navbarListItem">
              <OfferIcon width="30px" height="30px" />
              <p>Offer</p>
            </li>
          </NavLink>
          <NavLink to="/profile">
            <li className="navbarListItem">
              <PersonIcon width="30px" height="30px" />
              <p>Profile</p>
            </li>
          </NavLink>
        </ul>
      </nav>
    </div>
  );
};
