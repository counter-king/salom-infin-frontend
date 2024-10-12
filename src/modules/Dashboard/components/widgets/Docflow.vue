<script setup>
// Core
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
// Composable
const { t, locale } = useI18n()
// Components
import WidgetWrapper from '../WidgetWrapper.vue'
import SettingMenu from '../Docflow/SettingMenu.vue'
import DocFlowCard from '../Docflow/Card.vue'
// Services
import axiosConfig from '@/services/axios.config'
// Reactive
const tabIndex = ref(0)
const tabMenus = ref([])
const list = ref([])
const loading = ref(true)
const counts = ref(null)
const type = ref('new')
// Methods
const getCounts = async (url) => {
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
  () => locale.value,
  () => {
    tabMenus.value = [
      {
        label: t('new'),
        name: 'Preview',
      },
      {
        label: t('in-progress'),
        name: 'History',
      },
      {
        label: t('all'),
        name: 'Comments',
      }
    ]
  },
  {
    immediate: true
  }
)
watch(
  () => tabIndex.value,
  async (newValue) => {
    let url = null

    switch (newValue) {
      case 0:
        url = 'dashboard/new-counts/'
        type.value = 'new'
        break;
      case 1:
        url = 'dashboard/in-progress-counts/'
        type.value = 'in-progress'
        break;
      default:
        url = 'dashboard/all-counts/'
        type.value = 'all'
    }

    await getCounts(url)
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
              <doc-flow-card
                :list="list"
                :counts="counts"
                :type="type"
              />
            </template>
          </div>
        </div>
      </div>
    </template>
  </widget-wrapper>
</template>

<style scoped>

</style>
