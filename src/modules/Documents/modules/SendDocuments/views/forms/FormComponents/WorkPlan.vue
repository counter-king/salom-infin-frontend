<script setup>
// Core
import { useI18n } from "vue-i18n"
// Components
import UserMultiSelect from "@/components/Select/UserMultiSelect.vue"
import { AddPlusIcon, CheckCircleBoldIcon, TrashBinTrashBoldIcon } from "@/components/Icons"

// Composable
const { t } = useI18n()
</script>

<template>
  <div class="work-plan-component">
    <div
      v-for="(_, index) in 3"
    >
      <div class="border-[1.5px] border-greyscale-200 rounded-2xl px-5 py-4">
        <div class="flex justify-between">
          <span class="text-base text-primary-900 font-semibold mb-1">{{ t('plan') }}-{{ index + 1 }}</span>

          <div
            v-if="index !== 0"
            class="flex justify-center items-center bg-critic-50 rounded-lg w-7 h-7 cursor-pointer"
          >
            <base-iconify :icon="TrashBinTrashBoldIcon" class="text-critic-500 !w-4 !h-4" />
          </div>
        </div>

        <base-row>
          <base-col col-class="w-1/2">
            <base-textarea
              required
              label="work-plan-content"
              placeholder="enter-work-plan-content"
            />
          </base-col>

          <base-col col-class="w-1/2">
            <user-multi-select
              label="who-is-going-to-business-trip"
              placeholder="select-employees"
              required
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
    />
  </div>
</template>

<style scoped>

</style>
