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
import { ClockCircleBoldIcon, RoundArrowRightDownBoldIcon } from "@/components/Icons";
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
          <div class="grid grid-rows-3 grid-cols-3 gap-2 relative h-full">
            <template v-if="loading">
              <base-spinner absolute />
            </template>

            <template v-else>
              <doc-flow-card
                :list="list"
                :counts="counts"
                :type="type"
              />

              <div class="relative flex gap-3 bg-white shadow-button rounded-2xl p-4 col-span-3">
                <div class="flex items-center justify-center w-10 h-10 rounded-full bg-primary-50">
                  <base-iconify
                    :icon="RoundArrowRightDownBoldIcon"
                    class="text-primary-500"
                  />
                </div>

                <div class="flex-1">
                  <h1 class="text-sm text-greyscale-900 font-medium">{{ t('duties') }}</h1>
                  <p class="text-greyscale-900 font-semibold text-[20px]">24</p>
                </div>

                <div class="flex justify-center items-center absolute inset-0 rounded-2xl backdrop-blur-[2px] bg-white/30">
                  <div class="flex gap-x-3 items-center">
                    <div class="flex justify-center items-center w-10 h-10 rounded-full bg-warning-50">
                      <base-iconify
                        :icon="ClockCircleBoldIcon"
                        class="text-warning-500"
                      />
                    </div>

                    <div class="text-sm font-medium text-greyscale-900">{{ t('soon') }}</div>
                  </div>
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>
    </template>
  </widget-wrapper>
</template>

<style scoped>

</style>
