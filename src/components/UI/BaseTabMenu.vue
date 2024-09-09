<script setup>
// Core
import { useModel } from 'vue'
import TabMenu from 'primevue/tabmenu'
// Macros
const props = defineProps({
  modelValue: {
    type: [Number, String],
    default: 0
  },
  tabItems: {
    type: Array,
    default: () => []
  },
  segment: {
    type: Boolean
  },
  bricks: {
    type: Boolean
  },
  menuClass: {
    type: String
  }
})
const modelValue = useModel(props, 'modelValue');
const emit = defineEmits(['update:modelValue'])
// Methods
const panelClass = (_, state, context) => {
  return [
    {
      'text-primary-900 font-semibold !border-primary-500': context.index === state.d_activeIndex && !(props.segment || props.bricks)
    },
    {
      'border-hidden bg-white shadow-md': context.index === state.d_activeIndex && props.segment
    },
    {
      'bg-greyscale-50 !text-primary-500 !font-semibold': context.index === state.d_activeIndex && props.bricks
    }
  ]
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
        class:[
          {
          'px-2 border-b border-greyscale-200': !(props.segment || props.bricks),
          'bg-primary-50 rounded-xl border-hidden': props.segment,
          'gap-1 !px-0 border-none h-7': props.bricks
          },
          props.menuClass
        ]
      },
      panelContainer: {
        class: 'flex-1 p-0 overflow-hidden'
      },
      action: ({ _, state, context }) => ({
        class: [
          'text-greyscale-500 font-medium',
          {
            'm-0 border-transparent text-greyscale-500 font-medium py-4 px-0 mx-4': !(props.segment || props.bricks),
            'm-0 border-transparent bg-inherit font-medium py-2 m-1 mb-[2px] w-32 text-center rounded-lg flex justify-center': props.segment,
            '!ml-0 !py-1 !px-2 rounded-[6px] border-none hover:bg-greyscale-50': props.bricks
          },
          panelClass(_, state, context)
        ],
      }),
      label: {
        class: [
          'text-[15px]',
          {
            '!text-sm': props.bricks
          }
        ]
      }
    }"
  >
    <template #itemicon="{ item }">
      <base-iconify
        v-if="item.icon"
        :icon="item.icon"
        class="!w-[18px] !h-[18px] mr-2"
      />
    </template>
  </TabMenu>
</template>

<style scoped>

</style>
