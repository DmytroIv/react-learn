import { Route, Routes } from 'react-router-dom';
import ReviewsPage from './ReviewsPage';
import AboutPage from './AboutPage';
import './Review.css';

const ReviewRoutes = () => {
  return (
    <Routes>
      <Route path="reviews" element={<ReviewsPage />}>
        <Route path=":id" element={<ReviewsPage />} />
      </Route>
      <Route path="reviews-about" element={<AboutPage />} />
    </Routes>
  );
};

export default ReviewRoutes;
