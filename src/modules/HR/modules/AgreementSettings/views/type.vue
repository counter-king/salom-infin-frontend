<script setup>
// Core
import { ref, onMounted } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { helpers, required } from '@vuelidate/validators'
// Components
import { ActionToolbar } from '@/components/Actions'
import { Plus20SolidIcon, PenIcon, TrashBinTrashIcon } from '@/components/Icons'
// Stores
import { useAgreementCategory } from '../stores/category.store'
import { useAgreementTypes } from '../stores/types.store'
// Utils
import { dispatchNotify } from '@/utils/notify'
// Enums
import { COLOR_TYPES } from '@/enums'
// Composable
const agreementCategory = useAgreementCategory()
const agreementTypes = useAgreementTypes()
// Reactive
const createDialog = ref(false)
const createLoading = ref(false)
const createModel = ref({
  doc_type: null,
  name: null,
  description: null
})
const updateDialog = ref(false)
const updateLoading = ref(false)
const updateModel = ref({
  id: null,
  doc_type: null,
  name: null,
  description: null
})
// Non-reactive
const rules = {
  doc_type: {
    required: helpers.withMessage(`Поле не должен быть пустым`, required)
  },
  name: {
    required: helpers.withMessage(`Поле не должен быть пустым`, required)
  },
  description: {
    required: helpers.withMessage(`Поле не должен быть пустым`, required)
  },
}
// Composable
const $v = useVuelidate(rules, createModel)
const $v2 = useVuelidate(rules, updateModel)
// Methods
const create = async () => {
  const valid = await $v.value.$validate()

  if(!valid) {
    return
  }

  try {
    createLoading.value = true
    await agreementTypes.createTypes(createModel.value)
    await agreementTypes.getTypes()
    dispatchNotify(null, 'Вид документа создана', COLOR_TYPES.SUCCESS)
    createDialog.value = false
    createModel.value.name = null
    createModel.value.description = null
  }
  catch(error) {

  }
  finally {
    createLoading.value = false
  }
}
const preview = (data) => {
  updateModel.value.id = data.id
  updateModel.value.doc_type = data.doc_type.id
  updateModel.value.name = data.name
  updateModel.value.description = data.description

  setTimeout(() => {
    updateDialog.value = true
  }, 100)
}
const update = async () => {
  const valid = await $v2.value.$validate()

  if(!valid) {
    return
  }

  try {
    updateLoading.value = true
    await agreementTypes.updateTypes(updateModel.value.id, updateModel.value)
    await agreementTypes.getTypes()
    dispatchNotify(null, 'Вид документа изменен', COLOR_TYPES.SUCCESS)
    updateDialog.value = false
    updateModel.value.id = null
    updateModel.value.name = null
    updateModel.value.description = null
  }
  catch(error) {

  }
  finally {
    updateLoading.value = false
  }
}
const deleteColumn = async (id) => {
  if(!confirm(`Действительно хотите удалить ?`)) {
    return
  }

  try {
    await agreementTypes.deleteTypes(id)
    await agreementTypes.getTypes()
    dispatchNotify(null, 'Вид документа удален', COLOR_TYPES.SUCCESS)
  }
  catch(error) {

  }
}
// Hooks
onMounted(async () => {
  await agreementTypes.getTypes()
  await agreementCategory.getCategories()
})
</script>

