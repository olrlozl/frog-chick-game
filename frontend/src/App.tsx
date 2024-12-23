import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import LandingPage from 'pages/LandingPage';
import MainPage from 'pages/MainPage';
import PlayPage from 'pages/PlayPage';

const router = createBrowserRouter([
  { path: '/', element: <LandingPage /> },
  { path: '/main', element: <MainPage /> },
  { path: '/play', element: <PlayPage /> },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
