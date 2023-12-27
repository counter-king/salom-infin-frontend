// Core
import { defineStore } from 'pinia'
export const useSettingsDocFlow = defineStore("settingsDocFlow", {
  state: () => ({
    routes: {
      title: "Документ оборот",
      icon: "FolderWithFilesIcon",
      link: "DocumentFlowIndex",
      children: [
        {
          title: "Тип документа",
          icon: "ClipboardCheckIcon",
          link: "DocumentTypeIndex",
          children: []
        },
        {
          title: "Вид документа",
          icon: "DocumentTextIcon",
          link: "DocumentViewIndex",
          children: []
        },
        {
          title: "Журнал",
          icon: "NotebookIcon",
          link: "MagazinesIndex",
          children: []
        }
      ]
    }
  }),
  actions: {

  }
})
