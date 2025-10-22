<script setup>
// Core
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useVuelidate } from '@vuelidate/core'
import { helpers, required } from '@vuelidate/validators'
// Components
import { AddCircleBoldIcon, PenBoldIcon } from '@/components/Icons'
// Stores
import { useCommonStore } from '@/stores/common'
import { useAllUrlStore } from '@/stores/all-urls.store'
import { usePermissionStore } from '../../../stores/permissions_copy.store'
// Utils
import { clearModel } from '@/utils'
import { dispatchNotify } from '@/utils/notify'
// Enums
import { COLOR_TYPES } from '@/enums'
// Constants
import { FORM_TYPE_CREATE, FORM_TYPE_UPDATE } from '@/constants/constants'
// Composable
const { t } = useI18n()
const commonStore = useCommonStore()
const allUrlStore = useAllUrlStore()
const permissionStore = usePermissionStore()
// Macros
const props = defineProps({
  type: {
    type: String,
    default: FORM_TYPE_CREATE
  },
  parent: {
    type: Boolean
  },
  list: {
    type: Array,
    default: () => []
  },
  item: {
    type: Object,
    default: () => {}
  },
  index: {
    type: Number
  },
  onlyIcon: {
    type: Boolean
  },
  compact: {
    type: Boolean
  }
})
const emit = defineEmits(['emit:created'])
// Reactive
const requests = ref([
  {
    name: 'GET',
    value: 'GET'
  },
  {
    name: 'POST',
    value: 'POST'
  },
  {
    name: 'PUT',
    value: 'PUT'
  },
  {
    name: 'DELETE',
    value: 'DELETE'
  },
])
const modal = ref(false)
const loading = ref(false)
// Non-reactive
const rules = {
  name_uz: {
    required: helpers.withMessage(t('required-text'), required)
  },
  name_ru: {
    required: helpers.withMessage(t('required-text'), required)
  },
  // __url: {
  //   required: helpers.withMessage(`Поле не должен быть пустым`, required)
  // },
  method: {
    required: helpers.withMessage(t('required-text'), required)
  },
  value: {
    required: helpers.withMessage(t('required-text'), required)
  }
}
// Composable
const $v = useVuelidate(rules, permissionStore.createModel)
// Methods
const submit = async () => {
  const valid = await $v.value.$validate()

  if(!valid) {
    return
  }

  try {
    loading.value = true

    switch(props.type) {
      case FORM_TYPE_CREATE:
        await create()
        break
      case FORM_TYPE_UPDATE:
        await update()
        break;
      default:
        console.log('default')
    }
  }
  finally {
    loading.value = false
  }
}
const create = async () => {
  let data = await permissionStore.createPermission({ item: props.item, list: props.list })
  modal.value = false
  dispatchNotify(null, t('created-permission'), COLOR_TYPES.SUCCESS)
  emit('emit:created', data)
}
const update = async () => {
  await permissionStore.updatePermission({
    item: Object.assign({}, permissionStore.createModel),
    id: permissionStore.createModel.id,
    index: props.index,
    list: props.list
  })
  modal.value = false
  dispatchNotify(null, t('edited-permission'), COLOR_TYPES.SUCCESS)
}
const handleUrlPath = (value) => {
  permissionStore.createModel.url_path = value.url
  permissionStore.createModel.url_name = value.name
  permissionStore.createModel.content_type = value.content_type
}
const openDialog = (event) => {
  event.preventDefault()
  event.stopImmediatePropagation()

  if(props.type === FORM_TYPE_UPDATE) {
    permissionStore.setPermission(props.item)
  }

  modal.value = !modal.value
}
const afterHide = () => {
  clearModel(permissionStore.createModel, ['method'])
  $v.value.$reset()
}
</script>

<template>
  <div class="permission-create-view">
    <button
      class="flex items-center justify-center gap-2 w-full rounded-lg"
      :class="{
        'p-2 bg-greyscale-50 hover:bg-greyscale-100': !props.compact
      }"
      @click="openDialog($event)"
    >
      <div class="flex justify-center items-center w-6 h-6">
        <template v-if="props.type === FORM_TYPE_UPDATE">
          <base-iconify :icon="PenBoldIcon" class="text-greyscale-400" />
        </template>

        <template v-if="props.type === FORM_TYPE_CREATE">
          <base-iconify :icon="AddCircleBoldIcon" class="text-primary-500" />
        </template>
      </div>

      <template v-if="!props.onlyIcon">
        <span class="text-sm font-semibold text-greyscale-900">{{ t('add-permission') }}</span>
      </template>
    </button>

    <!-- dialog -->
    <base-dialog
      v-model="modal"
      :label="props.type === FORM_TYPE_CREATE ? t('create-permission') : props.type === FORM_TYPE_UPDATE ? t('edite-permission') : ''"
      max-width="max-w-[544px]"
      @emit:after-hide="afterHide"
    >
      <template #content>
        <div class="space-y-5">
          <template v-if="props.item?.name_ru && props.type === FORM_TYPE_CREATE">
            <base-input
              v-model="item.name_ru"
              :label="t('you-create-at')"
              required
              disabled
            />
          </template>

          <base-input
            v-model="$v.name_uz.$model"
            :error="$v.name_uz"
            label="name-uz"
            required
          />

          <base-input
            v-model="$v.name_ru.$model"
            :error="$v.name_ru"
            label="name-ru"
            required
          />

          <base-dropdown
            v-model="permissionStore.createModel.__url"
            :options="allUrlStore.list"
            api-url="all-urls"
            searchable
            option-label="url"
            custom-search
            label="api-url"
            placeholder="api-url"
            @emit:change="handleUrlPath"
          />

          <base-dropdown
            v-model="$v.method.$model"
            :error="$v.method"
            :options="requests"
            option-label="name"
            option-value="value"
            label="methods"
            placeholder="methods"
            required
          />

          <base-input
            v-model="$v.value.$model"
            :error="$v.value"
            label="value"
            placeholder="value"
            required
          />

          <template v-if="props.parent">
            <base-dropdown
              v-model="permissionStore.createModel.journal"
              v-model:options="commonStore.journalsList"
              api-url="journals"
              option-label="name"
              option-value="id"
              label="magazine"
              placeholder="enter-magazine"
              menu-placeholder="enter-magazine"
              searchable
            />

            <base-dropdown
              v-model="permissionStore.createModel.doc_type"
              v-model:options="commonStore.documentTypesList"
              api-url="document-types"
              option-value="id"
              label="document-type"
              placeholder="choose-document-type"
              menu-placeholder="enter-document-type"
              searchable
            />

            <base-dropdown
              v-model="permissionStore.createModel.doc_sub_type"
              v-model:options="commonStore.documentSubTypesList"
              api-url="document-sub-types"
              option-value="id"
              label="document-sub-type"
              placeholder="choose-document-sub-type"
              menu-placeholder="choose-document-sub-type"
              searchable
            />
          </template>
        </div>
      </template>

      <template #footer>
        <base-button
          label="cancel"
          rounded
          outlined
          shadow
          color="text-primary-900"
          border-color="border-transparent"
          @click="modal = false"
        />

        <base-button
          :label="props.type === FORM_TYPE_CREATE ? t('create') : props.type === FORM_TYPE_UPDATE ? t('update') : ''"
          rounded
          shadow
          border-color="border-transparent"
          :loading="loading"
          @click="submit"
        />
      </template>
    </base-dialog>
    <!-- /dialog -->
  </div>
</template>
