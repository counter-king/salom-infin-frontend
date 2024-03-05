<script setup>
// Core
import { onMounted, ref } from 'vue'
// Components
import { UserWithAction } from '@/components/Users'
import WidgetWrapper from '../WidgetWrapper.vue'
// Stores
import { useAuthStore } from '@/modules/Auth/stores'
// Services
import axiosConfig from '@/services/axios.config'
// Composable
const authStore = useAuthStore()
// Reactive
const loading = ref(true)
const list = ref([])
const getList = async () => {
  loading.value = true

  try {
    let { data } = await axiosConfig.get(`dashboard/my-department-users/${authStore.currentUser.top_level_department.id}/`)

    list.value = data.results
  }
  finally {
    setTimeout(() => {
      loading.value = false
    }, 500)
  }
}
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
          <template v-for="(item, index) in list" :key="index">
            <user-with-action
              :label="item.full_name"
              :sub-title="item.position?.name"
              :class="{ 'mb-2': index !== list.length - 1 }"
            >
              <template #sub-title-after>
                <div class="w-[6px] min-w-[6px] h-[6px] bg-greyscale-400 rounded-full"></div>
                <span class="flex-1 min-w-[40px] text-xs text-greyscale-500">00-12</span>
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
                  <base-icon
                    name="ChatLineIcon"
                    width="16"
                    height="16"
                    class="text-greyscale-300 cursor-pointer hover:text-primary-500"
                  />
                </div>
              </template>
            </user-with-action>
          </template>
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
