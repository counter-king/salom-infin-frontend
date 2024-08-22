<script setup>
// Core
import {useI18n} from "vue-i18n"
import {useRoute, useRouter} from "vue-router"
import {computed, onBeforeUnmount} from "vue"
// Utils
import {formatDateReverse} from "@/utils/formatDate"
// Store
import {useBusinessTripStore} from "@/modules/HR/modules/BusinessTrip/stores/businessTrip.store"
import {useCommonStore} from "@/stores/common"
// Components
import {AddPlusIcon, TrashBinTrashIcon} from "@/components/Icons"
import {ROUTE_HR_BUSINESS_TRIP_ADVANCE_REPORT_LIST} from "@/modules/HR/constants";
import {dispatchNotify} from "@/utils/notify";
import {COLOR_TYPES} from "@/enums";

const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const BTStore = useBusinessTripStore()
const commonStore = useCommonStore()

// Computed
const totalExpenses = computed(() => {
  return BTStore.advanceReportModel.reduce((sum, item) => sum + (Number(item.amount) || 0), 0)
})

// Methods
const create = async () => {
  try {
    await BTStore.actionAdvanceReportCreate(route.params.id)
    await router.replace({
      name: ROUTE_HR_BUSINESS_TRIP_ADVANCE_REPORT_LIST,
      params: {
        id: route.params.id
      }
    })
    await BTStore.actionGetBusinessTripDetail(route.params.id)
    BTStore.actionResetModel()
    dispatchNotify(null, t('document-sent'), COLOR_TYPES.SUCCESS)
  } catch (err) {
    BTStore.buttonLoading = false
    console.log(err)
  }
}

onBeforeUnmount(() => {
  BTStore.actionResetModel()
})
</script>

<template>
  <div class="p-6">
    <div class="flex flex-col overflow-y-auto gap-y-2" style="height: calc(100vh - 380px)">
      <div
        v-for="(item, index) in BTStore.advanceReportModel"
        :key="index"
        class="flex flex-col border-[1.5px] rounded-2xl py-4 px-6"
      >
        <div class="flex items-center justify-between w-full">
          <span class="text-base font-semibold text-primary-900">{{ t('expenses') }} {{ index === 0 ? '' : index + 1 }}</span>

          <div
            class="flex justify-center items-center cursor-pointer w-8 h-8 rounded-lg"
            :class="index === 0 ? 'bg-primary-30 hover:bg-primary-100' : 'bg-critic-30 hover:bg-critic-100'"
            @click="BTStore.actionManageAdvanceReport(index)"
          >
            <base-iconify
              :icon="index === 0 ? AddPlusIcon : TrashBinTrashIcon"
              class="!w-5 !h-5"
              :class="index === 0 ? 'text-primary-500' : 'text-critic-500'"
            />
          </div>
        </div>

        <base-row>
          <base-col col-class="w-1/3">
            <base-dropdown
              v-model="item.type"
              v-model:options="commonStore.expenseTypeList"
              api-url="expense-types"
              option-label="name"
              option-value="id"
              label="expense-type"
              placeholder="select-expense-type"
              searchable
            >
            </base-dropdown>
          </base-col>

          <base-col col-class="w-1/3">
            <base-calendar
              v-model="item.date"
              label="date"
              placeholder="choose-date"
              @update:modelValue="(value) => item.date = formatDateReverse(value)"
            />
          </base-col>

          <base-col col-class="w-1/3">
            <base-input
              v-model="item.amount"
              label="amount"
              placeholder="enter-amount"
              mask-rule="##########################"
            />
          </base-col>

          <base-col col-class="w-1/2">
            <base-input
              v-model="item.comment"
              label="description"
              placeholder="enter-short-description"
            />
          </base-col>

          <base-col col-class="w-1/2 flex items-end">
            <base-file-upload
              v-model="item.file"
              :multiple="false"
              size="small"
              class="flex-1"
              @emit:file-upload="(files) => item.file = files[0].id"
              @emit:on-file-delete="item.file = null"
            />
          </base-col>

        </base-row>
      </div>
    </div>

    <div class="flex items-center gap-x-3 rounded-xl bg-primary-10 border border-primary-100 mt-3 mb-5 py-3 px-4">
      <span class="text-base font-medium text-greyscale-500">{{ t('total-expenses') }}: </span>
      <span class="text-base font-medium font-semibold">{{ totalExpenses }}</span>
    </div>

    <div class="flex">
      <base-button
        label="send"
        rounded
        shadow
        border-color="border-transparent"
        :loading="BTStore.buttonLoading"
        class="mr-2"
        @click="create"
      />

      <base-button
        label="save-as-draft"
        color="bg-greyscale-50 hover:bg-greyscale-100 text-primary-dark"
        rounded
        shadow
        border-color="border-transparent"
      />
    </div>
  </div>
</template>

<style scoped>

</style>
