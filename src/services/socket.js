// cores
import { useWebSocket } from '@vueuse/core'
// constants
import { ACCESS } from '@/constants/storage';
// utils
import { dispatchNotify } from '@/utils/notify';
import { getStorageItem } from '@/utils/storage';
import { COLOR_TYPES } from '@/enums';

const url = process.env.NODE_ENV === 'development' || window.location.host === 'app.itco.uz' || window.location.host === 'new-side-project.vercel.app' ? import.meta.env.VITE_BASE_TEST_URL : import.meta.env.VITE_BASE_PROD_URL;
const baseURL = url.replace(/^https?:\/\//, '').replace(/\/api\/v1\/?/, '');

export const socket = useWebSocket(`wss://${baseURL}/ws/?token=${getStorageItem(ACCESS)}`, {
  autoReconnect: {
    retries: 3,
    heartbeat: {
      message: 'ping',
      interval: 1000,
    },
    onFailed(err) {
      dispatchNotify(null, `error happened ${err}`, COLOR_TYPES.ERROR)
    },
  },
})

const checkAndReconnectWebSocket = ()=> {
  if(socket.status.value == 'CLOSED') {
    console.log('reconnecting...')
    socket.open()
  }
}

const RECONNECT_INTERVAL = 5000
setInterval(checkAndReconnectWebSocket, RECONNECT_INTERVAL)
