<script setup>
// Core
import { useVuelidate } from '@vuelidate/core'
import { helpers, required } from '@vuelidate/validators'
// Stores
import { useCommonStore } from '@/stores/common'
import { useCorrespondentStore } from '@/stores/correspondent'
// Components
import { UserWithLabel, UserWithSelectable } from '@/components/Users'
import { PriorityChip } from '@/components/Chips'
// Utils
import { isObject } from '@/utils'
import { replaceWithNumbers } from '@/utils/regex'
import { formatDateReverse } from '@/utils/formatDate'
// Non-reactive
const rules = {
  register_number: {
    required: helpers.withMessage(`Поле не должен быть пустым`, required)
  },
  outgoing_number: {
    required: helpers.withMessage(`Поле не должен быть пустым`, required)
  },
  // grif: {
  //   required: helpers.withMessage(`Поле не должен быть пустым`, required)
  // },
  language: {
    required: helpers.withMessage(`Поле не должен быть пустым`, required)
  },
  number_of_papers: {
    required: helpers.withMessage(`Поле не должен быть пустым`, required)
  },
  register_date: {
    required: helpers.withMessage(`Поле не должен быть пустым`, required)
  },
  outgoing_date: {
    required: helpers.withMessage(`Поле не должен быть пустым`, required)
  },
  correspondent: {
    required: helpers.withMessage(`Поле не должен быть пустым`, required)
  },
  document_type: {
    required: helpers.withMessage(`Поле не должен быть пустым`, required)
  },
  delivery_type: {
    required: helpers.withMessage(`Поле не должен быть пустым`, required)
  },
  priority: {
    required: helpers.withMessage(`Поле не должен быть пустым`, required)
  },
  title: {
    required: helpers.withMessage(`Поле не должен быть пустым`, required)
  },
  __reviewers: {
    required: helpers.withMessage(`Поле не должен быть пустым`, required)
  },
  description: {
    required: helpers.withMessage(`Поле не должен быть пустым`, required)
  }
}
// Macros
const props = defineProps({
  formModel: {
    type: Object,
    default: () => ({
      correspondent: null,
      delivery_type: null,
      description: null,
      document_type: null,
      files: [],
      __files: [],
      language: null,
      number_of_papers: null,
      outgoing_date: null,
      outgoing_number: null,
      priority: null,
      register_date: null,
      register_number: null,
      __reviewers: [],
      status: null,
      title: null,
    })
  }
})
// Composable
const commonStore = useCommonStore()
const correspondentStore = useCorrespondentStore()
const $v = useVuelidate(rules, props.formModel)
// Macros
defineExpose({ $v })
</script>

<template>
  <div class="incoming-form-view">
    <base-row>
      <base-col col-class="w-1/2">
        <base-input
          v-model="$v.outgoing_number.$model"
          :error="$v.outgoing_number"
          required
          label="out-number"
          placeholder="enter-out-number"
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
          v-model="$v.outgoing_date.$model"
          :error="$v.outgoing_date"
          :max-date="new Date()"
          required
          label="out-date"
          placeholder="enter-out-date"
          @update:modelValue="(value) => {
						$v.register_date.$model = formatDateReverse(value)
						$v.outgoing_date.$model = formatDateReverse(value)
          }"
        />
      </base-col>

      <base-col col-class="w-1/2">
        <base-calendar
          v-model="$v.register_date.$model"
          :error="$v.register_date"
          :min-date="new Date($v.outgoing_date.$model)"
          required
          label="reg-date"
          placeholder="enter-reg-date"
          @update:modelValue="(value) => $v.register_date.$model = formatDateReverse(value)"
        />
      </base-col>

      <!--      <base-col col-class="w-1/2">-->
      <!--        <base-dropdown-->
      <!--          v-model="$v.grif.$model"-->
      <!--          :error="$v.grif"-->
      <!--          required-->
      <!--          label="grif"-->
      <!--        />-->
      <!--      </base-col>-->

      <base-col col-class="w-1/2">
        <base-dropdown
          v-model="$v.language.$model"
          :error="$v.language"
          :options="commonStore.languagesList"
          required
          option-value="id"
          option-label="name"
          label="language-document"
          placeholder="enter-language-document"
        />
      </base-col>

      <base-col col-class="w-1/2">
        <base-input
          v-model.number="$v.number_of_papers.$model"
          :error="$v.number_of_papers"
          required
          label="number-sheets"
          placeholder="number-sheets"
          @input="() => $v.number_of_papers.$model = replaceWithNumbers($v.number_of_papers.$model)"
        />
      </base-col>

      <base-col col-class="w-1/2">
        <base-dropdown
          v-model="$v.correspondent.$model"
          v-model:options="correspondentStore.allList"
          :error="$v.correspondent"
          api-url="correspondents"
          option-value="id"
          label="correspondent"
          placeholder="choose-correspondent"
          menu-placeholder="enter-correspondent"
          searchable
          required
        />
      </base-col>

      <base-col col-class="w-1/2">
        <base-dropdown
          v-model="$v.document_type.$model"
          v-model:options="commonStore.documentTypesList"
          :error="$v.document_type"
          api-url="document-types"
          option-value="id"
          label="document-type"
          placeholder="choose-document-type"
          menu-placeholder="enter-document-type"
          searchable
          required
        />
      </base-col>

      <base-col col-class="w-1/2">
        <base-dropdown
          v-model="$v.delivery_type.$model"
          v-model:options="commonStore.deliveryTypeList"
          :error="$v.delivery_type"
          api-url="delivery-types"
          option-value="id"
          label="deliver-type"
          placeholder="choose-deliver-type"
          menu-placeholder="enter-deliver-type"
          searchable
          required
        />
      </base-col>

      <base-col col-class="w-1/2">
        <base-dropdown
          v-model="$v.priority.$model"
          :error="$v.priority"
          :options="commonStore.prioryList"
          option-value="id"
          label="priority-document"
          required
        >
          <template #option="{ option }">
            <priority-chip :id="option?.id" />
          </template>
        </base-dropdown>
      </base-col>

      <base-col col-class="w-1/2">
        <base-input
          v-model="$v.title.$model"
          :error="$v.title"
          label="naming"
          placeholder="enter-naming"
          required
        />
      </base-col>

      <base-col col-class="w-1/2">
        <base-multi-select
          v-model="$v.__reviewers.$model"
          :error="$v.__reviewers"
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
              :title="isObject(value?.user) ? value?.user.full_name : value?.full_name"
              shadow
              color="#635AFF"
              avatar-classes="w-5 h-5"
            />
          </template>
        </base-multi-select>
      </base-col>

      <base-col col-class="w-full">
        <base-textarea
          v-model="$v.description.$model"
          :error="$v.description"
          required
          label="content"
        />
      </base-col>

      <base-col col-class="w-full">
        <base-file-upload
          :files="props.formModel.__files"
          label="attach-file"
          @emit:file-upload="(files) => props.formModel.__files = files"
        />
      </base-col>
    </base-row>
  </div>
</template>
