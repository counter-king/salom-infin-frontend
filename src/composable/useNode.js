import { ref } from 'vue'
export const useNode = () => {
  // Reactive
  const height = ref(null)
  /**
   *
   */
  const getHeight = (ref) => {
    console.log(ref)
  }

  return {
    getHeight
  }
}
