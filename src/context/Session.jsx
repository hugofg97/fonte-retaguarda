import React, { createContext, useState } from "react";

import sessionService from "../services/session";


const userData = {
  createNewSession: async () => {},
  getSessionsReiki: async (categoryId) => {},
  setSessions: () => {},
  deleteSession: async () => {},
  sessions:[],
  msgError: "",
  setMsgError: () => {},
  updateSession: async() => {},
  pageState: {
    isLoading: false,
    data: [],
    total:0,
    page: 0,
    pageSize: 10
  },
  setPageState: () => {},

};

const SessionContext = createContext(userData);

export const SessionProvider = ({ children }) => {
  const [sessions, setSessions] = useState([]);
  const [msgError, setMsgError] = useState("");
  const [pageState, setPageState] = useState({
    isLoading: false,
    data: [],
    total:0,
    page: 0,
    pageSize: 10
  })


  const getSessionsReiki = async (categoryId) => {
    try {
      setPageState(old => ({...old, isLoading: true}))

      const session = await sessionService.getSessions({categoryId: categoryId.toUpperCase(), page:pageState.page + 1});
  
      setPageState(old => ({...old,isLoading: false, total:session.count, data:session.data}));
      
      return  session;
    } catch (error) {
      // setMsgError("Nome inválido ou já existente")
    }
  };
  const createNewSession = async ({session}) => {
    try {
      setMsgError("");
       await sessionService.createSession({session:{sessionCategoryId: 'REIKI',...session}});
   
    } catch (error) {
      setMsgError("Nome inválido ou já existente")

    }
  };
  const deleteSession = async ({id}) => {
    try {
      setMsgError("");
       await sessionService.deleteSession({id});
   
    } catch (error) {
      setMsgError("Nome inválido ou já existente")

    }
  };
  const updateSession = async ({session}) => {
    try {
      setMsgError("");
       await sessionService.updateSession({session});
   
    } catch (error) {
      setMsgError("Nome inválido ou já existente")

    }
  };

  

  return (
    <SessionContext.Provider
      value={{
        getSessionsReiki,
        updateSession,
        createNewSession,
        deleteSession,
        setSessions,
        setPageState,
        setMsgError,
        pageState,
        msgError,
        sessions
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export default SessionContext;
