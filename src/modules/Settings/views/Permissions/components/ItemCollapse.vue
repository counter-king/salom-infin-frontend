<script setup>
// Core
import Accordion from 'primevue/accordion'
import AccordionTab from 'primevue/accordiontab'
// Components
import PermissionActions from './Actions.vue'
import PermissionItem from './Item.vue'
// Macros
const props = defineProps({
  item: {
    type: Object,
    default: () => {}
  },
  index: {
    type: Number
  },
  items: {
    type: Array,
    default: () => []
  }
})
</script>

<template>
  <div class="permission-item-collapse-view">
    <Accordion>
      <AccordionTab
        :pt="{
          root: {
            class: 'mb-0'
          },
          header: {
            class: 'permission-header'
          },
          headerAction: {
            class: 'group justify-between flex-row-reverse gap-3 bg-white hover:bg-greyscale-50 rounded-none hover:rounded-xl border-none shadow-[0_1.5px_0px_0px_#F2F2F2] hover:shadow-none py-3 px-4'
          },
          headerIcon: {
            class: 'rotate-90 text-greyscale-400 m-0'
          },
          content: {
            class: 'border-none p-0 pl-6'
          }
        }"
      >
        <template #header>
          <div class="flex flex-1">
            <span class="flex-1 line-clamp-1 text-sm leading-[24px] font-semibold text-greyscale-900">{{ item.name_ru }}</span>

            <div class="permission-actions-block hidden group-hover:block">
              <permission-actions
                :item="item"
                :index="index"
                :items="items"
              />
            </div>
          </div>
        </template>

        <template v-for="(sub, subIndex) in item.children">
          <template v-if="sub.children && sub.children.length > 0">
            <item-collapse
              :item="sub"
              :index="subIndex"
              :items="item.children"
              class="mt-[2px]"
            />
          </template>

          <template v-else>
            <permission-item
              :item="sub"
              :index="subIndex"
              :items="item.children"
              class="h-12 !rounded-none hover:rounded-xl border-none shadow-[0_1.5px_0px_0px_#F2F2F2] hover:shadow-none"
            />
          </template>
        </template>
      </AccordionTab>
    </Accordion>
  </div>
</template>

<style>
/* .permission-header.p-highlight > .p-accordion-header-link {
  @apply bg-greyscale-100;
  @apply rounded-xl;
  @apply shadow-none
} */

/* .permission-header.p-highlight .permission-actions-block {
  display: block;
  color: red;
} */
</style>
