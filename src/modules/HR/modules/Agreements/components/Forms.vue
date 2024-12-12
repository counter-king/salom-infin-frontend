<script setup>
// Core
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useVuelidate } from '@vuelidate/core'
import { helpers, required } from '@vuelidate/validators'
// Components
import { LayoutWithTabs } from '@/components/DetailLayout'
import { UserWithLabel, UserWithSelectable } from '@/components/Users'
import KeyWords from './KeyWords.vue'
// Stores
import { useAgreementsStore } from '../stores/agreements.store'
import { useAgreementCategory } from '../../AgreementSettings/stores/category.store'
import { useAgreementTypes } from '../../AgreementSettings/stores/types.store'
// Utils
import { dispatchNotify } from '@/utils/notify'
import { isObject } from '@/utils'
// Enums
import { COLOR_TYPES } from '@/enums'
// Const
import { FORM_TYPE_CREATE, FORM_TYPE_READ } from '@/constants/constants'
import BaseTinyEditor from "@/components/UI/BaseTinyEditor.vue";
// Macros
const props = defineProps({
  type: {
    type: String,
    default: FORM_TYPE_CREATE
  }
})
// Non-reactive
const rules = {
  doc_type: {
    required: helpers.withMessage(`Поле не должен быть пустым`, required)
  },
  doc_sub_type: {
    required: helpers.withMessage(`Поле не должен быть пустым`, required)
  },
  title: {
    required: helpers.withMessage(`Поле не должен быть пустым`, required)
  },
  __users: {
    required: helpers.withMessage(`Поле не должен быть пустым`, required)
  },
  content: {
    required: helpers.withMessage(`Поле не должен быть пустым`, required)
  },
}
// Composable
const route = useRoute()
const router = useRouter()
const agreementsStore = useAgreementsStore()
const agreementCategory = useAgreementCategory()
const agreementTypes = useAgreementTypes()
const $v = useVuelidate(rules, agreementsStore.createModel)
// Reactive
const editor = ref(null)
const loading = ref(false)
const dialog = ref(false)
// Methods
const preview = async () => {
  const valid = await $v.value.$validate()

  if(!valid) {
    return
  }

  dialog.value = true
}
const create = async () => {
  try {
    loading.value = true
    await agreementsStore.createNegotiation()
    dialog.value = false
    dispatchNotify(null, 'Успешно создан', COLOR_TYPES.SUCCESS)
    await router.replace({ name: 'AgreementCreated' })
  }
  finally {
    loading.value = false
  }
}
const handleDocType = async (value) => {
  await agreementTypes.getTypes({
    doc_type: value
  })
  agreementsStore.createModel.doc_sub_type = null
}
const handleKeyWords = (key) => {
  let el = document.querySelector('.fr-element > p')
  const range = document.createRange()
  const selection = window.getSelection()
  el.innerHTML = `${el.innerHTML} {${key}}&nbsp;`

  // Устанавливаем диапазон в конец содержимого элемента
  range.setStart(el.childNodes[el.childNodes.length - 1], el.childNodes[el.childNodes.length - 1].length)
  range.collapse(true)

  // Очищаем текущее выделение и устанавливаем новый диапазон
  selection.removeAllRanges()
  selection.addRange(range)
}
// Hooks
onMounted(async () => {
  if(route.params.id) {
    await agreementsStore.getNegotiationsById({ id: route.params.id })
    await agreementTypes.getTypes({
      doc_type: agreementsStore.createModel.doc_type
    })
  }
  await agreementCategory.getCategories()
})
</script>

