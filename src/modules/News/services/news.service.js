import axiosConfig from "@/services/axios.config";


const URLS = {
    news:"news",
    newsCategories: "news-categories",
    newsTags: "news-tags"
}


// create a news
export const fetchCreateNews = (params) => {
    return axiosConfig.post(`${URLS.news}/`, params)
}

// get news list
export const fetchGetNewsList = (params) => {
    return axiosConfig.get(`${URLS.news}/`, { ...params, page_size: 10 })
}

// get one news
export const fetchGetNews = (id) => {
    return axiosConfig.get(`${URLS.news}/${id}`)
}

// get news-catefory
export const fetchGetNewsCategoryList = (params) => {
    return axiosConfig.get(`${URLS.newsCategories}/`, params)
}

// get news-tags
export const fetchGetNewsTagsList = (params) => {
    return axiosConfig.get(`${URLS.newsTags}/`, params)
}