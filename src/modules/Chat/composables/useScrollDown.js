// useInfiniteScroll.js
import { ref, onMounted, onUnmounted } from 'vue'

export function useInfiniteScroll(apiUrl = 'https://api.example.com/items', params) {
  const items = ref([])
  const loading = ref(false)
  const error = ref(null)
  const page = ref(1)
  const hasMore = ref(true)
  const scrollContainer = ref(null)
  
  // API so'rovini yuborish va ma'lumotlarni olish
  const fetchData = async () => {
    // Agar loading bo'lsa yoki yana ma'lumot bo'lmasa - to'xtatish
    if (loading.value || !hasMore.value) return
    
    loading.value = true
    
    try {
      const response = await axiosConfig.get(apiUrl, params)
      
      if (!response.ok) {
        throw new Error('API so\'rovida xatolik')
      }
      
      const data = await response.json()
      
      // Yangi ma'lumotlarni qo'shish
      items.value = [...items.value, ...data.items]
      
      // Keyingi sahifaga o'tish
      page.value++
      
      // Agar API dan kelgan ma'lumotlar soni limitdan kam bo'lsa, demak boshqa ma'lumot yo'q
      hasMore.value = data.items.length > 0
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }
  
  // Scroll hodisasi handler
  let isScrolling = false
  
  const handleScroll = () => {
    if (isScrolling || !scrollContainer.value) return
    
    const container = scrollContainer.value
    const scrolledToBottom = 
      container.scrollTop + container.clientHeight >= 
      container.scrollHeight - 5
    
    if (scrolledToBottom) {
      isScrolling = true
      
      // Keyingi frame'da fetchData'ni chaqirish va flag'ni qayta o'rnatish
      requestAnimationFrame(() => {
        fetchData().finally(() => {
          isScrolling = false
        })
      })
    }
  }
  
  // Container elementini o'rnatish
  const setScrollContainer = (el) => {
    if (el) {
      scrollContainer.value = el
      scrollContainer.value.addEventListener('scroll', handleScroll)
    }
  }
  
  // Component yo'q qilinganda event listener'ni o'chirish
  onUnmounted(() => {
    if (scrollContainer.value) {
      scrollContainer.value.removeEventListener('scroll', handleScroll)
    }
  })
  
  // Ma'lumotlarni qayta yuklash
  const refresh = () => {
    items.value = []
    page.value = 1
    hasMore.value = true
    fetchData()
  }
  
  return {
    items,
    loading,
    error,
    hasMore,
    fetchData,
    refresh,
    setScrollContainer
  }
}