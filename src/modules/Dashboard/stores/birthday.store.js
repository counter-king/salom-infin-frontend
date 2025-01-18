// Core
import { defineStore } from 'pinia'
import {
  fetchCongratulateUser,
  fetchGetBirthdayList,
  fetchGetBirthdayReactionCounts
} from "@/modules/Dashboard/services/index.service";
import { isBirthdayToday } from "@/utils";
import { useAuthStore } from "@/modules/Auth/stores";
export const useDashboardBirthdayStore = defineStore('dashboardBirthdayStore', {
  state: () => ({
    tabItems: [
      {
        id: 1,
        label: 'today',
        title: 'today',
        value: 'today',
        active: true,
        count: null
      },
      {
        id: 2,
        label: 'tomorrow',
        title: 'tomorrow',
        value: 'tomorrow',
        active: false,
        count: null
      }
    ],
    filialItems: [
      {
        id: 1,
        label: 'our-office',
        value: 'our_office',
        active: true,
        count: null
      },
      {
        id: 2,
        label: 'all',
        value: 'all',
        active: false,
        count: null
      }
    ],
    wishItems: [
      {
        id: 1,
        image: '/images/dashboard/gift-1.svg',
        value: 'party_popper',
        count: 12
      },
      {
        id: 2,
        image: '/images/dashboard/gift-2.svg',
        value: 'cake',
        count: 73
      },
      {
        id: 3,
        image: '/images/dashboard/gift-3.svg',
        value: 'gift_box',
        count: 45
      },
      {
        id: 4,
        image: '/images/dashboard/gift-4.svg',
        value: 'champagne',
        count: 24
      }
    ],
    loading: true,
    birthdayList: [],
    todayBornList: [],
    tomorrowBornList: [],
    allBirthdays: []
  }),
  actions: {
    async actionGetBirthdayList(params) {
      this.allBirthdays = []
      try {
        const res = await fetchGetBirthdayList(params)
        if (res) {
          for (const item of res.data) {
            const response = await this.actionBirthdayReactionCounts(item.id)
            this.allBirthdays.push({
              ...item,
              gifts: response.data.counts.map((gift, index) => ({
                id: index + 1,
                image: `/images/dashboard/gift-${index + 1}.svg`,
                value: gift.reaction,
                count: gift.count,
                user_id: item.id,
                disable: !!response.data.current_user_reaction,
                selected: response.data.current_user_reaction === gift.reaction
              }))
            })
          }

          this.birthdayList = this.allBirthdays?.filter(item => isBirthdayToday(item.birth_date) && item?.company?.id === useAuthStore().currentUser?.company?.id)
          this.todayBornList = this.allBirthdays?.filter(item => isBirthdayToday(item.birth_date))
          this.tomorrowBornList = this.allBirthdays?.filter(item => !isBirthdayToday(item.birth_date)).map(i => ({
            ...i,
            gifts: i.gifts.map(g => ({ ...g, disable: true }))
          }))
          this.tabItems[0].count = this.todayBornList.length || null
          this.tabItems[1].count = this.tomorrowBornList.length || null
          this.filialItems[0].count = this.todayBornList.filter(item => item?.company?.id === useAuthStore().currentUser?.company?.id).length || null
          this.filialItems[1].count = this.todayBornList.length || null
          this.loading = false
          return Promise.resolve(res.data)
        }
      } catch (err) {

      }
    },
    async actionBirthdayReactionCounts(userId) {
      try {
        const res = await fetchGetBirthdayReactionCounts(userId)
        if (res) {
          return Promise.resolve(res)
        }
      } catch (err) {

      }
    },
    async actionCongratulateUser(body) {
      try {
        const res = await fetchCongratulateUser(body)
        if (res) {
          return Promise.resolve(res)
        }
      } catch (err) {

      }
    }
  }
})
