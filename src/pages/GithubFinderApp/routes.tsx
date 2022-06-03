import { Route, Routes } from 'react-router-dom';
import MainPage from './MainPage';
import './GithubFinder.css';

const GithubFinderRoutes = () => {
  return (
    <Routes>
      <Route path="reviews" element={<MainPage />} />
    </Routes>
  );
};

export default GithubFinderRoutes;
