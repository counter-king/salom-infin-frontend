<script setup>
// Core
import { useI18n } from 'vue-i18n'
import { useVuelidate } from '@vuelidate/core'
import { helpers, required, requiredIf } from '@vuelidate/validators'
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
// Non-reactive
const rules = {
  deadline: {
    requiredIf: helpers.withMessage(
      `Поле не должен быть пустым`,
      requiredIf(function () {
        return boxesCommonStore.resolutionModel.type === RESOLUTION_TYPES.CONTROL
      })
    )
  },
  __controllers: {
    requiredIf: helpers.withMessage(
      `Поле не должен быть пустым`,
      requiredIf(function () {
        return boxesCommonStore.resolutionModel.type === RESOLUTION_TYPES.CONTROL
      })
    )
  },
  __assignees: {
    required: helpers.withMessage(`Поле не должен быть пустым`, required)
  },
  content: {
    required: helpers.withMessage(`Поле не должен быть пустым`, required)
  }
}
const $v = useVuelidate(rules, boxesCommonStore.resolutionModel)
// Macros
defineExpose({ $v })
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
          v-model="$v.deadline.$model"
          :error="$v.deadline"
          label="deadline"
          placeholder="choose-date"
        />
      </base-col>

      <template v-if="boxesCommonStore.resolutionModel.type === RESOLUTION_TYPES.CONTROL">
        <base-col col-class="w-full">
          <base-multi-select
            v-model="$v.__controllers.$model"
            :error="$v.__controllers"
            label="controlling"
            placeholder="choose-controllers"
            menu-placeholder="search-users"
            api-url="users"
            display="chip"
            selectable
            :token-class="['chip-hover shadow-button bg-white cursor-pointer']"
          >
            <template #chip="{ value }">
              <user-with-label
                :label="isObject(value?.user) ? value?.user.full_name : value?.full_name"
                :color="isObject(value?.user) ? value?.user.color : value?.color"
                :title="isObject(value?.user) ? value?.user.full_name : value?.full_name"
                :compact="true"
                avatar-classes="w-5 h-5"
              >
              </user-with-label>
            </template>

            <template #option="{ value }">
              <user-with-selectable :items="[value]" />
            </template>

            <template #hint="{ value }">
              <user-with-label
                :label="isObject(value?.user) ? value?.user.full_name : value?.full_name"
                :color="isObject(value?.user) ? value?.user.color : value?.color"
                :title="isObject(value?.user) ? value?.user.full_name : value?.full_name"
                shadow
                avatar-classes="w-5 h-5"
              >
              </user-with-label>
            </template>
          </base-multi-select>

          <div class="mt-2">
            <user-with-selectable
              :items="boxesCommonStore.resolutionModel.__controllers"
              selectable
            />
          </div>
        </base-col>
      </template>

      <base-col col-class="w-full">
        <base-multi-select
          v-model="$v.__assignees.$model"
          :error="$v.__assignees"
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
              :label="isObject(value?.user) ? value?.user.full_name : value?.full_name"
              :color="isObject(value?.user) ? value?.user.color : value?.color"
              :title="isObject(value?.user) ? value?.user.full_name : value?.full_name"
              :compact="true"
              avatar-classes="w-5 h-5"
            >
            </user-with-label>
          </template>

          <template #option="{ value }">
            <user-with-selectable :items="[value]" />
          </template>

          <template #hint="{ value }">
            <user-with-label
              :label="isObject(value?.user) ? value?.user.full_name : value?.full_name"
              :color="isObject(value?.user) ? value?.user.color : value?.color"
              :title="isObject(value?.user) ? value?.user.full_name : value?.full_name"
              shadow
              avatar-classes="w-5 h-5"
            >
            </user-with-label>
          </template>
        </base-multi-select>

        <div class="mt-2">
          <user-with-selectable
            v-model:checkbox-index="boxesCommonStore.responsibleIndex"
            :items="boxesCommonStore.resolutionModel.__assignees"
            :multiple="false"
            selectable
          />
        </div>
      </base-col>

      <base-col col-class="w-full">
        <base-textarea
          v-model="$v.content.$model"
          :error="$v.content"
          label="enter-content"
        />
      </base-col>
    </base-row>
  </div>
</template>

<style scoped>

</style>
