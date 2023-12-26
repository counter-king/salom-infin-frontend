<script setup>
// Core
import { useVuelidate } from '@vuelidate/core'
import { helpers, required } from '@vuelidate/validators'
// Stores
import { useCommonStore } from '@/stores/common'
import { useCorrespondentStore } from '@/stores/correspondent'
// Components
import { UserWithLabel } from '@/components/Users'
// Utils
import { isObject } from '@/utils'
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
    required: false
    // required: helpers.withMessage(`Поле не должен быть пустым`, required)
  },
  region: {
    required: false
    // required: helpers.withMessage(`Поле не должен быть пустым`, required)
  },
  area: {
    required: false
    // required: helpers.withMessage(`Поле не должен быть пустым`, required)
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
    required: false
    // required: helpers.withMessage(`Поле не должен быть пустым`, required)
  },
  type_complaint: {
    required: false
    // required: helpers.withMessage(`Поле не должен быть пустым`, required)
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
      outgoing_number: null,
      outgoing_date: null,
      correspondent: null,
      applicant: null,
      region:null,
      area:null,
      full_name_applicant: null,
      address: null,
      phone_number: null,
      submission_form: null,
      type_complaint:null,
      reviewers: [],
      __reviewers: [],
      duplicateSwitch: false,
      repeated_application: true,
      description: null,
      status: null,
      grif: 4
    })
  }
})
// Composable
const commonStore = useCommonStore()
const correspondentStore = useCorrespondentStore()
const $v = useVuelidate(rules, props.formModel)
// Composable
defineExpose({ $v })
// Watch
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
          v-model="$v.applicant.$model"
          :error="$v.applicant"
          :options="commonStore.applicantList"
          option-value="id"
          label="applicant"
          placeholder="author" />
      </base-col>

      <base-col col-class="w-1/2">
        <base-dropdown
          v-model="$v.region.$model"
          :error="$v.region"
          :options="commonStore.regionList"
          option-value="id"
          label="region"
          placeholder="enter-region" />
      </base-col>

      <base-col col-class="w-1/2">
        <base-dropdown
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
          v-model="$v.submission_form.$model"
          :error="$v.submission_form"
          :options="commonStore.submissionFormList"
          option-value="id"
          label="submission-form"
          placeholder="enter-submission-form" />
      </base-col>

      <base-col col-class="w-1/2">
        <base-dropdown
          v-model="$v.type_complaint.$model"
          :error="$v.type_complaint"
          :options="commonStore.typeComplaintList"
          option-value="id"
          label="type-complaint"
          placeholder="enter-type-complaint" />
      </base-col>

      <base-col col-class="w-1/2">
        <base-multi-select
          v-model="$v.__reviewers.$model"
          :error="$v.__reviewers"
          api-url="users"
          label="reviewers"
          display="chip"
          required
        >
          <template #chip="{ value }">
            <user-with-label
              :compact="true"
              :title="isObject(value?.user) ? value?.user.full_name : value?.full_name"
              image="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D"
              avatar-classes="w-5 h-5"
            />
          </template>

          <template #option="{ value }">
            <user-with-label
              :compact="true"
              :title="isObject(value?.user) ? value?.user.full_name : value?.full_name"
              image="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D"
              avatar-classes="w-6 h-6"
            />
          </template>

          <template #hint="{ value }">
            <user-with-label
              :title="isObject(value?.user) ? value?.user.full_name : value?.full_name"
              shadow
              image="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D"
              avatar-classes="w-5 h-5"
            />
          </template>
        </base-multi-select>
      </base-col>

      <base-col col-class="w-1/2">
        <base-label label="Cостояние" />

        <base-row>
          <base-col col-class="w-1/3">
            <base-switch
              v-model="$v.duplicateSwitch.$model"
              :error="$v.duplicateSwitch"
              label="duplicate"
              classBody="flex items-center"
              classLabel="order-2"
            />
          </base-col>

          <base-col col-class="w-1/2">
            <base-switch
              v-model="$v.repeated_application.$model"
              :error="$v.repeated_application"
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
