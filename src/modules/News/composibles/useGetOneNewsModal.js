// core
import { reactive, ref } from "vue"
// constants
import { CONTENT_TYPES, getMatchFileUploadType } from "../constants"

export const useGetOneNewsModal = () => {

 // reactive
 const loading = ref(false)
 const newsOne = reactive({
  title: null,
  description: "",
  category: null,
  image: null,
  dynamicFields: [{ type:CONTENT_TYPES.TEXT, value: "" }], 
  tags_ids:[],
  images_ids: [],
})

 const getNewsOne = async (actionApi,id) => {
  loading.value = true
    try{
      const { data }  = await actionApi(id)
      const galleriesWithUrlBlob = await Promise.all(data.galleries.map(async(item) => {
        if(!item.url){
          const { blobUrl } = await fetchBlobFile(item.id)
          return { ...item, blobUrl }
        }
        return item
      }))
      
      if(!data.image.url){
        const { blobUrl } = await fetchBlobFile(data.image.id)
        data.image.blobUrl = blobUrl
      }
      data.galleries = galleriesWithUrlBlob
      newsOne.title = data.title    
      newsOne.description = data.description
      newsOne.category = data.category
      newsOne.tags_ids = data.tags
      newsOne.created_by = data.created_by
      newsOne.images_ids = galleriesWithUrlBlob
      newsOne.created_date = data.created_date
      newsOne.image = {...data.image, type:CONTENT_TYPES.IMAGE} 
      newsOne.dynamicFields = data.contents.map(content=> {
        if (content.type === CONTENT_TYPES.TEXT) {
          return { type: CONTENT_TYPES.TEXT, value: content.content,id: content.id }
        } else if (content.type === CONTENT_TYPES.QUOTE) {
          return { type: CONTENT_TYPES.QUOTE, value: content.content, id: content.id }
        } else if ([CONTENT_TYPES.IMAGE,CONTENT_TYPES.AUDIO, CONTENT_TYPES.VIDEO].includes(content.type)) {
          return getMatchFileUploadType(content)
        } 
      })
    } catch(e){
      console.log(e)
    } finally{
      loading.value = false
    }
 }

 return {
  loading,
  newsOne,
  getNewsOne
 }
}