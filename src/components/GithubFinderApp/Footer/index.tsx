import { FaHashtag, FaCopyright } from 'react-icons/fa';

export const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="footer py-2 bg-gray-700 text-primary-content footer-center">
      <div className="container flex justify-between">
        <span className="flex items-center">
          <span className="pr-2">{year}</span>
          <FaCopyright />
        </span>
        <FaHashtag />
      </div>
    </footer>
  );
};
