<script setup>
// Core
import {ref, unref, onMounted } from 'vue'
import { saveStorageItem, getStorageItem } from "@/utils/storage"
import { LANG } from "@/constants/storage"
import { useI18n } from "vue-i18n"
// Composable
const { t } = useI18n()
// Reactive
const opRef = ref(null)
const active = ref('RU')
// Methods
const toggleIconVisibility = (event, icon) => {
  active.value = icon
  saveStorageItem(LANG, icon)
  toggle(event)
};
const toggle = (event) => {
  const _opRef = unref(opRef)
  _opRef.opRef.toggle(event)
}
onMounted(() => {
  active.value = getStorageItem(LANG) ?? 'RU'
})
</script>
<template>
  <div>
    <base-button
      color="bg-greyscale-800 hover:bg-greyscale-900"
      border-color="border-greyscale-800"
      icon-left="GlobalIcon"
      only-icon
      rounded
      @click="toggle"
    />

    <base-overlay-panel
      ref="opRef"
      width="w-[192px]"
      has-overlay
      content="p-3"
      menu-class="bg-primary-50  mt-7  p-0"
    >
      <div
        @click="toggleIconVisibility(event, 'RU')"
        class="flex items-center justify-between px-3 py-3 rounded-xl bg-white cursor-pointer shadow-button mb-2"
        >
        <base-icon name="FlagsRuIcon"/>

        <h1 class="flex-1 ml-3 text-sm font-semibold text-primary-900">Русский</h1>

        <base-icon
          v-if="active === 'RU'"
          width="17"
          height="17"
          name="CheckCircleBgIcon"
          class="text-white transition-all duration-[400ms]" />
      </div>

      <div
        @click="toggleIconVisibility(event, 'UZ')"
        class="flex items-center justify-between px-3 py-3 rounded-xl bg-white cursor-pointer shadow-button"
        >
        <base-icon name="FlagsUzIcon"/>

        <h1 class="flex-1 ml-3 text-sm font-semibold text-primary-900">O’zbekcha</h1>

        <base-icon
          v-if="active === 'UZ'"
          width="17"  height="17"
          name="CheckCircleBgIcon"
          class="text-white transition-all duration-[400ms]" />
      </div>
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
