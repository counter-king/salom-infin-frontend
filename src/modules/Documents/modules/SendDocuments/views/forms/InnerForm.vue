<script setup>
// Core
import {ref} from "vue";
import {useVuelidate} from "@vuelidate/core";
// Components
import DepartmentMultiSelect from "@/components/Select/DepartmentMultiSelect.vue";
import EditorWithTabs from "@/components/Composed/EditorWithTabs.vue";
import FormContainer from "@/modules/Documents/modules/SendDocuments/components/FormContainer.vue";
import {LayoutWithTabs} from "@/components/DetailLayout";
import UserMultiSelect from "@/components/Select/UserMultiSelect.vue";
// Store
import {useCommonStore} from "@/stores/common";
import {useSDStoreInner} from "@/modules/Documents/modules/SendDocuments/stores/inner.store";
// Constants
import {FORM_TYPE_CREATE} from "@/constants/constants";
import PreviewDialog from "@/modules/Documents/modules/SendDocuments/components/PreviewDialog.vue";

const props = defineProps({
  formType: {
    type: String,
    default: FORM_TYPE_CREATE
  }
});
const SDStoreInner = useSDStoreInner();
const commonStore = useCommonStore();
const dialog = ref(false);

const $v = useVuelidate(SDStoreInner.rules, SDStoreInner.model);

// Methods
const preview = () => {
  dialog.value = true;
}
const manage = () => {
  if (props.formType === FORM_TYPE_CREATE) {
    create();
  } else {
    update();
  }
}
const create = () => {
  console.log("CREATED!")
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
              placeholder="enter-deliver-type"
            />
          </base-col>

          <base-col col-class="w-full">
            <editor-with-tabs
              v-model="$v.content.$model"
              :error="$v.content"
            />
          </base-col>
        </base-row>
        <pre>{{ SDStoreInner.model }}</pre>
      </form-container>
    </template>
  </layout-with-tabs>

  <!-- PREVIEW -->
    <preview-dialog
      v-model="dialog"
      @emit:send="manage"
    >
      <template #content>

      </template>
    </preview-dialog>
  <!-- /PREVIEW -->
</template>

<style scoped>

</style>
