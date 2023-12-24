<script setup>
// Core
import { useI18n } from 'vue-i18n'
import Accordion from 'primevue/accordion'
import AccordionTab from 'primevue/accordiontab'
// Components
import { UserWithCollapse } from '@/components/Users'
import { StatusChip } from '@/components/Chips'
// Stores
import { useBoxesCommonStore } from '@/modules/Documents/modules/Boxes/stores/common.store'
// Props
import avatarProps from '../../Users/props'
// Enums
import { RESOLUTION_TYPES, STATUS_TYPES } from '@/enums'
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
const resolutionTypes = (type) => {
  switch(type) {
    case RESOLUTION_TYPES.ASSIGNMENT: // Поручение
      return t('assignment')
    case RESOLUTION_TYPES.CONTROL: // Контрольный пункт
      return t('control')
    default: // Для сведения
      return t('for-notice')
  }
}
</script>

<template>
  <div class="mt-2 pl-10">
    <div class="bg-white rounded-t-2xl shadow-button">
      <div class="flex items-start p-2 pb-0">
        <div class="flex flex-1 gap-3 p-2">
          <div class="flex items-center justify-center bg-primary-500 w-10 h-10 rounded-full">
            <base-icon
              name="DocumentTextIcon"
              class="text-white"
            />
          </div>

          <div class="flex-1">
            <div class="flex items-center gap-2 text-sm">
              <h1 class="flex-1 font-semibold text-primary-500">
                {{ resolutionTypes(item.type) }}
              </h1>

              <!-- Резолюция неподписана -->
              <template v-if="!item.is_verified">
                <status-chip :status="{}">
                  Резолюция неподписана
                </status-chip>
              </template>

              <template v-else>
                <status-chip :status="{ id: STATUS_TYPES.DONE }">
                  Резолюция подписана
                </status-chip>
              </template>
            </div>

            <div class="flex items-center gap-2 text-sm leading-[20px]">
              <h1 class="font-semibold text-primary-900">Срок исполнения</h1>

              <div class="w-[6px] h-[6px] bg-greyscale-300 rounded-full"></div>

              <template v-if="item.deadline">
                <h1 class="font-medium text-greyscale-500">{{ item.deadline }}, 18:00</h1>
              </template>

              <template v-else>
                <h1 class="font-medium text-greyscale-500">Без срока исполнений</h1>
              </template>
            </div>
          </div>

<!--          <div class="text-sm font-medium text-critic-500">-->
<!--            Документ еще не подписан-->
<!--          </div>-->
        </div>
      </div>

      <div class="text-sm font-medium px-4 pb-2">
        <h1 v-html="item.content"></h1>
      </div>
    </div>

    <!-- Collapse -->
    <Accordion :key="boxesStore.componentKey" :active-index="0">
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
            <h1 class="text-sm font-semibold text-greyscale-500">Исполнители</h1>

            <div class="flex items-center justify-center bg-greyscale-50 w-6 h-5 rounded-[6px] p-1">
              <span class="text-xs font-semibold text-greyscale-500">{{ item.assignees && item.assignees.length }}</span>
            </div>

            <div class="flex-1"></div>

            <base-icon name="EyeIcon" width="16" class="text-greyscale-500" />

            <h1 class="text-sm font-semibold text-greyscale-500">Резолюция</h1>
          </div>
        </template>

        <user-with-collapse :item="props.item" />
      </AccordionTab>
    </Accordion>
    <!-- Collapse -->
  </div>
</template>

<style scoped>

</style>
