import { BiCopyright, BiBuildingHouse } from 'react-icons/bi';
import { Link } from 'react-router-dom';

export const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="">
      <div className="">
        <span className="">
          <BiCopyright className="" />
          <span>{year}</span>
        </span>
        <Link to="/">
          <BiBuildingHouse className="" />
        </Link>
      </div>
    </footer>
  );
};
