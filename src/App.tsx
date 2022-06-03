import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ReviewContextProvider } from './context/review.context';
import HomePage from './pages/HomePage';
import ReviewRoutes from './pages/ReviewsApp/routes';
import GithubFinderRoutes from './pages/GithubFinderApp/routes';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
      {/* Reviews App */}
      <ReviewContextProvider>
        <ReviewRoutes />
      </ReviewContextProvider>
      {/* Reviews App */}
      <GithubFinderRoutes />
    </BrowserRouter>
  );
}

export default App;
