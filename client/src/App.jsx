import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import './styles/global.css';
import RootLayout from './components/Layouts/RootLayout';
import Home from './pages/Home';
import Login from './pages/Login';
import ShortUrl from './pages/ShortUrl';
import Signup from './pages/Signup';
import SignupVerify from './pages/SignupVerify';
import UrlsList from './pages/UrlsList';
import VerifyLink from './pages/VerifyLink';
import Redirect from './pages/Redirect';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/signup/verify' element={<SignupVerify />} />
      <Route path='/login' element={<Login />} />
      <Route path='/short' element={<ShortUrl />} />
      <Route path='/urls' element={<UrlsList />} />
      <Route path='/:linkId' element={<VerifyLink />} />
      <Route path='/:linkId/verify' element={<Redirect />} />
    </Route>,
  ),
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
