import { ref, watch, onMounted, onUnmounted} from "vue";

export const useInfiniteScroll = (params, queryFun) => {
  const list = ref([])
  const page = ref(params.page || 1)
  const pageSize = ref(params.page_size || 15)
  const moreLoderRef = ref(null)
  const hasMore = ref(true)
  
  const LoadMore = async () => {
    const response = await queryFun({
      ...params,
      page: page.value,
      page_size: pageSize.value
    }, false)
    list.value = [...list.value, ...response.data.results]
    hasMore.value = response.data.count > page.value * pageSize.value
  }

  const resetList = async (paramsArg = params) => {
    const response = await queryFun({
      ...paramsArg,
      page: 1,
      page_size: pageSize.value
    }, true)
    list.value = response.data.results
    page.value = 1
    hasMore.value = response.data.count > page.value * pageSize.value

  }
// hooks
watch(()=>page.value, () => {
    LoadMore()
})


onMounted(() => {
  const observer = new IntersectionObserver(entries => {
    if(entries[0].isIntersecting){
      page.value++
    }
  })

  if(moreLoderRef.value){
    observer.observe(moreLoderRef.value)
  }
})

onUnmounted(() => {
  if(moreLoderRef.value){
    observer.unobserve(moreLoderRef.value)
  }
})

  return {
    list,
    page,
    pageSize,
    moreLoderRef,
    LoadMore,
    resetList,
    hasMore
  }
}