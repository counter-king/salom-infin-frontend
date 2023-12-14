<script setup>
// Core
import {ref, unref} from "vue";
import {useVuelidate} from "@vuelidate/core";
import {useI18n} from "vue-i18n";
import {useRouter} from "vue-router";
// Components
import DepartmentMultiSelect from "@/components/Select/DepartmentMultiSelect.vue";
import EditorWithTabs from "@/components/Composed/EditorWithTabs.vue";
import FormContainer from "@/modules/Documents/modules/SendDocuments/components/FormContainer.vue";
import {LayoutWithTabs} from "@/components/DetailLayout";
import UserMultiSelect from "@/components/Select/UserMultiSelect.vue";
// Store
import {useCommonStore} from "@/stores/common";
import {useSDStoreInner} from "@/modules/Documents/modules/SendDocuments/stores/inner.store";
// Utils
import {dispatchNotify} from "@/utils/notify";
// Constants
import {FORM_TYPE_CREATE} from "@/constants/constants";
import PreviewDialog from "@/modules/Documents/modules/SendDocuments/components/PreviewDialog.vue";
import InnerLetterTemplate from "@/components/Templates/InnerLetterTemplate.vue";
import {COLOR_TYPES} from "@/enums";
import {ROUTE_SD_LIST, SD_TYPE_INNER} from "@/modules/Documents/modules/SendDocuments/constants";

const props = defineProps({
  formType: {
    type: String,
    default: FORM_TYPE_CREATE
  }
});
const SDStoreInner = useSDStoreInner();
const commonStore = useCommonStore();
const dialog = ref(false);
const formRef = ref(null);
const { t } = useI18n();
const router = useRouter();

const $v = useVuelidate(SDStoreInner.rules, SDStoreInner.model);

// Methods
const preview = async () => {
  const valid = await $v.value.$validate();

  if(!valid) return;

  dialog.value = true;
  SDStoreInner.model.approvers = [];
  SDStoreInner.model.signers = [];
  SDStoreInner.model.departments = [];

  // TEMP
  SDStoreInner.model.sender = 1

  if (props.formType === FORM_TYPE_CREATE){
    SDStoreInner.model.departments = SDStoreInner.model.__departments.map(item => item.id);
    SDStoreInner.model.approvers = SDStoreInner.model.__approvers.map(item => {
      return {user: item.id}
    });
    SDStoreInner.model.signers = SDStoreInner.model.__signers.map(item => {
      return {user: item.id}
    });
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
  if (response) {
    dialog.value = false;
    dispatchNotify(t('document-sent'), null, COLOR_TYPES.SUCCESS);
    await router.replace({
      name: ROUTE_SD_LIST,
      query: {
        type: SD_TYPE_INNER
      }
    });
  }else {
    dispatchNotify(t('error-occurred'), null, COLOR_TYPES.ERROR);
  }
}
const update = () => {

}
const clearForm = () => {
  console.log("Clear Form")
}
</script>

<template>
  <layout-with-tabs
    :title="props.formType === FORM_TYPE_CREATE ? 'create-sd-inner' : 'update-sd-inner'"
  >
    <template #content>
      <form-container
        @emit:preview="preview"
        @emit:clear-form="clearForm"
      >
        <base-row>
          <base-col col-class="w-1/2">
            <base-input
              v-model="$v.register_number.$model"
              :error="$v.register_number"
              required
              label="reg-number"
            />
          </base-col>

          <base-col col-class="w-1/2">
            <department-multi-select
              v-model="$v.__departments.$model"
              :error="$v.__departments"
            />
          </base-col>

          <base-col col-class="w-1/2">
            <base-input
              v-model="$v.title.$model"
              :error="$v.title"
              required
              label="naming"
              placeholder="enter-naming"
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

          <base-col col-class="w-1/2">
            <base-dropdown
              v-model="$v.document_type.$model"
              :error="$v.document_type"
              :options="commonStore.documentTypesList"
              required
              option-value="id"
              label="document-type"
              placeholder="enter-document-type"
            />
          </base-col>

          <base-col col-class="w-full">
            <editor-with-tabs
              v-model="$v.content.$model"
              :error="$v.content"
            />
          </base-col>
        </base-row>
      </form-container>
    </template>
  </layout-with-tabs>

  <!-- PREVIEW -->
    <preview-dialog
      v-model="dialog"
      :send-button-loading="SDStoreInner.buttonLoading"
      @emit:send="manage"
    >
      <template #content>
        <inner-letter-template />
      </template>
    </preview-dialog>
  <!-- /PREVIEW -->
</template>

<style scoped>

</style>
