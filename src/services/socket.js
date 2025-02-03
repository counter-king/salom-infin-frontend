import { ACCESS } from '@/constants/storage';
import { getStorageItem } from '@/utils/storage';
import { io } from 'socket.io-client';

const url = process.env.NODE_ENV === 'development' || window.location.host === 'app.itco.uz' || window.location.host === 'new-side-project.vercel.app' ? import.meta.env.VITE_BASE_TEST_URL : import.meta.env.VITE_BASE_PROD_URL;

export const socket = io(url,{
 reconnection: true, 
 reconnectionAttempts: 5,
 autoConnect: false
});

