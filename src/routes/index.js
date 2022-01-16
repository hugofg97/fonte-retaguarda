import { useRoutes } from 'react-router-dom';

import StepperPayment from '../components/PaymentStepper/Index';

const Routes = () => {
  const routes = useRoutes([
    {
      path: '/payment/:id',
      element: (
       
          <StepperPayment />
        
      ),
    },
  ]);

  return routes;
};

export default Routes;
