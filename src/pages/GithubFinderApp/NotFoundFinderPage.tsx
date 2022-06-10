import { FaHome } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { withLayout } from '@/components/GithubFinderApp/Layout';

const NotFoundFinderPage = () => {
  return (
    <div className="hero">
      <div className="text-center hero-content">
        <div className="max-w-lg">
          <h1 className="text-5xl font-bold mb-8">404 Error</h1>
          <p className="text-3xl mb-5">Page not found</p>
          <Link to="/github-finder" className="btn btn-primary btn-md text-xl">
            <FaHome className="mr-3" />
            back to Finder
          </Link>
        </div>
      </div>
    </div>
  );
};

export default withLayout(NotFoundFinderPage);
