import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="container max-w-2xl my-5">
      <h1 className="text-3xl text-center mb-3">Home page</h1>
      <ol>
        <li>
          <Link to="/reviews">Reviews</Link>
        </li>
        <li>
          <Link to="/github-finder">Github Finder</Link>
        </li>
      </ol>
    </div>
  );
};

export default HomePage;
