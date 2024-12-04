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

