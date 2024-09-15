<script setup>
// Core
import {computed, onMounted, ref} from "vue"
import {useRoute, useRouter} from "vue-router"
// Services
import {fetchGetLinkedDocumentsList} from "@/modules/Documents/modules/SendDocuments/services/index.service"
// Components
import {FolderBoldIcon, AltArrowRightIcon} from "@/components/Icons"
import {StatusChip} from "@/components/Chips"
import Empty from "@/components/Empty.vue";
import {STATUS_TYPES} from "@/enums";

// Composable
const route = useRoute()
const router = useRouter()
// Reactive
const data = ref(null)
const loading = ref(true)

// Computed
const list = computed(() => {
  if (data.value && data.value.from_composes.length) {
    return data.value.from_composes.map(item => ({ ...item, compose: item.to_compose }))
  } else {
    return data.value.to_composes.map(item => ({ ...item, compose: item.from_compose }))
  }
})

// Methods
const getLinkedDocuments = async () => {
  loading.value = true
  const res = await fetchGetLinkedDocumentsList(route.params.id)
  if (res && res.status === 200) {
    data.value = res.data
    loading.value = false
  }
}
const openRoute = async (item) => {
  if (item?.compose?.registered_document && item?.compose?.registered_document?.id && item?.compose?.journal?.code) {
    await router.push({
      name: 'RegistrationShow',
      params: {
        code: item?.compose?.journal?.code,
        id: item?.compose?.registered_document?.id
      }
    })
  }
}

// Hooks
onMounted(async () => {
  await getLinkedDocuments()
})
</script>

<template>
  <template v-if="loading">
    <base-spinner />
  </template>
  <template v-else>
    <div class="connected-documents-list flex flex-col gap-y-2 p-6 overflow-y-auto h-[calc(100vh-270px)]">
<!--      <pre>{{ list }}</pre>-->
      <div
        v-if="list && list.length"
        v-for="item in list"
        class="flex justify-between bg-greyscale-50 hover:bg-greyscale-70 rounded-lg cursor-pointer px-4 py-3"
        @click="openRoute(item)"
      >
        <div class="flex gap-x-4">
          <base-iconify
            :icon="FolderBoldIcon"
            class="text-primary-500 !w-6 !h-6"
          />
          <div class="flex flex-col gap-y-1">
            <span class="text-sm font-semibold text-greyscale-900">{{ item?.compose?.register_number ? item.compose.register_number : 'None' }}</span>
            <span class="text-xs text-greyscale-500">{{ item?.compose?.short_description }}</span>
          </div>
        </div>
        <div class="flex items-center gap-x-10">
          <div>
            <status-chip :status="item?.compose?.status" type="compose"/>
          </div>
          <base-iconify
            :icon="AltArrowRightIcon"
            class="text-greyscale-900 !w-4 !h-4"
          />
        </div>
      </div>

      <empty
        v-else class="h-[calc(100vh-255px)]"
        title="Здесь пока нет информации!"
      />
    </div>
  </template>
</template>

<style scoped>

</style>
