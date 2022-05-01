import React, { createContext, useState } from "react";
import {
  findUserByDocument,
  findSignatureByUserDocument,
  login,
  getUserCardsByCustomer,
} from "../services/subscriber";
import {
  deleteCardByCustomer,
  createCard,
  updateBillingCard,
  saveSignature,
  cancelSignature,
} from "../services/payment";

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

  const getUser = async () => {
    try {
      const data = await findUserByDocument();
      const { idPg, cards } = data?.personalData;
      if (cards) setCardId(cards);
      setUserId(idPg);
      setUser(data);
      return data;
    } catch (error) {
      console.log(error);
      setMsgError(error.response.data.message);
    }
  };
  const getSignature = async () => {
    try {
      const data = await findSignatureByUserDocument(
        localStorage.getItem("DOC")
      );
      setSignature(data);
      const cards = await getUserCardsByCustomer(localStorage.getItem("DOC"));
      setUserCards(cards);
      return data;
    } catch (error) {
      console.log(error);
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
  const saveCard = async ({ card }) => {
    try {
      setSuccessSaveCard(false);
      await createCard({
        card: card,
        document: localStorage.getItem("DOC"),
        idPg: localStorage.getItem("IDPG"),
      });
      setSuccessSaveCard(true);
      setCard({
        number: "",
        holderName: "",
        holderDocument: "",
        expMonth: "",
        expYear: "",
        cvv: "",
        brand: "",
      })
    } catch (error) {
      console.log("FOI ERRO PORRA");
      setMsgError(
        "Houve um problema com seu cartão, verifique novamente os dados do seu cartão, ou tente um cartão diferente"
      );
    }
  };
  const updateCard = async (payload) => {
    try {
      const { cardId } = payload;
      setSuccessSaveCard(false);
      await updateBillingCard({
        cardId
      });
      setSuccessSaveCard(true);
    } catch (error) {
      console.log("FOI ERRO PORRA");
      setMsgError(
        "Houve um problema com seu cartão, verifique novamente os dados do seu cartão, ou tente um cartão diferente"
      );
    }
  };
  const createSignature = async () => {
    try {
      setSuccessSignature(false);
      await saveSignature({ document: localStorage.getItem("DOC") });
      setSuccessSignature(true);
    } catch (error) {
      console.log(error.response.data.message);
      setMsgError(
        "Houve um problema com sua assinatura, verifique novamente os dados, erro : " +
          error.response.data.message
      );
    }
  };
  const cancelSubscribtion = async () => {
    try {
      setSuccessSignature(false);
      await cancelSignature({ document: localStorage.getItem("DOC") });
      setSuccessSignature(true);
    } catch (error) {
      console.log(error.response.data.message);
      setMsgError(
        "Houve um problema com sua assinatura, verifique novamente os dados, erro : " +
          error.response.data.message
      );
    }
  };
  const deleteCard = async (cardId) => {
    try {
      setSuccessDeleteCard(false);
      await deleteCardByCustomer(cardId);
      setSuccessDeleteCard(true);
    } catch (error) {
      console.log(error?.response?.data?.message);
      setMsgError(
        "Houve um problema com sua assinatura, verifique novamente os dados, erro : " +
          error?.response?.data?.message
      );
    }
  };

  return (
    <SubscriberContext.Provider
      value={{
        deleteCard,
        userCards,
        card,
        cardId,
        billingDate,
        setBillingDate,
        userId,
        user,
        auth,
        msgError,
        updateCard,
        successSaveCard,
        successSignature,
        createSignature,
        setSuccessSignature,
        setSuccessDeleteCard,
        successDeleteCard,
        setSuccessSaveCard,
        saveCard,
        setMsgError,
        setUser,
        getUser,
        setCard,
        setCardId,
        setUserId,
        getSignature,
        signature,
        setSignature,
        cancelSubscribtion,
      }}
    >
      {children}
    </SubscriberContext.Provider>
  );
};

export default SubscriberContext;
