import api from '../config/api';

const createCard = async ({  card, document, idPg }) => {
    
       
        const {data} = await api.post(`/subscriber/card/${document}`, {
            ...card,
            label:'renner',
            idPg: idPg,
            address: {
                city: 'Fonte',
                state: 'RK',
                number: '01',
                neighborhood: 'Paz',
                street: 'Caminho da felicidade',
                country: 'BR',
                zip_code: '04103030'
            },
            options: {
                "verify_card": true
            }

        });
        return data;
 
}







const signature = async ({  document}) => {

       
        const {data} = await api.post(`/subscriber/signature/${document}`);
        console.log('__________',data.data);
        return data;
    
}

export {createCard, signature};