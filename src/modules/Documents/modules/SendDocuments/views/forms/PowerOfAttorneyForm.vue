<script setup>
// Core
import { computed, onBeforeMount, onUnmounted, ref } from "vue"
import { useRoute, useRouter } from "vue-router"
import { useVuelidate } from "@vuelidate/core"
import { useI18n } from "vue-i18n"
// Store
import { useAuthStore } from "@/modules/Auth/stores"
import { useCountStore } from "@/stores/count.store"
import { usePOAStore } from "@/modules/Documents/modules/SendDocuments/stores/powerOfAttorney.store"
// Enums
import { FORM_TYPE_CREATE } from "@/constants/constants"
import { COLOR_TYPES, COMPOSE_DOCUMENT_SUB_TYPES, COMPOSE_DOCUMENT_TYPES, JOURNAL } from "@/enums"
import { ROUTE_SD_DETAIL, ROUTE_SD_LIST } from "@/modules/Documents/modules/SendDocuments/constants"
// Utils
import { adjustUsersToArray, resetModel } from "@/utils"
import { dispatchNotify } from "@/utils/notify"
import { formatDateReverse } from "@/utils/formatDate"
// Components
import BasePOA from "@/components/Templates/PowerOfAttorney/BasePOA.vue"
import FormContainer from "@/modules/Documents/modules/SendDocuments/components/FormContainer.vue"
import PreviewDialog from "@/modules/Documents/modules/SendDocuments/components/PreviewDialog.vue"
import UserMultiSelect from "@/components/Select/UserMultiSelect.vue"
import UserSelect from "@/components/Select/UserSelect.vue"
import { LayoutWithTabsCompose } from "@/components/DetailLayout"

// Composable
const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const store = usePOAStore()
const countStore = useCountStore()
const { t } = useI18n()
const $v = useVuelidate(store.rules, store.model)

// Props
const props = defineProps({
  formType: {
    type: String,
    default: FORM_TYPE_CREATE
  }
})

// Reactive
const dialog = ref(false)


// Computed
const title = computed(() => {
  return props.formType === FORM_TYPE_CREATE ? 'create-poa' : 'update-poa'
})
const minEndDate = computed(() => {
  return store.model.start_date ? new Date(store.model.start_date) : new Date()
})

// Methods
const preview = async () => {
  const valid = await $v.value.$validate()
  if (!valid) return
  store.model.approvers = []
  store.model.signers = []
  store.model.approvers = adjustUsersToArray(store.model.__approvers)
  store.model.signers = adjustUsersToArray(store.model.__signers)
  store.model.curator = store?.model?.__curator?.user_id
  store.model.user = store?.model?.__user?.id
  store.model.journal = JOURNAL.POWER_OF_ATTORNEY
  store.model.company = authStore.currentUser?.company?.id
  store.model.sender = authStore?.currentUser?.top_level_department?.id
  store.model.document_type = route.params.document_type
  store.model.document_sub_type = route.params.document_sub_type
  store.model.content = '.'

  if (!(store?.model?.__user?.passport_seria || store?.model?.__user?.passport_number || store?.model?.__user?.passport_issue_date || store?.model?.__user?.passport_issued_by)){
    dispatchNotify(null, `${store.model?.__user?.full_name}: ${t('passport-details-error')}`, COLOR_TYPES.WARNING)
    return
  }

  dialog.value = true
}
const clearForm = () => {

}
const create = async () => {
  const response = await store.actionCreateDocument(store.model)
  await countStore.actionCountList()
  if (response) {
    dialog.value = false
    dispatchNotify(null, t('document-sent'), COLOR_TYPES.SUCCESS)
    await router.replace({
      name: ROUTE_SD_LIST,
      query: {
        document_type: COMPOSE_DOCUMENT_TYPES.POWER_OF_ATTORNEY
      }
    })
  } else {
    dispatchNotify(null, t('error-occurred'), COLOR_TYPES.ERROR)
  }
}
const update = async () => {
  const data = await store.actionUpdateDocument(
    {
      id: route.params.id,
      body: store.model
    }
  );
  await countStore.actionCountList()
  dispatchNotify(null, t('changed'), COLOR_TYPES.SUCCESS);
  await router.replace({
    name: ROUTE_SD_DETAIL,
    params: {
      id: route.params.id,
      document_type: route.params.document_type,
      document_sub_type: route.params.document_sub_type
    }
  })
}
const manage = () => {
  if (props.formType === FORM_TYPE_CREATE) {
    create()
  } else {
    update()
  }
}

// Hooks
onBeforeMount( async () => {
  if (route.params.id) {
    await store.actionGetDocumentDetailForUpdate(route.params.id)
  }
})
onUnmounted(() => {
  resetModel(store.model)
})
</script>

<template>
  <template v-if="store.detailLoading">
    <base-spinner/>
  </template>

  <template v-else>
    <layout-with-tabs-compose
      :title="title"
    >
      <template #content>
        <form-container
          @emit:preview="preview"
          @emit:clear-form="clearForm"
        >
          <base-row>
            <base-col col-class="w-1/2">
              <user-select
                v-model="$v.__curator.$model"
                :error="$v.__curator"
                api-url="top-signers"
                :api-params="{ doc_types: route.params.document_type }"
                label="bank-leader"
                required
                placeholder="select-leader"
              />
            </base-col>

            <base-col col-class="w-1/2">
              <user-select
                v-model="$v.__user.$model"
                :error="$v.__user"
                api-url="users/personal-information"
                label="whom"
                required
                placeholder="select-employee"
              />
            </base-col>

            <base-col col-class="w-1/2">
              <base-calendar
                v-model="$v.start_date.$model"
                :error="$v.start_date"
                :min-date="new Date()"
                required
                label="start-date"
                placeholder="choose-start-time"
                @update:modelValue="(value) => $v.start_date.$model = formatDateReverse(value)"
              />
            </base-col>

            <base-col col-class="w-1/2">
              <base-calendar
                v-model="$v.end_date.$model"
                :error="$v.end_date"
                :min-date="minEndDate"
                required
                label="end-date"
                placeholder="choose-end-time"
                @update:modelValue="(value) => $v.end_date.$model = formatDateReverse(value)"
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
          </base-row>
<!--          <pre>{{ store.model }}</pre>-->
        </form-container>
      </template>
    </layout-with-tabs-compose>

    <!-- PREVIEW -->
    <preview-dialog
      v-model="dialog"
      :send-button-loading="store.buttonLoading"
      @emit:send="manage"
    >
      <template #content>
        <BasePOA
          :compose-model="store.model"
          :preview="true"
        />
      </template>
    </preview-dialog>
  </template>
</template>

<style scoped>

</style>
