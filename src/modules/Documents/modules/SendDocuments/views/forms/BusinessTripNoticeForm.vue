<script setup>
// Core
import {onMounted, ref} from "vue"
import {useVuelidate} from "@vuelidate/core"
import {useRoute, useRouter} from "vue-router"
import {useI18n} from "vue-i18n"
// Enums
import { FORM_TYPE_CREATE } from "@/constants/constants"
// Components
import BaseMultiSelect from "@/components/UI/BaseMultiSelect.vue"
import { BusinessTripNoticeTemplate } from "@/components/Templates"
import BranchMultiSelect from "@/components/Select/BranchMultiSelect.vue"
import FormContainer from "@/modules/Documents/modules/SendDocuments/components/FormContainer.vue"
import {LayoutWithTabs} from "@/components/DetailLayout"
import UserMultiSelect from "@/components/Select/UserMultiSelect.vue"
import {UserWithRadio} from "@/components/Users"
// Utils
import {formatDateReverse} from "@/utils/formatDate"
// Store
import {useAuthStore} from "@/modules/Auth/stores"
import {useCommonStore} from "@/stores/common"
import {useDocumentCountStore} from "@/modules/Documents/stores/count.store";
import {useSDBTNoticeStore} from "@/modules/Documents/modules/SendDocuments/stores/businessTripNotice.store"
import EditorWithTabs from "@/components/Composed/EditorWithTabs.vue"
import {COLOR_TYPES, COMPOSE_DOCUMENT_TYPES, ROUTES_TYPE} from "@/enums"
import PreviewDialog from "@/modules/Documents/modules/SendDocuments/components/PreviewDialog.vue"
import UserSelect from "@/components/Select/UserSelect.vue"
import {adjustUsersToArray} from "@/utils"
import {dispatchNotify} from "@/utils/notify"
import {ROUTE_SD_DETAIL, ROUTE_SD_LIST} from "@/modules/Documents/modules/SendDocuments/constants"

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
const BTNoticeStore = useSDBTNoticeStore()
const countStore = useDocumentCountStore()
const commonStore = useCommonStore()
const dialog = ref(false)

const $v = useVuelidate(BTNoticeStore.rules, BTNoticeStore.model)

// Methods
const preview = async () => {
  const valid = await $v.value.$validate()
  if (!valid) return
  BTNoticeStore.model.approvers = []
  BTNoticeStore.model.signers = []
  BTNoticeStore.model.notices = []
  BTNoticeStore.model.approvers = adjustUsersToArray(BTNoticeStore.model.__approvers)
  BTNoticeStore.model.signers = adjustUsersToArray(BTNoticeStore.model.__signers)
  BTNoticeStore.model.curator = BTNoticeStore?.model?.__curator.id
  BTNoticeStore.model.notices = BTNoticeStore.model.__employees.map(item => {
    return {
      start_date: BTNoticeStore.model.start_date,
      end_date: BTNoticeStore.model.end_date,
      user: item.id,
      route: BTNoticeStore.model.route,
      companies: BTNoticeStore.model.__companies.map(item => item.id)
    }
  })
  BTNoticeStore.model.sender = authStore?.currentUser?.top_level_department?.id
  BTNoticeStore.model.tags = BTNoticeStore.model.__tags.map(item => { return { id: item.id } })
  BTNoticeStore.model.files = BTNoticeStore.model.__files.map(item => { return { id: item.id } })

  dialog.value = true
}
const clearForm = () => {

}
const onFileUpload = (files) => {
  BTNoticeStore.model.__files = []
  files.forEach(file => {
    BTNoticeStore.model.__files.push(file)
  })
}
const create = async () => {
  const response = await BTNoticeStore.actionCreateDocument(BTNoticeStore.model)
  await countStore.actionDocumentCountList()
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
  const data = await BTNoticeStore.actionUpdateDocument(
    {
      id: route.params.id,
      body: BTNoticeStore.model
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

// Hooks
onMounted( async () => {
  if (route.params.id) {
    await BTNoticeStore.actionGetDocumentDetailForUpdate(route.params.id)
  }
})
</script>

<template>
  <template v-if="BTNoticeStore.detailLoading">
    <base-spinner/>
  </template>

  <template v-else>
    <layout-with-tabs
      :title="props.formType === FORM_TYPE_CREATE ? 'create-business-trip-notice' : 'update-business-trip-notice'"
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
            </base-col>

            <base-col col-class="w-1/2">
              <user-multi-select
                v-model="$v.__employees.$model"
                :error="$v.__employees"
                label="employees"
                placeholder="select-employees"
                required
              />
            </base-col>

            <base-col col-class="w-1/2">
              <branch-multi-select
                v-model="$v.__companies.$model"
                :error="$v.__companies"
              />
            </base-col>

            <base-col col-class="w-1/2">
              <div class="flex w-full gap-x-4">
                <base-calendar
                  v-model="$v.start_date.$model"
                  :error="$v.start_date"
                  required
                  label="start-date"
                  placeholder="choose-start-time"
                  class="w-1/2"
                  @update:modelValue="(value) => $v.start_date.$model = formatDateReverse(value)"
                />
                <base-calendar
                  v-model="$v.end_date.$model"
                  :error="$v.end_date"
                  required
                  label="end-date"
                  placeholder="choose-end-time"
                  class="w-1/2"
                  @update:modelValue="(value) => $v.end_date.$model = formatDateReverse(value)"
                />
              </div>
            </base-col>

            <base-col col-class="w-1/2">
              <base-multi-select
                v-model="$v.__tags.$model"
                :error="$v.__tags"
                api-url="tags"
                :token-class="['chip-hover shadow-button bg-white cursor-pointer']"
                display="chip"
                selectable
                label="targets"
                type="department"
                placeholder="select-targets"
                required
              >
                <template #chip="{ value }">
                  {{ value.name }}
                </template>

                <template #option="{ value }">
                  <user-with-radio
                    :title="value.name"
                  >
                  </user-with-radio>
                </template>
              </base-multi-select>
            </base-col>

            <base-col col-class="w-1/2">
              <base-dropdown
                v-model="$v.route.$model"
                :error="$v.route"
                :options="ROUTES_TYPE"
                required
                option-label="label"
                option-value="value"
                label="route"
                placeholder="select-route"
              />
            </base-col>

            <base-col col-class="w-1/2">
              <user-multi-select
                v-model="BTNoticeStore.model.__approvers"
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
                :files="BTNoticeStore.model.__files"
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
      :send-button-loading="BTNoticeStore.buttonLoading"
      @emit:send="manage"
    >
      <template #content>
        <business-trip-notice-template
          :compose-model="BTNoticeStore.model"
          :preview="true"
        />
      </template>
    </preview-dialog>
  </template>
</template>

<style scoped>

</style>
