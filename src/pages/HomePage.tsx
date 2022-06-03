import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div>
      <ol>
        <li>
          <Link to="/">Home</Link>
        </li>
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
