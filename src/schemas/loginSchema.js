import * as yup from 'yup';

const loginSchema = yup.object().shape({
  email: yup.string().email('Email inválido').required('Obrigatório'),
  password: yup.string().required('Obrigatório').min(6, 'Mínimo de 6 caracteres'),
  
});


export { loginSchema };
