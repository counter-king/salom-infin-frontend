import axiosConfig from "@/services/axios.config";

const URLS = {
    news:"news",
    newsCategories: "news-categories",
    newsTags: "news-tags",
    newsLikes: "news-likes",
    newsComments: "news-comments",
    newsPending: "moderation-news",
    newsPendingCount: "moderation-news/count",
    myNews: "my-news",
    approve: "approve",
    newsModerationHistory: "news-moderation-history"
}


// create a news
export const fetchCreateMyNews = (params) => {
    return axiosConfig.post(`${URLS.myNews}/`, params)
}

// get news list
export const fetchGetNewsList = (params) => {
    return axiosConfig.get(`${URLS.news}/`, { page_size: 20, ...params })
}

// update news
export const fetchUpdateMyNews = (id, params) => {
    return axiosConfig.put(`${URLS.myNews}/${id}/`, params)
}

// get one news
export const fetchGetNews = (id) => {
    return axiosConfig.get(`${URLS.news}/${id}/`)
}

// get news list for moderation
export const fetchGetModerationNewsList = (params) => {
    return axiosConfig.get(`${URLS.newsPending}/`, { page:1, page_size: 15, ...params })
}

// get my news list
export const fetchGetMyNewsList = (params) => {
    return axiosConfig.get(`${URLS.myNews}/`, { page:1, page_size: 15, ...params })
}

// get my news one
export const fetchGetMyNews = (id)=>{
    return axiosConfig.get(`${URLS.myNews}/${id}/`)
}

// get my news delete one
export const fetchGetMyNewsDelete = (id)=>{
    return axiosConfig.delete(`${URLS.myNews}/${id}/`)
}

// get pending news one
export const fetchGetPendingNews = (id)=>{
    return axiosConfig.get(`${URLS.newsPending}/${id}/`)
}

// get pending news one
export const fetchModerationApproveNews = (id, body)=>{
    return axiosConfig.put(`${URLS.newsPending}/${id}/${URLS.approve}/`, body)
}

// get news-catefory
export const fetchGetNewsCategoryList = (params) => {
    return axiosConfig.get(`${URLS.newsCategories}/`, { page_size: 200, ...params})
}

// get news-tags
export const fetchGetNewsTagsList = (params) => {
    return axiosConfig.get(`${URLS.newsTags}/`, {page_size: 100, ...params})
}

// create news-tags
export const fetchCreateNewsTags = (params) => {
    return axiosConfig.post(`${URLS.newsTags}/`, params)
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

// get news-pending-count
export const fetchGetNewsPendingCount = (params) => {
    return axiosConfig.get(`${URLS.newsPendingCount}/`, params)
}

// get news-moderation-history
export const fetchGetNewsModerationHistoryList = (params) => {
    return axiosConfig.get(`${URLS.newsModerationHistory}/`, { page_size: 200,...params })
}

// create news-moderation-history
export const fetchCreateNewsModerationHistory = (params) => {
    return axiosConfig.post(`${URLS.newsModerationHistory}/`, params)
}
