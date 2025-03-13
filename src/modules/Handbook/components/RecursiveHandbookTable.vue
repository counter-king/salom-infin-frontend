<script setup>
// Core
// Components
import HandbookTable from './HandbookTable.vue'
// Enum
import { CONDITION } from '../enums'
// Macros
const props = defineProps({
  item: {
      type: Object,
      required: true
    },
    topLevel: {
      type: String,
      default: null
  }
})

const emit = defineEmits(['emit:page-change'])

// left only item codiation is A
const itemChildren = props.item.children.filter((child)=> child.condition === CONDITION.A)
</script>

<template>
  <div>
    <handbook-table :item="item" :top-level="props.topLevel">
      <template #top-level>
        {{ props.topLevel }}
      </template>
    </handbook-table>
    <template v-if="item.children && item.children.length > 0">
      <recursive-handbook-table
        v-for="child in itemChildren"
        :key="child.id"
        :item="child"
        :top-level="props.topLevel"
      />
    </template>
  </div>
</template>


