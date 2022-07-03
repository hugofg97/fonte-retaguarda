import api from "../config/api";

const createCard = async ({ card }) => {
  const { data } = await api.post(`/subscriber/card`, {
    card
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
