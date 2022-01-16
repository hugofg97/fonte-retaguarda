import React, { createContext, useState } from 'react';
import { findUserByDocument, createAddress } from '../services/subscriber';
import { createCard } from '../services/payment';

const userData = {
  address: {
    city: '',
    state: '',
    number: '',
    neighborhood: '',
    street: '',
    country: 'BR',
    zip_code: ''

  },
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
  saveAddress: async () => { },
  setUser: () => {},
  setMsgError: () => {},
  setSuccessSaveAddress: () => {},
  successSaveAddress: false,
  successSaveCard: false,
  setSuccessSaveCard: () => {},
  msgError: '',
  user: {},
};

const SubscriberContext = createContext(userData);

export const SubscriberProvider = ({ children }) => {
  const [address, setAddress] = useState({
    city: '',
    state: '',
    number: '',
    neighborhood: '',
    street: '',
    country: 'BR',
    zip_code: ''
  });
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
  const [successSaveAddress, setSuccessSaveAddress] = useState(false);
  const [successSaveCard, setSuccessSaveCard] = useState(false);
  const [cardId, setCardId] = useState('');
  const [userId, setUserId] = useState('');
  const [user, setUser] = useState({});

  const getUser = async (document) => {
    try {
      const { data } = await findUserByDocument(document);
      const { idPg, address, cards } = data;
      if (address) setUserId(idPg);
      if (cards) setCardId(cards);
      setUser(data);
    } catch (error) {
      setMsgError(error.response.data.message)
    }
  }
  const saveAddress = async ({address,id}) => {
    try {
      setSuccessSaveAddress(false);
      await createAddress(address, id);
      setSuccessSaveAddress(true);
    } catch (error) {
      setMsgError(error.response.data.message)
    }
  }
  const saveCard = async (payload) => {
    try {
      setSuccessSaveCard(false);
      await createCard(payload);
      setSuccessSaveCard(true);
    } catch (error) {
      setMsgError(error.response.data.message)
    }
  }

  return (
    <SubscriberContext.Provider
      value={{
        address,
        card,
        cardId,
        userId,
        user,
        msgError,
        successSaveCard,
        successSaveAddress,
        saveAddress,
        setSuccessSaveAddress,
        setSuccessSaveCard,
        saveCard,
        setMsgError,
        setUser,
        setAddress,
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
