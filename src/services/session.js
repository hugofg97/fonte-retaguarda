import api from "../config/api";

const getSessions = async ({ categoryId, page }) => {
  const { data } = await api.get(`/session/${categoryId}?page=${page}`);
  return data;
};
const createSession = async ({ session }) => {
  const { data } = await api.post(`/session`, {...session});
  return data;
};
const deleteSession = async ({ id }) => {
  const { data } = await api.delete(`/session/${id}`);
  return data;
};
const updateSession = async ({session }) => {
  const { data } = await api.put(`/session`, {...session});
  return data;
};

export default { getSessions,createSession,deleteSession,updateSession };
