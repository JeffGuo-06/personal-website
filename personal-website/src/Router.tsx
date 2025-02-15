import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage } from './pages/Home.page';
import { Valentines } from './pages/Valentines.page';
import { WorkingOnIt } from './pages/WorkingOnIt.page';

const router = createBrowserRouter([
  {
    path: '/valentines',
    element: <Valentines />, // Add the new route
  },
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/working-on-it',
    element: <WorkingOnIt />,
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
