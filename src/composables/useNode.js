import { ref } from 'vue'
export const useNode = () => {
  // Reactive
  const height = ref(null)
  /**
   * Получить высоту элемента
   * @param { Object } ref Реф ссылка элемента
   */
  const getHeight = (ref) => {
    console.log(ref)
    // height.value = ref.value.scrollHeight
  }

  return {
    getHeight,
    height
  }
}
