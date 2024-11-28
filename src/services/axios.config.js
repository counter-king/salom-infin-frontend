// Core
import axios from 'axios'
// Stores
import { useAuthStore } from '@/modules/Auth/stores'
// Utils
import { dispatchNotify } from '@/utils/notify'
import { getStorageItem, removeStorageItem } from "@/utils/storage"
import { LANG, ACCESS, REFRESH, EXPIRES, CURRENT_ROUTE } from "@/constants/storage"
import { COLOR_TYPES } from '@/enums'

const baseURL = process.env.NODE_ENV === 'development' || window.location.host === 'new-side-project.vercel.app' ? import.meta.env.VITE_BASE_TEST_URL : import.meta.env.VITE_BASE_PROD_URL;
const axiosParams = { baseURL }
const axiosInstance = axios.create(axiosParams)
const axiosConfig = (axiosInstance) => {
	return {
		get: (url, params) => axiosInstance.get(url, { params }),
		post: (url, body, config) => axiosInstance.post(url, body, config),
		patch: (url, body, config) => axiosInstance.patch(url, body, config),
		put: (url, body, config) => axiosInstance.put(url, body, config),
		delete: (url, config) => axiosInstance.delete(url, config),
	}
}
axiosInstance.interceptors.request.use(
	(config) => {
		config.headers = {
			Authorization: getStorageItem(ACCESS) ? 'Bearer ' + getStorageItem(ACCESS) : null,
			Accept: 'application/json',
      "Accept-Language": getStorageItem(LANG)
        ? JSON.parse(getStorageItem(LANG)).value
        : 'uz'
		}

		return config
	},
	(error) => Promise.reject(error)
);
axiosInstance.interceptors.response.use(
	(response) => {
		if (response.status === 200 || response.status === 201 || response.status === 204) {
      return response
		}
    else {
			throw new Error(response.status.toString())
		}
	},
	async ({ response, config }) => {
    const authStore = useAuthStore()

    if (!navigator.onLine) {
      await waitForInternet()

      return axiosInstance.request(config)
    }
    // Если время токена истек
    if(response.data?.status_code === '401') {
      removeStorageItem(ACCESS)
      removeStorageItem(REFRESH)
      removeStorageItem(EXPIRES)
      removeStorageItem(CURRENT_ROUTE)
      authStore.actionSessionEnd(true)
    }

    if(typeof response.data.message === 'string') {
      console.log("error 123123")
    }

    if (response.status === 500) {
      dispatchNotify(null, response.statusText, COLOR_TYPES.ERROR)
    } else {
      dispatchNotify(null, response.data.message, COLOR_TYPES.ERROR)
    }

		return Promise.reject(response)
	}
)

// Ожидание восстановления интернета
function waitForInternet() {
  return new Promise((resolve) => {
    function onlineHandler() {
      window.removeEventListener('online', onlineHandler)
      resolve()
    }
    window.addEventListener('online', onlineHandler)
  })
}

export default axiosConfig(axiosInstance)
