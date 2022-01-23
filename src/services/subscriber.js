import api from '../config/api';
import axios from 'axios';
export const searchCep = async (cep) => {
const { data } = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
if(data) return data;
else return {};
}
export const createAddress = async (payload, doc) => {
    const { data } = await api.post(`/subscriber/address/${doc}`, {
        "idPg":"cus_l7vdj7KcJQHNjpQE",
        "number": payload?.number, 
        "street": payload?.street, 
        "neighborhood": payload?.neighborhood,
        "complement": "8º andar",
        "zipCode": payload?.zip_code,
        "city": payload?.city,
        "state": payload?.state,
        "country": "BR"
      });
    return data;
}
export const findUserByDocument = async (doc) => {
    console.log(doc)
    const { data } = await api.get(`/subscriber/find/${doc}`);
    return data.data;
}
export const login = async ({email,password}) => {
const { data } = await api.post('/subscriber/login', {email,password});

return data.data;
}