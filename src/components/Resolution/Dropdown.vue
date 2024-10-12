<script setup>
// Core
import { onMounted, ref, unref } from 'vue'
import { useI18n } from 'vue-i18n'
// Store
import { useBoxesCommonStore } from '@/modules/Documents/modules/Boxes/stores/common.store'
// Components
import { ModalComment } from '@/components/Modal'
import { AltArrowDownIcon, AddCircleLinearIcon, Pen2Icon, TrashBinTrashIcon } from '@/components/Icons'
import ResolutionForm from './components/Form.vue'
// Utils
import { clearModel } from '@/utils'
import { dispatchNotify } from '@/utils/notify'
import { COLOR_TYPES, RESOLUTION_CREATE_TYPES, RESOLUTION_TYPES } from '@/enums'
import { FORM_TYPE_CREATE, FORM_TYPE_READ, FORM_TYPE_UPDATE } from '@/constants/constants'
// Composable
const { t } = useI18n()
const boxesCommonStore = useBoxesCommonStore()
// Macros
const props = defineProps({
  createResolutionFn: {
    type: Function,
    default: () => void 0
  },
  successButtonLoading: {
    type: Boolean
  },
  reviewId: {
    type: Number
  },
  parentId: {
    type: Number
  },
  isResolutionSigned: {
    type: Boolean
  },
  resolutionCreateType: {
    type: String,
    default: RESOLUTION_CREATE_TYPES.REVIEW
  },
  /*
  * resolutionListId для получения
  * список созданных резолюций
  * */
  resolutionListId: {
    type: Number
  },
  registerDate: {
    type: Date
  }
})
const emit = defineEmits(['emit:created', 'emit:updated'])
// Reactive
const menuRef = ref(null)
const formRef = ref(null)
const createResolutionDialog = ref(false)
const createButtonLoading = ref(false)
const resolutionActionTypes = ref(FORM_TYPE_CREATE)
const deleteResolutionDialog = ref(false)
const deleteResolutionItem = ref(null)
const items = ref([
  {
    label: 'resolution',
    items: [
      {
        label: 'create-resolutions',
        icon: AddCircleLinearIcon,
        command: () => props.isResolutionSigned
          ? dispatchNotify(null, t('first-cancel-sign'), COLOR_TYPES.SUCCESS)
          : createResolutionDialog.value = true
      }
    ]
  },
  {
    separator: true
  },
  boxesCommonStore.createdResolutionsList
])
// Hooks
onMounted(async () => {
  await boxesCommonStore.actionResolutionsList({ id: props.resolutionListId })
})
// Methods
const toggle = (event) => {
  const _menuRef = unref(menuRef)
  _menuRef.menuRef.toggle(event)
}
const clearDocument = () => {
  clearModel(boxesCommonStore.resolutionModel, ['type'])
  resolutionActionTypes.value = FORM_TYPE_CREATE
  boxesCommonStore.resolutionModel.type = RESOLUTION_TYPES.ASSIGNMENT
}
const createResolution = async () => {
  const _formRef = unref(formRef)
  const valid = await _formRef.$v.$validate()

  if(!valid) return

  try {
    createButtonLoading.value = true
    if(resolutionActionTypes.value === FORM_TYPE_CREATE) {
      await boxesCommonStore.actionCreateResolution({
        resolutionListId: props.resolutionListId,
        reviewId: props.reviewId,
        parentId: props.parentId,
        resolutionCreateType: props.resolutionCreateType
      })
      boxesCommonStore.actionRerenderComponent()
    }
    else {
      await boxesCommonStore.actionUpdateByIdResolution({
        resolutionListId: props.resolutionListId,
        resolutionCreateType: props.resolutionCreateType
      })
      boxesCommonStore.actionRerenderComponent()
    }
    createResolutionDialog.value = false
  } finally {
    createButtonLoading.value = false
  }
}
const getResolutionById = async (item, type) => {
  await boxesCommonStore.actionGetByIdResolution({ id: item.resolution.id })
  resolutionActionTypes.value = type
  createResolutionDialog.value = true
}
const showCommentModal = (item) => {
  deleteResolutionDialog.value = true
  deleteResolutionItem.value = item
}
const deleteResolution = async (text) => {
  try {
    await boxesCommonStore.actionDeleteGetByIdResolution({
      id: deleteResolutionItem.value.resolution.id,
      resolutionListId: props.resolutionListId,
      comment: text
    })
    deleteResolutionDialog.value = false
    resolutionActionTypes.value = FORM_TYPE_CREATE
  } catch (error) {

  }
}
</script>

