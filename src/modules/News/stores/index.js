import { defineStore } from "pinia";
import { helpers, required } from "@vuelidate/validators";
import { fetchGetNewsCategoryList, fetchGetNewsTagsList } from "../services/news.service";
import { CONTENT_TYPES } from "../constants";

const defaultModel = {
    title: null,
    description: "",
    category: null,
    image: null,
    dynamicFields: [{ type:CONTENT_TYPES.TEXT, value: "" }], 
    tags_ids:[],
    images_ids: [],
}
export const useNewsStore = defineStore('newsStore', {
    state: ()=> ({
    // form model
    model: {
        ...defaultModel
    },
    // form rules
    rules: {
        category: {
            required: helpers.withMessage(`Поле не должен быть пустым`, required)
        },
        title: {
            required: helpers.withMessage(`Поле не должен быть пустым`, required)
        },
        description: {
            required: helpers.withMessage(`Поле не должен быть пустым`, required)
        },
        image: {
            required: helpers.withMessage(`Поле не должен быть пустым`, required)
        },
        tags_ids : {
             required:  false
        }
    },
    categoryList: [],
    categoryListLoading: false ,
    tagList: [],
    tagListLoading: false,
    loadingSubmitButton: false,
    }),
    actions: {
        async actionGetCategoryList(){
            this.categoryListLoading = true;
            try{
                const response = await fetchGetNewsCategoryList({page_size: 50});
                this.categoryList = response.data.results;
            }
            catch(e){}
            finally{
                this.categoryListLoading = false;
            }
        },
        async actionGetTagList(params){
            this.tagListLoading = true;
            try{
                const response = await fetchGetNewsTagsList(params);
                this.tagList = response.data.results;
            }
            catch(e){}
            finally{
                this.tagListLoading = false;
            }
        },
        restStore() {
            this.model = {
               ...defaultModel,
               dynamicFields: [{ type:CONTENT_TYPES.TEXT, value: "" }]
            }
        }
    }
})
