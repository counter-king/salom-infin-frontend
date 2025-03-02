// useTextSelection.js
import { ref } from 'vue';

export function useTextSelection() {
  const isSelecting = ref(false);
  let selectionTimeout = null;

  // Matn tanlanish boshlanganida
  const handleSelectStart = () => {
    isSelecting.value = true;
    
    // Agar oldingi vaqt oralig'i mavjud bo'lsa, uni tozalash
    if (selectionTimeout) {
      clearTimeout(selectionTimeout);
    }
  };

  // Click hodisasini boshqarish
  const handleClick = (event) => {
    // Agar matn tanlanayotgan bo'lsa, click hodisasini to'xtatish
    if (isSelecting.value) {
      event.stopPropagation();
      
      // Qisqa vaqt o'tgandan so'ng tanlash holatini qayta o'rnatish
      selectionTimeout = setTimeout(() => {
        isSelecting.value = false;
      }, 300); // 300ms keyinroq tanlash holatini o'chirish
      
    }
};

  // Kerakli funksiya va state'larni qaytarish
  return {
    handleSelectStart,
    handleClick,
  };
}