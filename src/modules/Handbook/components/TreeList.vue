<script setup>
import { ref } from 'vue'
import { Buildings2BoldIcon } from '@/components/Icons'
import CardItem from './CardItem.vue'
import CollapseCount from './CollapseCount.vue'
import CollapseList from './CollapseList.vue'

const props = defineProps({
  list: {
    type: Array,
    default: () => []
  }
})

const toggle = ref(0)
const items = ref([])
const itemIndex = ref(undefined)

const handleCollapse = (children, index, toggleVal = toggle.value) => {
  items.value = children

  if (toggleVal & 1) {
    const clicked = index + 1
    const row = Math.ceil(clicked / 4)
    itemIndex.value = row * 4
  } else {
    itemIndex.value = undefined
  }
}

const handleCollapseCount = (val, children, index) => {
  toggle.value = val
  handleCollapse(children, index, val)
}
</script>

<template>
  <div class="tree-list-view">
    <div class="flex flex-wrap relative w-full gap-6">
      <template v-for="(item, index) in list" :key="item.id ?? index">
        <div class="shrink-0 max-w-[410px] w-full relative">
          <template v-if="item.users && item.users.length">
            <card-item
              :item="item.users[0]"
              :index="index"
            />

            <template v-if="item.children && item.children.length">
              <div class="absolute h-12 right-1/2 translate-x-1/2 -bottom-[38px]">
                <collapse-count
                  :count="(item.users.length - 1) + item.children.length"
                  @emit:count="val => handleCollapseCount(val, [...item.users.slice(1).map(i => ({ users: [i] })), ...item.children], index)"
                />
              </div>
            </template>
          </template>

          <template v-else>
            <card-item
              :item="{
                full_name: item.name,
                status: {
                  name: 'Xodimlar mavjud emas',
                  code: 'PR'
                }
              }"
            >
              <template #avatar>
                <div class="flex items-center justify-center w-full h-full bg-greyscale-50 rounded-full">
                  <base-iconify :icon="Buildings2BoldIcon" class="!w-8 !h-8 text-greyscale-300" />
                </div>
              </template>

              <template #footer>
                <div class="text-sm opacity-0">hidden text</div>
              </template>

              <template #actions>
                <span></span>
              </template>
            </card-item>
          </template>
        </div>

        <div
          v-if="itemIndex === index + 1"
          class="full-row shrink-0 max-w-full w-full mt-3"
        >
          <collapse-list v-if="items && items.length" :toggle="toggle" :items="items" :item-index="itemIndex" />
        </div>
      </template>

      <div
        v-if="itemIndex && itemIndex > list.length"
        class="full-row shrink-0 max-w-full w-full mt-3"
      >
        <collapse-list v-if="items && items.length" :toggle="toggle" :items="items" :item-index="itemIndex" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.full-row {
  grid-column: 1 / -1
}
</style>
