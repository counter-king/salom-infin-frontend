<script setup>
// Core
import { computed, nextTick, onBeforeMount, onMounted, onUnmounted, ref } from "vue"
import { useVuelidate } from "@vuelidate/core"
import { useRoute, useRouter } from "vue-router"
import { useI18n } from "vue-i18n"
// Store
import { useAuthStore } from "@/modules/Auth/stores"
import { useBusinessTripStore } from "@/modules/Documents/modules/SendDocuments/stores/businessTrip.store"
import { useExtendBusinessTripStore } from "@/modules/Documents/modules/SendDocuments/stores/extendBusinessTrip.store"
// Constants
import { FORM_TYPE_CREATE, FORM_TYPE_UPDATE } from "@/constants/constants"
import { COLOR_TYPES, COMPOSE_DOCUMENT_SUB_TYPES, COMPOSE_DOCUMENT_TYPES, JOURNAL, USER_STATUS_CODES } from "@/enums"
// Utils
import { returnBTRoute } from "@/modules/Documents/modules/SendDocuments/utils"
import { formatDate, formatDateReverse } from "@/utils/formatDate"
// Components
import { LayoutWithTabsCompose } from "@/components/DetailLayout"
import UserSelect from "@/components/Select/UserSelect.vue"
import {
  TrashBinBoldIcon,
} from "@/components/Icons"
import BaseChip from "@/components/UI/BaseChip.vue"
import UserMultiSelect from "@/components/Select/UserMultiSelect.vue"
import EditorWithTabs from "@/components/Composed/EditorWithTabs.vue"
import { UserWithRadio } from "@/components/Users"
import {
  STEPPER_DECREE,
  STEPPER_TRIP_INFO,
  STEPPER_WORK_PLAN
} from "@/modules/Documents/modules/SendDocuments/constants"
import { Decree } from "@/modules/Documents/modules/SendDocuments/views/forms/FormComponents"
import { dispatchNotify } from "@/utils/notify"
import { adjustUsersToArray } from "@/utils"
import ChangingBusinessTripModal
  from "@/modules/Documents/modules/SendDocuments/views/forms/FormComponents/ChangingBusinessTripModal.vue"

// Composable
const store = useExtendBusinessTripStore()
const businessTripStore = useBusinessTripStore()
const authStore = useAuthStore()
const $v = useVuelidate(store.rules, store.model)
const route = useRoute()
const router = useRouter()
const {t} = useI18n()

// Props
const props = defineProps({
  formType: {
    type: String,
    default: FORM_TYPE_CREATE
  }
})

// Reactive
const showNestedError = ref(false)
const dialog = ref(false)

// Computed
const title = computed(() => {
  const isCreate = props.formType === FORM_TYPE_CREATE
  return isCreate ? 'trip-notice-for-change' : 'trip-notice-for-change'
})

