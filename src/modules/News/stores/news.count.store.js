import { defineStore } from "pinia";
import { fetchGetNewsPendingCount } from "../services/news.service";
import { useNewsHeaderStore } from "./news.header.store";


export const useNewsCountStore = defineStore('newsCountStore', {
    state: ()=> ({}),
    actions: {
        async actionGetNewsPandingCountList(){
         const {data} = await fetchGetNewsPendingCount({status: 'pending'})
         this.setNewsHeaderCount(data.count)
        },
        
        setNewsHeaderCount(count){
            const newsHeaderStore = useNewsHeaderStore()
            const moderationHeader = newsHeaderStore.header.find(item => item.title === 'for-moderation')
            moderationHeader.count = count
        }
    }
})
