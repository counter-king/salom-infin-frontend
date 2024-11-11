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
import {OrdinaryNoticeTemplate} from "@/components/Templates"
import PreviewDialog from "@/modules/Documents/modules/SendDocuments/components/PreviewDialog.vue"
// Utils
import {adjustUsersToArray, resetModel} from "@/utils"
import {dispatchNotify} from "@/utils/notify"
// Store
import { useCountStore } from '@/stores/count.store'
import {useAuthStore} from "@/modules/Auth/stores"
import {useNoticeStore} from "@/modules/Documents/modules/SendDocuments/stores/notice.store"
import {useCommonStore} from "@/stores/common"

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
const noticeStore = useNoticeStore()
const countStore = useCountStore()
const commonStore = useCommonStore()
const dialog = ref(false)

const $v = useVuelidate(noticeStore.rules, noticeStore.model)

// Methods
const preview = async () => {
  const valid = await $v.value.$validate()
  if (!valid) return

  noticeStore.model.approvers = []
  noticeStore.model.signers = []
  noticeStore.model.approvers = adjustUsersToArray(noticeStore.model.__approvers)
  noticeStore.model.signers = adjustUsersToArray(noticeStore.model.__signers)
  noticeStore.model.curator = noticeStore?.model?.__curator?.user_id
  noticeStore.model.journal = JOURNAL.INNER
  noticeStore.model.company = authStore.currentUser.company.id
  noticeStore.model.sender = authStore?.currentUser?.top_level_department?.id
  noticeStore.model.files = noticeStore.model.__files.map(item => { return { id: item.id } })
  noticeStore.model.document_type = route.params.document_type
  noticeStore.model.document_sub_type = route.params.document_sub_type

  dialog.value = true
}
const clearForm = () => {

}
const onFileUpload = (files) => {
  noticeStore.model.__files = []
  files.forEach(file => {
    noticeStore.model.__files.push(file)
  })
}
const create = async () => {
  const response = await noticeStore.actionCreateDocument(noticeStore.model)
  await countStore.actionCountList()
  if (response) {
    dialog.value = false
    dispatchNotify(null, t('document-sent'), COLOR_TYPES.SUCCESS)
    await router.replace({
      name: ROUTE_SD_LIST,
      query: {
        document_type: COMPOSE_DOCUMENT_TYPES.NOTICE
      }
    })
  } else {
    dispatchNotify(null, t('error-occurred'), COLOR_TYPES.ERROR)
  }
}
const update = async () => {
  const data = await noticeStore.actionUpdateDocument(
    {
      id: route.params.id,
      body: noticeStore.model
    }
  );
  await countStore.actionCountList();
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
    await noticeStore.actionGetDocumentDetailForUpdate(route.params.id)
  }
})

onUnmounted(() => {
  resetModel(noticeStore.model)
})
</script>

<template>
  <template v-if="noticeStore.detailLoading">
    <base-spinner/>
  </template>

  <template v-else>
    <layout-with-tabs-compose
      :title="props.formType === FORM_TYPE_CREATE ? 'create-notice' : 'update-notice'"
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
                v-model="noticeStore.model.__approvers"
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
                :files="noticeStore.model.__files"
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
      :send-button-loading="noticeStore.buttonLoading"
      @emit:send="manage"
    >
      <template #content>
        <ordinary-notice-template
          :compose-model="noticeStore.model"
          :preview="true"
        />
      </template>
    </preview-dialog>
  </template>
</template>

<style scoped>

</style>
