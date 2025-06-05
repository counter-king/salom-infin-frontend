<script setup>
import { ref, watch, inject, onMounted, useModel } from 'vue'
import { useDebounceFn } from '@vueuse/core'
import { useI18n } from 'vue-i18n'
import { MagniferIcon } from '@/components/Icons'
import BaseInput from '@/components/UI/BaseInput.vue'
import HandbookDropdown from '@/modules/Handbook/components/Dropdown.vue'
import { fetchCompaniesList, fetchDepartmentList } from '@/services/common.service'
import { formatDateReverse } from '@/utils/formatDate'
import { USER_STATUS_CODES } from '@/enums'

const props = defineProps({
  modelValue: {
    type: Boolean,
  },
  label: {
    type: String,
  },
  conditions: {
    type: String
  }
})
const emit = defineEmits(['update:filtered', 'emit:after-hide'])

const { t } = useI18n()
const model = useModel(props, 'modelValue')
const { filters } = inject('filters')

const companies = ref([])
const departments = ref([])

const handleSearch = useDebounceFn(() => emit('update:filtered', filters.value), 500)
const handleCompany = async (value) => {
  // Сбросим данные департаментов после выборки
  // для того чтобы заново выбрать департамент
  departments.value = []
  filters.value.department = null

  if(!filters.value.company) {
    emit('update:filtered', filters.value)
    return
  }

  filters.value.company = value
  emit('update:filtered', filters.value)

  let { data } = await fetchDepartmentList({
    page_size: 100,
    company: filters.value.company,
    condition: 'A,K'
  })

  departments.value = data.results
}
const handleDepartment = (value) => {
  filters.value.department = value

  emit('update:filtered', filters.value)
}

watch(
  () => filters.value.__date,
  (value) => {
    const [start, end] = value

    if(start && end) {
      filters.value.start_date = formatDateReverse(start)
      filters.value.end_date = formatDateReverse(end)

      emit('update:filtered', filters.value)
    }
  }
)

onMounted(async () => {
  let { data } = await fetchCompaniesList({ page_size: 100 })
  companies.value = data.results
})
</script>

<template>
  <base-dialog
    v-model="model"
    :label="label"
    @emit:after-hide="emit('emit:after-hide')"
    max-width="max-w-[1840px]"
  >
    <template #header>
      <div class="flex flex-1 items-center mr-6">
        <h1 class="text-xl font-bold text-greyscale-900">
          {{ label }}
        </h1>

<!--        <div class="flex flex-1 items-center justify-end gap-2">-->
<!--          <div class="w-full max-w-[316px]">-->
<!--            <base-input-->
<!--              v-model="filters.search"-->
<!--              :icon-left="MagniferIcon"-->
<!--              :placeholder="t('search')"-->
<!--              class="flex p-input-icon-left items-center"-->
<!--              input-class="shadow-button !pl-10 p-3 bg-white text-xs !rounded-[90px] placeholder:text-xs"-->
<!--              icon-left-class="!w-4 !h-4"-->
<!--              @input="handleSearch"-->
<!--            />-->
<!--          </div>-->

<!--          <div class="max-w-[350px] w-full">-->
<!--            <handbook-dropdown-->
<!--              v-model="filters.company"-->
<!--              :options="companies"-->
<!--              :placeholder="t('branch')"-->
<!--              @emit:change="handleCompany"-->
<!--            />-->
<!--          </div>-->

<!--          <div class="max-w-[350px] w-full">-->
<!--            <handbook-dropdown-->
<!--              v-model="filters.department"-->
<!--              :options="departments"-->
<!--              :placeholder="t('departments')"-->
<!--              @emit:change="handleDepartment"-->
<!--            />-->
<!--          </div>-->

<!--          <template v-if="props.conditions !== USER_STATUS_CODES.BUSINESS_TRIP">-->
<!--            <div class="max-w-[350px] w-full">-->
<!--              <base-calendar-->
<!--                v-model="filters.__date"-->
<!--                selection-mode="range"-->
<!--                root-class="!bg-white !rounded-[80px] shadow-button !h-10 !cursor-pointer"-->
<!--                input-class="!bg-white leading-[14px] !py-3 !pl-4 !cursor-pointer"-->
<!--                dropdown-button-class="!bg-white"-->
<!--                placeholder="Выберите дату"-->
<!--                date-format="dd.mm.yy"-->
<!--              />-->
<!--            </div>-->
<!--          </template>-->
<!--        </div>-->
      </div>
    </template>

    <template #content>
      <slot name="content" />
    </template>

    <template #footer>
      <div class="h-10"></div>
    </template>
  </base-dialog>
</template>

<style scoped>

</style>
