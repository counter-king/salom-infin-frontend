<script setup>
// Core
import { ref, unref } from 'vue'
import { useI18n } from 'vue-i18n'
// Composable
const { t } = useI18n()
// Macros
const emit = defineEmits(['emit:sign'])
// Reactive
const menuRef = ref(null)
const items = ref([
  {
    label: t('eri-keys'),
    items: [
      {
        label: 'key #1',
        icon: 'KeyMinimalisticIcon',
        command: () => signDocument()
      },
      {
        label: 'key #2',
        icon: 'KeyMinimalisticIcon',
        command: () => signDocument()
      },
      {
        label: 'key #3',
        icon: 'KeyMinimalisticIcon',
        command: () => signDocument()
      }
    ]
  }
])
// Methods
const toggle = (event) => {
  const _menuRef = unref(menuRef)
  _menuRef.menuRef.toggle(event)
}
const signDocument = async () => {
  emit('emit:sign')
}
</script>

<template>
  <div class="eri-key-view">
    <base-button
      label="sign-document"
      icon-right="AltArrowDownIcon"
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

<style scoped>

</style>