// Methods
const adjustObjects = async () => {
  const approvers = adjustUsersToArray(store.model.__approvers)
  const signers = adjustUsersToArray(store.model.__signers)

  store.model.approvers = []
  store.model.signers = []
  store.model.notices = []
  store.model.approvers = approvers
  store.model.signers = signers
  store.model.curator = store.model?.__curator?.user_id
  store.model.journal = JOURNAL.INNER
  store.model.company = authStore.currentUser?.company?.id

  let groupIdCounter = 1

  store.model.__groups.forEach((group) => {
    if (Array.isArray(group.__notices_to_change)) {
      store.model.notices.push(
        ...group.__notices_to_change.map(notice => ({
          ...(props.formType === FORM_TYPE_UPDATE ? { id: notice.id } : {}),
          start_date: notice.__start_date,
          end_date: notice.__end_date,
          user: notice.user.id,
          company: authStore.currentUser?.company?.id,
          sender_company: notice.sender_company?.id,
          regions: notice.__regions.map(region => region.id),
          tags: notice.tags.map(tag => ({
            id: tag.id
          })),
          route: notice.route,
          group_id: groupIdCounter++,
          trip_type: 'changed_local',
          parent: notice.id,
          ...(notice.business_trip_id ? {id: notice.business_trip_id} : {})
        }))
      )
    }
  })

  store.model.sender = authStore?.currentUser?.top_level_department?.id
  store.model.files = store.model.__files.map(item => {
    return {id: item.id}
  })
  store.model.document_type = route.params.document_type
  store.model.document_sub_type = route.params.document_sub_type
  store.model.trip_notice_id = route.query?.parent_id || null


  if (props.formType === FORM_TYPE_CREATE && route.query.notice_id) {
    try {
      await store.actionUpdateDocument(
        {
          id: route.query.notice_id,
          body: store.model
        }
      )

      await dispatchNotify(null, t('notice-saved-successfully'), COLOR_TYPES.SUCCESS)
    } catch (err) {
    }
  }
  else if (props.formType === FORM_TYPE_CREATE) {
    try {
      const {data} = await store.actionCreateDocument(store.model)

      const model = {
        approvers: [],
        signers: [],
        curator: store.model?.__curator?.user_id,
        journal: JOURNAL.ORDERS_PROTOCOLS,
        company: authStore.currentUser.company.id,
        sender: authStore?.currentUser?.top_level_department?.id,
        document_type: COMPOSE_DOCUMENT_TYPES.DECREE,
        document_sub_type: COMPOSE_DOCUMENT_SUB_TYPES.EXTEND_BUSINESS_TRIP_DECREE,
        short_description: store.model?.short_description,
        trip_notice_id: data.id,
        content: data.content
      }

      businessTripStore.decreeModel.content = data.content

      try {
        const res = await store.actionCreateDocument(model)
        businessTripStore.decreeModel.id = res?.data?.id
        await router.replace({
          query: {
            ...route.query,
            notice_id: data.id,
            parent_id : route.query.parent_id,
          }
        })

        await dispatchNotify(null, t('notice-saved-successfully'), COLOR_TYPES.SUCCESS)

        await store.actionGetDocumentDetailForUpdate(data.id, route.query.parent_id)

      } catch (err) {
        console.error(err)
      }
    } catch (error) {
      console.error(error)
    }
  } else if (props.formType === FORM_TYPE_UPDATE && route.params.id) {
    try {
      await store.actionUpdateDocument(
        {
          id: route.params.id,
          body: store.model
        }
      )
      await dispatchNotify(null, t('notice-saved-successfully'), COLOR_TYPES.SUCCESS)
    } catch (err) {
    }
  }
}
const onFileUpload = (files) => {
  store.model.__files = []
  files.forEach(file => {
    store.model.__files.push(file)
  })
}
const onRegionsChange = () => {

}
const onStepClick = async (item) => {
  try {
    if (route.query?.step !== item.value) {
      if (item.value === STEPPER_DECREE) {
        await validateTripInfo()
        await adjustObjects()
      }
      await businessTripStore.actionStepClick(router, route, item.value)
    }
  } catch (error) {
    console.error(error)
  }
}
const validateTripInfo = async () => {
  const valid = await $v.value.$validate()
  showNestedError.value = true
  if (!valid) {
    dispatchNotify(null, t('fill-required-fields'), COLOR_TYPES.WARNING)
    return Promise.reject()
  }

  const hasAtLeastOneNoticeToChange = store.model.__groups.some(
    group => Array.isArray(group.__notices_to_change) && group.__notices_to_change.length > 0
  )

  if (!hasAtLeastOneNoticeToChange) {
    dispatchNotify(null, "Kamida bitta xodim o'zgartirish uchun tanlanishi kerak!", COLOR_TYPES.WARNING)
    return Promise.reject()
  }
}
const init = async () => {
  if (!route.query.step) {
    await router.replace({
      query: {
        ...route.query,
        step: STEPPER_TRIP_INFO
      }
    })
  }

  businessTripStore.stepperItems.forEach(step => step.active = step.value === route.query.step)
}
const deleteNoticeToChange = (item, itemIndex, groupIndex) => {
  store.actionDeleteNoticeToChange(item, itemIndex, groupIndex)
}

