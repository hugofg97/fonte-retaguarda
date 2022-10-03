import React, { createContext, useState } from "react";
import axios from 'axios';
import crypto from 'crypto-js'
import {
  findUserByDocument,
  findSignatureByUserDocument,
  login,
  getUserCardsByCustomer,
} from "../services/subscriber";


const userData = {
  setAddress: () => {},
  userId: "",
  setUserId: () => {},
  cardId: "",
  setCardId: () => {},
  billingDate: { expMonth: "", expYear: "" },
  setBillingDate: () => {},
  card: "",
  setCard: () => {},
  cancelSubscribtion: async () => {},
  updateUserData: () => {},
  getUser: async () => {},
  saveCard: async () => {},
  updateCard: async () => {},
  createSignature: async () => {},
  deleteCard: async () => {},
  setUser: () => {},
  getSignature: async () => {},
  updateBillingDateSignature: async () => {},
  signature: {},
  getCardBin: async () => {},
  setSignature: () => {},
  setMsgError: () => {},
  setSuccessSignature: () => {},
  setSuccessDeleteCard: () => {},
  successDeleteCard: () => {},
  successSignature: false,
  successSaveCard: false,
  setSuccessSaveCard: () => {},
  msgError: "",
  user: {},
  userCards: [],
  auth: async () => {},
};
function cipher(data) {
  const pw = process.env.REACT_APP_CRYPTO_KEY;
  return crypto.AES.encrypt(JSON.stringify(data), pw).toString();   
};
function decipher(data) {
  const pw = process.env.REACT_APP_CRYPTO_KEY;
  const bytes  = crypto.AES.decrypt(data,pw);
  const decryptedData = JSON.parse(bytes.toString(crypto.enc.Utf8));
  return decryptedData
  };
const SubscriberContext = createContext(userData);

export const SubscriberProvider = ({ children }) => {
  const [card, setCard] = useState({
    number: "",
    holderName: "",
    holderDocument: "",
    expMonth: "",
    expYear: "",
    cvv: "",
    brand: "",
  });
  const [billingDate, setBillingDate] = useState({
    expMonth: "",
    expYear: "",
  });
  const [msgError, setMsgError] = useState("");
  const [successSignature, setSuccessSignature] = useState(false);
  const [successDeleteCard, setSuccessDeleteCard] = useState(false);
  const [successSaveCard, setSuccessSaveCard] = useState(false);
  const [cardId, setCardId] = useState("");
  const [userId, setUserId] = useState("");
  const [user, setUser] = useState({});
  const [signature, setSignature] = useState({});
  const [userCards, setUserCards] = useState([]);

  const getCardBin = async (number) => {
    try {
      const {data} = await axios.get(`https://api.pagar.me/bin/v1/${number}`, {headers: {
        "Content-Type": "application/json",
        "Authorization": 'Basic '+Buffer.from('sk_test_Z58AQoXcghQe91kb:').toString('base64')
      }});
      return data;
    } catch (error) {
      setMsgError(error.response.data.message);
    }
  };
  const getUser = async () => {
    try {
      const data = await findUserByDocument();
      const { idPg, cards } = data?.personalData;
      if (cards) setCardId(cards);
      setUserId(idPg);
      setUser(data);
      return data;
    } catch (error) {
      setMsgError(error.response.data.message);
    }
  };
  const getSignature = async () => {
    try {
      const data = await findSignatureByUserDocument(
        localStorage.getItem("DOC")
      );
      setSignature(decipher(data));
      const cards = await getUserCardsByCustomer(localStorage.getItem("DOC"));
      setUserCards(cards);
      return decipher(data);
    } catch (error) {
      // setMsgError(error.response.data.message)
    }
  };

  const auth = async ({ email, password }) => {
    try {
      const data = await login({ email, password });
      const { token, idPg, signature, cards, document } = data;
      if (token) {
        localStorage.setItem("IDPG", idPg);
        localStorage.setItem("TOKEN", token);
        localStorage.setItem("DOC", document);
      }
      if (idPg && signature && cards && document) {
        setUser(data);
      }
    } catch (error) {
      setMsgError("Login inválido, tente novamente");
    }
  };




  return (
    <SubscriberContext.Provider
      value={{
        userCards,
        card,
        cardId,
        billingDate,
        setBillingDate,
        userId,
        user,
        auth,
        getCardBin,
        msgError,
        successSaveCard,
        successSignature,  
        setSuccessSignature,
        setSuccessDeleteCard,
        successDeleteCard,
        setSuccessSaveCard,
        setMsgError,
        setUser,
        getUser,
        setCard,
        setCardId,
        setUserId,
        getSignature,
        signature,
        setSignature
      }}
    >
      {children}
    </SubscriberContext.Provider>
  );
};

export default SubscriberContext;
