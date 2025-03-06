import { ClapperboardPlayLinearIcon, FileTextIcon, GalleryIcon } from "@/components/Icons"

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
  MESSAGE_DELETED: "message_deleted",
  MESSAGE_REACTION: "message_reaction",
  MESSAGE_UPDATE: "message_update",
  NEW_GROUP_CHAT: "new_group_chat",
  CHAT_DELETED: "chat_deleted",
  TYPING: "typing",
  MESSAGE_READ: "message_read",
  CHAT_DELETED:"chat_deleted"
}

export const MESSAGE_TYPES = {
  TEXT: "text",
  IMAGE: "image",
  VIDEO: "video",
  AUDIO: "audio",
  FILE: "file",
  LINK: "link",
}


export const fileTypes = {
  image: {icon: GalleryIcon, class: '!text-critic-500', class2: '!text-white'},
  video: {icon: ClapperboardPlayLinearIcon, class: '!text-success-500', class2: '!text-white'},
  file: { icon: FileTextIcon, class: '!text-warning-500', class2: '!text-white'},
  text: {icon: false, class: '!text-greyscale-500', class2: '!text-white'},
}

export const COMPONENT_TYPES = {
  FILES: "files",
  LINKS: "links",
  DOCUMENTS: "documents",
  VIDEOS: "videos",
  IMAGES: "images",
  GROUP_USERS: "group-users",
}

export const collectionStikers = {
  fire: '🔥',
  lough: '😄',
  heart: '❤️',
  like: '👍',
  angry: '😡',
  love: '😍'
}

export const stikersTypes = [
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
