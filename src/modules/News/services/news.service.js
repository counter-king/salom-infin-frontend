import axiosConfig from "@/services/axios.config";

const URLS = {
    news:"news",
    newsCategories: "news-categories",
    newsTags: "news-tags",
    newsLikes: "news-likes",
    newsComments: "news-comments",
    newsPending: "news/pending-news",
    myNews: "news/my-news"
}


// create a news
export const fetchCreateNews = (params) => {
    return axiosConfig.post(`${URLS.news}/`, params)
}

// get news list
export const fetchGetNewsList = (params) => {
    return axiosConfig.get(`${URLS.news}/`, { page_size: 20, ...params })
}

// update news
export const fetchUpdateNews = (id, params) => {
    return axiosConfig.put(`${URLS.news}/${id}`, params)
}

// delete news
export const fetchDeleteNews = (id) => {
    return axiosConfig.delete(`${URLS.news}/${id}`)
}
// get one news
export const fetchGetNews = (id) => {
    return axiosConfig.get(`${URLS.news}/${id}`)
}

// get news list for moderation
export const fetchGetModerationNewsList = (params) => {
    return axiosConfig.get(`${URLS.newsPending}/`, { page_size: 20, ...params })
}

// get my news list 
export const fetchGetMyNewsList = (params) => {
    return axiosConfig.get(`${URLS.myNews}/`, { page_size: 20, ...params })
}

// get news-catefory
export const fetchGetNewsCategoryList = (params) => {
    return axiosConfig.get(`${URLS.newsCategories}/`, { page_size: 200, ...params})
}

// get news-tags
export const fetchGetNewsTagsList = (params) => {
    return axiosConfig.get(`${URLS.newsTags}/`, params)
}


// news-like-create 
export const fetchCreateNewsLike = (params) => {
    return axiosConfig.post(`${URLS.newsLikes}/`, params)
}

// create news-comments
export const fetchCreateNewsComment = (params) => {
    return axiosConfig.post(`${URLS.newsComments}/`, params)
}

// get news-comments-list
export const fetchGetNewsCommentList = (params) => {
    return axiosConfig.get(`${URLS.newsComments}/`, params)
}
