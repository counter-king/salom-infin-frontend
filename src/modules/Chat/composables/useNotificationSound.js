import { ref } from "vue";

export default function useNotificationSound() {
    const audio = ref(new Audio("/sounds/notification.mp3"));

    const playNotificationSound = () => {
        // If the audio is currently playing, pause it and rewind
        if (!audio.value.paused) {
            audio.value.pause();
            audio.value.currentTime = 0;
        }

        audio.value.play().catch(e => {
            console.log("Audio play failed:", e);
        });
    };

    return {
        playNotificationSound
    };
}