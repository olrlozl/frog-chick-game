import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import LandingPage from 'pages/LandingPage';
import MainPage from 'pages/MainPage';
import PlayPage from 'pages/PlayPage';
import GuidePage from 'pages/GuidePage';

const router = createBrowserRouter([
  { path: '/', element: <LandingPage /> },
  { path: '/main', element: <MainPage /> },
  { path: '/play', element: <PlayPage /> },
  { path: '/guide', element: <GuidePage /> },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
