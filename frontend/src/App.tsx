import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import LandingPage from 'pages/LandingPage';
import MainPage from 'pages/MainPage';
import PlayPage from 'pages/PlayPage';
import RankPage from 'pages/RankPage';
import GuidePage from 'pages/GuidePage';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { queryClient } from 'api/queryClient';
import LoadingSpinner from 'components/common/LoadingSpinner';
import { ProtectedRoute } from 'components/common/ProtectedRoute';
import { useEffect } from 'react';
import instance, { setAxiosInterceptorResponse } from 'api/axiosInstance';
import { useErrorStore } from 'stores/errorStore';
import { PublicRoute } from 'components/common/PublicRoute';
import FriendModePage from 'pages/FriendModePage';
import MobileLayout from 'components/common/Layout/MobileLayout';
import SettingPage from 'pages/SettingPage';
import RandomModePage from 'pages/RandomModePage';

const router = createBrowserRouter([
  {
    element: <PublicRoute />,
    children: [{ path: '/', element: <LandingPage /> }],
  },
  {
    element: <ProtectedRoute />,
    children: [
      { path: '/local-mode/play', element: <PlayPage /> },
      {
        path: '/friend-mode',
        children: [
          { index: true, element: <FriendModePage /> },
          { path: 'play', element: <PlayPage /> },
        ],
      },
      { path: '/random-mode', element: <RandomModePage /> },
      {
        path: '/main',
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
          {
            path: 'setting',
            element: <SettingPage />,
          },
        ],
      },
    ],
  },
]);

function App() {
  const { setErrorMessage } = useErrorStore();

  useEffect(() => {
    const interceptorId = setAxiosInterceptorResponse(setErrorMessage);
    return () => {
      // 기존 인터셉터 제거
      instance.interceptors.response.eject(interceptorId);
    };
  }, [setErrorMessage]);

  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <MobileLayout>
          <RouterProvider router={router} />
        </MobileLayout>
        <LoadingSpinner />
        <ReactQueryDevtools />
      </QueryClientProvider>
    </div>
  );
}

export default App;
