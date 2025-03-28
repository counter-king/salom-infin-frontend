import { ref } from "vue";

export default function useNotificationSound() {
    const audio = ref(null);
    const isPlaying = ref(false);
    
    const initSound = () => {
        audio.value = new Audio("/sounds/notification.mp3");
        audio.value.preload = "auto";
        audio.value.onended = () => {
            isPlaying.value = false;
        };
    };
    
    const playNotificationSound = () => {
        // Initialize if not already done
        if (!audio.value) {
            initSound();
        }
        
        // If currently playing, stop and rewind
        if (isPlaying.value) {
            audio.value.pause();
            audio.value.currentTime = 0;
        }
        
        // Play the sound
        isPlaying.value = true;
        audio.value.play()
            .catch(e => {
                isPlaying.value = false;
                console.error("Audio play failed:", e);
                
                // Try reinitializing if failed
                initSound();
                audio.value.play().catch(e => console.error("Retry failed:", e));
            });
    };
    
    return {
        playNotificationSound
    };
}