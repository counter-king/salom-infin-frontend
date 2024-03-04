<script setup>
// Core
import { ref, onMounted } from 'vue'
// Components
import { UserWithAction } from '@/components/Users'
// Stores
import { useAuthStore } from '@/modules/Auth/stores'
// Services
import axiosConfig from '@/services/axios.config'
// Composable
const authStore = useAuthStore()
// Reactive
const loading = ref(true)
const list = ref([])
// Methods
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
  <div class="selected-contacts-view h-full">
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
              <div class="w-[6px] h-[6px] bg-greyscale-400 rounded-full"></div>
              <span class="text-xs text-greyscale-500">00-12</span>
            </template>

            <template #action>
              <base-icon
                name="ChatLineIcon"
                width="16"
                height="16"
                class="text-greyscale-300"
              />

              <base-icon
                name="StarIcon"
                width="16"
                height="16"
                class="text-greyscale-300"
              />
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
  </div>
</template>

<style scoped>

</style>
