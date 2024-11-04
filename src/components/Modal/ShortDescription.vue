<script setup>
// Core
import { ref, watch, onMounted } from 'vue'
import { useDebounce } from '@vueuse/core'
// Components
import { MagniferIcon } from '@/components/Icons'
// Stores
import { useCommonStore } from '@/stores/common'
// Macros
const emit = defineEmits(['emit:selected'])
// Reactive
const dialog = ref(false)
const search = ref(null)
const selected = ref('')
const loading = ref(false)
const list = ref([])
// Composable
const commonStore = useCommonStore()
const debounced = useDebounce(search, 750)
// Watch
watch(
  () => search.value,
  () => {
    loading.value = true
  }
)
watch(debounced, async () => {
  await commonStore.actionShortDescriptionList({ search: search.value })
  setTimeout(() => {
    loading.value = false
  }, 250)
})
// Methods
const selectItem = () => {
  emit('emit:selected', selected.value)
  cancelItem()
}
const cancelItem = () => {
  dialog.value = false
  setTimeout(() => {
    search.value = ''
    selected.value = ''
  }, 250)
}
// Hooks
onMounted(() => {
  list.value = commonStore.shortDescriptionList
})
</script>

<template>
  <div class="short-description-modal mt-3">
    <div class="flex flex-wrap items-center gap-1 max-h-[140px] overflow-hidden">
      <base-button
        border-color="border-transparent"
        label="Поиск по названию"
        :icon-left="MagniferIcon"
        icon-width="!w-4"
        icon-height="!h-4"
        size="small"
        type="button"
        rounded
        shadow
        @click="dialog = true"
      />

      <template v-for="item in list">
        <div
          v-tooltip.top="{
            value: `<h4 class='text-xs text-white -my-1 text-center line-clamp-4'>${item.description}</h4>`,
            escape: true,
            autoHide: false
          }"
          class="max-w-[225px] truncate bg-greyscale-50 hover:bg-primary-500 transition-colors border border-greyscale-200 text-greyscale-500 hover:text-white text-xs rounded-[6px] py-[7px] px-2 cursor-pointer"
          @click="emit('emit:selected', item.description)"
        >
          {{ item.description }}
        </div>
      </template>
    </div>

    <base-dialog
      v-model="dialog"
      max-width="max-w-[672px]"
      label="Cодержание"
    >
      <template #content>
        <base-input
          v-model="search"
          :icon-left="MagniferIcon"
          placeholder="Поиск содержание"
          class="flex p-input-icon-left p-input-icon-right"
          input-class="border-transparent !focus:outline-none focus:ring-0 focus:border-inherit focus-visible:border-inherit !pl-10"
          icon-left-class="!mt-[-10px]"
        />

        <div class="my-3">
          <template v-if="loading">
            <div class="h-[200px]">
              <base-spinner />
            </div>
          </template>

          <template v-else>
            <template v-for="(item, index) in commonStore.shortDescriptionList">
              <div class="flex items-center flex-1 gap-1 border-b border-b-greyscale-200">
                <base-radio
                  v-model="selected"
                  :input-id="`short-description-item-${index}`"
                  name="short-description-item"
                  :value="item.description"
                />

                <label
                  :for="`short-description-item-${index}`"
                  class="flex-1 text-sm font-medium text-greyscale-900 cursor-pointer py-[14px]"
                >
                  {{ item.description }}
                </label>
              </div>
            </template>
          </template>
        </div>
      </template>

      <template #footer>
        <base-button
          color="bg-white hover:bg-greyscale-100 text-primary-dark"
          border-color="border-transparent"
          label="cancel"
          rounded
          shadow
          type="button"
          @click="cancelItem"
        />

        <base-button
          label="Выбрать"
          rounded
          shadow
          type="button"
          @click="selectItem"
        />
      </template>
    </base-dialog>
  </div>
</template>

<style scoped>

</style>
