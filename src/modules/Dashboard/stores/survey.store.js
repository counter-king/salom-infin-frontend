// Core
import { defineStore } from 'pinia'
import { fetchGetMoodReactionCounts, fetchSelectMood } from "@/modules/Dashboard/services/index.service";
export const useDashboardSurveyStore = defineStore('dashboardSurveyStore', {
  state: () => ({
    items: [],
    userChose: false,
    loading: true
  }),
  actions: {
    async actionGetMoodReactionCounts(params) {
      try {
        const res = await fetchGetMoodReactionCounts(params)
        if (res && res.status === 200) {
          this.items = res.data?.counts.map((item, index) => ({
            id: index + 1,
            value: item.reaction,
            count: item.count,
            image: `/images/dashboard/emoji-${index + 1}.svg`,
            selected: res.data.current_user_reaction
          }))

          this.userChose = !!res?.data?.current_user_reaction

          this.loading = false
          return Promise.resolve(res)
        }
      } catch (err) {

      }
    },
    async actionSelectMood(body) {
      try {
        this.loading = true
        const res = await fetchSelectMood(body)
        if (res) {
          await this.actionGetMoodReactionCounts({})
          return Promise.resolve(res)
        }
      } catch (err) {

      } finally {
        this.loading = false
      }
    }
  }
})
