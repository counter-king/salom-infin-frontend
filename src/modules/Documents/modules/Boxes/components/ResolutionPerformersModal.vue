<script setup>
// Core
import { computed, onMounted, ref } from "vue"
// Components
import { CheckCircleIcon } from '@/components/Icons'
import UserMultiSelect from "@/components/Select/UserMultiSelect.vue"
// Validators
import { helpers, required } from "@vuelidate/validators"
import { useVuelidate } from "@vuelidate/core"
// Routes
import { useRoute } from "vue-router"
// Utils
import { adjustUserObjectToArray, isObject } from "@/utils"
// Enums
import { RESOLUTION_TYPES, STATUS_TYPES } from "@/enums"
import { useI18n } from "vue-i18n";
import { formatDateReverse } from "@/utils/formatDate";
import { UserWithSelectableItem } from "@/components/Users";
import { StatusChip } from "@/components/Chips";
import { VueDraggable } from "vue-draggable-plus";
import Eimzo from "@/components/EIMZO/Eimzo.vue";
import { useAuthStore } from "@/modules/Auth/stores";

const route = useRoute()
const { t } = useI18n()

const dialog = ref(false)
const buttonLoading = ref(false)
const isHostVercel = ref(null)

const props = defineProps({
  performers: {
    type: Array,
    default: () => []
  },
  resolutionText: {
    type: String,
    default: ''
  },
  resolutionType: {
    type: String,
    default: ''
  },
  deadline: {
    type: String,
    default: null
  }
})

// Reactive
const types = [
  {
    title: t("assignment"),
    value: RESOLUTION_TYPES.ASSIGNMENT
  },
  // {
  //   title: t("control"),
  //   value: RESOLUTION_TYPES.CONTROL
  // },
  {
    title: t("for-notice"),
    value: RESOLUTION_TYPES.FOR_NOTICE
  }
]
const responsibleIndex = ref(null)

const model = ref({
  type: RESOLUTION_TYPES.ASSIGNMENT,
  deadline: null,
  __performers: [],
  resolution_text: null
})

const rules = computed(() => ({
  type: {
    required: helpers.withMessage(`Поле не должен быть пустым`, required)
  },
  __performers: {
    required: helpers.withMessage(`Поле не должен быть пустым`, required)
  },
  resolution_text: {
    required: helpers.withMessage(`Поле не должен быть пустым`, required)
  },
  // deadline: {
  //   required: model.value.type === RESOLUTION_TYPES.ASSIGNMENT
  //     ? helpers.withMessage(`Поле не должен быть пустым`, required)
  //     : {}
  // }
}))

const $v = useVuelidate(rules, model)
const emit = defineEmits(['emit:onSign']);

// Methods
const onSign = async (pkcs7) => {
  const valid = await $v.value.$validate()
  if (!valid) return

  buttonLoading.value = true

  const body = {
    performers: model.value.__performers.map(item => ({
      id: item.id,
      first_name: item.first_name,
      last_name: item.last_name,
      father_name: item.father_name,
      full_name: item.full_name,
      is_responsible: item.id === responsibleIndex.value
    })),
    deadline: model.value.deadline ? `${model.value.deadline}T18:00:00+05:00` : null,
    resolution_text: model.value.resolution_text,
    resolution_type: model.value.type,
    pkcs7
  }

  emit('emit:onSign', body)
}
const validateForm = async () => {
  const valid = await $v.value.$validate()
  if (!valid) {
    return Promise.reject()
  } else {
    return Promise.resolve()
  }
}

// Hooks
onMounted( async () => {
  isHostVercel.value = window.location.host === 'app.itco.uz' || window.location.host === 'new-side-project.vercel.app' || window.location.host.startsWith('localhost')
  if (props.performers.length && props.resolutionText && props.resolutionType) {
    let users = props.performers.map(item => ({ ...item, user: item }))
    model.value.__performers = await adjustUserObjectToArray(users)
    model.value.resolution_text = props.resolutionText
    model.value.type = props.resolutionType

    responsibleIndex.value = props.performers.find(p => p.is_responsible)?.id
  }
  if (props.deadline) {
    model.value.deadline = new Date(props.deadline).toISOString().split('T')[0]
  }
})

