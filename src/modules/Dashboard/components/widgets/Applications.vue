<script setup>
// Components
import WidgetWrapper from './WidgetWrapper.vue'
// Non-reactive
const list = [
  'Трудовой отпуск',
  'Материалка',
  'Учебный отпуск',
  'Командировка',
  'В отпуск за свой счет',
  'Отпуск по уходу за ребенком'
]
</script>

<template>
  <widget-wrapper>
    <template #header-after>
      <router-link to="/" class="text-primary-500 text-sm font-semibold">
        Все
      </router-link>
    </template>

    <template #content>
      <template v-for="(item, index) in list" :key="index">
        <div
          class="flex items-center gap-2 bg-greyscale-50 h-12 rounded-lg py-3 px-4"
          :class="{ 'mb-1': index !== list.length - 1 }"
        >
          <base-icon
            name="AddCircleIcon"
            type="primary"
          />

          <h1 class="text-sm text-primary-900 font-semibold">{{ item }}</h1>
        </div>
      </template>
    </template>
  </widget-wrapper>
</template>

<style scoped>

</style>
