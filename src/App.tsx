import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ReviewContextProvider } from '@/context/review.context';
import { GithubContextProvider } from '@/context/github/github.context';
import { AlertContextProvider } from '@/context/alert/alert.context';
/*  */
import HomePage from '@/pages/HomePage';
/*  */
import ReviewsPage from '@/pages/ReviewsApp/ReviewsPage';
import AboutPage from '@/pages/ReviewsApp/AboutPage';
/*  */
import FinderPage from '@/pages/GithubFinderApp/FinderPage';
import AboutFinderPage from '@/pages/GithubFinderApp/AboutFinderPage';
import UserDetailsPage from '@/pages/GithubFinderApp/UserDetailsPage';
import NotFoundFinderPage from '@/pages/GithubFinderApp/NotFoundFinderPage';
/*  */
import '@/pages/ReviewsApp/Review.css';
import '@/pages/GithubFinderApp/GithubFinder.css';

function App() {
  return (
    <BrowserRouter>
      <AlertContextProvider>
        <ReviewContextProvider>
          <GithubContextProvider>
            <Routes>
              <Route path="/" element={<HomePage />} />
              {/* Reviews App */}
              <Route path="reviews" element={<ReviewsPage />}>
                <Route path=":id" element={<ReviewsPage />} />
              </Route>
              <Route path="reviews-about" element={<AboutPage />} />
              {/*  <GithubFinderRoutes />*/}
              <Route path="/github-finder" element={<FinderPage />} />
              <Route path="/about-finder" element={<AboutFinderPage />} />
              <Route path="/users/:login" element={<UserDetailsPage />} />
              <Route path="/notfound" element={<NotFoundFinderPage />} />
              <Route path="/*" element={<NotFoundFinderPage />} />
            </Routes>
          </GithubContextProvider>
        </ReviewContextProvider>
      </AlertContextProvider>
    </BrowserRouter>
  );
}

export default App;
