import { dispatchNotify } from "@/utils/notify"
import { fetchGetModerationNewsList } from "../services/news.service"
import { COLOR_TYPES } from "@/enums"
import { ref } from "vue"

export const useModerationNewsList = () => {

 const headers = ref([
   {
     header: "image",
     field: "image",
     class: "w-[60px]",
     active: true,
   },
   {
     header: "news-title",
     field: "title",
     class: "!w-[50%]",
     active: true
   },
   {
      header: "author",
      field: "author",
      active:true
   },
   {
     header: "status",
     field: "status",
     active: true
   },
   {
     header: "date",
     field: "created_date",
     active: true
   },
 ])

 const loading = ref(false)
 const list = ref([])
 const totalCount = ref(0)
 
 const getModerationNewsList = async (params) => {
  loading.value = true
  try {
   const { data }  = await fetchGetModerationNewsList(params)
   list.value = data.results
   totalCount.value = data.count
  } catch (error) {
    dispatchNotify(null, error, COLOR_TYPES.ERROR)
  }
  finally {
   loading.value = false
  }
 }


 return { headers, loading, list, totalCount, getModerationNewsList }
}