<template>
  <div class="resolution-dropdown-view">
    <base-button
      label="resolution"
      :icon-right="AltArrowDownIcon"
      rounded
      outlined
      shadow
      type="button"
      border-color="border-transparent"
      @click="toggle"
    />

    <base-menu
      ref="menuRef"
      :items="items"
      width="w-[200px]"
    >
      <template #item="{ item }">
        <div class="flex items-center gap-2 py-[6px] pl-3 cursor-pointer">
          <base-iconify :icon="item.icon" class="!w-4 !h-4" />

          <span class="flex-1 text-sm font-medium text-primary-900">{{ t(item.label) }}</span>

          <template v-if="item.hasOwnProperty('resolution')">
            <!-- Если резолюция подписан -->
            <div class="flex items-center gap-1 pr-1">
              <template v-if="!props.isResolutionSigned">
                <button
                  v-tooltip.top="{
                    value: `<h4 class='text-xs text-white -my-1'>${t('edit')}</h4>`,
                    escape: true,
                    autoHide: false
                  }"
                  class="w-5 h-5"
                  @click="getResolutionById(item, FORM_TYPE_UPDATE)"
                >
                  <base-iconify :icon="Pen2Icon" class="text-primary-500" />
                </button>

                <button
                  v-tooltip.top="{
                    value: `<h4 class='text-xs text-white -my-1'>${t('delete')}</h4>`,
                    escape: true,
                    autoHide: false
                  }"
                  class="w-5 h-5"
                  @click="showCommentModal(item)"
                >
                  <base-iconify :icon="TrashBinTrashIcon" class="text-critic-500" />
                </button>
              </template>

              <template v-else>
                <button
                  v-tooltip.top="{
                    value: `<h4 class='text-xs text-white -my-1'>${t('preview-text')}</h4>`,
                    escape: true,
                    autoHide: false
                  }"
                  class="w-5 h-5"
                  @click="getResolutionById(item, FORM_TYPE_READ)"
                >
                  <base-icon name="EyeIcon" width="16" class="text-primary-500" />
                </button>
              </template>
            </div>
          </template>
        </div>
      </template>
    </base-menu>

    <!-- Create resolution modal -->
    <base-dialog
      v-model="createResolutionDialog"
      :label="resolutionActionTypes === FORM_TYPE_CREATE ? 'create-resolutions' : 'update-resolutions'"
      max-width="max-w-[610px]"
      @emit:after-hide="clearDocument"
    >
      <template #content>
        <resolution-form
          ref="formRef"
          :form-type="resolutionActionTypes"
          :register-date="props.registerDate"
        />
      </template>

      <template #footer>
        <template v-if="resolutionActionTypes !== FORM_TYPE_READ">
          <base-button
            label="clear"
            rounded
            outlined
            shadow
            color="text-primary-900"
            border-color="border-transparent"
            @click="clearDocument"
          />

          <base-button
            :loading="createButtonLoading"
            :label="resolutionActionTypes === FORM_TYPE_CREATE ? 'create' : 'update'"
            rounded
            @click="createResolution"
          />
        </template>

        <template v-if="resolutionActionTypes === FORM_TYPE_READ">
          <base-button
            :loading="createButtonLoading"
            label="back"
            rounded
            @click="createResolutionDialog = !createResolutionDialog"
          />
        </template>
      </template>
    </base-dialog>
    <!-- /Create resolution modal -->

    <!-- Delete resolution modal -->
    <modal-comment
      v-model="deleteResolutionDialog"
      :create-button-fn="deleteResolution"
      create-button-color="danger"
    />
    <!-- /Delete resolution modal -->
  </div>
</template>

<style>

</style>
