// core
import { ref } from "vue"
// services
import { fetchGetNewsCategoryList } from "../services/news.service"

export const useCategoryList = () => {
 // reactive
 const list = ref([])
 const loading = ref(false)
 const hasMoreLoading = ref(false)
 const hasNext = ref(false)
 const page = ref(1)

 // methods
 const handleScrollCategory = (event) => {
  const bottom = event.target.scrollHeight - Math.floor(event.target.scrollTop) <= event.target.clientHeight + 1
  if (bottom && hasNext.value) {    
    page.value += 1
    getCategoryList(page.value, false)
  }
 }

 const getCategoryList = async(currentPage, resetList) => {
   const page_size = 200

   if(resetList){
      if (loading.value) return
      loading.value = true
   } else {
      if(hasMoreLoading.value) return
      hasMoreLoading.value = true
   }

   try {
     const { data }  = await fetchGetNewsCategoryList({page: page.value, page_size})
     hasNext.value = data.count > currentPage * page_size

     if(resetList){
      list.value = data.results
     } else {
      list.value = [...list.value, ...data.results]
     }
     page.value = currentPage
    }

    finally{
      loading.value = false
      hasMoreLoading.value = false
    }
 }

 const initCategoryList = async () => {
  await getCategoryList(1, true)
}


 return {
  loading,
  hasMoreLoading,
  list,
  getCategoryList,
  initCategoryList,
  handleScrollCategory
 }

}