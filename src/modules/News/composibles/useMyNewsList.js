// core
import { ref } from "vue"
// utiles
import { dispatchNotify } from "@/utils/notify"
// services
import { fetchGetMyNewsList } from "../services/news.service"
// constants
import { fetchBlobFile } from "../../../services/file.service"
import { COLOR_TYPES } from "@/enums"

export const useMyNewsList = () => {

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
     class: "!w-1/2",
     active: true
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
   {
    header: "actions",
    field: "actions",
    class: "w-[130px]",
    active: true
  }
 ])

 const loading = ref(false)
 const list = ref([])
 const totalCount = ref(0)
 
 const getMyNewsList = async (params) => {
  loading.value = true
  try {
   const { data }  = await fetchGetMyNewsList(params)
   list.value = await Promise.all(data.results?.map(async(item) => {
    const { blobUrl } = await fetchBlobFile(item.image.id)
    item.image.blobUrl = blobUrl
    return item
   }))
   totalCount.value = data.count
  } catch (error) {
    dispatchNotify(null, error, COLOR_TYPES.ERROR)
  }
  finally {
   loading.value = false
  }
 }


 return { headers, loading, list, totalCount, getMyNewsList }
}