<script setup>
// Core
import { computed, onMounted, ref, watch } from 'vue'
import { useDebounce, useElementVisibility } from '@vueuse/core'
import { useI18n } from "vue-i18n"
// Components
import { ChatLineIcon, MagniferIcon, StarBoldIcon, StarLinearIcon } from '@/components/Icons'
import { UserWithAction } from '@/components/Users'
import WidgetWrapper from '../WidgetWrapper.vue'
// utils
import { returnStatusBgColor } from "@/utils"
// Stores
import { useDashboardContactStore } from "@/modules/Dashboard/stores/contact.store"
// Services
import axiosConfig from '@/services/axios.config'
// Composable
const store = useDashboardContactStore()
// Reactive
const search = ref(null)
const skipSearch = ref(false) // Flag to skip search watcher

// Composable
const { t } = useI18n()
const debounced = useDebounce(search, 750)

// Watch
watch(debounced, async () => {
  if (skipSearch.value) {
    skipSearch.value = false // Reset the flag and do nothing
    return
  }

  if (activeTab.value === 'all') {
    await store.actionGetDashboardContacts({ search: search.value })
  } else {
    await store.actionGetDashboardFavouriteContacts({ search: search.value })
  }
})
// Computed
const activeTab = computed(() => {
  return store.tabItems.find(item => item.active).value
})
// Methods
const onTabChange = async (item) => {
  store.tabItems.forEach(tab => tab.active = tab.id === item.id)
  item.value === 'all' ? await store.actionGetDashboardContacts() : await store.actionGetDashboardFavouriteContacts()
}
const handleFavouriteClick = async (item) => {
  if (item.is_selected && item.favourite_id) {
    store.listLoading = true
    await store.actionDeleteContactFromFavourites(item.favourite_id)
    await store.actionGetDashboardFavouriteContacts()
  } else if (!item.is_selected) {
    store.listLoading = true
    await store.actionAddContactToFavourites({ user: item.id })
    await store.actionGetDashboardContacts()
  }
  skipSearch.value = true
  search.value = null
}
// Hooks
onMounted(async () => {
  await store.actionGetDashboardFavouriteContacts()
})
</script>

<template>
  <widget-wrapper title="contacts">
    <template #header-after>
      <div class="flex gap-x-1">
        <div
          v-for="item in store.tabItems"
          :key="item.id"
          class="hover:bg-greyscale-50 text-xs font-semibold rounded-[6px] px-2 py-[2px] cursor-pointer select-none relative"
          :class="item.active ? 'bg-greyscale-50 text-primary-500' : 'bg-white text-greyscale-500'"
          @click="onTabChange(item)"
        >
          {{ t(item.label) }}
        </div>
      </div>
    </template>

    <template #content-top>
      <base-input
        v-model="search"
        :icon-left="MagniferIcon"
        placeholder="search"
        class="flex p-input-icon-left p-input-icon-right mb-2 mx-5"
        input-class="border-transparent !focus:outline-none focus:ring-0 focus:border-inherit focus-visible:border-inherit !pl-10 h-10"
        icon-left-class="!mt-[-10px]"
        clearable
      />
    </template>

    <template #content>
      <template v-if="store.listLoading">
        <base-spinner absolute />
      </template>

      <template v-else>
        <template v-if="store.dashboardContactList.length">
          <div class="max-h-[1px]">
            <template v-for="(item, index) in store.dashboardContactList" :key="index">
              <user-with-action
                :item="item"
                :label="item.full_name"
                :sub-title="item.position?.name"
                :color="item.color"
              >
                <template #sub-title-after>
                  <div
                    v-tooltip.top="{
                      value: `<h4 class='text-xs text-white'>${item.status?.name}</h4>`,
                      escape: true,
                      autoHide: false
                    }"
                    class="w-2 min-w-1 h-2 rounded-full"
                    :class="returnStatusBgColor(item?.status?.code)"
                  />
                  <span class="flex-1 min-w-[40px] text-xs text-greyscale-500">{{ item.cisco || '00-00' }}</span>
                </template>

                <template #action>
                  <div
                    v-tooltip.top="{
                    value: `<h4 class='text-xs text-white -my-1'>${t('compose-message')}</h4>`,
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

                  <div
                    v-tooltip.top="{
                    value: `<h4 class='text-xs text-white -my-1'>${item.is_selected && item.favourite_id ? t('remove-from-favourites') : item.is_selected ? t('favourites') : t('add-to-favourites')}</h4>`,
                    escape: true,
                    autoHide: false
                  }"
                    class="h-4"
                    @click="handleFavouriteClick(item)"
                  >
                    <base-iconify
                      :icon="item.is_selected ? StarBoldIcon : StarLinearIcon"
                      class="cursor-pointer hover:text-primary-500 !w-5 !h-5"
                      :class="item.is_selected ? 'text-warning-500' : 'text-greyscale-300'"
                    />
                  </div>
                </template>
              </user-with-action>
            </template>
          </div>
        </template>

        <template v-else>
          <div class="flex items-center justify-center h-full font-semibold text-base">
            {{ activeTab === 'all' ? t('no-data') : t('no-favourite-contacts') }}
          </div>
        </template>
      </template>
    </template>
  </widget-wrapper>
</template>

<style scoped>

</style>