<template>
  <div class="types-view">
    <action-toolbar title="Вид документа">
      <template #filters>
        <base-button
          :icon-left="Plus20SolidIcon"
          label="create"
          rounded
          @click="createDialog = !createDialog"
        >
        </base-button>
      </template>
    </action-toolbar>

    <base-data-table
      :headers="agreementTypes.headers"
      :value="agreementTypes.list"
      :total-count="agreementTypes.totalCount"
      scroll-height="calc(100vh - 295px)"
    >
      <template #name="{ data }">
        <span class="font-medium text-greyscale-900 line-clamp-2">{{ data.name ?? '-' }}</span>
      </template>

      <template #doc_type.name="{ data }">
        <span class="font-medium text-greyscale-900 line-clamp-2">{{ data.doc_type?.name ?? '-' }}</span>
      </template>

      <template #action_date="{ data }">
        <span class="font-medium text-greyscale-900">{{ formatDateHour(data.action_date) }}</span>
      </template>

      <template #actions="{ data }">
        <div class="flex gap-2">
          <base-button
            size="small"
            :icon-left="PenIcon"
            only-icon
            rounded
            text
            v-tooltip.top="{
              value: `<h4 class='text-xs text-white -my-1'>Изменить</h4>`,
              escape: true,
              autoHide: false
            }"
            class="group bg-white text-greyscale-500 hover:text-primary-500"
            @click="preview(data)"
          />

          <base-button
            size="small"
            :icon-left="TrashBinTrashIcon"
            icon-color="text-critic-500"
            only-icon
            rounded
            text
            v-tooltip.top="{
              value: `<h4 class='text-xs text-white -my-1'>Удалить</h4>`,
              escape: true,
              autoHide: false
            }"
            class="group bg-white text-greyscale-500 hover:text-primary-500"
            @click="deleteColumn(data.id)"
          />
        </div>
      </template>
    </base-data-table>

    <!-- Create dialog -->
    <base-dialog
      v-model="createDialog"
      max-width="max-w-[585px]"
    >
      <template #header>
        <div class="flex-1 truncate mr-2">
          <h1 class="text-xl font-semibold truncate">Создать вид документа</h1>
        </div>
      </template>

      <template #content>
        <div class="space-y-5 mb-12">
          <base-dropdown
            v-model="$v.doc_type.$model"
            :error="$v.doc_type"
            :options="agreementCategory.list"
            required
            option-value="id"
            option-label="name"
            label="Категория документа"
            placeholder="Выберите категорию"
          />

          <base-input
            v-model="$v.name.$model"
            :error="$v.name"
            required
            label="Наименование"
            placeholder="Ввведите наименование"
          />

          <base-textarea
            v-model="$v.description.$model"
            :error="$v.description"
            required
            label="Описание"
            placeholder="Ввведите описание"
          />
        </div>
      </template>

      <template #footer>
        <base-button
          label="Отмена"
          rounded
          outlined
          shadow
          color="text-primary-900"
          border-color="border-transparent"
          @click="createDialog = false"
        />

        <base-button
          label="Создать"
          rounded
          shadow
          border-color="border-transparent"
          :loading="createLoading"
          @click="create"
        />
      </template>
    </base-dialog>
    <!-- /Create dialog -->

     <!-- Update dialog -->
     <base-dialog
      v-model="updateDialog"
      max-width="max-w-[585px]"
    >
      <template #header>
        <div class="flex-1 truncate mr-2">
          <h1 class="text-xl font-semibold truncate">Изменить вид документа</h1>
        </div>
      </template>

      <template #content>
        <div class="space-y-5 mb-12">
          <base-dropdown
            v-model="$v2.doc_type.$model"
            :error="$v2.doc_type"
            :options="agreementCategory.list"
            required
            option-value="id"
            option-label="name"
            label="Категория документа"
            placeholder="Выберите категорию"
          />

          <base-input
            v-model="$v2.name.$model"
            :error="$v2.name"
            required
            label="Наименование"
            placeholder="Ввведите наименование"
          />

          <base-textarea
            v-model="$v2.description.$model"
            :error="$v2.description"
            required
            label="Описание"
            placeholder="Ввведите описание"
          />
        </div>
      </template>

      <template #footer>
        <base-button
          label="Отмена"
          rounded
          outlined
          shadow
          color="text-primary-900"
          border-color="border-transparent"
          @click="updateDialog = false"
        />

        <base-button
          label="Изменить"
          rounded
          shadow
          border-color="border-transparent"
          :loading="updateLoading"
          @click="update"
        />
      </template>
    </base-dialog>
    <!-- /Update dialog -->
  </div>
</template>
