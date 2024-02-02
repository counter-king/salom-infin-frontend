<script setup>
// Core
import { ref, unref, onMounted } from 'vue'
import { useI18n } from "vue-i18n"
// Stores
import { useCollectRequestsStore } from '@/stores/collect-requests.store'
// Utils
import { saveStorageItem, getStorageItem } from "@/utils/storage"
import { LANG } from "@/constants/storage"
// Composable
const { t } = useI18n()
const collectStore = useCollectRequestsStore()
// Macros
const props = defineProps({
  selectable: {
    type: Boolean
  },
  hasOverlay: {
    type: Boolean,
    default: true
  }
})
// Reactive
const opRef = ref(null)
const languagesList = ref([
  {
    text: `O'zbek`,
    icon: 'FlagsUzIcon',
    value: 'uz'
  },
  {
    text: `Русский`,
    icon: 'FlagsRuIcon',
    value: 'ru'
  },
])
const languageSelected = ref({
  text: `O'zbek`,
  icon: 'FlagsUzIcon',
  value: 'uz'
})
// Methods
const toggleIconVisibility = async (event, language) => {
  languageSelected.value = language
  saveStorageItem(LANG, JSON.stringify(language))
  toggle(event)
	await collectStore.actionResendRequests()
}
const toggle = (event) => {
  const _opRef = unref(opRef)
  _opRef.opRef.toggle(event)
}
onMounted(() => {
  languageSelected.value =
    JSON.parse(getStorageItem(LANG)) ??
    {
      text: `O'zbek`,
      icon: 'FlagsUzIcon',
      value: 'uz'
    }
})
</script>
<template>
  <div>
    <template v-if="props.selectable">
      <button
        class="flex items-center gap-1 bg-greyscale-50 rounded-lg py-2 pl-3 pr-2"
        @click="toggle"
      >
        <span class="text-primary-900 font-semibold text-sm">{{ languageSelected.text }}</span>

        <base-icon name="AltArrowDownIcon" width="18" class="text-greyscale-500" />
      </button>
    </template>

    <template v-else>
      <base-button
        color="bg-greyscale-800 hover:bg-greyscale-900"
        border-color="border-greyscale-800"
        icon-left="GlobalIcon"
        only-icon
        rounded
        @click="toggle"
      />
    </template>

    <base-overlay-panel
      ref="opRef"
      :has-overlay="props.hasOverlay"
      width="w-[192px]"
      has-overlay
      content="p-3"
      :menu-class="props.hasOverlay ? 'bg-greyscale-50 mt-3 p-0' : 'bg-white before:border-b-white mt-3 p-0'"
    >
      <template v-for="(language, index) in languagesList">
        <div
          :class="{ 'mb-2': index + 1 !== languagesList.length }"
          class="flex items-center justify-between px-3 py-3 rounded-xl bg-white cursor-pointer shadow-button"
          @click="toggleIconVisibility(event, language)"
        >
          <base-icon :name="language.icon" />

          <h1 class="flex-1 ml-3 text-sm font-semibold text-primary-900">{{ language.text }}</h1>

          <base-icon
            v-if="language.icon === languageSelected.icon"
            width="17"
            height="17"
            name="CheckCircleBgIcon"
            class="text-white transition-all duration-[400ms]"
          />
        </div>
      </template>
    </base-overlay-panel>
  </div>
</template>
<style>
.base-menu-logout-icons {
  background-color: var(--primary-50);
  color: var(--primary-500);
  border-color: var(--greyscale-200);
}
</style>
