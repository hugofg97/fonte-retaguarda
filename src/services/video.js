import api from "../config/api";
import FormData from 'form-data'

const getVideos = async ({ sessionId, page }) => {
  const { data } = await api.get(`/video/${sessionId}?page=${page}`);
  return data;
};
const createVideo = async ({ video },selectedImage) => {
 
  const payload = new FormData();
  console.log(selectedImage, '>>>>>>>>>>>>')
  payload.append('videoThumb', selectedImage);

  payload.append('name', video.name);

  payload.append('sessionId', video.sessionId);

  payload.append('description', video.description);

  payload.append('videoUrl', video.videoUrl);

  payload.append('locked', video.locked);

  const config = { headers: {'Content-Type': 'multipart/form-data'}  };
  const { data } = await api.post(`/video`, payload, config);

  return data;
};
const deleteVideo = async ({ id }) => {
  const { data } = await api.delete(`/video/${id}`);
  return data;
};
const updateVideo = async ({video }) => {
  const { data } = await api.put(`/video`, {...video});
  return data;
};

export default { getVideos,createVideo,deleteVideo,updateVideo };
