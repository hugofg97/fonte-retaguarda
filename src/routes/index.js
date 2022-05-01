import { useRoutes } from 'react-router-dom';

import StepperPayment from '../components/PaymentStepper/Index';
import CardUpdate from '../components/CardPayment/Index';
import AccountConfig from '../components/ConfigAccount.jsx/Index';
import Login from '../components/Login/Index';
import PrivateRoute from './CheckAuth';

const Routes = () => {
  const routes = useRoutes([
    {
      path: '/payment',
      element: (
       <PrivateRoute>

         <StepperPayment />
       </PrivateRoute>
        
      ),
    },
    {
      path: '/card',
      element: (
       <PrivateRoute>

         <CardUpdate />
       </PrivateRoute>
        
      ),
    },
    {
      path: '/configaccount',
      element: (
       <PrivateRoute>
         <AccountConfig />
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
