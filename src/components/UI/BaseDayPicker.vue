<script setup>
// Core
import { useRoute, useRouter } from "vue-router"
// Components
import { AltArrowDownBoldIcon } from "@/components/Icons"

// Props
const props = defineProps({
  daysList: {
    type: Array,
    default: () => [],
  },
  actionList: {
    type: Function,
    default: () => void 0
  }
})

// Composable
const route = useRoute()
const router = useRouter()

// Methods
const onDayChange = async (item) => {
  const createdDay = new Date(route.query.created_start_date || new Date()).getDate()
  if (createdDay !== item.dayNumber) {
    await router.replace({
      query: {
        ...route.query,
        created_start_date: item.date,
        created_end_date: item.date,
      }
    })
    props.daysList.forEach(day => day.active = day.date === item.date)
    await props.actionList(route.query)
  }
}
</script>

<template>
  <div class="flex items-end px-2 pb-2 pt-0 bg-white shadow-button rounded-xl select-none">
    <div
      v-for="item in daysList"
      class="flex flex-col items-center w-10 cursor-pointer"
      @click="onDayChange(item)"
    >
      <base-iconify v-if="item.active" :icon="AltArrowDownBoldIcon" class="!w-3 !h-3 text-critic-500" />

      <div
        class="flex flex-col w-10 h-10 rounded-lg border overflow-hidden"
        :class="item.active ? 'border-info-200 shadow-button' : 'border-transparent hover:bg-primary-10'"
      >
        <div
          class="flex items-center justify-center w-full h-[14px]"
          :class="item.active ? 'bg-info-30' : 'bg-transparent'"
        >
          <span v-if="item.active" class="text-info-500 text-[9px] font-semibold">{{ item.monthName }}</span>
        </div>

        <div
          class="flex justify-center items-center"
          :class="item.active ? 'text-lg text-greyscale-900 font-regular' : 'text-xs text-greyscale-400 font-semibold'"
        >
          <div
            :class="item.active ? '' : '-mt-1'"
          >
            {{ item.dayNumber }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
