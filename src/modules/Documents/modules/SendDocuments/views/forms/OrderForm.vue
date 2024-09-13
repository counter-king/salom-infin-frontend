<script setup>
// Core
import {onMounted, onUnmounted, ref} from "vue"
import { useI18n } from "vue-i18n"
import {useRoute, useRouter} from "vue-router"
import { useVuelidate } from "@vuelidate/core"
// Enums
import { FORM_TYPE_CREATE } from "@/constants/constants"
import {COLOR_TYPES, COMPOSE_DOCUMENT_TYPES, JOURNAL, SIGNER_TYPES} from "@/enums"
import { ROUTE_SD_DETAIL, ROUTE_SD_LIST } from "@/modules/Documents/modules/SendDocuments/constants"
// Utils
import {adjustUsersToArray, resetModel} from "@/utils"
import { dispatchNotify } from "@/utils/notify"
import { formatDateReverse } from "@/utils/formatDate"
// Store
import { useAuthStore } from "@/modules/Auth/stores"
import { useDocumentCountStore } from "@/modules/Documents/stores/count.store"
import { useSDOrderStore } from "@/modules/Documents/modules/SendDocuments/stores/order.store"
// Components
import { LayoutWithTabs } from "@/components/DetailLayout"
import FormContainer from "@/modules/Documents/modules/SendDocuments/components/FormContainer.vue"
import EditorWithTabs from "@/components/Composed/EditorWithTabs.vue"
import UserMultiSelect from "@/components/Select/UserMultiSelect.vue"
import { OrderLetterTemplate } from "@/components/Templates"
import PreviewDialog from "@/modules/Documents/modules/SendDocuments/components/PreviewDialog.vue"
import UserSelect from "@/components/Select/UserSelect.vue"

const props = defineProps({
  formType: {
    type: String,
    default: FORM_TYPE_CREATE
  }
})

const orderStore = useSDOrderStore()
const countStore = useDocumentCountStore()
const authStore = useAuthStore()
const route = useRoute()
const router = useRouter()
const $v = useVuelidate(orderStore.rules, orderStore.model)
const { t } = useI18n()
const dialog = ref(false)

// Methods
const preview = async () => {
  const valid = await $v.value.$validate()
  if (!valid) return

  orderStore.model.approvers = []
  orderStore.model.signers = []
  orderStore.model.approvers = adjustUsersToArray(orderStore.model.__approvers)
  // orderStore.model.signers = adjustUsersToArray(orderStore.model.__signers)
  orderStore.model.curator = orderStore?.model?.__curator.id
  orderStore.model.sender = authStore?.currentUser?.top_level_department?.id
  orderStore.model.files = orderStore.model.__files.map(item => { return { id: item.id } })
  orderStore.model.document_type = route.params.document_type
  orderStore.model.document_sub_type = route.params.document_sub_type
  orderStore.model.journal = JOURNAL.ORDERS_PROTOCOLS
  orderStore.model.register_date = formatDateReverse(orderStore.model.register_date)
  orderStore.model.__negotiators.forEach(item => {
    orderStore.model.signers.push(
      item.hasOwnProperty('user')
        ? { id: item.id, user: item.user.id, type: SIGNER_TYPES.NEGOTIATOR }
        : { user: item.id, type: SIGNER_TYPES.NEGOTIATOR }
    )
  })

  if (route.query.compose_id) {
    orderStore.model.trip_notice_id = route.query.compose_id
  }

  dialog.value = true

}
const clearForm = () => {

}
const create = async () => {
  const response = await orderStore.actionCreateDocument(orderStore.model)
  await countStore.actionDocumentCountList()
  if (response) {
    dialog.value = false
    dispatchNotify(null, t('document-sent'), COLOR_TYPES.SUCCESS)
    await router.replace({
      name: ROUTE_SD_LIST,
      query: {
        document_type: COMPOSE_DOCUMENT_TYPES.ORDER
      }
    })
  } else {
    dispatchNotify(null, t('error-occurred'), COLOR_TYPES.ERROR)
  }
}
const update = async () => {
  const data = await orderStore.actionUpdateDocument(
    {
      id: route.params.id,
      body: orderStore.model
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
  });
}
const manage = () => {
  if (props.formType === FORM_TYPE_CREATE) {
    create()
  } else {
    update()
  }
}
const onFileUpload = (files) => {
  orderStore.model.__files = [];
  files.forEach(file => {
    orderStore.model.__files.push(file);
  })
}

// Hooks
onMounted( async () => {
  if (route.params.id) {
    await orderStore.actionGetDocumentDetailForUpdate(route.params.id)
  }
})

onUnmounted(() => {
  resetModel(orderStore.model);
})
</script>

<template>
  <template v-if="orderStore.detailLoading">
    <base-spinner/>
  </template>

  <template v-else>
    <layout-with-tabs
      :title="props.formType === FORM_TYPE_CREATE ? 'create-order' : 'update-order'"
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
                api-url="users"
                label="whom"
                required
                placeholder="select-leader"
              />
            </base-col>

            <base-col col-class="w-1/2">
              <base-input
                v-model="$v.register_number.$model"
                :error="$v.register_number"
                required
                label="reg-number"
              />
            </base-col>

            <base-col col-class="w-1/2">
              <base-calendar
                v-model="$v.register_date.$model"
                :error="$v.register_date"
                required
                label="reg-date"
                placeholder="enter-reg-date"
              />
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
			          v-model="$v.__negotiators.$model"
                :error="$v.__negotiators"
			          label="approver-signers"
			          placeholder="select-approver-signers"
                required
		          />
	          </base-col>

<!--            <base-col col-class="w-1/2">-->
<!--              <user-multi-select-->
<!--                v-model="$v.__signers.$model"-->
<!--                :error="$v.__signers"-->
<!--                label="signers"-->
<!--                placeholder="enter-signers"-->
<!--                required-->
<!--              />-->
<!--            </base-col>-->

            <base-col col-class="w-full">
              <editor-with-tabs
                v-model="$v.content.$model"
                :error="$v.content"
                file-upload-container-classes="w-1/2 pr-2"
                :files="orderStore.model.__files"
                @emit:file-upload="onFileUpload"
              />
            </base-col>

          </base-row>
        </form-container>
      </template>
    </layout-with-tabs>

    <!-- PREVIEW -->
    <preview-dialog
      v-model="dialog"
      :send-button-loading="orderStore.buttonLoading"
      @emit:send="manage"
    >
      <template #content>
        <order-letter-template
          :compose-model="orderStore.model"
          :preview="true"
        />
      </template>
    </preview-dialog>
    <!-- /PREVIEW -->
  </template>
</template>

<style scoped>

</style>
