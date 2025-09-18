<script setup>
import TreeList from './TreeList.vue'

const props = defineProps({
  toggle: {
    type: Number,
  },
  items: {
    type: Array,
    default: () => []
  },
  itemIndex: {
    type: Number,
    default: 1
  }
})
</script>

<template>
  <div class="collapse-item-view">
    <template v-if="toggle & 1">
      <div class="h-6 overflow-hidden relative">
        <template v-if="items && items.length">
          <template v-if="items.length > 3">
            <div class="bg-primary-50 w-[204px] h-1 absolute -top-[1px]"></div>

            <div class="flex gap-6 w-full border-t-[2px] border-t-[#DCE0E4]">
              <template v-for="_ in items">
                <div class="shrink-0 max-w-[410px] w-full relative">
                  <div class="w-0.5 h-8 bg-[#DCE0E4] absolute right-1/2 translate-x-1/2"></div>
                </div>
              </template>
            </div>
          </template>

          <template v-else>
            <div class="bg-primary-50 w-[204px] h-1 absolute -top-[1px]"></div>

            <div class="flex gap-6 w-full border-t-[2px] border-t-[#DCE0E4]">
              <template v-for="_ in items">
                <div class="shrink-0 max-w-[410px] w-full relative">
                  <div class="w-0.5 h-8 bg-[#DCE0E4] absolute right-1/2 translate-x-1/2"></div>
                </div>
              </template>
            </div>
          </template>

          <template v-if="itemIndex % 4 === 0">
            <div class="bg-primary-50 w-[207px] h-1 absolute -top-[1px] right-0"></div>
          </template>

          <template v-if="itemIndex % 4 === 3">
            <template v-if="itemIndex < items.length">
              <template v-if="items.length === 4 || items.length > 4">
                <div class="bg-primary-50 w-[207px] h-1 absolute -top-[1px] right-0"></div>
              </template>
            </template>

            <template v-else>
              <div class="bg-primary-50 w-[641px] h-1 absolute -top-[1px] right-0"></div>
            </template>
          </template>

          <template v-if="itemIndex % 4 === 2">
            <template v-if="itemIndex < items.length">
              <template v-if="items.length === 3">
                <div class="bg-primary-50 w-[641px] h-1 absolute -top-[1px] right-0"></div>
              </template>

              <template v-if="items.length === 4 || items.length > 4">
                <div class="bg-primary-50 w-[207px] h-1 absolute -top-[1px] right-0"></div>
              </template>
            </template>

            <template v-else>
              <div class="bg-primary-50 w-[1075px] h-1 absolute -top-[1px] right-0"></div>
            </template>
          </template>

          <template v-if="itemIndex % 4 === 1">
            <template v-if="items.length === 4">
              <div class="bg-primary-50 w-[207px] h-1 absolute -top-[1px] right-0"></div>
            </template>

            <template v-else-if="items.length === 3">
              <div class="bg-primary-50 w-[641px] h-1 absolute -top-[1px] right-0"></div>
            </template>

            <template v-else-if="items.length === 2">
              <div class="bg-primary-50 w-[856px] h-1 absolute -top-[1px] right-0"></div>
            </template>

            <template v-else-if="items.length === 1">
              <div class="bg-primary-50 w-[1509px] h-1 absolute -top-[1px] right-0"></div>
            </template>

            <template v-else>
              <div class="bg-primary-50 w-[207px] h-1 absolute -top-[1px] right-0"></div>
            </template>
          </template>
        </template>
      </div>

      <template v-if="items && items.length">
        <tree-list :list="items" />
      </template>
    </template>
  </div>
</template>

<style scoped>

</style>
