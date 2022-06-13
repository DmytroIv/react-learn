import { Link, NavLink } from 'react-router-dom';
import { GoHome } from 'react-icons/go';
import { useAuthStatus } from '@/hooks/useAuthStatus';
import './Header.css';

export const Header = () => {
  const { loggedIn } = useAuthStatus();

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <Link to="/">
            <GoHome className="inline pr-2 text-3xl" />
          </Link>
        </div>
        {!loggedIn && (
          <nav>
            <NavLink className="header-link" to="/sign-in">
              Sign In
            </NavLink>
            <NavLink className="header-link" to="/Sign-up">
              Sign Up
            </NavLink>
          </nav>
        )}
      </div>
    </header>
  );
};
