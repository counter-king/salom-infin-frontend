import { ClapperboardPlayLinearIcon, FileTextIcon, GalleryIcon } from "@/components/Icons"
import axiosConfig from "@/services/axios.config"

export const CHAT_TYPES = {
  PRIVATE: "private",
  GROUP: "group",
}

export const CHAT_ROUTE_NAMES = {
  PRIVATE: "ChatPrivateDetail",
  GROUP: "ChatGroupDetail",
  CHAT_INDEX: "ChatIndex",
}


export const WEBCOCKET_EVENTS = {
  NEW_MESSAGE: "new_message",
  USER_HANDSHAKE: "user_handshake",
  CHAT_HANDSHAKE: "chat_handshake",
}

export const MESSAGE_TYPES = {
  TEXT: "text",
  IMAGE: "image",
  VIDEO: "video",
  AUDIO: "audio",
  FILE: "file",
}


export const fileTypes = {
  image: GalleryIcon,
  video: ClapperboardPlayLinearIcon,
  file: FileTextIcon,
  text: false,
}

export const COMPONENT_TYPES = {
  FILES: "files",
  LINKS: "links",
  DOCUMENTS: "documents",
  VIDEOS: "videos",
  IMAGES: "images",
  GROUP_USERS: "group-users",
}

export const downloadFile = async () => {
  try {
    const response = await axiosConfig.get('path/to/your/document.pdf')
    const blob = await response.blob()
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'document.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
  } catch (error) {
    console.error('Download failed:', error)
  }
}

export const collectionStikers = [
  {
    type: 'fire', 
    value: '🔥' 
  },
  {
    type: 'lough',
    value: '😄'
  },
  {
    type: 'heart',
    value: '❤️'
  },
  {
    type: 'like',
    value: '👍'
  },
  {
    type: 'angry',
    value: '😡'
  },
  {
    type: 'love',
    value: '😍'
  }
]
