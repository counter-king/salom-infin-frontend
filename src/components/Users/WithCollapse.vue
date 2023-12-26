<script setup>
// Core
import { useI18n } from 'vue-i18n'
import Accordion from 'primevue/accordion'
import AccordionTab from 'primevue/accordiontab'
// Components
import { StatusChip } from '@/components/Chips'
import ResolutionCard from '@/components/Tree/components/ResolutionCard.vue'
// Stores
import { useBoxesCommonStore } from '@/modules/Documents/modules/Boxes/stores/common.store'
// Props
import avatarProps from './props'
// Utils
import { formatDateHour } from '@/utils/formatDate'
import { STATUS_TYPES } from '@/enums'
// Composable
const { t } = useI18n()
const boxesStore = useBoxesCommonStore()
// Macros
const props = defineProps({
  ...avatarProps,
  item: {
    type: Object,
    default: () => {}
  }
})
// Methods
const findAssigneeChildren = (target, assignee) => {
  return target.children.filter(children => children.user.id === assignee.user.id)
}
</script>

<template>
  <div class="mt-2 pl-10">
    <template v-if="item.hasOwnProperty('assignees') && item.assignees.length > 0">
      <template v-for="assignee in item.assignees">
        <div class="mt-2">
          <div
            class="bg-white rounded-t-2xl shadow-button"
            :class="{ 'rounded-b-2xl': !findAssigneeChildren(item, assignee).length }"
          >
            <div class="flex items-start p-2">
              <div class="flex flex-1 gap-3 p-2">
                <base-avatar
                  :label="assignee.user?.full_name"
                  :color="assignee.user?.color"
                  :image="assignee.user?.image"
                  avatarClasses="w-10 h-10"
                />

                <div>
                  <div class="flex items-center gap-2 text-sm">
                    <h1
                      class="font-semibold"
                      :class="assignee.is_read ? 'text-primary-500' : 'text-critic-500'"
                    >
                      {{ assignee.is_read ? 'Ознакомлен' : 'Еще не ознакомлен' }}
                    </h1>

                    <template v-if="assignee.is_read">
                      <div class="w-[6px] h-[6px] bg-greyscale-300 rounded-full"></div>

                      <h1 class="font-medium text-greyscale-500">{{ formatDateHour(assignee.read_time) }}</h1>
                    </template>
                  </div>

                  <div class="flex items-center gap-2 text-sm leading-[20px]">
                    <template v-if="assignee.is_controller">
                      <status-chip :status="{ id: STATUS_TYPES.CANCEL }">
                        {{ t('controller') }}
                      </status-chip>
                    </template>

                    <template v-else>
                      <template v-if="assignee.is_responsible">
                        <status-chip :status="{ id: STATUS_TYPES.TODO }">
                          {{ t('executor') }}
                        </status-chip>
                      </template>

                      <template v-else>
                        <status-chip :status="{ id: STATUS_TYPES.IN_PROGRESS }">
                          {{ t('co-executor') }}
                        </status-chip>
                      </template>
                    </template>

                    <div class="w-[6px] h-[6px] bg-greyscale-300 rounded-full"></div>

                    <h1 class="font-semibold text-primary-900">{{ assignee.user?.full_name }}</h1>

                    <div class="w-[6px] h-[6px] bg-greyscale-300 rounded-full"></div>

                    <h1 class="font-medium text-greyscale-500">11-59</h1>
                  </div>
                </div>
              </div>

              <status-chip :status="assignee.status" />
            </div>
          </div>

          <template v-if="item.children && item.children.length > 0">
            <!-- Collapse -->
            <Accordion
              v-if="findAssigneeChildren(item, assignee).length"
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

<!--                    <div class="flex items-center justify-center bg-greyscale-50 w-6 h-5 rounded-[6px] p-1">-->
<!--                      <span class="text-xs font-semibold text-greyscale-500">{{ item.length }}</span>-->
<!--                    </div>-->

                    <div class="flex-1"></div>

                    <!--          <base-icon name="EyeIcon" width="16" class="text-greyscale-500" />-->

                    <!--          <h1 class="text-sm font-semibold text-greyscale-500">Резолюция</h1>-->
                  </div>
                </template>

                <div>
                  <template v-if="item.children && item.children.length > 0">
                    <template v-for="child in findAssigneeChildren(item, assignee)">
                      <resolution-card :item="child" />
                    </template>
                  </template>
                </div>
              </AccordionTab>
            </Accordion>
            <!-- Collapse -->
          </template>
        </div>
      </template>
    </template>
  </div>
</template>

<style scoped>

</style>
