<script setup>
// Core
import { computed, ref } from "vue"
import { useRoute, useRouter } from "vue-router"
import { useVuelidate } from "@vuelidate/core"
import { useI18n } from "vue-i18n"
// Constants
import { COLOR_TYPES, COMPOSE_DOCUMENT_SUB_TYPES, COMPOSE_DOCUMENT_TYPES, JOURNAL } from "@/enums"
import {
  ROUTE_SD_DETAIL,
  ROUTE_SD_LIST,
  STEPPER_TRIP_INFO
} from "@/modules/Documents/modules/SendDocuments/constants"
import { FORM_TYPE_CREATE, FORM_TYPE_UPDATE } from "@/constants/constants"
// Utils
import { adjustUsersToArray } from "@/utils"
import { dispatchNotify } from "@/utils/notify"
// Store
import { useAuthStore } from "@/modules/Auth/stores"
import { useBusinessTripStore } from "@/modules/Documents/modules/SendDocuments/stores/businessTrip.store"
import { useCountStore } from "@/stores/count.store"
// Components
import EditorWithTabs from "@/components/Composed/EditorWithTabs.vue"
import PreviewDialog from "@/modules/Documents/modules/SendDocuments/components/PreviewDialog.vue"
import { MultipleTemplates } from "@/components/Templates"
import { useExtendBusinessTripStore } from "@/modules/Documents/modules/SendDocuments/stores/extendBusinessTrip.store";

// Props
const props = defineProps({
  formType: {
    type: String,
    default: FORM_TYPE_CREATE
  }
})

// Composable
const route = useRoute()
const router = useRouter()
const store = useBusinessTripStore()
const extendBusinessTripStore = useExtendBusinessTripStore()
const $v = useVuelidate(store.decreeRules, store.decreeModel)
const { t } = useI18n()
const authStore = useAuthStore()
const countStore = useCountStore()

// Reactive
const dialog = ref(false)

// Computed
const composeModel = computed(() => {
  const baseModel = route.params.document_sub_type === COMPOSE_DOCUMENT_SUB_TYPES.EXTEND_BUSINESS_TRIP_NOTICE
    ? extendBusinessTripStore.model
    : store.model

  return {
    ...baseModel,
    bookings: store.booking_model.bookings,
    trip_plans: store.trip_plan_model.trip_plans,
    decree_content: store.decreeModel.content
  }
})

// Methods
const stepClick = async (step) => {
  await store.actionStepClick(router, route, step)
}
const onFileUpload = (files) => {
  store.decreeModel.__files = []
  files.forEach(file => {
    store.decreeModel.__files.push(file)
  })
}

const preview = async () => {
  const valid = await $v.value.$validate()
  if (!valid) {
    dispatchNotify(null, t('fill-required-fields'), COLOR_TYPES.WARNING)
    return
  }

  store.decreeModel.approvers = []
  store.decreeModel.signers = []
  store.decreeModel.curator = store.model?.__curator?.user_id
  store.decreeModel.journal = JOURNAL.ORDERS_PROTOCOLS
  store.decreeModel.company = authStore.currentUser.company.id
  store.decreeModel.sender = authStore?.currentUser?.top_level_department?.id
  // store.decreeModel.files = store.decreeModel.__files.map(item => { return { id: item.id } })
  store.decreeModel.document_type = COMPOSE_DOCUMENT_TYPES.DECREE
  store.decreeModel.document_sub_type = route.params.document_sub_type === COMPOSE_DOCUMENT_SUB_TYPES.EXTEND_BUSINESS_TRIP_NOTICE ? COMPOSE_DOCUMENT_SUB_TYPES.EXTEND_BUSINESS_TRIP_DECREE : COMPOSE_DOCUMENT_SUB_TYPES.BUSINESS_TRIP_DECREE_V2
  store.decreeModel.short_description = store.model.short_description

  dialog.value = true
}
const create = async (notice_id, decree_id) => {
  let model = {
    ...store.decreeModel,
    trip_notice_id: notice_id
  }
  const response = await store.actionCreateDocument(model)
  if (response) {
    dialog.value = false
    dispatchNotify(null, t('document-sent'), COLOR_TYPES.SUCCESS)
    await router.replace({
      name: ROUTE_SD_LIST,
      query: {
        document_type: route.query.document_type
      }
    })
  }
  else {
    dispatchNotify(null, t('error-occurred'), COLOR_TYPES.ERROR)
  }
}
const update = async (notice_id, decree_id) => {
  try {
    await store.actionUpdateDocument(
      {
        id: decree_id,
        body: {
          ...store.decreeModel,
          trip_notice_id: notice_id
        }
      }
    )
    await countStore.actionCountList();
    dispatchNotify(null, t('successfully-saved'), COLOR_TYPES.SUCCESS)
  } catch (err) {

  }
}
const manage = async () => {
  let notice_id = null
  if (props.formType === FORM_TYPE_CREATE && route.query.notice_id) {
    notice_id = route.query.notice_id
  } else if (props.formType === FORM_TYPE_UPDATE && route.params.id) {
    notice_id = route.params.id
  }

  try {
    await update(notice_id, store.decreeModel?.id)
    await router.replace({
      name: ROUTE_SD_DETAIL,
      params: {
        id: notice_id,
        document_type: route.params.document_type,
        document_sub_type: route.params.document_sub_type
      },
      query: {
        parent_id: route.query.parent_id,
      }
    })
  } catch (err) {}

  // if (props.formType === FORM_TYPE_CREATE) {
  //   create(notice_id, null)
  // } else {
  //   update(notice_id, store.decreeModel?.id)
  // }
}

defineExpose({
  stepClick
})
</script>

<template>
  <div class="decree-component">
    <editor-with-tabs
      v-model="$v.content.$model"
      :error="$v.content"
      file-upload-container-classes="w-1/2 pr-2"
      :files="store.decreeModel.__files"
      @emit:file-upload="onFileUpload"
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
          label="preview"
          rounded
          shadow
          border-color="border-transparent"
          class="ml-2"
          @click="preview"
        />
      </div>
    </div>

    <!-- PREVIEW -->
        <preview-dialog
          v-model="dialog"
          :send-button-loading="store.buttonLoading"
          @emit:send="manage"
          content-classes="p-0"
        >
          <template #content>
            <multiple-templates
              :compose-model="composeModel"
              :preview="true"
            />
          </template>
        </preview-dialog>
  </div>
</template>

<style scoped>

</style>
