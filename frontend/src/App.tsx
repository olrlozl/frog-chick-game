import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import LandingPage from 'pages/LandingPage';
import MainPage from 'pages/MainPage';
import PlayPage from 'pages/PlayPage';
import RankPage from 'pages/RankPage';
import MainLayout from 'components/common/Layout/MainLayout';
import GuidePage from 'pages/GuidePage';

const router = createBrowserRouter([
  { path: '/', element: <LandingPage /> },
  { path: '/play', element: <PlayPage /> },
  {
    path: '/main',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <MainPage />,
      },
      {
        path: 'rank',
        element: <RankPage />,
      },
      {
        path: 'guide',
        element: <GuidePage />,
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
