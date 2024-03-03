<script setup>
// Core
import { ref } from 'vue'
// Components
import WidgetWrapper from './WidgetWrapper.vue'
import SelectedContacts from '../SelectedContacts.vue'
import AllContacts from '../AllContacts.vue'
// Reactive
const activeTabMenuIndex = ref(1)
const tabMenuItems = ref([
  {
    label: 'Избранный',
    name: 'Selected',
  },
  {
    label: 'Все',
    name: 'All',
  },
])
</script>

<template>
  <widget-wrapper title="contacts">
    <template #header-after>
      <base-tab-menu
        v-model="activeTabMenuIndex"
        :tab-items="tabMenuItems"
        bricks
      />
    </template>

    <template #content>
      <template v-if="activeTabMenuIndex === 0">
        <selected-contacts />
      </template>

      <template v-else>
        <all-contacts />
      </template>
    </template>
  </widget-wrapper>
</template>

<style scoped>

</style>
