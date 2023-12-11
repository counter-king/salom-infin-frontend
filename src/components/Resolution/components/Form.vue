<script setup>
// Core
import { useI18n } from 'vue-i18n'
// Store
import { useBoxesCommonStore } from '@/modules/Documents/modules/Boxes/stores/common.store'
// Components
import { UserWithLabel, UserWithSelectable } from '@/components/Users'
// Utils
import { isObject } from '@/utils'
import { RESOLUTION_TYPES } from '@/enums'
// Composable
const { t } = useI18n()
const boxesCommonStore = useBoxesCommonStore()
// Reactive
const types = [
  {
    title: t("assignment"),
    value: RESOLUTION_TYPES.ASSIGNMENT
  },
  {
    title: t("control"),
    value: RESOLUTION_TYPES.CONTROL
  },
  {
    title: t("for-notice"),
    value: RESOLUTION_TYPES.FOR_NOTICE
  },
]
</script>

<template>
  <div class="resolution-form-view">
    <base-row>
      <base-col col-class="w-full">
        <base-dropdown
          v-model="boxesCommonStore.resolutionModel.type"
          :options="types"
          option-label="title"
          option-value="value"
          label="resolution-type"
          placeholder="choose-resolution-type"
        />
      </base-col>

      <base-col col-class="w-full">
        <base-calendar
          v-model="boxesCommonStore.resolutionModel.deadline"
          label="deadline"
          placeholder="choose-date"
        />
      </base-col>

      <base-col col-class="w-full">
        <base-multi-select
          v-model="boxesCommonStore.resolutionModel.__assignees"
          label="performers"
          placeholder="choose-performers"
          menu-placeholder="search-users"
          api-url="users"
          display="chip"
          selectable
          :token-class="['chip-hover shadow-button bg-white cursor-pointer']"
        >
          <template #chip="{ value }">
            <user-with-label
              :compact="true"
              :title="isObject(value?.user) ? value?.user.full_name : value?.full_name"
              image="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D"
              avatar-classes="w-5 h-5"
            >
            </user-with-label>
          </template>

          <template #option="{ value }">
            <user-with-selectable :items="[value]" />
          </template>

          <template #hint="{ value }">
            <user-with-label
              :title="isObject(value?.user) ? value?.user.full_name : value?.full_name"
              shadow
              image="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D"
              avatar-classes="w-5 h-5"
            >
            </user-with-label>
          </template>
        </base-multi-select>

        <div class="mt-2">
          <user-with-selectable
            :items="boxesCommonStore.resolutionModel.__assignees"
            :multiple="false"
            selectable
          />
        </div>
      </base-col>

      <base-col col-class="w-full">
        <base-textarea
          v-model="boxesCommonStore.resolutionModel.content"
          label="enter-content"
        />
      </base-col>
    </base-row>
  </div>
</template>

<style scoped>

</style>
