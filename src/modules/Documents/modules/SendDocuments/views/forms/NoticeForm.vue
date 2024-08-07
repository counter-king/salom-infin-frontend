<script setup>
// Core
import {useVuelidate} from "@vuelidate/core"
// Enums
import { FORM_TYPE_CREATE } from "@/constants/constants"
// Components
import BaseMultiSelect from "@/components/UI/BaseMultiSelect.vue"
import BranchMultiSelect from "@/components/Select/BranchMultiSelect.vue"
import FormContainer from "@/modules/Documents/modules/SendDocuments/components/FormContainer.vue"
import {LayoutWithTabs} from "@/components/DetailLayout"
import UserMultiSelect from "@/components/Select/UserMultiSelect.vue"
import {UserWithRadio} from "@/components/Users"
// Utils
import {formatDateReverse} from "@/utils/formatDate"
// Store
import {useCommonStore} from "@/stores/common"
import {useSDBTNoticeStore} from "@/modules/Documents/modules/SendDocuments/stores/businessTripNotice.store"
import EditorWithTabs from "@/components/Composed/EditorWithTabs.vue"

const props = defineProps({
  formType: {
    type: String,
    default: FORM_TYPE_CREATE
  }
})

const BTNoticeStore = useSDBTNoticeStore()
const commonStore = useCommonStore()

const $v = useVuelidate(BTNoticeStore.rules, BTNoticeStore.model)

// Methods
const preview = async () => {
  const valid = await $v.value.$validate()
  if (!valid) return

  console.log("sssss")
}
const clearForm = () => {

}
const onFileUpload = (files) => {
  BTNoticeStore.model.__files = []
  files.forEach(file => {
    BTNoticeStore.model.__files.push(file)
  });
}
</script>

<template>
  <template v-if="false">
    <base-spinner/>
  </template>

  <template v-else>
    <layout-with-tabs
      :title="props.formType === FORM_TYPE_CREATE ? 'create-notice' : 'update-notice'"
    >
      <template #content>
        <form-container
          @emit:preview="preview"
          @emit:clear-form="clearForm"
        >
          <base-row>
            <base-col col-class="w-1/2">
              <user-multi-select
                v-model="$v.__employees.$model"
                :error="$v.__employees"
                label="employees"
                placeholder="select-employees"
                required
              />
            </base-col>

            <base-col col-class="w-1/2">
              <branch-multi-select
                v-model="$v.__companies.$model"
                :error="$v.__companies"
              />
            </base-col>

            <base-col col-class="w-1/2">
              <div class="flex w-full gap-x-4">
                <base-calendar
                  v-model="$v.start_date.$model"
                  :error="$v.start_date"
                  required
                  label="start-date"
                  placeholder="choose-start-time"
                  class="w-1/2"
                  @update:modelValue="(value) => $v.start_date.$model = formatDateReverse(value)"
                />
                <base-calendar
                  v-model="$v.end_date.$model"
                  :error="$v.end_date"
                  required
                  label="end-date"
                  placeholder="choose-end-time"
                  class="w-1/2"
                  @update:modelValue="(value) => $v.end_date.$model = formatDateReverse(value)"
                />
              </div>
            </base-col>

            <base-col col-class="w-1/2">
              <base-multi-select
                v-model="$v.__targets.$model"
                :error="$v.__targets"
                api-url="tags"
                :token-class="['chip-hover shadow-button bg-white cursor-pointer']"
                display="chip"
                selectable
                label="targets"
                type="department"
                placeholder="select-targets"
              >
                <template #chip="{ value }">
                  {{ value.name }}
                </template>

                <template #option="{ value }">
                  <user-with-radio
                    :title="value.name"
                  >
                  </user-with-radio>
                </template>
              </base-multi-select>
            </base-col>

            <base-col col-class="w-1/2">
              <user-multi-select
                v-model="$v.__approvers.$model"
                label="approvers"
                placeholder="enter-approvers"
              />
            </base-col>

            <base-col col-class="w-1/2">
              <user-multi-select
                v-model="$v.__signers.$model"
                :error="$v.__signers"
                label="signers"
                placeholder="enter-signers"
                required
              />
            </base-col>

            <base-col col-class="w-1/2">
              <base-dropdown
                v-model="$v.road.$model"
                :error="$v.road"
                :options="commonStore.documentTypesList"
                required
                option-value="id"
                label="route"
                placeholder="select-route"
              />
            </base-col>

            <base-col col-class="w-full">
              <editor-with-tabs
                v-model="$v.content.$model"
                :error="$v.content"
                file-upload-container-classes="w-1/2 pr-2"
                :files="BTNoticeStore.model.__files"
                @emit:file-upload="onFileUpload"
              />
            </base-col>
          </base-row>
        </form-container>
      </template>
    </layout-with-tabs>
  </template>
</template>

<style scoped>

</style>
