import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import LandingPage from 'pages/LandingPage';
import MainPage from 'pages/MainPage';
import PlayPage from 'pages/PlayPage';
import RankingPage from 'pages/RankingPage';

const router = createBrowserRouter([
  { path: '/', element: <LandingPage /> },
  { path: '/play', element: <PlayPage /> },
  {
    path: '/main',
    children: [
      {
        path: '',
        element: <MainPage />,
      },
      {
        path: 'ranking',
        element: <RankingPage />,
      },
    ],
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
