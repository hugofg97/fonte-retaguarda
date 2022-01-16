import React, { useEffect, useState } from 'react';
  import { Box, Typography, TextField, Button,CircularProgress,FormControl } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { addressSchema } from '../../schemas/addressSchema';
import { withStyles } from '@material-ui/styles';
import useStyle from './style';
import InputMask from 'react-input-mask';
import SubscriberContext from '../../context/Subscriber';
import { useContext } from 'react';
import { searchCep } from '../../services/subscriber';
import { useParams } from 'react-router-dom';
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
    marginBottom: '5px',
  },
}))(TextField);

export default function Address(props) {
  const { id } = useParams();

  const { address, setAddress, setMsgError,saveAddress, msgError, successSaveAddress } = useContext(SubscriberContext);
  const [enableForm, setEnableForm] = useState(false);
  const [ openModal, setOpenModal ] = useState(false);
  const [ loading, setLoading ] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onBlur', resolver: yupResolver(addressSchema) });
  const paymentClass = useStyle(props);
  const handleChange = (prop) => async (event) => {
    const { value } = event.target;
    setAddress({ ...address, [prop]: value });
    const cep = value.replace(/[^0-9]/g, '');
    if (prop === 'zip_code' && cep.length === 8) {
      const dataAddress = await searchCep(cep);
      if(dataAddress?.erro) {
        setMsgError('Cep informado é inválido');
        return;
      }
      setAddress({
        street: dataAddress?.logradouro,
        neighborhood: dataAddress?.bairro,
        city: dataAddress?.localidade,
        state: dataAddress?.uf,
        zip_code: value
      })
      setEnableForm(true);
    } else if (prop === 'zip_code' && cep.length < 8) {
      setEnableForm(false);
    }
  };

  const { submit } = props;

  const onSubmit = async () => {
    setLoading(true);
    await saveAddress({address, id}).then(_=> setLoading(false));
  }

useEffect(() => {
  if(msgError) setOpenModal(true)
  else setOpenModal(false);
  if(successSaveAddress) submit();
}, [msgError, successSaveAddress])
  return (
    <form onSubmit={handleSubmit(onSubmit)}>

      <Box display="flex" flexDirection="column" padding="10px" marginTop={5}>
        <Typography>Endereço</Typography>

        <Box display="flex" flexDirection="column">
          <FormControl fullWidth>

            <InputMask
              mask="99999-999"
              error={!!errors.zip_code?.message}
              className={paymentClass.inputs}
              helperText={errors.zip_code?.message}
              {...register('zip_code', handleChange('zip_code'))}
              onChange={handleChange('zip_code')}
              value={address?.zip_code}
              type="text"
              id="outlined-error-helper-text"
              label="Cep"
              variant="outlined"
            >
              {(inputProps) => <CustomTextField {...inputProps} />}
            </InputMask>
          </FormControl>
          <FormControl>

            <CustomTextField
              disabled={!enableForm}
              value={address?.street}
              error={!!errors.street?.message}
              className={paymentClass.inputs}
              helperText={errors.street?.message}
              {...register('street', handleChange('street'))}
              onChange={handleChange('street')}
              type="text"
              id="outlined-error-helper-text"
              label="Rua"
              variant="outlined"
            />
          </FormControl>
          <FormControl>
            <CustomTextField
              disabled={!enableForm}
              value={address?.neighborhood}
              error={!!errors.neighborhood?.message}
              className={paymentClass.inputs}
              helperText={errors.neighborhood?.message}
              {...register('neighborhood', handleChange('neighborhood'))}
              onChange={handleChange('neighborhood')}
              type="text"
              id="outlined-error-helper-text"
              label="Bairro"
              variant="outlined"
            />

          </FormControl>
          <FormControl>

            <CustomTextField
              disabled={!enableForm}
              value={address?.number}
              error={!!errors.number?.message}
              className={paymentClass.inputs}
              helperText={errors.number?.message}
              {...register('number', handleChange('number'))}
              onChange={handleChange('number')}
              type="text"
              id="outlined-error-helper-text"
              label="Número"
              variant="outlined"
            />
          </FormControl>
          <FormControl>

            <CustomTextField
              disabled={!enableForm}
              value={address?.city}
              error={!!errors.city?.message}
              className={paymentClass.inputs}
              helperText={errors.city?.message}
              {...register('city', handleChange('city'))}
              onChange={handleChange('city')}
              type="text"
              id="outlined-error-helper-text"
              label="Cidade"
              variant="outlined"
            />
          </FormControl>


          <FormControl>
            <CustomTextField
              disabled={!enableForm}
              mask="aa"
              value={address?.state}
              error={!!errors.state?.message}
              className={paymentClass.inputs}
              helperText={errors.state?.message}
              {...register('state', handleChange('state'))}
              onChange={handleChange('state')}
              type="text"
              id="outlined-error-helper-text"
              label="Estado"
              variant="outlined"
              inputProps={{ maxLength: 2 }} />
          </FormControl>
          <ModalCustom title={msgError?  "Ocorreu um erro" : 'Operação efetuada com sucesso'} message={msgError} open={openModal} deny={{action: () => setMsgError(''), label: 'Fechar'}} setOpen={() => setMsgError('')}/>

         {loading? <Box display="flex" justifyContent="center"><CircularProgress  style={{color: 'green'}}></CircularProgress></Box> : <Button
            className={paymentClass.button}
            variant="outlined" color="primary" type="submit" >Salvar e avançar</Button>}
        </Box>


      </Box>
    </form>
  );
}
