<script setup>
// Core
import { computed, ref } from "vue"
import { useI18n } from "vue-i18n"
import { useRoute, useRouter } from "vue-router"
import { useVuelidate } from "@vuelidate/core"
// Store
import { useBusinessTripStore } from "@/modules/Documents/modules/SendDocuments/stores/businessTrip.store"
// Enums
import { STEPPER_ROUTE, STEPPER_TRIP_INFO } from "@/modules/Documents/modules/SendDocuments/constants"
import { COLOR_TYPES } from "@/enums"
// Utils
import { dispatchNotify } from "@/utils/notify"
// Components
import UserMultiSelect from "@/components/Select/UserMultiSelect.vue"
import { AddPlusIcon, TrashBinTrashBoldIcon } from "@/components/Icons"

// Composable
const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const store = useBusinessTripStore()
const $v = useVuelidate(store.trip_plan_rules, store.trip_plan_model)

// Reactive
const showNestedError = ref(false)

// Computed
const users = computed(() => {
  const seenIds = new Set()
  return store.model.__groups
    .reduce((acc, obj) => {
      if (obj.__users && Array.isArray(obj.__users)) {
        return acc.concat(obj.__users)
      }
      return acc
    }, [])
    .filter((user) => {
      if (seenIds.has(user.id)) {
        return false
      }
      seenIds.add(user.id)
      return true
    })
})

// Methods
const stepClick = async (step) => {
  const valid = await $v.value.$validate()
  showNestedError.value = true
  if (!valid) {
    dispatchNotify(null, t('fill-required-fields'), COLOR_TYPES.WARNING)
    return
  }

  await store.actionStepClick(router, route, step)
}
const addRow = () => {
  store.actionAddWorkPlanRow()
  showNestedError.value = false
}

defineExpose({
  stepClick
})

</script>

<template>
  <div class="work-plan-component">
    <div class="flex flex-col gap-y-3" >
      <div
        v-for="(item, index) in store.trip_plan_model.trip_plans"
        class="border-[1.5px] border-greyscale-200 rounded-2xl px-5 py-4"
      >
        <div class="flex justify-between">
          <span class="text-base text-primary-900 font-semibold mb-1">{{ t('plan') }}-{{ index + 1 }}</span>

          <div
            v-if="index !== 0"
            class="flex justify-center items-center bg-critic-50 rounded-lg w-7 h-7 cursor-pointer"
            @click="store.actionDeleteWorkPlanRow(index)"
          >
            <base-iconify :icon="TrashBinTrashBoldIcon" class="text-critic-500 !w-4 !h-4" />
          </div>
        </div>

        <base-row>
          <base-col col-class="w-1/2">
            <base-textarea
              v-model="item.text"
              :error="$v.trip_plans.$each.$response.$data[index].text"
              required
              label="work-plan-content"
              placeholder="enter-work-plan-content"
              :show-nested-error="showNestedError"
            />
          </base-col>

          <base-col col-class="w-1/2">
            <user-multi-select
              v-model="item.users"
              :options="users"
              :error="$v.trip_plans.$each.$response.$data[index].users"
              label="employees"
              placeholder="select-employees"
              required
              :show-nested-error="showNestedError"
            />
          </base-col>
        </base-row>
      </div>
    </div>

    <base-button
      color="bg-primary-30 hover:bg-primary-100 text-primary-500"
      border-color="border-transparent"
      label="add-more"
      icon-color="#767994"
      :icon-left="AddPlusIcon"
      root-classes=""
      type="button"
      shadow
      class="mt-3 rounded-[10px]"
      @click="addRow"
    />

    <div class="flex items-center justify-between mt-10">
      <base-button
        label="save-as-draft"
        color="bg-primary-0 hover:bg-greyscale-100 text-primary-dark"
        rounded
        shadow
        border-color="border-transparent"
      />

      <div class="flex items-center gap-x-1">
        <base-button
          label="previous-stage"
          rounded
          shadow
          border-color="border-transparent"
          class="ml-2"
          @click="stepClick(STEPPER_TRIP_INFO)"
        />

        <base-button
          label="next-step"
          rounded
          shadow
          border-color="border-transparent"
          class="ml-2"
          @click="stepClick(STEPPER_ROUTE)"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
