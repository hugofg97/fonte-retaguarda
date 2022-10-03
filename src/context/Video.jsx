import React, { createContext, useState } from "react";

import videoService from "../services/video";


const userData = {
  createNewVideo: async () => {},
  updateVideo: async () => {},
  getVideos: async () => {},
  setSessions: () => {},
  deleteVideo: async () => {},
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

const VideoContext = createContext(userData);

export const VideoProvider = ({ children }) => {
  const [sessions, setSessions] = useState([]);
  const [msgError, setMsgError] = useState("");
  const [pageState, setPageState] = useState({
    isLoading: false,
    data: [],
    total:0,
    page: 0,
    pageSize: 10
  })


  const getVideos = async (sessionId) => {
    try {
      setPageState(old => ({...old, isLoading: true}))

      const videos = await videoService.getVideos({sessionId, page:pageState.page + 1});
  
      setPageState(old => ({...old,isLoading: false, total:videos.count, data:videos.data}));
      
      return  videos;
    } catch (error) {
      // setMsgError("Nome inválido ou já existente")
    }
  };

  const createNewVideo = async ({video, sessionId, selectedImage}) => {
    try {
      setMsgError("");
       await videoService.createVideo({video: {...video,sessionId: parseInt(sessionId)}}, selectedImage);
   
    } catch (error) {
      setMsgError("Nome inválido ou já existente")

    }
  };

  const updateVideo = async ({video, sessionId}) => {
    try {
      setMsgError("");
       await videoService.updateVideo({video: {...video,sessionId: parseInt(sessionId)}});
   
    } catch (error) {
      setMsgError("Nome inválido ou já existente")

    }
  };

  const deleteVideo = async ({id}) => {
    try {
      setMsgError("");
       await videoService.deleteVideo({id});
   
    } catch (error) {
      setMsgError("Nome inválido ou já existente")

    }
  };


  

  return (
    <VideoContext.Provider
      value={{
        getVideos,
        createNewVideo,
        deleteVideo,
        setSessions,
        setPageState,
        updateVideo,
        setMsgError,
        pageState,
        msgError,
        sessions
      }}
    >
      {children}
    </VideoContext.Provider>
  );
};

export default VideoContext;
