import { FaHome } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const NotFoundFinderPage = () => {
  return (
    <div className="hero">
      <div className="text-center hero-content">
        <div className="max-w-lg">
          <h1 className="text-5xl font-bold mb-8">404 Error</h1>
          <p className="text-3xl mb-5">Page not found</p>
          <Link to="/" className="btn btn-primary btn-md text-xl">
            <FaHome className="mr-3" />
            back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundFinderPage;
