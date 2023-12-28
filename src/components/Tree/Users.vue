<script setup>
// Core
import Accordion from 'primevue/accordion'
import AccordionTab from 'primevue/accordiontab'
import { useI18n } from 'vue-i18n'
// Components
import { StatusChip } from '@/components/Chips'
import ResolutionCard from '@/components/Tree/components/ResolutionCard.vue'
// Stores
import { useBoxesCommonStore } from '@/modules/Documents/modules/Boxes/stores/common.store'
// Utils
import { formatDateHour } from '@/utils/formatDate'
// Composable
const { t } = useI18n()
const boxesStore = useBoxesCommonStore()
// Macros
const props = defineProps({
  treeItems: {
    type: Object,
    default: () => {}
  }
})
</script>

<template>
  <div class="bg-greyscale-50 rounded-lg p-6 mt-10">
    <template v-for="reviewer in treeItems.reviewers" :key="reviewer.id">
      <div class="mb-6">
        <div class="flex items-center gap-2 text-sm mb-2">
          <h1 class="font-semibold text-primary-900">{{ t('reviewers') }}</h1>

          <div class="w-[6px] h-[6px] bg-greyscale-300 rounded-full"></div>

          <h1 class="font-medium text-greyscale-500">{{ formatDateHour(reviewer.created_date) }}</h1>
        </div>

        <div
          class="bg-white rounded-t-2xl shadow-button"
          :class="{ 'rounded-b-2xl': !(reviewer.assignments && reviewer.assignments.length) }"
        >
          <div class="flex items-start p-2">
            <div class="flex flex-1 gap-3 p-2">
              <base-avatar
                :label="reviewer.user?.full_name"
                :color="reviewer.user?.color"
                :image="reviewer.user?.image"
                avatarClasses="w-10 h-10"
              />

              <div>
                <div class="flex items-center gap-2 text-sm">
                  <h1
                    class="font-semibold"
                    :class="reviewer.read_time ? 'text-primary-500' : 'text-critic-500'"
                  >
                    {{ reviewer.read_time ? 'Ознакомлен' : 'Еще не ознакомлен' }}
                  </h1>

                  <template v-if="reviewer.read_time">
                    <div class="w-[6px] h-[6px] bg-greyscale-300 rounded-full"></div>

                    <h1 class="font-medium text-greyscale-500">{{ formatDateHour(reviewer.read_time) }}</h1>
                  </template>
                </div>

                <div class="flex items-center gap-2 text-sm leading-[20px]">
                  <h1 class="font-semibold text-primary-900">{{ reviewer.user?.full_name }}</h1>

                  <div class="w-[6px] h-[6px] bg-greyscale-300 rounded-full"></div>

                  <h1 class="font-medium text-greyscale-500">11-59</h1>
                </div>
              </div>
            </div>

            <status-chip :status="reviewer.status" />
          </div>
        </div>

        <!-- Collapse -->
        <Accordion
          v-if="reviewer.assignments && reviewer.assignments.length"
          :key="boxesStore.componentKey"
          :active-index="0"
        >
          <AccordionTab
            :pt="{
            root: {
              class: 'mb-0'
            },
            headerAction: {
              class: 'bg-white border-0 rounded-b-2xl border-t border-t-greyscale-200 rounded-none py-2 px-4'
            },
            content: {
              class: 'bg-transparent border-0 p-0'
            },
            headerIcon: {
              class: 'w-3 h-3 text-greyscale-500'
            }
          }"
          >
            <template #header>
              <div class="flex items-center gap-2 w-full">
                <h1 class="text-sm font-semibold text-greyscale-500">Резолюция</h1>

<!--                <div class="flex items-center justify-center bg-greyscale-50 w-6 h-5 rounded-[6px] p-1">-->
<!--                  <span class="text-xs font-semibold text-greyscale-500">2</span>-->
<!--                </div>-->
              </div>
            </template>

            <div>
              <template v-for="resolution in reviewer.assignments" :key="resolution.id">
                <resolution-card :item="resolution" />
              </template>
            </div>
          </AccordionTab>
        </Accordion>
        <!-- Collapse -->
      </div>
    </template>
  </div>
</template>

<style scoped>

</style>
