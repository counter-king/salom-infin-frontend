<script setup>
// Core
import { ref, unref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
// Components
import { CheckCircleIcon, DangerTriangleIcon, AltArrowDownIcon } from '@/components/Icons'
// Composable
const { t, locale } = useI18n()
// Macros
const props = defineProps({
  signed: {
    type: Boolean
  }
})
// Reactive
const menuRef = ref(null)
const items = ref([])
// Watch
watch(
  () => locale.value,
  () => {
    items.value = [
      {
        label: t('paper-format.a4'),
      },
      {
        label: t('paper-format.a5'),
      },
      {
        label: t('paper-format.a6'),
      }
    ]
  },
  {
    immediate: true
  }
)
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
        :icon="props.signed ? CheckCircleIcon : DangerTriangleIcon"
        class="text-critic-500 ml-2"
        :class="[ props.signed ? 'text-primary-500' : 'text-critic-500' ]"
      />

      <span
        class="flex-1 text-sm font-medium "
        :class="[ props.signed ? 'text-primary-500' : 'text-critic-500' ]"
      >
        {{ props.signed ? t('resolution-signed') : t('resolution-not-signed') }}
      </span>

      <base-button
        label="download-fishka"
        size="small"
        rounded
        :icon-right="AltArrowDownIcon"
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
