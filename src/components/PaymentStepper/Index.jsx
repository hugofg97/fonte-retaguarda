
import React, { useContext, useEffect, useState } from 'react';
import PaymentCard from './PaymentCard';
import {useParams} from 'react-router-dom';
import { Box, Container, CircularProgress } from '@material-ui/core';
import useStyle from './style';
import SubscriberContext from '../../context/Subscriber';
import CheckAndPay from './CheckAndPay';


const StepperPayment = (props) => {
  const [ loading, setLoading] = useState(false);
  const { getUser } = useContext(SubscriberContext);
  const paymentClass = useStyle(props);
  const {id} = useParams();

  const [step, setStep] = useState(0);
  const nextStep = () => {
    if (step < 3) setStep(step + 1);
  };
  const renderContentStep = () => {
    switch (step) {
      case 0:
        return <PaymentCard submit={nextStep}/>;
      case 1:
        return <CheckAndPay />;
      default:
        break;

    }
  };
  useEffect(() =>{
   setLoading(true);
   getUser(id).then(_ =>  setLoading(false))
  

   
  },[])

  return (
    <Container className={paymentClass.root}>
      <Box display="flex" justifyContent="space-around">
      </Box>
      <Box>

        {!loading  ? renderContentStep() : <Box display="flex" alignItems="center" justifyContent="center"  flexDirection="row" height="100vh" > 
          
          <CircularProgress style={{color: 'green'}}></CircularProgress>
      
          </Box>}
      </Box>

    </Container>
  )
}

export default StepperPayment;