import { io } from 'socket.io-client';
import { computed } from 'vue';

const url = process.env.NODE_ENV === 'development' || window.location.host === 'app.itco.uz' || window.location.host === 'new-side-project.vercel.app' ? import.meta.env.VITE_BASE_TEST_URL : import.meta.env.VITE_BASE_PROD_URL;

export const socket = computed(() => io(url));

