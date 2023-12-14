import axiosConfig from "@/services/axios.config"

const URLS = {
  compose: "compose/1",
}
export const fetchGetDocumentList = (params) => {
  return axiosConfig.get(`${URLS.compose}/`, params);
}
export const fetchCreateDocument = (body) => {
  return axiosConfig.post(`${URLS.compose}/`, body);
}
