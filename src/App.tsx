import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Footer, Header } from './components';
import AboutPage from './pages/AboutPage';
import ReviewsPage from './pages/ReviewsPage';
import { ReviewContextProvider } from './context/review.context';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <ReviewContextProvider>
        <Header />
        <main className="main">
          <Routes>
            <Route path="/about" element={<AboutPage />} />
            <Route path="/reviews" element={<ReviewsPage />} />
            <Route path="/reviews/:id" element={<ReviewsPage />} />
            <Route path="/" element={<h1>Home page</h1>} />
          </Routes>
        </main>
        <Footer />
      </ReviewContextProvider>
    </BrowserRouter>
  );
}

export default App;
