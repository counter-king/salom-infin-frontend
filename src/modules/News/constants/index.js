import dayjs from "dayjs"

export const CONTENT_TYPES = {
    TEXT: "text",
    IMAGE: "image",
    VIDEO: "video",
    AUDIO: "audio",
    QUOTE: "quote",
    FILE: "file",
}

export const allowedAudioTypes = [
   "audio/mp3",
   "audio/mpeg",
   "audio/ogg",
   "audio/wav",
   "audio/webm"
]

export const allowedImageTypes = ['image/png', 'image/jpeg', 'image/jpg','image/webp']
export const allowedVideoTypes = ['video/mp4', 'video/webm', 'video/ogg']

export const allowedFileTypes=[
    ...allowedImageTypes,
    ...allowedVideoTypes,
    ...allowedAudioTypes
]

export const EOMOJI_TYPES = {
    LIKE: "like",
    LOVE: "love",
    HAHA: "haha",
    WOW: "wow",
    SAD: "sad",
    ANGRY: "angry",
}

export const popularityRadiosValues = [
    {id: "1", title:"all"},
    {id: "-like_counts", title:"popular"},
    {id: "view_counts", title:"less-read"},
    {id: "-view_counts", title:"many-views"},

]

export const timeRadiosValues = [
    {id: "4", title:"all"},
    {id: "5", title:"today-last24"},
    {id: "6", title:"last-week"},
    {id: "7", title:"last-month-2"},
]

export const getDateRange = (selectedRange) => {
    const now = dayjs()
    let startDate = undefined
    let endDate = undefined
    
    switch(selectedRange){
        case "4":
            startDate = undefined
            endDate = undefined
            break;
        // today
        case "5":
            startDate = now.startOf("day").format("YYYY-MM-DD")
            endDate = now.endOf("day").format("YYYY-MM-DD")
            break;
        // last week 
        case "6":
            startDate = now.subtract(1, 'week').startOf('week').add(1, 'day').format("YYYY-MM-DD")
            endDate = now.subtract(1, 'week').endOf("week").add(1, 'day').format("YYYY-MM-DD")
            break;
        // last month
        case "7":
            startDate = now.subtract(1, "month").startOf("month").format("YYYY-MM-DD")
            endDate = now.subtract(1, "month").endOf("month").format("YYYY-MM-DD")
            break;
        default:
            startDate = undefined
            endDate = undefined
    }


    return {startDate, endDate}
}

export const getMatchFileUploadType = (content) => {
    if(allowedImageTypes.some(item => item.includes(content.type))){
      return {type: CONTENT_TYPES.FILE,  value: { ...content.file,type: content.type}, id: content.id}
    }
    else if(allowedVideoTypes.some(item => item.includes(content.type))){
      return {type: CONTENT_TYPES.FILE, value: {...content.file, type: content.type}, id: content.id}
    }
    else if(allowedAudioTypes.some(item => item.includes(content.type))){
      return {type: CONTENT_TYPES.FILE, value: {...content.file,type: content.type}, id: content.id}
    }
  }
  