<script setup>
// Core
import { computed, nextTick, onBeforeMount, onUnmounted, ref } from "vue"
import { useRoute, useRouter } from "vue-router"
import { useVuelidate } from "@vuelidate/core"
import { useI18n } from "vue-i18n"
// Store
import { useAuthStore } from "@/modules/Auth/stores"
import { useCountStore } from "@/stores/count.store"
import { useActStore } from "@/modules/Documents/modules/SendDocuments/stores/act.store"

// Enums
import { FORM_TYPE_CREATE } from "@/constants/constants"
import { COLOR_TYPES, COMPOSE_DOCUMENT_SUB_TYPES, COMPOSE_DOCUMENT_TYPES, JOURNAL, ROUTES_TYPE } from "@/enums"
import { ROUTE_SD_DETAIL, ROUTE_SD_LIST } from "@/modules/Documents/modules/SendDocuments/constants"
// Utils
import { adjustUserObjectToArray, adjustUsersToArray, formatUzbekDate, resetModel } from "@/utils"
import { dispatchNotify } from "@/utils/notify"
// Components
import FormContainer from "@/modules/Documents/modules/SendDocuments/components/FormContainer.vue"
import PreviewDialog from "@/modules/Documents/modules/SendDocuments/components/PreviewDialog.vue"
import UserMultiSelect from "@/components/Select/UserMultiSelect.vue"
import UserSelect from "@/components/Select/UserSelect.vue"
import { LayoutWithTabsCompose } from "@/components/DetailLayout"
import EditorWithTabs from "@/components/Composed/EditorWithTabs.vue"
import BaseTemplate from "@/modules/Documents/components/BaseTemplate.vue"
import { ROUTE_SIGN_SHOW } from "@/modules/Documents/modules/Boxes/constants";
import { fetchSignDocument } from "@/modules/Documents/modules/Boxes/services/sign.service";

// Composable
const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const store = useActStore()
const countStore = useCountStore()
const {t} = useI18n()
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
const showNestedError = ref(false)


// Computed
const title = computed(() => {
  return props.formType === FORM_TYPE_CREATE ? 'create-act' : 'update-act'
})

// Methods
const preview = async () => {
  showNestedError.value = true
  const valid = await $v.value.$validate()
  if (!valid) return

  if (store.model.__signers.length < 2) {
    dispatchNotify(null, t('add-signers'), COLOR_TYPES.WARNING)
    return
  }

  store.model.approvers = []
  store.model.signers = []
  store.model.approvers = adjustUsersToArray(store.model.__approvers)
  store.model.signers = adjustUsersToArray(store.model.__signers)
  store.model.curator = store?.model?.__curator?.user_id
  store.model.journal = JOURNAL.ACT
  store.model.company = authStore.currentUser?.company?.id
  store.model.sender = authStore?.currentUser?.top_level_department?.id
  store.model.document_type = route.params.document_type
  store.model.document_sub_type = route.params.document_sub_type

  dialog.value = true
}
const clearForm = () => {

}
const create = async (pkcs7) => {
  try {
    const { data } = await store.actionCreateDocument(store.model)
    const signerId = data.signers.find(s => s.user?.id === authStore.currentUser?.id )?.id
    await countStore.actionCountList()
    dialog.value = false
    dispatchNotify(null, t('document-sent'), COLOR_TYPES.SUCCESS)
    if (signerId) {
      await fetchSignDocument({ id: signerId, body: { pkcs7 } })
    }
    await openRoute(data.id)
  } catch (e) {
    dispatchNotify(null, t('error-occurred'), COLOR_TYPES.ERROR)
  }
}
const update = async (pkcs7) => {
  try {
    const data = await store.actionUpdateDocument(
      {
        id: route.params.id,
        body: store.model
      }
    )
    const signer = data.signers.find(s => s.user?.id === authStore.currentUser?.id)
    await countStore.actionCountList()
    dispatchNotify(null, t('changed'), COLOR_TYPES.SUCCESS);
    if (signer && !signer.is_signed) {
      await fetchSignDocument({ id: signer.id, body: { pkcs7 }})
    }
    await openRoute(data.id)
  } catch (e) {}
}
const manage = (pkcs7) => {
  if (props.formType === FORM_TYPE_CREATE) {
    create(pkcs7)
  } else {
    update(pkcs7)
  }
}
const onFileUpload = (files) => {
  store.model.__files = []
  files.forEach(file => {
    store.model.__files.push(file)
  })
}
const init = async () => {
  if (props.formType === FORM_TYPE_CREATE) {
    store.model.content = `\n <p style="font-size: 14px;">&nbsp; &nbsp; &ldquo;Oʼzsanoatqurilishbank&rdquo; АTB (keyingi oʼrinlarda Buyurtmachi) va fuqaro ${authStore.currentUser?.full_name} (keyingi oʼrinlarda Ijrochi) oʼrtasida 2025-yil _________ kuni imzolangan №__-sonli &ldquo;Haq evaziga xizmat koʼrsatish shartnomasi&rdquo;ga asosan Ijrochi tomonidan 2025-yil __-__ ${formatUzbekDate(new Date(), true)} kunlari quyidagi ishlar amalga oshirildi va Buyurtmachi tomonidan qabul qilindi:</p> <p style="font-size: 14px;">Amalga oshirilgan ishlar hajmi:</p> <p style="font-size: 14px;">1.&nbsp;</p>`
    store.model.__signers = await adjustUserObjectToArray([{ id: authStore.currentUser?.id }])
  }
}
const openRoute = async (compose_id) => {
  await router.replace({
    name: ROUTE_SD_DETAIL,
    params: {
      id: compose_id,
      document_type: route.params.document_type,
      document_sub_type: route.params.document_sub_type
    }
  })
  await scrollUp()
}
const scrollUp = async () => {
  await nextTick()
  const element = document.querySelector('.send-document-main-layout')
  if (element) {
    element.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }
}
// Hooks
onBeforeMount(async () => {
  await init()
  if (route?.params?.id) {
    try {
      await store.actionGetDocumentDetailForUpdate(route.params.id)
    } catch (e) {
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
                label="whom-specific"
                required
                placeholder="select-leader"
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
                :author-clearable="false"
                label="signers"
                placeholder="enter-signers"
                required
              />
            </base-col>

          </base-row>
        </form-container>
      </template>
    </layout-with-tabs-compose>

    <!-- PREVIEW -->
<!--    with-sign-->
    <preview-dialog
      v-model="dialog"
      :send-button-loading="store.buttonLoading"
      @emit:send="manage"
    >
      <template #content>
        <base-template
          :compose-model="store.model"
          :preview="true"
        />
      </template>
    </preview-dialog>
  </template>
</template>

<style scoped>

</style>
