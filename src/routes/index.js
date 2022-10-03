import { useRoutes } from 'react-router-dom';

import AccountConfig from '../components/ConfigAccount.jsx/Index';
import Login from '../components/Login/Index';
import PrivateRoute from './CheckAuth';
import Session from '../pages/session/Session'
import Video from '../pages/Videos/Video';

const Routes = () => {
  const routes = useRoutes([
    {
      path: '/session/:categoryId',
      element: (
       <PrivateRoute>
        <AccountConfig>
         <Session />
        </AccountConfig>
       </PrivateRoute>
        
      ),
    },
    {
      path: '/videos/:sessionId',
      element: (
       <PrivateRoute>
        <AccountConfig>
         <Video />
        </AccountConfig>
       </PrivateRoute>
        
      ),
    },
    {
      path: '/login',
      element: (
       
          <Login />
        
      ),
    },
  ]);

  return routes;
};

export default Routes;
