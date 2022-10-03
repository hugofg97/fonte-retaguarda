import * as yup from 'yup';

const newSessionSchema = yup.object().shape({
  name: yup.string().required('Obrigatório').min(4, 'Mínimo de 4 caracteres'),
  description: yup.string().required('Obrigatório').min(8, 'Mínimo de 8 caracteres'),
  
});



export { newSessionSchema };
