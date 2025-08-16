<script setup>
// Core
import { computed, ref, watch } from "vue"
import { useI18n } from "vue-i18n"
import { useRoute, useRouter } from "vue-router"
import { useVuelidate } from "@vuelidate/core"
// Store
import { useBusinessTripStore } from "@/modules/Documents/modules/SendDocuments/stores/businessTrip.store"
// Utils
import { formatDateReverse } from "@/utils/formatDate"
// Components
import UserSelect from "@/components/Select/UserSelect.vue"
import UserMultiSelect from "@/components/Select/UserMultiSelect.vue"
import { UserWithRadio } from "@/components/Users"
import { AddPlusIcon, TrashBinTrashBoldIcon } from "@/components/Icons"
import EditorWithTabs from "@/components/Composed/EditorWithTabs.vue"
import { dispatchNotify } from "@/utils/notify";
import { COLOR_TYPES, COMPOSE_DOCUMENT_SUB_TYPES } from "@/enums";
import { ROUND_TRIP, STEPPER_WORK_PLAN } from "@/modules/Documents/modules/SendDocuments/constants";
import { useCommonStore } from "@/stores/common";

// Composable
const route = useRoute()
const router = useRouter()
const store = useBusinessTripStore()
const commonStore = useCommonStore()
const { t, locale } = useI18n()
const $v = useVuelidate(store.rules, store.model)

// Props
const props = defineProps({
  onStepClick: {
    type: Function,
    default: () => void 0
  }
})

// Reactive
const showNestedError = ref(false)
const nextButtonLoading = ref(false)

// Computed
const regionApiParams = computed(() => {
  return { region_type: 'local' }
})

// Methods
const onFileUpload = (files) => {
  store.model.__files = []
  files.forEach(file => {
    store.model.__files.push(file)
  })
}
const addGroupBlock = () => {
  store.actionAddGroupBlock()
}
const stepClick = async (step) => {
  const valid = await $v.value.$validate()
  showNestedError.value = true
  if (!valid) {
    dispatchNotify(null, t('fill-required-fields'), COLOR_TYPES.WARNING)
    return
  }

  if (route.params.document_sub_type === COMPOSE_DOCUMENT_SUB_TYPES.BUSINESS_TRIP_NOTICE_FOREIGN) {
    const invalidGroup = store.model.__groups.find(
      (group) => !group.__countries || group.__countries.length === 0
    )

    if (invalidGroup) {
      dispatchNotify(null, t('fill-required-fields'), COLOR_TYPES.WARNING)
      return
    }

    store.model.__groups.forEach((group) => {
      group.__regions = []
    })
  }

  if (route.params.document_sub_type === COMPOSE_DOCUMENT_SUB_TYPES.BUSINESS_TRIP_NOTICE_V2) {
    const invalidGroup = store.model.__groups.find(
      (group) => !group.__regions || group.__regions.length === 0
    )

    if (invalidGroup) {
      dispatchNotify(null, t('fill-required-fields'), COLOR_TYPES.WARNING)
      return
    }

    store.model.__groups.forEach((group) => {
      group.__countries = []
    })
  }

  nextButtonLoading.value = true

  // Await parent's response
  const success = await new Promise((resolve) => {
    emit('emit:onValidateAndSend', resolve)
  })

  if (success) {
    await store.actionStepClick(router, route, 'decree')
  }

  nextButtonLoading.value = false
  // await stores.actionStepClick(router, route, step)
}
const onSenderCompanyChange = (val, index) => {
  store.model.__groups[index].__regions = []
}
const onRegionsChange = (val, index) => {
  val.value.forEach(item => {
    if (item.id === store.model?.__groups[index]?.__company?.region?.id) {
      const regionIndex = store.model.__groups[index].__regions.findIndex(region => region.id === item.id)
      if (regionIndex || regionIndex === 0) {
        store.model.__groups[index].__regions.splice(regionIndex, 1)
      }
    }
  })
}

defineExpose({
  stepClick
})

const emit = defineEmits(['emit:onValidateAndSend'])
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
          label="whom-specific"
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

      <base-col col-class="w-full mb-2 flex flex-col gap-y-3">
        <div
          v-for="(group, index) in store.model.__groups"
          class="border-[1.5px] border-greyscale-200 rounded-2xl px-5 py-4"
        >
          <div class="flex justify-between">
            <span class="text-base text-primary-900 font-semibold mb-1">{{ t('group') }}-{{ index + 1 }}</span>

            <div
              v-if="index !== 0"
              class="flex justify-center items-center bg-critic-50 hover:bg-critic-100 rounded-lg w-7 h-7 cursor-pointer"
              @click="store.actionDeleteGroupBlock(index)"
            >
              <base-iconify :icon="TrashBinTrashBoldIcon" class="text-critic-500 !w-4 !h-4" />
            </div>
          </div>

          <base-row>
            <base-col col-class="w-1/2">
              <user-multi-select
                v-model="group.__users"
                :error="$v.__groups.$each.$response.$data[index].__users"
                label="who-is-going-to-business-trip"
                placeholder="select-employees"
                required
                allSelectable
                :show-nested-error="showNestedError"
              />
            </base-col>

            <base-col col-class="w-1/2">
              <div class="flex align-center gap-x-4">
