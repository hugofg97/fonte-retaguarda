import * as yup from 'yup';

const addressSchema = yup.object().shape({
    street: yup.string(),
    zip_code: yup.string().required('Obrigatório').min(9, 'Mínimo de 9 caracteres').max(9, 'Máximo 9 caracteres'),
    neighborhood: yup.string(),
    number: yup.string('Número inválido').required('Obrigatório').min(1, 'Mínimo de 1 caracteres'),
    city: yup.string('Data inválida'),
    state: yup.string(),
    // country: yup.string().required('Obrigatório').min(2, 'Mínimo de 2 caracteres').max(2,'Máximo 2 caracteres'),
  
});


export { addressSchema };
