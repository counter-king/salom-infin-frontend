<script setup>
import { computed } from 'vue'
import CardItem from './CardItem.vue'

const props = defineProps({
  value: {
    type: Array,
    default: () => []
  },
  isSearch: {
    type: Boolean
  },
  totalCount: {
    type: Number
  }
})

const flatDeepItems = computed(() => props.isSearch ? props.value : collectUsersFromArray(props.value))

function collectUsersFromArray(departments) {
  let result = []

  for (const dep of departments) {
    result.push(...collectUsers(dep))
  }

  return result
}
function collectUsers(department) {
  let result = []

  if (Array.isArray(department.users)) {
    result.push(...department.users)
  }

  if (Array.isArray(department.children)) {
    for (const child of department.children) {
      result.push(...collectUsers(child))
    }
  }

  return result
}
</script>

<template>
  <div class="grid grid-cols-4 gap-5">
    <template v-for="(item, index) in flatDeepItems" :key="item.id">
      <card-item :item="item" :index="index" />
    </template>
</div>
</template>

<style scoped>

</style>
