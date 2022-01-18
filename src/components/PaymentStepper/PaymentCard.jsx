import React, { useContext, useEffect, useState } from 'react';
import { Box, Typography, TextField, Button, InputAdornment } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { paymentSchema } from '../../schemas/paymentSchema';
import { withStyles } from '@material-ui/styles';
import useStyle from './style';
import InputMask from 'react-input-mask';
import SubscriberContext from '../../context/Subscriber';
import { useParams } from 'react-router-dom';
import creditCardType from 'credit-card-type'
import ModalCustom from '../ModalCustom';
const CustomTextField = withStyles((theme) => ({
  root: {
    '& .MuiFormHelperText-root': {
      color: 'red',
    },
    '& .MuiInputBase-adornedEnd': {
      backgroundColor: 'white',
      border: '0.5px solid grey',
      borderRadius: '5px',
    },
    marginBottom: '15px',
  },
}))(TextField);

export default function PaymentCard(props) {
  const { id } = useParams();
  const { address, card, setCard, user, msgError, successSaveCard, setMsgError, saveCard } = useContext(SubscriberContext);
  const paymentClass = useStyle(props);
  const [ brand, setBrand ] = useState('');
  const [ openModal, setOpenModal ] = useState(false);

  const handleChange = (prop) => (event) => {
    if (prop === "number") {
      const { value } = event.target;
      if (value.length === 0) setCard({ ...card, [prop]: '' });
      const number = parseInt(value);
      if (isNaN(number) ) return;
      setCard({ ...card, [prop]: value.toString() }); 
      if(value.length > 4 ) {
         
        if(creditCardType(value)[0]?.type) {
         
          setBrand(creditCardType(value)[0].type)
        }
        else setBrand('')

      }
      return;
    }
    if (prop === "expMonth") {
      const { value } = event.target;
      if (value.length === 0) setCard({ ...card, [prop]: '' });
      const number = parseInt(value);
      if (isNaN(number)) return;
      setCard({ ...card, [prop]: number.toString() });
      return;
    }
    setCard({ ...card, [prop]: event.target.value });
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onBlur', resolver: yupResolver(paymentSchema) });
  const { submit, existsCard } = props;

  const onSubmit = async () => {
    if(!brand) {
      console.log(brand)
      console.log('Carttão inválido')
      return;
    }
    await saveCard({ card: { ...card, brand: brand, holderDocument: card.holderDocument.replace(/[^0-9]/g, '') }, address: { ...address, zip_code: address.zip_code.replace(/[^0-9]/g, '') }, document: id, idPg: user?.idPg });
  }

useEffect(() => {
if(msgError) setOpenModal(true)
else setOpenModal(false);
if(successSaveCard) submit();
},[msgError, successSaveCard])


  return (
    <Box display="flex" flexDirection="column" marginTop={5} padding="10px">
      <Typography>Ficamos felizes por querer caminhar nesta jornada espiritual e mental conosco. Para continuar basta informar seus dados de pagamento</Typography>
      {existsCard ? 'Já existe um cartão associado a sua conta' : <Box display="flex" flexDirection="column">
        <CustomTextField
          value={card?.number}
          error={!!errors.number?.message}
          className={paymentClass.inputs}
          helperText={errors.number?.message}
          {...register('number', handleChange('number'))}
          onChange={handleChange('number')}
          type="text"
          id="filled-error-helper-text"
          label="Número do cartão"
          variant="filled"
          inputProps={{ maxLength: 16 }}
          InputProps={{
            endAdornment: (
              <InputAdornment style={{border: '0px transparent'}} position="end">
               {brand}
              </InputAdornment>
            ),
          }}
        >

        </CustomTextField>

        <CustomTextField
          value={card?.holderName}
          error={!!errors.holderName?.message}
          className={paymentClass.inputs}
          helperText={errors.holderName?.message}
          {...register('holderName', handleChange('holderName'))}
          onChange={handleChange('holderName')}
          type="text"
          id="outlined-error-helper-text"
          label="Nome igual ao do cartão"
          variant="outlined"


        />



        <InputMask
          value={card?.holderDocument}
          mask="999.999.999-99"
          error={!!errors.holderDocument?.message}
          className={paymentClass.inputs}
          helperText={errors.holderDocument?.message}
          {...register('holderDocument', handleChange('holderDocument'))}
          onChange={handleChange('holderDocument')}
          type="text"
          id="outlined-error-helper-text"
          label="Documento(CPF)"
          variant="outlined"


        >
          {(inputProps) => <CustomTextField {...inputProps} />}
        </InputMask>

        <Box display="flex">


          <CustomTextField value={card?.expMonth}
            error={!!errors.expMonth?.message}
            className={paymentClass.inputs}
            helperText={errors.expMonth?.message}
            {...register('expMonth', handleChange('expMonth'))}
            onChange={handleChange('expMonth')}
            type="text"
            id="outlined-error-helper-text"
            label="Mês"
            variant="outlined"
            inputProps={{ maxLength: 2 }}
          />



          <InputMask
            value={card?.expYear}
            mask="99"
            error={!!errors.expYear?.message}
            className={paymentClass.inputs}
            helperText={errors.expYear?.message}
            {...register('expYear', handleChange('expYear'))}
            onChange={handleChange('expYear')}
            type="text"
            id="outlined-error-helper-text"
            label="Ano"
            variant="outlined"

          >
            {(inputProps) => <CustomTextField {...inputProps} />}
          </InputMask>



          <CustomTextField
            value={card?.cvv}
            error={!!errors.cvv?.message}
            className={paymentClass.inputs}
            helperText={errors.cvv?.message}
            {...register('cvv', handleChange('cvv'))}
            onChange={handleChange('cvv')}
            type="text"
            id="outlined-error-helper-text"
            label="CVV"
            variant="outlined"


          />

        </Box>
        <ModalCustom title={msgError?  "Ocorreu um erro" : 'Operação efetuada com sucesso'} message={msgError} open={openModal} deny={{action: () => setMsgError(''), label: 'Fechar'}} setOpen={() => setMsgError('')}/>
        <Button
          className={paymentClass.button}
          variant="outlined" color="primary" onClick={handleSubmit(onSubmit)}>Confirmar</Button>
      </Box>}
    </Box>
  );
}
