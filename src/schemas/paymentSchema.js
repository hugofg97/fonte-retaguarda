import * as yup from 'yup';

const paymentSchema = yup.object().shape({
  number: yup.string().required('Obrigatório').min(9, 'Mínimo de 9 caracteres'),
  holderName: yup.string().required('Obrigatório').min(6, 'Mínimo de 6 caracteres'),
  holderDocument: yup.string().required('Obrigatório').min(11, 'Mínimo de 11 caracteres'),
  expMonth: yup.string('Data inválida').required('Obrigatório').min(1, 'Mínimo de 2 caracteres').max(2, 'Máximo 2 caracteres'),
  expYear: yup.string('Data inválida').required('Obrigatório').min(2, 'Mínimo de 2 caracteres').max(2, 'Máximo 2 caracteres'),
  cvv: yup.string().required('Obrigatório').min(3, 'Mínimo de 3 caracteres'),
  
});



export { paymentSchema };
