import api from '../config/api';

const createCard = async ({ address, card, document, idPg }) => {
    
       
        const {data} = await api.post(`/subscriber/card/${document}`, {
            ...card,
            label:'renner',
            idPg: idPg,
            address,
            options: {
                "verify_card": true
            }

        });
        console.log('__________',data.data);
        return data;
 
}
const signature = async ({ password, document}) => {
    try {
       
        const {data} = await api.post(`/subscriber/signature/${document}`, {password: password});
        console.log('__________',data.data);
        return data;
    } catch (err) {
        console.log(err)
    }
}

export {createCard, signature};