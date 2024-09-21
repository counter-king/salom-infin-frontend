<script setup>
// Components
import PermissionItem from './Item.vue'
import PermissionItemCollapse from './ItemCollapse.vue'
// Macros
const props = defineProps({
  items: {
    type: Array,
    default: () => []
  }
})
</script>

<template>
  <div class="permission-container-view">
    <template v-for="(item, index) in items">
      <template v-if="item.children.length">
        <permission-item-collapse
          :item="item"
          :index="index"
          :items="items"
          class="mt-[2px]"
        />
      </template>

      <template v-else>
        <permission-item
          :item="item"
          :index="index"
          :items="items"
          class="h-12 !rounded-none hover:rounded-xl border-none shadow-[0_1.5px_0px_0px_#F2F2F2] hover:shadow-none"
        />
      </template>
    </template>
  </div>
</template>
