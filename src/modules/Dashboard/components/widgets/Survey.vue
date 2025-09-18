<script setup>
// Core
import { onMounted } from "vue"
import { useI18n } from "vue-i18n"
// Store
import { useDashboardSurveyStore } from "@/modules/Dashboard/stores/survey.store"
// Components
import { CheckCircleBoldIcon } from "@/components/Icons"

// Composable
const dashboardStore = useDashboardSurveyStore()
const { t } = useI18n()

// Methods
const onMoodSelect = async (item) => {
  await dashboardStore.actionSelectMood({
    reaction: item.value
  })
}

// Hooks
onMounted(async () => {
  await dashboardStore.actionGetMoodReactionCounts({})
})
</script>

<template>
  <div class="survey-widget shadow-button rounded-[20px] bg-white py-4 px-5">
    <template v-if="dashboardStore.loading">
      <base-spinner />
    </template>

    <template v-else>
      <template v-if="dashboardStore.userChose">
<!--        <div class="flex items-center p-1 gap-x-1 rounded-lg bg-success-10">-->
<!--          <base-iconify :icon="CheckCircleBoldIcon" class="text-success-500" />-->
<!--          <span class="text-greyscale-900 font-medium text-sm">{{ t('thanks-for-participation') }}</span>-->
<!--        </div>-->

        <div class="flex justify-around items-center mt-4">
          <div
            v-for="item in dashboardStore.items"
            :key="item.id"
            class="flex flex-col items-center gap-y-2"
          >
            <span class="text-greyscale-900 text-xs font-semibold">{{ item.count }}</span>
            <div
              class="flex justify-center items-center w-12 h-12 rounded-full bg-greyscale-50"
              :class="{ 'border-2 border-primary-200 bg-primary-100' : item.selected === item.value }"
            >
              <img :src="item.image" alt="Emoji" :class="{ 'opacity-50' : !item.selected === item.value }">
            </div>
          </div>
        </div>
      </template>

      <template v-else>
<!--        <div class="text-greyscale-500 text-sm font-medium">{{ t('survey') }}</div>-->
        <div class="text-greyscale-900 text-lg font-semibold mt-1">{{ t('how-mood-today') }}</div>

        <div class="flex justify-around align-center mt-4">
          <div
            v-for="item in dashboardStore.items"
            :key="item.id"
            class="flex justify-center items-center w-12 h-12 rounded-full bg-greyscale-50 hover:bg-greyscale-90 cursor-pointer"
            @click="onMoodSelect(item)"
          >
            <img :src="item.image" alt="Emoji">
          </div>
        </div>
      </template>
    </template>
  </div>
</template>

<style scoped>

</style>
