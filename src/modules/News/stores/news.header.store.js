import { defineStore } from "pinia";

export const useNewsHeaderStore = defineStore('newsHeaderStore', {
    state: ()=> ({
       header:[
        {
         link: "NewsList",
         title: "all-news",
         roles: ['user'],
         count: null
        },
        {
         link: "MyNewsList",
         title: "my-posts",
         roles: ['user'],
         count: null
        },
        {
         link: "NewsModerationList",
         title: "for-moderation",
         roles: ['moderator'],
         count: null
        },
       ]
    }),
})
