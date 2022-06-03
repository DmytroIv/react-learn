import { Link, NavLink } from 'react-router-dom';

export const Header = () => {
  return (
    <header className="header">
      <h1>
        <Link to="/">Feedback UI</Link>
      </h1>
      <nav>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/reviews">Reviews</NavLink>
      </nav>
    </header>
  );
};