<template>
  <div class="agreements-form-view">
    <layout-with-tabs title="Добавить документ" class="!h-[calc(100vh-125px)]">
      <template #content>
        <div class="h-full relative overflow-y-auto">
          <template v-if="agreementsStore.formLoading">
            <base-spinner content absolute />
          </template>

          <template v-else>
            <div class="flex gap-8 p-6">
              <div class="flex-1">
                <base-row class="gap-y-2">
                  <base-col class="w-1/2">
                    <base-dropdown
                      v-model="$v.doc_type.$model"
                      :error="$v.doc_type"
                      :options="agreementCategory.list"
                      :disabled="props.type === FORM_TYPE_READ"
                      required
                      option-value="id"
                      option-label="name"
                      label="Категория документа"
                      placeholder="Выберите категорию"
                      @emit:change="handleDocType"
                    />
                  </base-col>

                  <base-col class="w-1/2">
                    <base-dropdown
                      v-model="$v.doc_sub_type.$model"
                      :error="$v.doc_sub_type"
                      :options="agreementTypes.list"
                      :disabled="props.type === FORM_TYPE_READ"
                      required
                      option-value="id"
                      option-label="name"
                      label="Вид документа"
                      placeholder="Выберите вид документа"
                    />
                  </base-col>

                  <base-col class="w-full">
                    <base-input
                      v-model="$v.title.$model"
                      :error="$v.title"
                      :disabled="props.type === FORM_TYPE_READ"
                      label="Название документа"
                      placeholder="Введите название документа"
                    />
                  </base-col>

                  <!-- <base-col col-class="w-1/2">
                    <base-calendar
                      required
                      label="Дата начала"
                      placeholder="Выберите дата начала"
                    />
                  </base-col>

                  <base-col col-class="w-1/2">
                    <base-calendar
                      required
                      label="Дата окончания"
                      placeholder="Выберите дата окончания"
                    />
                  </base-col> -->

                  <base-col col-class="w-full">
                    <base-multi-select
                      v-model="$v.__users.$model"
                      :error="$v.__users"
                      :disabled="props.type === FORM_TYPE_READ"
                      api-url="users"
                      label="reviewers"
                      display="chip"
                      placeholder="search-users"
                      menu-placeholder="search-users"
                      required
                    >
                      <template #chip="{ value }">
                        <user-with-label
                          :compact="true"
                          :label="isObject(value?.user) ? value?.user.full_name : value?.full_name"
                          :title="isObject(value?.user) ? value?.user.full_name : value?.full_name"
                          color="#635AFF"
                          avatar-classes="w-5 h-5"
                        />
                      </template>

                      <template #option="{ value }">
                        <user-with-selectable :items="[value]" />
                      </template>

                      <template #hint="{ value }">
                        <user-with-label
                          :label="isObject(value?.user) ? value?.user.full_name : value?.full_name"
                          :title="isObject(value?.user) ? value?.user.full_name : value?.full_name"
                          shadow
                          color="#635AFF"
                          avatar-classes="w-5 h-5"
                        />
                      </template>
                    </base-multi-select>
                  </base-col>

                  <base-col col-class="w-full">
                    <base-label label="Текст документа" :required="true" />

                    <base-froala-editor
                      ref="editor"
                      v-model="$v.content.$model"
                      :error="$v.content"
                      :disabled="props.type === FORM_TYPE_READ"
                    />
                  </base-col>

                  <template v-if="props.type === FORM_TYPE_CREATE">
                    <base-button
                      label="Просмотр документа"
                      rounded
                      @click="preview"
                    />
                  </template>
                </base-row>
              </div>

              <div class="max-w-[420px] w-full">
                <key-words class="sticky top-6" @emit:up="handleKeyWords" />
              </div>
            </div>
          </template>
        </div>
      </template>
    </layout-with-tabs>
  </div>

  <!-- preview dialog -->
  <base-dialog v-model="dialog" max-width="max-w-[21cm]">
    <template #header>
      <div class="flex-1 truncate mr-2">
        <h1 class="text-xl font-semibold truncate">Просмотр документа</h1>
      </div>
    </template>

    <template #content>
      <div class="shadow-block border-[0.094rem] border-greyscale-200 p-6">
        <div v-html="agreementsStore.createModel.content" />
      </div>
    </template>

    <template #footer>
      <!-- <base-button
        label="save-as-draft"
        color="bg-primary-0 hover:bg-greyscale-100 text-primary-dark"
        rounded
        shadow
        border-color="border-transparent"
      /> -->

      <base-button
        label="send"
        rounded
        shadow
        border-color="border-transparent"
        :loading="loading"
        @click="create"
      />
    </template>
  </base-dialog>
  <!-- /preview dialog -->
</template>
