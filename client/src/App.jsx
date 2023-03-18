import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import RootLayout from './components/Layouts/RootLayout';
import Home from './pages/Home';
import './styles/global.css';

const router = createBrowserRouter(
  createRoutesFromElements(<Route path='/' element={<RootLayout />}>
    <Route index element={<Home />} />
  </Route>),
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
