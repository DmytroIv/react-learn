import { Link, NavLink } from 'react-router-dom';
import { FaGithub } from 'react-icons/fa';

export const Header = () => {
  return (
    <header className="header mb-5 shadow-lg bg-neutral text-neutral-content">
      <div className="container flex justify-between py-2">
        <div className="flex-none">
          <Link to="/">
            <FaGithub className="inline pr-2 text-3xl" />
          </Link>
        </div>
        <nav>
          <NavLink
            className="text-lg font-medium text-base align-middle ml-2 btn btn-ghost btn-sm rounded-btn"
            to="/github-finder">
            Finder
          </NavLink>
          <NavLink
            className="text-lg font-medium text-base align-middle ml-2 btn btn-ghost btn-sm rounded-btn"
            to="/about-finder">
            About
          </NavLink>
        </nav>
      </div>
    </header>
  );
};
