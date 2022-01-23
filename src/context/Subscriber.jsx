import React, { createContext, useState } from 'react';
import { findUserByDocument, login } from '../services/subscriber';
import { createCard, signature } from '../services/payment';

const userData = {
  setAddress: () => { },
  userId: '',
  setUserId: () => { },
  cardId: '',
  setCardId: () => { },
  card: '',
  setCard: () => { },
  updateUserData: () => { },
  getUser: async () => { },
  saveCard: async () => { },
  createSignature: async () => { },
  setUser: () => {},
  setMsgError: () => {},
  setSuccessSignature: () => {},
  successSignature: false,
  successSaveCard: false,
  setSuccessSaveCard: () => {},
  msgError: '',
  user: {},
  auth: () => {}
};

const SubscriberContext = createContext(userData);

export const SubscriberProvider = ({ children }) => {

  const [card, setCard] = useState({
    number: '',
    holderName: '',
    holderDocument: '',
    expMonth: '',
    expYear: '',
    cvv: '',
    brand: '',
  });
  const [msgError, setMsgError] = useState('');
  const [successSignature, setSuccessSignature] = useState(false);
  const [successSaveCard, setSuccessSaveCard] = useState(false);
  const [cardId, setCardId] = useState('');
  const [userId, setUserId] = useState('');
  const [user, setUser] = useState({});

  const getUser = async () => {
    try {
      const data = await findUserByDocument(localStorage.getItem("DOC"));
      const {idPg,  cards } = data;
      if (cards) setCardId(cards);
      setUserId(idPg);
      setUser(data)
      return data;
    } catch (error) {
      console.log(error)
      setMsgError(error.response.data.message)
    }
  }

  const auth = async ({email, password}) => {
    try {

      const data = await login({email, password});
      const { token,idPg, signature,  cards,document} = data;
      console.log(token);
      if(token)  {
        localStorage.setItem("TOKEN", token);
        localStorage.setItem("DOC", document);
      }
      if(idPg && signature && cards && document) {
        setUser(data)
      }

    } catch (error) {
      setMsgError('Login inválido, tente novamente');

    }
  }
  const saveCard = async (payload) => {
    try {
      const { card} = payload;
      setSuccessSaveCard(false);
      await createCard({card:card, document: localStorage.getItem("DOC"), idPg: user?.idPg});
      setSuccessSaveCard(true);
    } catch (error) {
      console.log("FOI ERRO PORRA")
      setMsgError('Houve um problema com seu cartão, verifique novamente os dados do seu cartão, ou tente um cartão diferente');

    }
  }
  const createSignature = async () => {
    try {
      setSuccessSignature(false);
      await signature({ document: localStorage.getItem("DOC")})
      setSuccessSignature(true);
    } catch (error) {
      console.log(error.response.data.message)
      setMsgError('Houve um problema com sua assinatura, verifique novamente os dados, erro : '+error.response.data.message);
    }
  }

  return (
    <SubscriberContext.Provider
      value={{
        card,
        cardId,
        userId,
        user,
        auth,
        msgError,
        successSaveCard,
        successSignature,
        createSignature,
        setSuccessSignature,
        setSuccessSaveCard,
        saveCard,
        setMsgError,
        setUser,
        getUser,
        setCard,
        setCardId,
        setUserId
      }}
    >
      {children}
    </SubscriberContext.Provider>
  );
};

export default SubscriberContext;
