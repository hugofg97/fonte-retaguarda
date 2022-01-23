import React, { useContext, useEffect, useState } from 'react';
import { Box, Typography, TextField, Button, makeStyles, CircularProgress } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { paymentSchema } from '../../schemas/paymentSchema';
import { signature } from '../../services/payment';
import SubscriberContext from '../../context/Subscriber';
import { useNavigate, useParams } from 'react-router-dom';
import ModalCustom from '../ModalCustom';

const style = makeStyles(() => ({
  title: {
    color: '#68846D',
    fontWeight: 'bold',
    fontSize: '1rem',

  },
  subTitle: {
    color: 'grey',
    fontWeight: 'bold',
    fontSize: '1rem',
    textAlign: 'left'
  }
}))

export default function AccountConfig(props) {
  const history = useNavigate();
  const { id } = useParams();
  const { address, card, user, setCard, getUser } = useContext(SubscriberContext);
  const paymentClass = style(props);
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event) => {
    setPassword(event.target.value);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onBlur', resolver: yupResolver(paymentSchema) });


  const onSubmit = async () => {
    await signature({ password, document: id });

  }
  useEffect(() => {
    setIsLoading(true)
    getUser(id).then(v => {
      if (!v?.signature?.active) {
        console.log("ENTRO AKI")
        history('/payment');
        setIsLoading(false)
      }
      else {
        setIsLoading(false)
        return;
      }
    })
  }, []);

  return (

    <Box display="flex" marginTop={10} flexDirection="column">
      {isLoading ? <Box display="flex" alignItems="center" justifyContent="center" flexDirection="row" height="100vh" >

        <CircularProgress style={{ color: 'green' }}></CircularProgress>

      </Box> : <>
        <Box display="flex" flexDirection="column" alignItems="start" >
          <Typography className={paymentClass.title}> Assinatura:</Typography>

          <Typography className={paymentClass.subTitle}>{user?.signature?.active ? 'Ativa' : 'Pendente'}  </Typography>
          <Typography className={paymentClass.title}>Próxima Fatura:</Typography>
          <Typography className={paymentClass.subTitle}>{new Date(user?.signature?.next_billing_at).toLocaleDateString()}
            <Button label="senha" style={{ color: 'blue' }} onClick={onSubmit} variant="text">editar</Button>
          </Typography>
          {!user?.signature?.active && <Button label="senha" onClick={onSubmit} variant="outlined">Pagar fatura</Button>}
        </Box>
        <Box display="flex" flexDirection="column" alignItems="start" >

          <Typography className={paymentClass.title}>Cartão:</Typography>
          <Typography className={paymentClass.subTitle}>Dados: {user?.cards?.brand} **** **** **** {user?.cards?.last_four_digits}
            <Button label="senha" style={{ color: 'blue' }} onClick={onSubmit} variant="text">editar</Button>
          </Typography>
        </Box>
        <Box display="flex" flexDirection="column" marginTop={5}>
          <Button label="senha" style={{ color: "red" }} onClick={onSubmit} variant="filled">Cancelar assinatura?</Button>
        </Box>
        <ModalCustom title="okok" message="oko" open={false} /></>}




    </Box>




  );
}
