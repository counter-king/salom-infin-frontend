<script setup>
// Core
import { watch } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { helpers, required } from '@vuelidate/validators'
// Stores
import { useCommonStore } from '@/stores/common'
import { useCorrespondentStore } from '@/stores/correspondent'
import { useRegAppeal } from '../../stores/appeal.store'
// Components
import { SelectMultiple } from '@/components/Select'
// Non-reactive
const rules = {
  outgoing_number: {
    required: helpers.withMessage(`Поле не должен быть пустым`, required)
  },
  outgoing_date: {
    required: helpers.withMessage(`Поле не должен быть пустым`, required)
  },
  document_type: {
    required: helpers.withMessage(`Поле не должен быть пустым`, required)
  },
  correspondent: {
    required: helpers.withMessage(`Поле не должен быть пустым`, required)
  },
  applicant: {
    required: helpers.withMessage(`Поле не должен быть пустым`, required)
  },
  region: {
    required: helpers.withMessage(`Поле не должен быть пустым`, required)
  },
  area: {
    required: helpers.withMessage(`Поле не должен быть пустым`, required)
  },
  full_name_applicant: {
    required: helpers.withMessage(`Поле не должен быть пустым`, required)
  },
  address: {
    required: helpers.withMessage(`Поле не должен быть пустым`, required)
  },
  phone_number: {
    required: helpers.withMessage(`Поле не должен быть пустым`, required)
  },
  submission_form: {
    required: helpers.withMessage(`Поле не должен быть пустым`, required)
  },
  type_complaint: {
    required: helpers.withMessage(`Поле не должен быть пустым`, required)
  },
  __reviewers: {
    required: helpers.withMessage(`Поле не должен быть пустым`, required)
  },
  description: {
    required: helpers.withMessage(`Поле не должен быть пустым`, required)
  }
}
// Composable
const commonStore = useCommonStore()
const correspondentStore = useCorrespondentStore()
const appealStore = useRegAppeal()
const $v = useVuelidate(rules, appealStore.detailModel)
// Composable
defineExpose({ $v })
// Watch
watch(
  () => appealStore.detailModel.__reviewers,
  (value) => {
    appealStore.detailModel.reviewers = value.map(item => ({ user: item.id }))
  }
)
</script>

<template>
  <div class="incoming-form-view">
    <base-row>
      <base-col col-class="w-1/2">
        <base-input
          v-model="$v.outgoing_number.$model"
          :error="$v.outgoing_number"
          required
          label="outgoing-number"
          placeholder="document-number"
        />
      </base-col>

      <base-col col-class="w-1/2">
        <base-calendar
          v-model="$v.outgoing_date.$model"
          :error="$v.outgoing_date"
          required
          label="outgoing-date"
          placeholder="outgoing-date" />
      </base-col>

      <base-col col-class="w-1/2">
        <base-dropdown
          required
          v-model="$v.document_type.$model"
          :error="$v.document_type"
          :options="commonStore.documentTypesList"
          option-value="id"
          label="document_type"
          placeholder="document_type" />
      </base-col>

      <base-col col-class="w-1/2">
        <base-dropdown
          required
          v-model="$v.correspondent.$model"
          :error="$v.correspondent"
          :options="correspondentStore.allList"
          option-value="id"
          label="correspondent"
          placeholder="enter-correspondent" />
      </base-col>

      <base-col col-class="w-1/2">
        <base-dropdown
          required
          v-model="$v.applicant.$model"
          :error="$v.applicant"
          :options="commonStore.applicantList"
          option-value="id"
          label="applicant"
          placeholder="author" />
      </base-col>

      <base-col col-class="w-1/2">
        <base-dropdown
          required
          v-model="$v.region.$model"
          :error="$v.region"
          :options="commonStore.regionList"
          option-value="id"
          label="region"
          placeholder="enter-region" />
      </base-col>

      <base-col col-class="w-1/2">
        <base-dropdown
          required
          v-model="$v.area.$model"
          :error="$v.area"
          :options="commonStore.areaList"
          option-value="id"
          label="area"
          placeholder="enter-area" />
      </base-col>

      <base-col col-class="w-1/2">
        <base-input
          v-model="$v.full_name_applicant.$model"
          :error="$v.full_name_applicant"
          required
          label="full-name-applicant"
          placeholder="enter-full-name"
        />
      </base-col>

      <base-col col-class="w-1/2">
        <base-input
          v-model="$v.address.$model"
          :error="$v.address"
          required
          label="address"
          placeholder="enter-address"
        />
      </base-col>

      <base-col col-class="w-1/2">
        <base-input
          v-model="$v.phone_number.$model"
          :error="$v.phone_number"
          required
          label="phone-number"
          placeholder="enter-phone-number"
        />
      </base-col>

      <base-col col-class="w-1/2">
        <base-dropdown
          required
          v-model="$v.submission_form.$model"
          :error="$v.submission_form"
          :options="commonStore.submissionFormList"
          option-value="id"
          label="submission-form"
          placeholder="enter-submission-form" />
      </base-col>

      <base-col col-class="w-1/2">
        <base-dropdown
          required
          v-model="$v.type_complaint.$model"
          :error="$v.type_complaint"
          :options="commonStore.typeComplaintList"
          option-value="id"
          label="type-complaint"
          placeholder="enter-type-complaint" />
      </base-col>

      <base-col col-class="w-1/2">
        <select-multiple
          required
          v-model="$v.__reviewers.$model"
          :error="$v.__reviewers"
          display="chip"
          label="reviewers"
          placeholder="enter-reviewers"
        />
      </base-col>

      <base-col col-class="w-1/2">
        <base-label label="Состаяние" />

        <base-row>
          <base-col col-class="w-1/3">
            <base-switch
              v-model="appealStore.detailModel.duplicateSwitch"
              label="duplicate"
              classBody="flex items-center"
              classLabel="order-2"
            />
          </base-col>

          <base-col col-class="w-1/2">
            <base-switch
              v-model="appealStore.detailModel.repeated_application"
              label="repeated-application"
              classBody="flex items-center"
              classLabel="order-2"
            />
          </base-col>
        </base-row>
      </base-col>

      <base-col col-class="w-full">
        <base-textarea
          required
          v-model="$v.description.$model"
          :error="$v.description"
          label="content" />
      </base-col>
    </base-row>
  </div>
</template>
