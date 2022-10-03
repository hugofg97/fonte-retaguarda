import * as yup from 'yup';

const newVideoSchema = yup.object().shape({
  name: yup.string().required('Obrigatório').min(4, 'Mínimo de 4 caracteres'),
  description: yup.string().required('Obrigatório').min(8, 'Mínimo de 8 caracteres'),
  videoUrl: yup.string().required('Obrigatório').min(20, 'Mínimo de 8 caracteres'),
  // videoThumb: yup.string().required('Obrigatório').min(20, 'Mínimo de 8 caracteres'),
});



export { newVideoSchema };
