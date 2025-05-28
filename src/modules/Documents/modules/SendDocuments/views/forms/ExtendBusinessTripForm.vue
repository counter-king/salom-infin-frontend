<script setup>
// Core
import { computed, onBeforeMount, ref } from "vue"
import { useVuelidate } from "@vuelidate/core"
import { useRoute, useRouter } from "vue-router"
import { useI18n } from "vue-i18n"
// Store
import { useBusinessTripStore } from "@/modules/Documents/modules/SendDocuments/stores/businessTrip.store"
// Constants
import { FORM_TYPE_CREATE, FORM_TYPE_UPDATE } from "@/constants/constants"
import { JOURNAL } from "@/enums"
// Utils
import { returnBTRoute } from "@/modules/Documents/modules/SendDocuments/utils"
import { formatDate, formatDateReverse } from "@/utils/formatDate"
// Components
import { LayoutWithTabsCompose } from "@/components/DetailLayout"
import UserSelect from "@/components/Select/UserSelect.vue"
import { CloseSmIcon, TrashBinTrashBoldIcon } from "@/components/Icons"
import BaseChip from "@/components/UI/BaseChip.vue"
import UserMultiSelect from "@/components/Select/UserMultiSelect.vue"
import EditorWithTabs from "@/components/Composed/EditorWithTabs.vue"

// Composable
const store = useBusinessTripStore()
const $v = useVuelidate(store.rules, store.model)
const $vDecree = useVuelidate(store.decreeRules, store.decreeModel)
const route = useRoute()
const router = useRouter()
const { t } = useI18n()

// Props
const props = defineProps({
  formType: {
    type: String,
    default: FORM_TYPE_CREATE
  }
})

// Reactive
const showNestedError = ref(false)

// Computed
const title = computed(() => {
  const isCreate = props.formType === FORM_TYPE_CREATE
  return isCreate ? 'create-business-trip-notice' : 'update-business-trip-notice'
})

// Methods
const onUserClear = (groupIndex, userIndex) => {
  store.model.__groups[groupIndex].__users.splice(userIndex, 1)
}
const preview = () => {
  const approvers = adjustUsersToArray(store.model.__approvers)
  const signers = adjustUsersToArray(store.model.__signers)

  store.model.approvers = []
  store.model.signers = []
  store.model.notices = []
  store.model.bookings = []
  store.model.trip_plans = []
  store.model.approvers = approvers
  store.model.signers = signers
  store.model.curator = store.model?.__curator?.user_id
  store.model.journal = JOURNAL.INNER
  store.model.company = authStore.currentUser?.company?.id
}
const onFileUpload = (files) => {
  store.model.__files = []
  files.forEach(file => {
    store.model.__files.push(file)
  })
}

// Hooks
onBeforeMount(async () => {
  if (props.formType === FORM_TYPE_UPDATE) {
    await store.actionGetDocumentDetailForUpdate(route.params.id)
  } else if (route.query.parent_notice_id) {
    await store.actionGetDocumentDetailForUpdate(route.query.parent_notice_id)
  }
})
</script>

<template>
  <div
    class="extend-business-trip-form"
    :class="{'h-[calc(100vh-200px)]' : store.detailLoading}"
  >
    <template v-if="store.detailLoading">
      <base-spinner/>
    </template>

    <template v-else>
      <layout-with-tabs-compose
        :title="title"
      >
        <template #content>
          <div class="px-6 py-4">
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
                      <span class="text-sm text-greyscale-500 font-medium">{{ t('employees-in-business-trip') }}</span>

                      <div class="flex gap-x-2 items-center mt-2">
                        <base-chip
                          v-for="(user, userIndex) in group.__users"
                          :label="user.full_name"
                          type="user"
                          :clearable="group.__users.length > 1 && index + 1 >= group.__users.length"
                          @emit:clear="onUserClear(index, userIndex)"
                        />
                      </div>
                    </base-col>

                    <base-col col-class="w-1/2">
                      <div class="flex align-center gap-x-4">
                        <div class="w-1/2">
                          <span class="text-sm text-greyscale-500 font-medium">{{ t('from-where-filial') }}</span>

                          <div class="flex gap-x-2 items-center mt-2">
                            <base-chip
                              :label="group.__company.name_uz"
                              type="location"
                            />
                          </div>
                        </div>

                        <div class="w-1/2">
                          <span class="text-sm text-greyscale-500 font-medium">{{ t('to-where') }}</span>

                          <div class="flex gap-x-2 items-center mt-2">
                            <base-chip
                              v-for="(region, regionIndex) in group.__regions"
                              :label="region.name_uz"
                              type="location"
                            />
                          </div>
                        </div>
                      </div>
                    </base-col>

                    <base-col col-class="w-1/2">
                      <div class="flex align-center gap-x-4">
                        <div class="w-1/2">
                          <span class="text-sm text-greyscale-500 font-medium">{{ t('trip-purpose') }}</span>

                          <div class="flex gap-x-2 items-center mt-2">
                            <base-chip
                              v-for="(tag, tagIndex) in group.__tags"
                              :label="tag.name_uz"
                              type="other"
                            />
                          </div>
                        </div>

                        <div class="w-1/2">
                          <span class="text-sm text-greyscale-500 font-medium">{{ t('transport-type') }}</span>

                          <div class="flex gap-x-2 items-center mt-2">
                            <base-chip
                              :label="returnBTRoute(group.__route)"
                              type="other"
                            />
                          </div>
                        </div>
                      </div>
                    </base-col>

                    <base-col col-class="w-1/2">
                      <div class="flex align-center gap-x-4">
                        <div class="w-1/2">
                          <span class="text-sm text-greyscale-500 font-medium">{{ t('start-date') }}</span>

                          <div class="flex gap-x-2 items-center mt-2">
                            <base-chip
                              :label="formatDate(group.__start_date)"
                              type="other"
                            />
                          </div>
                        </div>

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

              <base-col col-class="w-full">
                <div
                  class="border-[1.5px] rounded-2xl px-5 py-4"
                  :class="showNestedError && !store.model.content ? 'border-critic-500' : 'border-greyscale-200'"
                >
                  <div class="text-base text-primary-900 font-semibold mb-2">{{ t('decree') }}</div>

                  <editor-with-tabs
                    v-model="store.decreeModel.content"
                    :error="$vDecree.content"
                    file-upload-container-classes="w-1/2 pr-2"
                    :files="store.decreeModel.__files"
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
                label="preview"
                rounded
                shadow
                border-color="border-transparent"
                class="ml-2"
                @click="preview"
              />
            </div>
          </div>
        </template>
      </layout-with-tabs-compose>
    </template>
  </div>
</template>

<style scoped>

</style>
