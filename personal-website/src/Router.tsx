import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage } from './pages/Home.page';
import { WorkingOnIt } from './pages/WorkingOnIt.page';
import { ShoutPage } from './pages/Shout.page';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/working-on-it',
    element: <WorkingOnIt />,
  },
  {
    path: '/shout',
    element: <ShoutPage />,
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
