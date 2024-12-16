import { ref, computed, watch, onMounted } from 'vue'
import { useDebounce } from '@vueuse/core'

export function useInfiniteQuery(queryFn, {
  initialParams = {},
  debounceTime = 300,
}) {
  const data = ref([])
  const isLoading = ref(false)
  const error = ref(null)
  const page = ref(1)
  const hasNextPage = ref(true)
  const params = ref(initialParams)

  const debouncedParams = computed(() => {
    return Object.fromEntries(
      Object.entries(params.value).map(([key, value]) => [key, useDebounce(value, debounceTime)])
    )
  })

  const fetchData = async (currentPage = 1) => {
    if (!enabled || isLoading.value) return

    isLoading.value = true
    error.value = null

    try {
      const result = await queryFn({ ...debouncedParams.value, page: currentPage })
      
      if (currentPage === 1) {
        data.value = result.data
      } else {
        data.value = [...data.value, ...result.data]
      }

      hasNextPage.value = data.next
      page.value = currentPage
    } catch (e) {
      error.value = e
    } finally {
      isLoading.value = false
    }
  }

  const handleScroll = (event) => {
    const bottom = event.target.scrollHeight >= Math.floor(event.target.scrollTop + event.target.clientHeight);
    if (bottom && hasNextPage.value && !isLoading.value) {
      fetchData(page.value + 1)
    }
  }

  const updateParams = (newParams) => {
    params.value = { ...params.value, ...newParams }
    page.value = 1
    data.value = []
    fetchData(1)
  }

  watch(debouncedParams, () => {
    page.value = 1
    data.value = []
    fetchData(1)
  }, { deep: true })

  onMounted(() => {
    if (enabled) {
      fetchData(1)
    }
  })

  return {
    data,
    isLoading,
    error,
    hasNextPage,
    params,
    updateParams,
    handleScroll,
    refetch: () => fetchData(page.value),
  }
}
