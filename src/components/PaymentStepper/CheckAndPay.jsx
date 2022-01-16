import React, { useContext, useEffect, useState } from 'react';
import { Box, Typography, TextField, Button, makeStyles } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { paymentSchema } from '../../schemas/paymentSchema';
import { signature } from '../../services/payment';
import SubscriberContext from '../../context/Subscriber';
import { useParams } from 'react-router-dom';
import ModalCustom from '../ModalCustom';

const style = makeStyles(() => ({ 
  title: {
    color: '#68846D',
    fontWeight: 'bold',
    fontSize: '1rem',
    padding: '10px 0px 2px 0px'
  },
   subTitle: {
    color: 'grey',
    fontWeight: 'bold',
    fontSize: '0.8rem',
    textAlign: 'left'
   }
}))

export default function PaymentCard(props) {
  const { id } = useParams();
  const [password, setPassword] = useState('');
  const { address, card, user, setCard, getUser } = useContext(SubscriberContext);
  const paymentClass = style(props);

  const handleChange = (event) => {
    setPassword(event.target.value);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onBlur', resolver: yupResolver(paymentSchema) });
  const { submit, existsCard } = props;

  const onSubmit = async () => {
    await signature({ password, document: id });
    
  }
  useEffect(() => {
    getUser(id);
  }, []);

  return (

    <Box display="flex" marginTop={10} flexDirection="column">
      <Box display="flex" alignItems="flex-start" justifyContent="center" flexDirection="row">


        <Typography className={paymentClass.title}> Verifique os dados:</Typography>

      </Box>
      <Box display="flex" flexDirection="column" alignItems="start" >

      <Typography className={paymentClass.title}>Cartão:</Typography>
       <Typography className={paymentClass.subTitle}>{user?.cards?.brand} com final {user?.cards?.last_four_digits} </Typography>
      <Typography className={paymentClass.title}>Nome no cartão:</Typography>
       <Typography className={paymentClass.subTitle}>{user?.cards?.holder_name}</Typography>
      <Typography className={paymentClass.title}>CPF/CNPJ do cartão:</Typography>
       <Typography className={paymentClass.subTitle}> {user?.cards?.holder_document} </Typography>
      <Typography className={paymentClass.title}>Endereço:</Typography>
       <Typography className={paymentClass.subTitle}>{user?.address?.street} {user?.address?.number},  {user?.address?.neighborhood}, {user?.address?.city}, {user?.address?.state} </Typography>
      </Box>
      <Box display="flex" flexDirection="column" marginTop={5}>
      <Typography className={paymentClass.subTitle}>Para concluir a assinatura, digite sua senha e confirme</Typography>
      <TextField style={{marginTop: 5, marginBottom: 10}} label="senha" type="password" onChange={handleChange} variant="outlined"></TextField>
      <Button label="senha" onClick={onSubmit} variant="outlined">Confirmar</Button>
      </Box>
      <ModalCustom title="okok" message="oko" open={true}/>


    </Box>




  );
}
