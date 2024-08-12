<script setup>
// Core
import { ref, unref } from 'vue'
import { useI18n } from 'vue-i18n'
// Composable
const { t } = useI18n()
// Macros
const props = defineProps({
  signed: {
    type: Boolean
  }
})
// Reactive
const menuRef = ref(null)
const items = ref([
  {
    label: 'Формат A4',
  },
  {
    label: 'Формат A5',
  },
  {
    label: 'Формат A6',
  }
])
// Methods
const toggle = (event) => {
  const _menuRef = unref(menuRef)
  _menuRef.menuRef.toggle(event)
}
</script>

<template>
  <div class="resolution-download-view">
    <div
      class="flex items-center gap-2 border rounded-full p-[6px] mt-4"
      :class="[props.signed ? 'bg-primary-100 border-primary-500' : 'bg-critic-100 border-critic-500']"
    >
      <base-iconify
        :icon="props.signed ? 'solar:check-circle-outline' : 'solar:danger-triangle-outline'"
        class="text-critic-500 ml-2"
        :class="[ '!w-5 !h-5', props.signed ? 'text-primary-500' : 'text-critic-500' ]"
      />

      <span
        class="flex-1 text-sm font-medium "
        :class="[ props.signed ? 'text-primary-500' : 'text-critic-500' ]"
      >
        {{ props.signed ? t('resolution-signed') : t('resolution-not-signed') }}
      </span>

      <base-button
        label="Загрузить фишку"
        size="small"
        rounded
        icon-right="solar:alt-arrow-down-outline"
        @click="toggle"
      />

      <base-menu
        ref="menuRef"
        id="overlay_menu"
        :items="items"
      />
    </div>
  </div>
</template>

<style scoped>

</style>
