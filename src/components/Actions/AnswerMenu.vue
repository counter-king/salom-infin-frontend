<script setup>
// Core
import { ref, unref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
// Components
import { ArrowRightDownIcon, ArrowRightUpIcon, AltArrowDownIcon } from '@/components/Icons'
// Composable
const router = useRouter()
const { t, locale } = useI18n()
// Reactive
const menuRef = ref(null)
const items = ref([])
// Watch
watch(
  () => locale.value,
  () => {
    items.value = [
      {
        label: t('inner'),
        icon: ArrowRightDownIcon,
        command: () => router.replace({
          name: 'DashboardIndex'
        })
      },
      {
        label: t('outgoing'),
        icon: ArrowRightUpIcon,
        command: () => router.replace({
          name: 'DashboardIndex'
        })
      },
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
  <div class="answer-menu-view">
    <base-button
      label="answer"
      :icon-right="AltArrowDownIcon"
      rounded
      outlined
      shadow
      type="button"
      border-color="border-transparent"
      @click="toggle"
    />

    <base-menu
      ref="menuRef"
      :items="items"
      width="w-[200px]"
    ></base-menu>
  </div>
</template>
