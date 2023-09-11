import 'normalize.css';
import './styles/border.css';
import './styles/base.css';
import Guide from './containers/Guide';
import Login from './containers/Account/Login';
import Account from './containers/Account';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import Register from './containers/Account/Register';
import Home from './containers/Home';
import Nearby from './containers/Nearby';
import Search from './containers/Search';
import SearchList from './containers/SearchList';

const router = createHashRouter([
  {
    path: '/',
    element: <Guide />
  }, {
    path: '/account',
    element: <Account />,
    children: [{
      path: '/account/login',
      element: <Login />
    }, {
      path: '/account/register',
      element: <Register />
    }]
  }, {
    path: '/home',
    element: <Home />
  }, {
    path: '/nearby',
    element: <Nearby />
  }, {
    path: '/search',
    element: <Search />
  }, {
    path: '/searchList',
    element: <SearchList />
  }])

function App() {
  return <RouterProvider router={router}></RouterProvider>
}

export default App;