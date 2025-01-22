<script setup>
// Core
import { useI18n } from 'vue-i18n'
import Accordion from 'primevue/accordion'
import AccordionTab from 'primevue/accordiontab'
// Components
import { StatusChip } from '@/components/Chips'
import { FolderWithFilesIcon } from '@/components/Icons'
import ResolutionCard from '@/components/Tree/components/ResolutionCard.vue'
// Stores
import { useAuthStore } from '@/modules/Auth/stores'
import { useBoxesCommonStore } from '@/modules/Documents/modules/Boxes/stores/common.store'
// Props
import avatarProps from './props'
// Utils
import { formatDateHour } from '@/utils/formatDate'
import { STATUS_TYPES } from '@/enums'
// Composable
const { t } = useI18n()
const authStore = useAuthStore()
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
        <div class="resolution-card relative after:!left-[-25px] mt-2">
          <div
            class="bg-white rounded-t-2xl shadow-button"
            :class="{
              'rounded-b-2xl': !findAssigneeChildren(item, assignee).length,
              'border border-primary-500': authStore.currentUser.id === assignee.user.id,
              'border-b-0': findAssigneeChildren(item, assignee).length && authStore.currentUser.id === assignee.user.id
            }"
          >
            <div class="flex items-start p-2">
              <div class="flex flex-1 gap-3 p-2">
                <base-avatar
                  :label="assignee.user?.full_name"
                  :color="assignee.user?.color"
                  :image="assignee.user?.avatar?.url"
                  detail-dialog
                  avatarClasses="w-10 h-10"
                />

                <div>
                  <div class="flex items-center gap-2 text-sm">
                    <h1
                      class="font-semibold"
                      :class="assignee.is_read === true && assignee.is_performed === false
                        ? 'text-primary-500'
                        : assignee.is_read === true && assignee.is_performed === true
                          ? 'text-success-500'
                          : 'text-critic-500'
                      "
                    >
                      {{
                        assignee.is_read === true && assignee.is_performed === false
                          ? t('approved')
                          : assignee.is_read === true && assignee.is_performed === true && assignee.is_controller === false
                            ? t('done')
                            : assignee.is_read === true && assignee.is_performed === true && assignee.is_controller === true
                              ? t('remove-from-control-2')
                              : t('not-approved')
                      }}
                    </h1>

                    <template v-if="assignee.is_read">
                      <div class="w-[6px] h-[6px] bg-greyscale-300 rounded-full"></div>

                      <h1 class="font-medium text-greyscale-500">
                        <template v-if="assignee.performed_date">
                          {{ formatDateHour(assignee.performed_date) }}
                        </template>

                        <template v-else>
                          {{ formatDateHour(assignee.read_time) }}
                        </template>
                      </h1>
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

                    <h1 class="font-medium text-greyscale-500">{{ assignee.user?.cisco }}</h1>
                  </div>
                </div>
              </div>

              <status-chip :status="assignee.status" />
            </div>

            <div v-if="assignee.content" class="text-sm font-medium px-4 pb-2 -mt-2">
              <p v-html="assignee.content"></p>

              <template v-if="assignee.files && assignee.files.length">
                <template v-for="file in assignee.files">
                  <div class="mt-1">
                    <a
                      :href="file.url"
                      target="_blank"
                      class="inline-flex items-center gap-2 font-medium text-primary-500 py-1"
                    >
                      <base-iconify
                        :icon="FolderWithFilesIcon"
                        class="!w-[18px] !h-[18px]"
                      />
                      <span class="lowercase border-b border-dashed border-primary-500">{{ file.name }}</span>
                    </a>
                  </div>
                </template>
              </template>
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
                  class: [
                    'bg-white border-0 rounded-b-2xl border-t border-t-greyscale-200 rounded-none py-2 px-4',
                    {
                      '!border !border-primary-500 !border-t-greyscale-200': authStore.currentUser.id === assignee.user.id
                    }
                  ]
                },
                content: {
                  class: 'bg-transparent overflow-hidden border-0 p-0'
                },
                headerIcon: {
                  class: 'w-3 h-3 text-greyscale-500'
                }
              }"
              >
                <template #header>
                  <div class="flex items-center gap-2 w-full">
                    <h1 class="text-sm font-semibold text-greyscale-500">{{ t('resolution') }}</h1>

                    <!--                    <div class="flex items-center justify-center bg-greyscale-50 w-6 h-5 rounded-[6px] p-1">-->
                    <!--                      <span class="text-xs font-semibold text-greyscale-500">{{ item.length }}</span>-->
                    <!--                    </div>-->

                    <div class="flex-1"></div>

                    <!--          <base-icon name="EyeIcon" width="16" class="text-greyscale-500" />-->

                    <!--          <h1 class="text-sm font-semibold text-greyscale-500">Резолюция</h1>-->
                  </div>
                </template>

                <div class="overflow-hidden">
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
