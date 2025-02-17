<script setup>
// Core
import {onMounted, onUnmounted, ref} from "vue";
import {useVuelidate} from "@vuelidate/core";
import {useI18n} from "vue-i18n";
import {useRoute, useRouter} from "vue-router";
// Components
import DepartmentMultiSelect from "@/components/Select/DepartmentMultiSelect.vue";
import EditorWithTabs from "@/components/Composed/EditorWithTabs.vue";
import FormContainer from "@/modules/Documents/modules/SendDocuments/components/FormContainer.vue";
import InnerLetterTemplate from "@/components/Templates/InnerLetterTemplate.vue";
import {LayoutWithTabsCompose} from "@/components/DetailLayout";
import UserMultiSelect from "@/components/Select/UserMultiSelect.vue";
// Store
import {useAuthStore} from "@/modules/Auth/stores";
import {useCommonStore} from "@/stores/common";
import { useCountStore } from '@/stores/count.store'
import {useSDStoreInner} from "@/modules/Documents/modules/SendDocuments/stores/inner.store";
// Utils
import {dispatchNotify} from "@/utils/notify";
// Constants
import {FORM_TYPE_CREATE} from "@/constants/constants";
import PreviewDialog from "@/modules/Documents/modules/SendDocuments/components/PreviewDialog.vue";
import {COLOR_TYPES, COMPOSE_DOCUMENT_SUB_TYPES, COMPOSE_DOCUMENT_TYPES, JOURNAL} from "@/enums";
import {ROUTE_SD_DETAIL, ROUTE_SD_LIST, SD_TYPE_INNER} from "@/modules/Documents/modules/SendDocuments/constants";
import {adjustUsersToArray, resetModel} from "@/utils";

const props = defineProps({
  formType: {
    type: String,
    default: FORM_TYPE_CREATE
  }
});
const authStore = useAuthStore();
const SDStoreInner = useSDStoreInner();
const commonStore = useCommonStore();
const countStore = useCountStore();

const dialog = ref(false);
const formRef = ref(null);
const {t} = useI18n();
const router = useRouter();
const route = useRoute();

const $v = useVuelidate(SDStoreInner.rules, SDStoreInner.model);

// Methods
const preview = async () => {
  const valid = await $v.value.$validate();

  if (!valid) return;

  dialog.value = true;
  SDStoreInner.model.approvers = [];
  SDStoreInner.model.signers = [];
  SDStoreInner.model.departments = [];
  SDStoreInner.model.departments = SDStoreInner.model.__departments.map(item => item.id)

  SDStoreInner.model.files = []
  SDStoreInner.model.files = SDStoreInner.model.__files.map(item => { return { id: item.id } })

  SDStoreInner.model.journal = JOURNAL.INNER
  SDStoreInner.model.sender = authStore.currentUser.top_level_department.id

  SDStoreInner.model.approvers = adjustUsersToArray(SDStoreInner.model.__approvers)
  SDStoreInner.model.signers = adjustUsersToArray(SDStoreInner.model.__signers)
  SDStoreInner.model.document_type = route.params.document_type
  SDStoreInner.model.document_sub_type = route.params.document_sub_type

  if (SDStoreInner.model.receiver) {
    delete SDStoreInner.model.receiver
  }
}
const manage = () => {
  if (props.formType === FORM_TYPE_CREATE) {
    create();
  } else {
    update();
  }
}
const create = async () => {
  const response = await SDStoreInner.actionCreateDocument(SDStoreInner.model);
  await countStore.actionCountList();
  if (response) {
    dialog.value = false;
    dispatchNotify(null, t('document-sent'), COLOR_TYPES.SUCCESS);
    await router.replace({
      name: ROUTE_SD_LIST,
      query: {
        document_type: COMPOSE_DOCUMENT_TYPES.INNER
      }
    });
  } else {
    dispatchNotify(null, t('error-occurred'), COLOR_TYPES.ERROR);
  }
}
const update = async () => {
  const data = await SDStoreInner.actionUpdateDocument(
    {
      id: route.params.id,
      body: SDStoreInner.model
    }
  );
  await countStore.actionCountList();
  dispatchNotify(null, t('document-sent'), COLOR_TYPES.SUCCESS);
  await router.replace({
    name: ROUTE_SD_DETAIL,
    params: {
      id: route.params.id,
      document_type: COMPOSE_DOCUMENT_TYPES.INNER,
      document_sub_type: COMPOSE_DOCUMENT_SUB_TYPES.SERVICE_LETTER
    }
  });
}
const clearForm = () => {
  console.log("Clear Form")
}
const onFileUpload = (files) => {
  SDStoreInner.model.__files = []
  files.forEach(file => {
    SDStoreInner.model.__files.push(file)
  });
}

onMounted(async () => {
  if (route.params.id) {
    await SDStoreInner.actionGetDocumentDetailForUpdate(route.params.id)
  }
})

onUnmounted(() => {
  resetModel(SDStoreInner.model);
})

</script>

<template>
  <template v-if="SDStoreInner.detailLoading">
    <base-spinner/>
  </template>

  <template v-else>
    <layout-with-tabs-compose
      :title="props.formType === FORM_TYPE_CREATE ? 'create-sd-inner' : 'update-sd-inner'"
    >
      <template #content>
        <form-container
          @emit:preview="preview"
          @emit:clear-form="clearForm"
        >
          <base-row>
<!--            <base-col col-class="w-1/2">
              <base-input
                v-model="$v.register_number.$model"
                :error="$v.register_number"
                required
                label="reg-number"
              />
            </base-col>-->

            <base-col col-class="w-1/2">
              <department-multi-select
                v-model="$v.__departments.$model"
                :error="$v.__departments"
              />
            </base-col>

<!--            <base-col col-class="w-1/2">
              <base-dropdown
                v-model="$v.title.$model"
                v-model:options="commonStore.documentTitleList"
                :error="$v.title"
                api-url="document-titles"
                option-label="name"
                option-value="id"
                label="naming"
                placeholder="enter-naming"
                required
                searchable
              >
              </base-dropdown>
            </base-col>-->

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
                v-model="$v.__approvers.$model"
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
                :files="SDStoreInner.model.__files"
                @emit:file-upload="onFileUpload"
              />
            </base-col>
          </base-row>
        </form-container>
      </template>
    </layout-with-tabs-compose>

<!--    <pre>{{ SDStoreInner.model.__files }}</pre>-->

    <!-- PREVIEW -->
    <preview-dialog
      v-model="dialog"
      :send-button-loading="SDStoreInner.buttonLoading"
      @emit:send="manage"
    >
      <template #content>
        <inner-letter-template
          :compose-model="{
            ...SDStoreInner.model,
            signers: SDStoreInner.model.__signers,
            approvers: SDStoreInner.model.__approvers,
            author: SDStoreInner.model.__signers[0],
            sender: {
              name: authStore.currentUser?.top_level_department?.name
            },
            receiver: {
              departments: SDStoreInner.model.__departments
            }
          }"
          :preview="true"
        />
      </template>
    </preview-dialog>
    <!-- /PREVIEW -->
  </template>
</template>

<style scoped>

</style>
