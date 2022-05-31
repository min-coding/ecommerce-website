import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import HomeScreen from './pages/HomeScreen';
import ProductScreen from './pages/ProductScreen';
function App() {
  /**
   * Is the container of every page
   *
   */
  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <Link to={'/'}>Homepage</Link>
        </header>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/products/:slug" element={<ProductScreen />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
