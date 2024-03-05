<script setup>
// Core
import { ref, watch } from 'vue'
// Components
import WidgetWrapper from '../WidgetWrapper.vue'
import SettingMenu from '../Docflow/SettingMenu.vue'
import DocFlowCard from '../Docflow/Card.vue'
// Services
import axiosConfig from '@/services/axios.config'
// Reactive
const tabIndex = ref(0)
const tabMenus = ref([
  {
    label: 'Новые',
    name: 'Preview',
  },
  {
    label: 'В процессе',
    name: 'History',
  },
  {
    label: 'Все',
    name: 'Comments',
  }
])
const list = ref([])
const loading = ref(true)
const counts = ref(null)
// Methods
const getCounts = async () => {
  let url = null

  switch (tabIndex.value) {
    case 0:
      url = 'dashboard/new-counts/'
      break;
    case 1:
      url = 'dashboard/in-progress-counts/'
      break;
    default:
      url = 'dashboard/all-counts/'
  }

  try {
    loading.value = true
    let { data } = await axiosConfig.get(url)
    counts.value = data
  }
  finally {
    setTimeout(() => {
      loading.value = false
    }, 500)
  }
}
// Watch
watch(
  () => tabIndex.value,
  async () => {
    await getCounts()
  },
  { immediate: true }
)
</script>

<template>
  <widget-wrapper title="incoming">
    <template #header-after>
      <div class="flex items-center">
        <base-tab-menu
          v-model="tabIndex"
          :tab-items="tabMenus"
          bricks
        />

        <div class="bg-greyscale-200 w-[1px] h-4 ml-2 mx-2"></div>

        <setting-menu @emit:change="(value) => list = value" />
      </div>
    </template>

    <template #content>
      <div class="bg-greyscale-50 h-full p-3 pr-[6px] rounded-xl">
        <div class="h-full pr-2 overflow-y-auto">
          <div class="grid grid-rows-2 grid-cols-4 gap-2 relative h-full">
            <template v-if="loading">
              <base-spinner absolute />
            </template>

            <template v-else>
              <doc-flow-card :list="list" :counts="counts" />
            </template>
          </div>
        </div>
      </div>
    </template>
  </widget-wrapper>
</template>

<style scoped>

</style>
