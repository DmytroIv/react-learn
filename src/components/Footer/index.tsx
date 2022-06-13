import { BiCopyright, BiBuildingHouse } from 'react-icons/bi';
import { Link } from 'react-router-dom';

export const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="footer py-2 bg-gray-700 text-primary-content footer-center">
      <div className="container flex justify-between">
        <span className="flex items-center">
          <BiCopyright className="pr-2 text-2xl" />
          <span>{year}</span>
        </span>
        <Link to="/">
          <BiBuildingHouse className="text-xl" />
        </Link>
      </div>
    </footer>
  );
};
