<script setup>
// Core
import { watch } from "vue"
import { useI18n } from "vue-i18n"
import { useVuelidate } from "@vuelidate/core"
import { useRoute } from "vue-router"
// Const
import { COLOR_TYPES } from "@/enums"
// Utils
import { isObject } from "@/utils"
import { dispatchNotify } from "@/utils/notify"
// Store
import { useAssignExecutivesBranchStore } from "@/modules/Settings/stores/assignExecutivesBranch.store"
// Components
import { SelectSingle } from "@/components/Select"
import { VueDraggable } from "vue-draggable-plus"
import { UserWithSelectableItem } from "@/components/Users"
import UserMultiSelect from "@/components/Select/UserMultiSelect.vue"

// Composable
const store = useAssignExecutivesBranchStore()
const $v = useVuelidate(store.rules, store.model)
const {t} = useI18n()
const route = useRoute()

// Watch
watch(() => store.model.__users, (users) => {
  if (!store.responsibleIndex && users?.length) {
    store.responsibleIndex = users[0].id
  }
})

// Methods
const manage = async () => {
  const valid = await $v.value.$validate()
  if (!valid) return
  if (!store.responsibleIndex) {
    dispatchNotify(null, t('select-base-leader'), COLOR_TYPES.WARNING)
    return
  }

  await store.actionCreateAssignExecutivesBranch(t, route)
}
const resetFormModel = () => {
  store.actionResetModel()
  $v.value.$reset()
}
</script>

<template>
  <base-dialog
    v-model="store.dialog"
    max-width="max-w-[672px]"
    label="branch-assignment"
    :draggable="false"
    @emit:after-hide="resetFormModel"
  >
    <template #content>
      <div class="flex flex-col gap-y-6">
        <template v-if="!store.detailLoading">
          <select-single
            v-model="$v.__branch.$model"
            :error="$v.__branch"
            api-url="companies"
            required
            label="branch"
            placeholder="enter-branch"
            disabled
          />

          <user-multi-select
            v-model="$v.__users.$model"
            :error="$v.__users"
            label="leader"
            placeholder="select-employees"
            required
            allSelectable
          />

          <vue-draggable
            v-model="store.model.__users"
            :animation="150"
            handle=".handle"
          >
            <template v-for="item in store.model.__users">
              <user-with-selectable-item
                v-model:checkbox-index="store.responsibleIndex"
                :item="item"
                select-type="radio"
                selectable
                moveable
              >
                <template #chip-prepend="{ item }">
                  <template v-if="(isObject(item?.user) ? item?.user.id : item?.id) === store.responsibleIndex">
                    <div class="text-primary-500 text-sm font-medium">{{ t('leader') }}</div>
                  </template>

                  <template v-else>
                    <div class="text-primary-500 text-sm font-medium">{{ t('assistant') }}</div>
                  </template>

                  <div class="w-[6px] h-[6px] bg-greyscale-300 rounded-full"></div>
                </template>
              </user-with-selectable-item>
            </template>
          </vue-draggable>
        </template>

        <template v-else>
          <base-spinner class="min-h-[400px]"/>
        </template>
      </div>
    </template>

    <template #footer>
      <div
        v-if="!store.detailLoading"
        class="flex items-center justify-end w-full"
      >
        <base-button
          color="bg-white hover:bg-greyscale-100 text-primary-dark"
          border-color="border-transparent"
          label="cancel"
          rounded
          shadow
          type="button"
          @click="store.dialog = false"
        />

        <base-button
          label="send"
          :loading="store.buttonLoading"
          rounded
          shadow
          type="button"
          @click="manage"
        />
      </div>
    </template>
  </base-dialog>
</template>

<style scoped>

</style>
