import api from "../config/api";

const createCard = async ({ card, document, idPg }) => {
  const { data } = await api.post(`/subscriber/card`, {
    ...card,
    label: "renner",
    idPg: idPg,
    address: {
      city: "Fonte",
      state: "RK",
      number: "01",
      neighborhood: "Paz",
      street: "Caminho da felicidade",
      country: "BR",
      zip_code: "04103030",
    },
    options: {
      verify_card: true,
    },
  });
  return data;
};
const updateBillingCard = async ({ cardId }) => {
  const { data } = await api.patch(`/subscriber/card`, { cardId });
  return data;
};
const deleteCardByCustomer = async (cardId) => {
  const { data } = await api.delete(`/subscriber/card/${cardId}`);
  return data;
};

const saveSignature = async () => {
  const { data } = await api.post(`/subscriber/signature`);
  return data;
};

const cancelSignature = async () => {
  const { data } = await api.delete(`/subscriber/signature`);
  return data;
};
export { createCard, updateBillingCard, saveSignature,deleteCardByCustomer, cancelSignature };
