<script setup>
// Core
import { useI18n } from "vue-i18n"
import { useRoute } from "vue-router"
import { useVuelidate } from "@vuelidate/core"
// Store
import { useBusinessTripStore } from "@/modules/Documents/modules/SendDocuments/stores/businessTrip.store"
// Utils
import { formatDateReverse } from "@/utils/formatDate"
// Components
import BranchMultiSelect from "@/components/Select/BranchMultiSelect.vue"
import UserSelect from "@/components/Select/UserSelect.vue"
import UserMultiSelect from "@/components/Select/UserMultiSelect.vue"
import { UserWithRadio } from "@/components/Users"
import { AddPlusIcon } from "@/components/Icons"
import EditorWithTabs from "@/components/Composed/EditorWithTabs.vue"

// Composable
const route = useRoute()
const store = useBusinessTripStore()
const { t } = useI18n()
const $v = useVuelidate(store.rules, store.model)

// Methods
const onFileUpload = () => {
  store.model.__files = []
  files.forEach(file => {
    store.model.__files.push(file)
  })
}
</script>

<template>
  <div class="trip-info-components">
    <base-row>
      <base-col col-class="w-1/2">
        <user-select
          v-model="$v.__curator.$model"
          :error="$v.__curator"
          api-url="top-signers"
          :api-params="{ doc_types: route.params.document_type }"
          label="whom"
          required
          placeholder="select-leader"
        />
      </base-col>

      <base-col col-class="w-1/2">
        <base-input
          v-model="$v.short_description.$model"
          :error="$v.short_description"
          required
          label="short-description"
          placeholder="enter-short-description"
        />
      </base-col>

      <base-col col-class="w-full mb-2">
        <div class="border-[1.5px] border-greyscale-200 rounded-2xl px-5 py-4">
          <span class="text-base text-primary-900 font-semibold mb-1">{{ t('group') }}-1</span>

          <base-row>
            <base-col col-class="w-1/2">
              <user-multi-select
                v-model="$v.__employees.$model"
                :error="$v.__employees"
                label="who-is-going-to-business-trip"
                placeholder="select-employees"
                required
              />
            </base-col>

            <base-col col-class="w-1/2">
              <branch-multi-select
                v-model="$v.__companies.$model"
                :error="$v.__companies"
                text-truncate
                label="trip-place"
              />
            </base-col>

            <base-col col-class="w-1/2">
              <base-multi-select
                v-model="$v.__tags.$model"
                :error="$v.__tags"
                api-url="tags"
                :api-params="{ document_sub_type: route.params. document_sub_type}"
                :token-class="['chip-hover shadow-button bg-white cursor-pointer']"
                display="chip"
                selectable
                label="trip-purpose"
                type="department"
                placeholder="select-targets"
                required
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
            </base-col>

            <base-col col-class="w-1/2">
              <div class="flex w-full gap-x-4">
                <base-calendar
                  v-model="$v.start_date.$model"
                  :error="$v.start_date"
                  :min-date="new Date()"
                  required
                  label="start-date"
                  placeholder="choose-start-time"
                  class="w-1/2"
                  @update:modelValue="(value) => $v.start_date.$model = formatDateReverse(value)"
                />
                <base-calendar
                  v-model="$v.end_date.$model"
                  :error="$v.end_date"
                  :min-date="new Date()"
                  required
                  label="end-date"
                  placeholder="choose-end-time"
                  class="w-1/2"
                  @update:modelValue="(value) => $v.end_date.$model = formatDateReverse(value)"
                />
              </div>
            </base-col>
          </base-row>
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
      </base-col>

      <base-col col-class="w-1/2">
        <user-multi-select
          v-model="store.model.__approvers"
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

      <base-col col-class="w-full">
        <editor-with-tabs
          v-model="$v.content.$model"
          :error="$v.content"
          file-upload-container-classes="w-1/2 pr-2"
          :files="store.model.__files"
          @emit:file-upload="onFileUpload"
        />
      </base-col>
    </base-row>

    <div class="flex items-center justify-between">
      <base-button
        label="save-as-draft"
        color="bg-primary-0 hover:bg-greyscale-100 text-primary-dark"
        rounded
        shadow
        border-color="border-transparent"
      />

      <base-button
        label="next-step"
        rounded
        shadow
        border-color="border-transparent"
        class="ml-2"
      />
    </div>
  </div>
</template>

<style scoped>

</style>