defineExpose({ buttonLoading, dialog })
</script>

<template>
  <base-button
    border-color="border-transparent"
    label="sign"
    :icon-left="CheckCircleIcon"
    icon-height="!w-4"
    icon-width="!h-4"
    rounded
    shadow
    type="button"
    @click="dialog = true"
  />

  <base-dialog
    v-model="dialog"
    max-width="max-w-[672px]"
    label="sign-resolution"
    :draggable="false"
  >
    <template #content>
      <base-dropdown
        v-model="$v.type.$model"
        :error="$v.type"
        :options="types"
        option-label="title"
        option-value="value"
        label="resolution-type"
        placeholder="choose-resolution-type"
        required
        @emit:change="() => model.deadline = null"
      />

      <base-calendar
        v-model="model.deadline"
        :min-date="new Date() /* Минимальная дата сегодняшние число */"
        label="deadline"
        placeholder="choose-date"
        class="mt-4"
        @emit:clear="model.deadline = null"
        @update:modelValue="(value) => model.deadline = formatDateReverse(value)"
      />

      <user-multi-select
        v-model="$v.__performers.$model"
        :error="$v.__performers"
        label="performers"
        placeholder="choose-performers"
        required
        class="mt-4"
      />

      <div class="mt-2">
        <vue-draggable
          v-model="model.__performers"
          :animation="150"
          handle=".handle"
        >
          <template v-for="item in model.__performers">
            <user-with-selectable-item
              v-model:checkbox-index="responsibleIndex"
              :item="item"
              select-type="radio"
              selectable
              moveable
            >
              <template #chip-prepend="{ item }">
                <template v-if="(isObject(item?.user) ? item?.user.id : item?.id) === responsibleIndex">
                  <status-chip :status="{ id: STATUS_TYPES.TODO }">
                    {{ t('executor') }}
                  </status-chip>
                </template>

                <template v-else>
                  <status-chip :status="{ id: STATUS_TYPES.ON_HOLD }">
                    {{ t('co-executor') }}
                  </status-chip>
                </template>

                <div class="w-[6px] h-[6px] bg-greyscale-300 rounded-full"></div>
              </template>
            </user-with-selectable-item>
          </template>
        </vue-draggable>
      </div>

      <base-textarea
        v-model="$v.resolution_text.$model"
        :error="$v.resolution_text"
        label="enter-content"
        required
        class="mt-4"
        :set-from-template="true"
      />
      <!--      <pre>{{ model }}</pre>-->
    </template>

    <template #footer>
      <div class="flex items-center justify-between w-full">
        <base-button
          color="bg-white hover:bg-greyscale-100 text-primary-dark"
          border-color="border-transparent"
          label="cancel"
          rounded
          shadow
          type="button"
          @click="dialog = false"
        />
<!--        v-if="isHostVercel || useAuthStore().currentUser.id === 1"-->

        <base-button
          label="sign"
          :loading="buttonLoading"
          rounded
          shadow
          type="button"
          @click="onSign('test')"
        />

<!--        <eimzo-->
<!--          v-else-->
<!--          type="sign"-->
<!--          data="resolution-performer"-->
<!--          input-classes="bg-white !rounded-3xl min-w-[200px]"-->
<!--          with-validation-->
<!--          :validationFunc="validateForm"-->
<!--          :button-loading="buttonLoading"-->
<!--          @emit:onGetPkcs7="(pkcs7) => onSign(pkcs7)"-->
<!--        />-->
      </div>
    </template>
  </base-dialog>

</template>

<style scoped>

</style>