<!--                <pre>{{ group.__company }}</pre>-->
                <base-dropdown
                  v-model="group.__company"
                  :error="$v.__groups.$each.$response.$data[index].__company"
                  v-model:options="group.__filialList"
                  required
                  api-url="companies"
                  label="from-where-filial"
                  placeholder="choose-one"
                  menu-placeholder="search"
                  option-label="name"
                  searchable
                  :show-nested-error="showNestedError"
                  class="w-1/2"
                  @emit:change="(val) => onSenderCompanyChange(val, index)"
                >
                  <template #option="{ option }">
                    <user-with-radio
                      :title="option.name"
                      :text-truncate="false"
                    >
                    </user-with-radio>
                  </template>
                </base-dropdown>

<!--                :error="$v.__groups.$each.$response.$data[index].__regions"-->

                <base-multi-select
                  v-if="route.params.document_sub_type === COMPOSE_DOCUMENT_SUB_TYPES.BUSINESS_TRIP_NOTICE_V2"
                  v-model="group.__regions"
                  api-url="regions"
                  :api-params="regionApiParams"
                  :token-class="['chip-hover shadow-button bg-white cursor-pointer']"
                  display="chip"
                  selectable
                  label="to-where"
                  type="department"
                  placeholder="select-trip-place"
                  required
                  :show-nested-error="showNestedError"
                  class="w-1/2"
                  @emit:change="(val) => onRegionsChange(val, index)"
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

<!--                :error="$v.__groups.$each.$response.$data[index].__countries"-->

                <base-multi-select
                  v-if="route.params.document_sub_type === COMPOSE_DOCUMENT_SUB_TYPES.BUSINESS_TRIP_NOTICE_FOREIGN"
                  v-model="group.__countries"
                  api-url="countries"
                  :api-params="{ country_type: 'foreign' }"
                  :token-class="['chip-hover shadow-button bg-white cursor-pointer']"
                  display="chip"
                  selectable
                  label="to-where-country"
                  type="department"
                  placeholder="select-trip-place"
                  required
                  :show-nested-error="showNestedError"
                  all-selectable
                  class="w-1/2"
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
            </base-col>

            <base-col col-class="w-1/2">
              <div class="flex w-full gap-x-4">
                <base-multi-select
                  v-model="group.__tags"
                  :error="$v.__groups.$each.$response.$data[index].__tags"
                  api-url="tags"
                  :api-params="{ document_sub_type: route.params. document_sub_type, page_size: 500}"
                  :token-class="['chip-hover shadow-button bg-white cursor-pointer']"
                  display="chip"
                  selectable
                  label="trip-purpose"
                  type="department"
                  placeholder="select-targets"
                  required
                  :show-nested-error="showNestedError"
                  class="w-1/2"
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

                <base-dropdown
                  v-model="group.__route"
                  :error="$v.__groups.$each.$response.$data[index].__route"
                  v-model:options="store.routeTabItems"
                  required
                  label="transport-type"
                  placeholder="select-transport-type"
                  :option-label="locale === 'uz' ? 'name_uz' : 'name_ru'"
                  option-value="value"
                  :show-nested-error="showNestedError"
                  class="w-1/2"
                >
                  <template #option="{ option }">
                    <user-with-radio
                      :title="t(option.title)"
                      :text-truncate="false"
                    >
                    </user-with-radio>
                  </template>
                </base-dropdown>
              </div>
            </base-col>

            <base-col col-class="w-1/2">
              <div class="flex w-full gap-x-4">
                <base-calendar
                  v-model="group.__start_date"
                  :error="$v.__groups.$each.$response.$data[index].__start_date"
                  :min-date="new Date()"
                  required
                  label="start-date"
                  placeholder="choose-start-time"
                  class="w-1/2"
                  :show-nested-error="showNestedError"
                  @update:modelValue="(value) => group.__start_date = formatDateReverse(value)"
                />
                <base-calendar
                  v-model="group.__end_date"
                  :error="$v.__groups.$each.$response.$data[index].__end_date"
                  :min-date="new Date()"
                  required
                  label="end-date"
                  placeholder="choose-end-time"
                  class="w-1/2"
                  :show-nested-error="showNestedError"
                  @update:modelValue="(value) => group.__end_date = formatDateReverse(value)"
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
          class="rounded-[10px] w-[195px]"
          @click="addGroupBlock"
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
        <div
          class="border-[1.5px] rounded-2xl px-5 py-4"
          :class="showNestedError && !store.model.content ? 'border-critic-500' : 'border-greyscale-200'"
        >
          <div class="text-base text-primary-900 font-semibold mb-2">{{ t('notice') }}</div>

          <editor-with-tabs
            v-model="$v.content.$model"
            :error="$v.content"
            file-upload-container-classes="w-1/2 pr-2"
            :files="store.model.__files"
            @emit:file-upload="onFileUpload"
          />
        </div>
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
        :loading="nextButtonLoading"
        @click="stepClick(STEPPER_WORK_PLAN)"
      />
    </div>
  </div>
</template>

<style scoped>

</style>
