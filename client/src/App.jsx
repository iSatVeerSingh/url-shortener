import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import RootLayout from './components/Layouts/RootLayout';
import Home from './pages/Home';
import Signup from './pages/Signup';
import './styles/global.css';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path='/signup' element={<Signup />} />
    </Route>,
  ),
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
