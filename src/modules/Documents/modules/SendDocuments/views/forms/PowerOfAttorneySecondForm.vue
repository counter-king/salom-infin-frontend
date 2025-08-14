<script setup>
// Core
import { computed, onBeforeMount, onUnmounted, ref } from "vue"
import { useRoute, useRouter } from "vue-router"
import { useVuelidate } from "@vuelidate/core"
import { useI18n } from "vue-i18n"
// Services
import {
  fetchGetComposeList
} from "@/modules/Documents/modules/SendDocuments/services/index.service"
// Store
import { useAuthStore } from "@/modules/Auth/stores"
import { useCountStore } from "@/stores/count.store"
import { usePOAStore } from "@/modules/Documents/modules/SendDocuments/stores/powerOfAttorney.store"
// Enums
import { FORM_TYPE_CREATE } from "@/constants/constants"
import { COLOR_TYPES, COMPOSE_DOCUMENT_SUB_TYPES, COMPOSE_DOCUMENT_TYPES, JOURNAL, ROUTES_TYPE } from "@/enums"
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
import EditorWithTabs from "@/components/Composed/EditorWithTabs.vue";
import { ModalShortDescription } from "@/components/Modal";

// Composable
const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const store = usePOAStore()
const countStore = useCountStore()
const {t} = useI18n()
const $v = useVuelidate(store.secondRules, store.model)

// Props
const props = defineProps({
  formType: {
    type: String,
    default: FORM_TYPE_CREATE
  }
})

// Reactive
const dialog = ref(false)
const showNestedError = ref(false)
const parentDocuments = ref([])

// Computed
const title = computed(() => {
  return props.formType === FORM_TYPE_CREATE ? 'create-poa' : 'update-poa'
})
const minEndDate = computed(() => {
  return store.model.start_date ? new Date(store.model.start_date) : new Date()
})

// Methods
const preview = async () => {
  showNestedError.value = true
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
  store.model.parent = store.model?.__parent?.id

  if (!(store?.model?.__user?.passport_seria || store?.model?.__user?.passport_number || store?.model?.__user?.passport_issue_date || store?.model?.__user?.passport_issued_by)) {
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
const onFileUpload = (files) => {
  store.model.__files = []
  files.forEach(file => {
    store.model.__files.push(file)
  })
}
const getOldPoas = async (item) => {
  const {data} = await fetchGetComposeList({
    user: item.id,
    document_sub_type: route.params.document_sub_type,
    status: 5
  })
  parentDocuments.value = data.results
}

// Hooks
onBeforeMount(async () => {
  if (route.params.id) {
    const data = await store.actionGetDocumentDetailForUpdate(route.params.id)
    if (data.parent) {
      parentDocuments.value = [data.parent]
    }
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
                @emit:change="item => getOldPoas(item)"
              />
            </base-col>

            <base-col col-class="w-full">
              <div
                class="border-[1.5px] rounded-2xl px-5 py-4"
                :class="showNestedError && !store.model.content ? 'border-critic-500' : 'border-greyscale-200'"
              >
                <editor-with-tabs
                  v-model="$v.content.$model"
                  :error="$v.content"
                  file-upload-container-classes="w-1/2 pr-2"
                  :files="store.model.__files"
                  @emit:file-upload="onFileUpload"
                />

                <modal-short-description
                  @emit:selected="(value) => store.model.content = value"
                />
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

            <base-col col-class="w-1/2">
              <base-input
                v-model="$v.short_description.$model"
                :error="$v.short_description"
                required
                label="basis"
                placeholder="enter-basis"
              />
            </base-col>

            <base-col col-class="w-1/2">
              <base-dropdown
                v-model="store.model.__parent"
                :options="parentDocuments"
                option-label="register_number"
                label="old-poa"
                placeholder="select-old-poa"
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
