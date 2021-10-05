import React from 'react';
import {BrowserRouter} from "react-router-dom";
import Routes from "./routes";
import Header from "./components/Header";
import Footer from "./components/Footer";

import './index.scss';

const App = () => {
  return (
    <BrowserRouter>
      <Header/>
      <main>
        <Routes/>
      </main>
      <Footer/>
    </BrowserRouter>
  );
};

export default App;