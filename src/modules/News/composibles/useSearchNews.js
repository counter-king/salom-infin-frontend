import { useDebounce } from "@vueuse/core"
import { computed } from "vue"
import { useRoute } from "vue-router"

export const useSearchNews = () => {
 
 const route = useRoute()
 const searchQuery = computed(() => route.query.search)
 let debouncedSearchQuery = useDebounce(searchQuery, 750)

 return {
  searchQuery,
  debouncedSearchQuery
 }
}