// Hooks
onMounted(async () => {
  await init()
})
onBeforeMount(async () => {
  if (props.formType === FORM_TYPE_CREATE && route.query?.notice_id && route.query?.parent_id) {
    await store.actionGetDocumentDetailForUpdate(route.query?.notice_id, route.query?.parent_id)
  }
  else if (props.formType === FORM_TYPE_CREATE && route.query?.parent_id) {
    await store.actionGetParentDocumentDetail(route.query.parent_id)
  } else if (props.formType === FORM_TYPE_UPDATE) {
    await store.actionGetDocumentDetailForUpdate(route.params.id, route.query?.parent_id)
  }
})

onUnmounted(() => {
  store.actionResetBTModel()
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
          <div class="py-4 px-6 border-b-[1.5px] border-greyscale-200">
            <base-stepper
              :items="businessTripStore.stepperItems"
              @emit:step-click="onStepClick"
            />
          </div>

          <div class="px-6 py-4">
            <template v-if="route.query?.step === 'trip_info'">
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
                      <span class="text-base text-primary-900 font-semibold mb-1">{{ t('group') }}-{{
                          index + 1
                        }}</span>
                    </div>

                    <base-row>
                      <base-col col-class="w-full">
                        <user-multi-select
                          v-model="group.__users_to_extend"
                          label="select-employees-in-business-trip"
                          :options="group.__users"
                          :searchable="false"
                          placeholder="select-employees"
                          :show-nested-error="showNestedError"
                          :disabled="formType === FORM_TYPE_UPDATE"
                          @update:modelValue="store.actionAddUsersToExtend(group, index)"

                        />
                      </base-col>

                      <base-col col-class="w-full">
                        <base-row
                          v-for="(item, itemIndex) in group.__notices_to_change"
                        >
                          <base-col col-class="w-1/3">
                            <span class="text-sm text-greyscale-500 font-medium">{{ t('employees-in-business-trip') }}</span>

                            <base-chip
                              :label="item.user?.full_name"
                              class="w-fit mt-1"
                            />
                          </base-col>

                          <base-col col-class="w-1/3">
                            <span class="text-sm text-greyscale-500 font-medium">{{ t('trip-place') }}</span>
                            <div class="flex flex-wrap gap-3 mt-1">
                              <base-chip
                                v-for="region in item.__regions"
                                :key="item.id"
                                :label="region.name_uz"
                                type="location"
                                class="w-fit"
                              />
                            </div>
                          </base-col>

                          <base-col col-class="w-1/3">
                            <div class="flex justify-between items-center">
                              <div>
                                <span class="text-sm text-greyscale-500 font-medium">{{ t('end-date') }}</span>

                                <base-chip
                                  :label="item.__end_date"
                                  type="other"
                                  class="w-fit mt-1"
                                />
                              </div>

<!--                              <div-->
<!--                                class="cursor-pointer"-->
<!--                                @click="deleteNoticeToChange(item, itemIndex, index)"-->
<!--                              >-->
<!--                                <base-iconify :icon="TrashBinBoldIcon" class="text-critic-500"/>-->
<!--                              </div>-->
                            </div>
                          </base-col>
                        </base-row>
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
                  @click="onStepClick({ value: STEPPER_DECREE })"
                />
              </div>
            </template>

            <template v-else-if="route.query?.step === 'decree'">
              <decree :form-type="formType"/>
            </template>
          </div>
        </template>
      </layout-with-tabs-compose>
    </template>

  <changing-business-trip-modal
    v-model="store.changingBTDialog"
  />
  </div>
</template>

<style scoped>

</style>
