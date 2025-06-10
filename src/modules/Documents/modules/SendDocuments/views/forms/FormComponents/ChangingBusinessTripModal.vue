<script setup>
// Core
import { useI18n } from "vue-i18n"
// Store
import { useExtendBusinessTripStore } from "@/modules/Documents/modules/SendDocuments/stores/extendBusinessTrip.store"
// Components
import BaseIconify from "@/components/UI/BaseIconify.vue"
import { AddPlusIcon, InfoCircleBoldIcon } from "@/components/Icons"
import BaseChip from "@/components/UI/BaseChip.vue";
import { UserWithRadio } from "@/components/Users";
import { formatDateReverse } from "@/utils/formatDate";
import { dispatchNotify } from "@/utils/notify";
import { COLOR_TYPES } from "@/enums";
// Composable
const store = useExtendBusinessTripStore()
const { t } = useI18n()
// Methods
const onChangeClick = () => {
  const hasRegions = store.tempVerifications?.length > 0
  if (!hasRegions) {
    dispatchNotify(null, "Kamida bitta hudud qo'shing!", COLOR_TYPES.WARNING)
    return
  }
  store.actionUpdateUserTrip()
}

const onCancel = () => {
  store.actionClearTempModel()
}
const onClearItem = (item, index) => {
  store.tempVerifications.splice(index, 1)
}
const addLocation = () => {

}
const onRegionsChange = (regions) => {
  regions.value.forEach(region => {
    const exists = store.tempVerifications.some(item => item.region.id === region.id)
    if (!exists) {
      store.tempVerifications.push({
        region,
        is_visited: false,
      })
    }
    store.tempRegions = []
  })
}
</script>

<template>
  <base-dialog
    v-model="store.changingBTDialog"
    label="confirm"
    max-width="max-w-[631px]"
    :closable="false"
  >
    <template #content>
      <template v-if="store.changingBTLoading">
        <base-spinner class="my-16"/>
      </template>

      <template v-else>
        <div class="flex flex-col gap-y-5">
          <div class="flex gap-x-3 py-3 px-4 bg-warning-50 border border-warning-100 rounded-xl">
            <base-iconify :icon="InfoCircleBoldIcon" class="text-warning-500 !w-6 !h-6"/>

            <div class="text-sm font-medium text-greyscale-500">Siz rostdan ham <span
              class="text-green-900">{{ store.changingBTModel?.user?.full_name }}</span>ga tegishli bo'lgan xizmat
              safarini o'zgartirmoqchimisiz? <br> Bunda xizmat safari bilan vaqtinchalik amaliyot bajarish to'xtatiladi!
            </div>
          </div>

          <div class="flex flex-col gap-y-2">
            <span class="text-sm font-medium text-greyscale-500">{{ t('trip-place') }} <span class="text-red-500">*</span> </span>
            <div class="flex flex-wrap gap-3">
              <base-chip
                v-for="(item, index) in store.tempVerifications"
                :key="item.id"
                :label="item?.region?.name_uz"
                :clearable="!item.is_visited"
                type="location"
                class="w-fit"
                @emit:clear="onClearItem(item, index)"
              />
            </div>

            <base-multi-select
              v-model="store.tempRegions"
              api-url="regions"
              :token-class="['chip-hover shadow-button bg-white cursor-pointer']"
              display="chip"
              selectable
              type="department"
              placeholder="add-trip-place"
              required
              @emit:change="(val) => onRegionsChange(val)"
            >
              <template #chip="{ value }">
                {{ value.name }}
              </template>

              <template #option="{ value }">
                <user-with-radio
                  :title="value.name"
                  :text-truncate="false"
                >
                </user-with-radio>
              </template>
            </base-multi-select>
          </div>

          <div class="flex flex-col gap-y-2">
            <base-calendar
              v-model="store.changingBTModel.end_date"
              :min-date="new Date(store.changingBTModel.start_date)"
              required
              label="end-date"
              placeholder="choose-end-time"
              @update:modelValue="(value) => store.changingBTModel.end_date = formatDateReverse(value)"
            />
          </div>

<!--          <pre>{{ store.changingBTModel }}</pre>-->
        </div>
      </template>
    </template>

    <template v-if="!store.changingBTLoading" #footer>
      <base-button
        color="bg-white hover:bg-greyscale-100 text-primary-dark"
        border-color="border-transparent"
        label="cancel"
        rounded
        shadow
        type="button"
        @click="onCancel"
      />

      <base-button
        :loading="store.userTripUpdateButtonLoading"
        label="update"
        rounded
        shadow
        type="button"
        @click="onChangeClick"
      />
    </template>
  </base-dialog>
</template>

<style scoped>

</style>
