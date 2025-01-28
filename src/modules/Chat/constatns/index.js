import { ClapperboardPlayLinearIcon, DocumentsMinimalisticIcon, FileTextIcon, GalleryIcon } from "@/components/Icons"
import axiosConfig from "@/services/axios.config"

export const fileTypes = {
  image: GalleryIcon,
  video: ClapperboardPlayLinearIcon,
  document: DocumentsMinimalisticIcon,
  file: FileTextIcon
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