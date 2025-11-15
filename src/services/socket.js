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

let socketInstance = null
export const socket = ()=> {
  const isToken = getStorageItem(ACCESS)
  if(!isToken) {
    return {
      send: () => {},
      data: ()=> {},
    }
  }

  if(!socketInstance ) {
    socketInstance = useWebSocket(`wss://${baseURL}/ws/?token=${getStorageItem(ACCESS)}`, {
      autoReconnect: {
        retries: 3,
        delay:500,
        onFailed(err) {
          dispatchNotify(null, `socket error happened ${err}`, COLOR_TYPES.ERROR)
        },
      },
      onError(ws) {

      // WebSocket holatini tekshirish
      let errorMessage = 'socket error: WebSocket connection error'

      if (ws.readyState === 3) {
        errorMessage = 'socket error: Server bilan connection uzildi'
      } else if (ws.readyState === 2) {
        errorMessage = 'socket error: connection uzilmoqda'
      } else if (ws.readyState === 0) {
        errorMessage = 'socket error: connection o\'rnatilmoqda'
      }

        dispatchNotify(null, errorMessage, COLOR_TYPES.ERROR);
      },
    })
  }
  return socketInstance
}

// send ping event to server, to check connection and keep alive
const sendPingEvent = () => {
  const socketInstance = socket() // Singletonni olish
    socketInstance.send(JSON.stringify({ command: 'ping' }))
}

const RECONNECT_INTERVAL = 5000
setInterval(sendPingEvent, RECONNECT_INTERVAL)
