import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Blog from './pages/Blog';
import User from './pages/User';
import Login from './pages/Login';
import NotFound from './pages/Page404';
import Register from './pages/Register';
import Products from './pages/Products';
import DashboardApp from './pages/DashboardApp';
import Productos from './pages/Productos';
import AltaProducto from './pages/AltaProducto';
import AltaOferta from './pages/AltaOferta';
import EditarProducto from './pages/EditarProducto';
import Pedidos from './pages/Pedidos';
import DetallePedido from './pages/DetallePedido';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/pepsico/dashboard/',
      element: <DashboardLayout />,
      children: [
        { path: 'products', element: <Products /> },
        { path: 'productos', element: <Productos /> },
        { path: 'altaProducto', element: <AltaProducto /> },
        { path: 'altaOferta', element: <AltaOferta /> },
        { path: 'editarProducto', element: <EditarProducto /> },
        { path: 'pedidos', element: <Pedidos /> },
        { path: 'detallePedido', element: <DetallePedido /> },
      ],
    },
    {
      path: '/pepsico/login',
      element: <Login />,
    },
    {
      path: 'register',
      element: <Register />,
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: '/', element: <Navigate to="/pepsico/login" /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);
}
