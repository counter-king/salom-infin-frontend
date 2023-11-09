<script setup>
// Core
import { useModel } from 'vue'
import TabMenu from 'primevue/tabmenu'
// Composable
const modelValue = useModel(props, 'modelValue')
// Macros
const props = defineProps({
  modelValue: {
    type: [Number, String],
    default: 0
  },
  tabItems: {
    type: Array,
    default: () => []
  }
})
// Methods
const panelClass = (props, state, context) => {
  return {
    'text-primary-900 font-semibold !border-primary-500': context.index === state.d_activeIndex
  }
}
</script>

<template>
  <TabMenu
    v-model:activeIndex="modelValue"
    :model="tabItems"
    :pt="{
      root: {
        class: 'flex flex-col'
      },
      menu: {
        class: 'px-2 border-b border-greyscale-200'
      },
      panelContainer: {
        class: 'flex-1 p-0 overflow-hidden'
      },
      action: ({ props, state, context }) => ({
        class: [panelClass(props, state, context), 'm-0 border-transparent text-greyscale-500 font-medium py-4 px-0 mx-4']
      }),
      label: {
        class: 'text-[15px]'
      }
    }"
  >
    <template #itemicon="{ item }">
      <base-icon
        v-if="item.icon"
        :name="item.icon"
        width="18"
        height="18"
        class="mr-2"
      />
    </template>
  </TabMenu>
</template>

<style scoped>

</style>
