import axiosConfig from "@/services/axios.config"

export const fetchRequestTelegramQRCode = () => {
  return axiosConfig.post("telegram/request/")
}
export const fetchConfirmTelegramOtp = (body) => {
  return axiosConfig.post("telegram/confirm/", body)
}
export const fetchUnlinkTelegram = (body) => {
  return axiosConfig.post("telegram/unlink/", body)
}
