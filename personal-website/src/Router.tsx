import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage } from './apps/portfolio/pages/Home.page';
import { ShoutPage } from './apps/shout/pages/Shout.page';
import { FunPage } from './apps/portfolio/pages/Fun.page';
import { MusicPlayerPage } from './apps/portfolio/pages/MusicPlayer.page';
import { ArtistPage } from './apps/portfolio/pages/Artist.page';
import { AuthProvider } from './apps/portfolio/contexts/AuthContext';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/shout',
    element: <ShoutPage />,
  },
  {
    path: '/fun',
    element: <FunPage />,
  },
  {
    path: '/music-player',
    element: <MusicPlayerPage />,
  },
  {
    path: '/artist',
    element: (
      <AuthProvider>
        <ArtistPage />
      </AuthProvider>
    ),
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
