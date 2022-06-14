import { Link, NavLink } from 'react-router-dom';
import { GoHome } from 'react-icons/go';
import './Header.css';

export const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <Link to="/">
            <GoHome className="inline pr-2 text-3xl" />
          </Link>
        </div>
        <nav>
          <NavLink className="header-link" to="/sign-in">
            Sign In
          </NavLink>
          <NavLink className="header-link" to="/Sign-up">
            Sign Up
          </NavLink>
        </nav>
      </div>
    </header>
  );
};
