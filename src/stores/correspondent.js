import { defineStore } from "pinia"
import {
  fetchCorrespondentList,
  fetchCorrespondentCreate,
  fetchCorrespondentById
} from "@/services/correspondent.service"
import { CORRESPONDENT } from "@/enums"

export const useCorrespondentStore = defineStore("correspondent", {
  state: () => ({
    model: {
      address: null,
      birth_date: null,
      checkpoint: null,
      description: null,
      email: null,
      father_name: null,
      first_name: null,
      gender: null,
      last_name: null,
      legal_address: null,
      legal_name: null,
      name: null,
      phone: null,
      tin: null,
      type: CORRESPONDENT.LEGAL
    },
    allList: [],
    legalList: [],
    physicalList: []
  }),
  actions: {
    /**
     * Список корреспондентов
     * @returns Promise
     * */
    async actionGetList(payload) {
      let { data } = await fetchCorrespondentList(payload.params)

      if(payload.type === CORRESPONDENT.ALL) {
        this.allList = data.results

        return;
      }

      return Promise.resolve(data.results)
    },
    /**
     * Создать корреспондент
     * @returns {Object}
     * */
    async actionCreate(payload) {
      let { data } = await fetchCorrespondentCreate(payload)

      switch(data.type) {
        case CORRESPONDENT.LEGAL:
          this.legalList.unshift(data)
          break;
        case CORRESPONDENT.PHYSICAL:
          this.physicalList.unshift(data)
          break;
        default:
          console.log("Unknown response type not equal (legal | physical)")
      }
    },
    /**
     * Получить корреспондент по id
     * @returns {Object}
     * */
    async actionGetById(payload) {
      let { data } = await fetchCorrespondentById({ id: payload.id })
      this.model = data
    },
    /**
    *
    * */
    clearModel() {
      Object.keys(this.model).forEach(key => {
        if(key === "type") return;
        this.model[key] = null
      })
    }
  }
})
