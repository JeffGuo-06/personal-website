import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage } from './pages/Home.page';
import { Valentines } from './pages/Valentines.page';

const router = createBrowserRouter([
  {
    path: '/valentines',
    element: <Valentines />, // Add the new route
  },
  {
    path: '/',
    element: <HomePage />,
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
