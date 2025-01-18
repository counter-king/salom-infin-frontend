<script setup>
// Core
import { onMounted, ref, watch } from 'vue'
import { useDebounce, useElementVisibility } from '@vueuse/core'
// Components
import { ChatLineIcon } from '@/components/Icons'
import { UserWithAction } from '@/components/Users'
import WidgetWrapper from '../WidgetWrapper.vue'
// Stores
import { useAuthStore } from '@/modules/Auth/stores'
// Services
import axiosConfig from '@/services/axios.config'
import { returnStatusColor } from "@/utils";
// Composable
const authStore = useAuthStore()
// Reactive
const scrollRef = ref(null)
const loading = ref(true)
const isResponseEmpty = ref(false)
const list = ref([])
const page = ref(1)
// Composable
const isScrollRefVisible = useElementVisibility(scrollRef)
const debounceScrollVisible = useDebounce(isScrollRefVisible, 1000)
const getList = async () => {
  loading.value = true

  try {
    await getListService()
  }
  finally {
    setTimeout(() => {
      loading.value = false
    }, 500)
  }
}
const getListService = async () => {
  let { data } = await axiosConfig.get(
    `dashboard/users/`,
    {
      page: page.value
    }
  )

  isResponseEmpty.value = data.results.length === 0
  list.value.push(...data.results)
}
// Watch
watch(debounceScrollVisible, async (value) => {
  if(value) {
    page.value = page.value + 1
    await getListService()
  }
})
// Hooks
onMounted(async () => {
  await getList()
})
</script>

<template>
  <widget-wrapper title="contacts">
    <template #content>
      <template v-if="loading">
        <base-spinner absolute />
      </template>

      <template v-else>
        <template v-if="list.length">
          <div class="max-h-[1px]">
            <template v-for="(item, index) in list" :key="index">
              <user-with-action
                :item="item"
                :label="item.full_name"
                :sub-title="item.position?.name"
                :color="item.color"
                :class="{ 'mb-2': index !== list.length - 1 }"
              >
                <template #sub-title-after>
<!--                  <div class="w-1 min-w-1 h-1 bg-greyscale-400 rounded-full"></div>-->
<!--                  <div-->
<!--                    v-tooltip.top="{-->
<!--                    value: `<h4 class='text-xs text-white -my-1'>${item.status?.name}</h4>`,-->
<!--                    escape: true,-->
<!--                    autoHide: false-->
<!--                  }"-->
<!--                    class="text-xs truncate" :class="returnStatusColor(item?.status?.code)"-->
<!--                  >-->
<!--                    {{ item.status?.name }}-->
<!--                  </div>-->
                  <div class="w-1 min-w-1 h-1 bg-greyscale-400 rounded-full"></div>
                  <span class="flex-1 min-w-[40px] text-xs text-greyscale-500">{{ item.cisco || '00-00' }}</span>
                </template>

                <template #action>
                  <div
                    v-tooltip.top="{
                    value: `<h4 class='text-xs text-white -my-1'>Написать сообщение</h4>`,
                    escape: true,
                    autoHide: false
                  }"
                    class="h-4"
                  >
                    <base-iconify
                      :icon="ChatLineIcon"
                      class="text-greyscale-300 cursor-pointer hover:text-primary-500 !w-5 !h-5"
                    />
                  </div>
                </template>
              </user-with-action>
            </template>

            <template v-if="!isResponseEmpty">
              <div ref="scrollRef" class="my-2">
                <base-spinner root-classes="!w-7 !h-7" />
              </div>
            </template>
          </div>
        </template>

        <template v-else>
          <div class="flex items-center justify-center h-full font-semibold text-lg">
            Не чего не найдено
          </div>
        </template>
      </template>
    </template>
  </widget-wrapper>
</template>

<style scoped>

</style>
