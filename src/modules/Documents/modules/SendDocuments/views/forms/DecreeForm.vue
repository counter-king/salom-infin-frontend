<script setup>
// Core
import {onBeforeMount, onUnmounted, ref} from "vue"
import {useVuelidate} from "@vuelidate/core"
import {useRoute, useRouter} from "vue-router"
import {useI18n} from "vue-i18n"
// Enums
import { FORM_TYPE_CREATE } from "@/constants/constants"
import {ROUTE_SD_DETAIL, ROUTE_SD_LIST} from "@/modules/Documents/modules/SendDocuments/constants"
import {COLOR_TYPES, COMPOSE_DOCUMENT_TYPES, JOURNAL} from "@/enums"
// Components
import FormContainer from "@/modules/Documents/modules/SendDocuments/components/FormContainer.vue"
import {LayoutWithTabsCompose} from "@/components/DetailLayout"
import UserMultiSelect from "@/components/Select/UserMultiSelect.vue"
import UserSelect from "@/components/Select/UserSelect.vue"
import EditorWithTabs from "@/components/Composed/EditorWithTabs.vue"
import PreviewDialog from "@/modules/Documents/modules/SendDocuments/components/PreviewDialog.vue"
import {DecreeTemplate} from "@/components/Templates"
// Utils
import {adjustUsersToArray, resetModel} from "@/utils"
import {dispatchNotify} from "@/utils/notify"
// Store
import {useAuthStore} from "@/modules/Auth/stores"
import {useDocumentCountStore} from "@/modules/Documents/stores/count.store"
import {useCommonStore} from "@/stores/common"
import {useDecreeStore} from "@/modules/Documents/modules/SendDocuments/stores/decree.store"

const props = defineProps({
  formType: {
    type: String,
    default: FORM_TYPE_CREATE
  }
})

const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const countStore = useDocumentCountStore()
const commonStore = useCommonStore()
const dialog = ref(false)
const decreeStore = useDecreeStore()

const $v = useVuelidate(decreeStore.rules, decreeStore.model)

// Methods
const preview = async () => {
  const valid = await $v.value.$validate()
  if (!valid) return

  decreeStore.model.approvers = []
  decreeStore.model.signers = []
  decreeStore.model.approvers = adjustUsersToArray(decreeStore.model.__approvers)
  decreeStore.model.signers = adjustUsersToArray(decreeStore.model.__signers)
  decreeStore.model.curator = decreeStore?.model?.__curator?.user_id
  decreeStore.model.journal = JOURNAL.ORDERS_PROTOCOLS
  decreeStore.model.company = authStore.currentUser.company.id
  decreeStore.model.sender = authStore?.currentUser?.top_level_department?.id
  decreeStore.model.files = decreeStore.model.__files.map(item => { return { id: item.id } })
  decreeStore.model.document_type = route.params.document_type
  decreeStore.model.document_sub_type = route.params.document_sub_type
  if (route.query.compose_id) {
    decreeStore.model.trip_notice_id = route.query.compose_id
  }

  dialog.value = true
}
const clearForm = () => {

}
const onFileUpload = (files) => {
  decreeStore.model.__files = []
  files.forEach(file => {
    decreeStore.model.__files.push(file)
  })
}

const create = async () => {
  const response = await decreeStore.actionCreateDocument(decreeStore.model)
  await countStore.actionDocumentCountList()
  if (response) {
    dialog.value = false
    dispatchNotify(null, t('document-sent'), COLOR_TYPES.SUCCESS)
    await router.replace({
      name: ROUTE_SD_LIST,
      query: {
        document_type: route.params.document_type
      }
    })
  } else {
    dispatchNotify(null, t('error-occurred'), COLOR_TYPES.ERROR)
  }
}
const update = async () => {
  const data = await decreeStore.actionUpdateDocument(
    {
      id: route.params.id,
      body: decreeStore.model
    }
  );
  await countStore.actionDocumentCountList();
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
    await decreeStore.actionGetDocumentDetailForUpdate(route.params.id)
  }
})
onUnmounted(() => {
  resetModel(decreeStore.model)
})
</script>

<template>
  <template v-if="decreeStore.detailLoading">
    <base-spinner/>
  </template>

  <template v-else>
    <layout-with-tabs-compose
      :title="props.formType === FORM_TYPE_CREATE ? 'create-decree' : 'update-decree'"
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

            <base-col col-class="w-1/2">
              <user-multi-select
                v-model="decreeStore.model.__approvers"
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
                :files="decreeStore.model.__files"
                @emit:file-upload="onFileUpload"
              />
            </base-col>
          </base-row>
        </form-container>
      </template>
    </layout-with-tabs-compose>

    <!-- PREVIEW -->
    <preview-dialog
      v-model="dialog"
      :send-button-loading="decreeStore.buttonLoading"
      @emit:send="manage"
    >
      <template #content>
        <decree-template
          :compose-model="decreeStore.model"
          :preview="true"
        />
      </template>
    </preview-dialog>
  </template>
</template>

<style scoped>

</style>
