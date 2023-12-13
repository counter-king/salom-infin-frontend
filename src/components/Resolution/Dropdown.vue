<script setup>
// Core
import { onMounted, ref, unref } from 'vue'
import { useI18n } from 'vue-i18n'
// Store
import { useBoxesCommonStore } from '@/modules/Documents/modules/Boxes/stores/common.store'
// Components
import { ModalComment } from '@/components/Modal'
import ResolutionForm from './components/Form.vue'
// Utils
import { clearModel } from '@/utils'
import { RESOLUTION_CREATE_TYPES } from '@/enums'
import { FORM_TYPE_CREATE, FORM_TYPE_UPDATE } from '@/constants/constants'
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
})
const emit = defineEmits(['emit:created', 'emit:updated'])
// Reactive
const menuRef = ref(null)
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
        icon: 'AddCircleIcon',
        command: () => createResolutionDialog.value = true
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
  // clearModel()
}
const createResolution = async () => {
  try {
    createButtonLoading.value = true
    if(resolutionActionTypes.value === FORM_TYPE_CREATE) {
      await boxesCommonStore.actionCreateResolution({
        resolutionListId: props.resolutionListId,
        reviewId: props.reviewId,
        parentId: props.parentId,
        resolutionCreateType: props.resolutionCreateType
      })
    }
    else {
      await boxesCommonStore.actionUpdateByIdResolution({
        resolutionCreateType: props.resolutionCreateType
      })
    }
    createResolutionDialog.value = false
  } finally {
    createButtonLoading.value = false
  }
}
const getResolutionById = async (item) => {
  await boxesCommonStore.actionGetByIdResolution({ id: item.resolution.id })
  resolutionActionTypes.value = FORM_TYPE_UPDATE
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
  } catch (error) {

  }
}
</script>

<template>
  <div class="resolution-dropdown-view">
    <base-button
      label="resolution"
      icon-right="AltArrowDownIcon"
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
          <base-icon :name="item.icon" width="18" />

          <span class="flex-1 text-sm font-medium text-primary-900">{{ t(item.label) }}</span>

          <template v-if="item.hasOwnProperty('resolution')">
            <!-- Если резолюция подписан -->
            <div
              v-if="!props.isResolutionSigned"
              class="flex items-center gap-1 pr-1"
            >
              <button
                v-tooltip.top="{
                  value: `<h4 class='text-xs text-white -my-1'>Изменить</h4>`,
                  escape: true,
                  autoHide: false
                }"
                class="w-5 h-5"
                @click="getResolutionById(item)"
              >
                <base-icon name="PenIcon" width="16" class="text-primary-500" />
              </button>

              <button
                v-tooltip.top="{
                  value: `<h4 class='text-xs text-white -my-1'>Удалить</h4>`,
                  escape: true,
                  autoHide: false
                }"
                class="w-5 h-5"
                @click="showCommentModal(item)"
              >
                <base-icon name="TrashIcon" width="16" class="text-critic-500" />
              </button>
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
    >
      <template #content>
        <resolution-form />
      </template>

      <template #footer>
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
    </base-dialog>
    <!-- /Create resolution modal -->

    <!-- Delete resolution modal -->
    <modal-comment
      v-model="deleteResolutionDialog"
      create-button-color="danger"
      @emit:up="deleteResolution"
    />
    <!-- /Delete resolution modal -->
  </div>
</template>

<style>

</style>
