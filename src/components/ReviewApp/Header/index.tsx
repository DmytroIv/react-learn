import { Link, NavLink } from 'react-router-dom';

export const Header = () => {
  return (
    <header className="header">
      <h1>
        <Link to="/">Home</Link>
      </h1>
      <nav>
        <NavLink to="/reviews-about">About</NavLink>
        <NavLink to="/reviews">Reviews</NavLink>
      </nav>
    </header>
  );
};
