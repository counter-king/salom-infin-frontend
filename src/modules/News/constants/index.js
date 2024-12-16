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
    {id: "2", title:"popular"},
    {id: "3", title:"less-read"}
]

export const timeRadiosValues = [
    {id: "4", title:"all"},
    {id: "5", title:"today-last24"},
    {id: "6", title:"last-week"},
    {id: "7", title:"last-month-2"},
]

export const socialPartitipationRadiosValues = [
    {id: "8", title:"all"},
    {id: "10", title:"many-likes"},
    {id: "9", title:"social-participation"},
    {id: "11", title:"more-explanations"},
    {id: "12", title:"much-in-common"},
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