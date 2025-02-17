// Core
import axios from 'axios'
// Const
import { ACCESS, LANG } from "@/constants/storage"
import { baseURL } from "@/services/axios.config"
// Utils
import { getStorageItem } from "@/utils/storage"

const URLS = {
  file: 'file'
}
export const fetchBlobFile = async (id) => {
  try {
    const headers = {
      Authorization: getStorageItem(ACCESS) ? 'Bearer ' + getStorageItem(ACCESS) : null,
      Accept: 'application/json',
      "Accept-Language": getStorageItem(LANG)
        ? JSON.parse(getStorageItem(LANG)).value
        : 'uz'
    }

    const response = await axios.get(`${baseURL}${URLS.file}/${id}/`, {
      responseType: 'blob',
      headers: headers
    })

    const blob = new Blob([response.data], { type: response.headers['content-type'] === 'application/octet-stream' ? 'application/pdf' : response.headers['content-type'] })
    const blobUrl = URL.createObjectURL(blob)

    return Promise.resolve({
      blobUrl,
      contentType: response.headers['content-type']
    })
  } catch (err) {
    return Promise.reject(err)
  }
}
