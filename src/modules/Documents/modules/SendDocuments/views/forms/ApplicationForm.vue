<script setup>
// Core
import {onMounted, ref} from "vue"
import {useVuelidate} from "@vuelidate/core"
import {useI18n} from "vue-i18n"
import {useRoute, useRouter} from "vue-router"
// Store
import {useAuthStore} from "@/modules/Auth/stores"
import {useCommonStore} from "@/stores/common"
import {useDocumentCountStore} from "@/modules/Documents/stores/count.store"
import {useSDStoreApplication} from "@/modules/Documents/modules/SendDocuments/stores/application.store"
// Components
import EditorWithTabs from "@/components/Composed/EditorWithTabs.vue"
import FormContainer from "@/modules/Documents/modules/SendDocuments/components/FormContainer.vue"
import ApplicationLetterTemplate from "@/components/Templates/ApplicationLetterTemplate.vue"
import {LayoutWithTabs} from "@/components/DetailLayout"
import UserMultiSelect from "@/components/Select/UserMultiSelect.vue"
import UserSelect from "@/components/Select/UserSelect.vue";
import {FORM_TYPE_CREATE} from "@/constants/constants"
import PreviewDialog from "@/modules/Documents/modules/SendDocuments/components/PreviewDialog.vue";
import {adjustUsersToArray} from "@/utils";
import {dispatchNotify} from "@/utils/notify";
// Constants
import {COLOR_TYPES, COMPOSE_DOCUMENT_TYPES} from "@/enums";
import {ROUTE_SD_DETAIL, ROUTE_SD_LIST, SD_TYPE_INNER} from "@/modules/Documents/modules/SendDocuments/constants";


const props = defineProps({
  formType: {
    type: String,
    default: FORM_TYPE_CREATE
  }
})

const authStore = useAuthStore()
const applicationStore = useSDStoreApplication()
const commonStore = useCommonStore()
const countStore = useDocumentCountStore()

const dialog = ref(false)
const formRef = ref(null)
const {t} = useI18n()
const router = useRouter()
const route = useRoute()

const $v = useVuelidate(applicationStore.rules, applicationStore.model);

// Methods
const preview = async () => {
  const valid = await $v.value.$validate()

  if (!valid) return
  dialog.value = true
  applicationStore.model.approvers = []
  applicationStore.model.signers = []
  applicationStore.model.signers = [ { user: authStore?.currentUser?.id } ]
  applicationStore.model.sender = authStore?.currentUser?.top_level_department?.id
  applicationStore.model.curator = applicationStore?.model?.__curator.id
  applicationStore.model.journal= COMPOSE_DOCUMENT_TYPES.APPLICATION
  applicationStore.model.document_type= commonStore.documentTypesList.find(item => item.document_type === Number(COMPOSE_DOCUMENT_TYPES.APPLICATION)).id
  applicationStore.model.approvers = adjustUsersToArray(applicationStore.model.__approvers)

}
const clearForm = async () => {

}
const manage = () => {
  if (props.formType === FORM_TYPE_CREATE) {
    create();
  } else {
    update();
  }
}
const create = async () => {
  const response = await applicationStore.actionCreateDocument(applicationStore.model)
  await countStore.actionDocumentCountList()
  if (response) {
    dialog.value = false;
    dispatchNotify(null, t('document-sent'), COLOR_TYPES.SUCCESS);
    await router.replace({
      name: ROUTE_SD_LIST,
      query: {
        journal: COMPOSE_DOCUMENT_TYPES.APPLICATION
      }
    });
  } else {
    dispatchNotify(null, t('error-occurred'), COLOR_TYPES.ERROR);
  }
}
const update = async () => {
  const data = await applicationStore.actionUpdateDocument(
    {
      id: route.params.id,
      body: applicationStore.model
    }
  );
  await countStore.actionDocumentCountList();
  dispatchNotify(null, t('document-sent'), COLOR_TYPES.SUCCESS);
  await router.replace({
    name: ROUTE_SD_DETAIL,
    params: {
      id: route.params.id,
      journal: applicationStore.model.journal
    }
  });
}
const onFileUpload = (files) => {
  applicationStore.model.__files = []
  files.forEach(file => {
    applicationStore.model.__files.push(file)
  })
}

onMounted(async () => {
  if (route.params.id) {
    await applicationStore.actionGetDocumentDetailForUpdate(route.params.id);
  }
})
</script>

<template>
  <template v-if="applicationStore.detailLoading">
    <base-spinner/>
  </template>

  <template v-else>
    <layout-with-tabs
      :title="props.formType === FORM_TYPE_CREATE ? 'create-sd-application' : 'update-sd-application'"
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
                label="whom"
                required
                placeholder="select-leader"
              />

<!--              <pre>{{ $v.__curator.$model }}</pre>-->
            </base-col>

            <base-col col-class="w-1/2">
              <base-dropdown
                v-model="$v.document_sub_type.$model"
                v-model:options="commonStore.documentSubTypesList"
                :error="$v.document_sub_type"
                api-url="document-sub-types"
                option-label="name"
                option-value="id"
                label="application-type"
                placeholder="select-application-type"
                required
                searchable
              >
              </base-dropdown>
            </base-col>

            <base-col col-class="w-1/2">
              <user-multi-select
                v-model="orderStore.model.__approvers"
                label="approvers"
                placeholder="enter-approvers"
              />
            </base-col>

            <base-col col-class="w-1/2">
              <user-multi-select
                v-model="$v.__signers.$model"
                disabled
                label="signers"
                :placeholder="authStore.currentUser.full_name"
              />
            </base-col>

            <base-col col-class="w-full">
              <editor-with-tabs
                v-model="$v.content.$model"
                :error="$v.content"
                file-upload-container-classes="w-1/2 pr-2"
                :files="applicationStore.model.__files"
                @emit:file-upload="onFileUpload"
              />
            </base-col>

          </base-row>

<!--          <pre>{{ applicationStore.model }}</pre>-->
        </form-container>
      </template>
    </layout-with-tabs>

    <!-- PREVIEW -->
    <preview-dialog
      v-model="dialog"
      :send-button-loading="applicationStore.buttonLoading"
      @emit:send="manage"
    >
      <template #content>
        <application-letter-template
          :compose-model="{
            ...applicationStore.model,
            curator: applicationStore.model.__curator[0],
            author: props.formType === FORM_TYPE_CREATE ? authStore.currentUser : applicationStore.model.__signers[0].user,
            signers: props.formType === FORM_TYPE_CREATE ? [authStore.currentUser] : applicationStore.model.__signers,
          }"
        />
      </template>
    </preview-dialog>
  </template>
</template>

<style scoped>

</style>
