<script setup>
// Core
import { ref } from "vue"
import { useI18n } from "vue-i18n"
// Components
import { CheckCircleIcon } from '@/components/Icons'
import UserMultiSelect from "@/components/Select/UserMultiSelect.vue"
// Validators
import { helpers, required } from "@vuelidate/validators"
import { useVuelidate } from "@vuelidate/core"
// Services
import { fetchSendToSigning } from "@/modules/Documents/modules/Boxes/services/approval.service"
// Routes
import { useRoute } from "vue-router"
// Enums
import { RESOLUTION_TYPES, STATUS_TYPES } from "@/enums"
import { formatDateReverse } from "@/utils/formatDate";
import { isObject } from "@/utils";
import { UserWithSelectableItem } from "@/components/Users";
import { StatusChip } from "@/components/Chips";
import { VueDraggable } from "vue-draggable-plus";

const dialog = ref(false)
const buttonLoading = ref(false)
const route = useRoute()
const { t } = useI18n()

// Reactive
const types = [
  {
    title: t("assignment"),
    value: RESOLUTION_TYPES.ASSIGNMENT
  },
  {
    title: t("control"),
    value: RESOLUTION_TYPES.CONTROL
  },
  {
    title: t("for-notice"),
    value: RESOLUTION_TYPES.FOR_NOTICE
  },
]

const responsibleIndex = ref(1)

const model = ref({
  type: RESOLUTION_TYPES.ASSIGNMENT,
  deadline: null,
  __performers: [],
  resolution_text: null
})
const rules = {
  type: {
    required: helpers.withMessage(`Поле не должен быть пустым`, required)
  },
  __performers: {
    required: helpers.withMessage(`Поле не должен быть пустым`, required)
  },
  resolution_text: {
    required: helpers.withMessage(`Поле не должен быть пустым`, required)
  }
}

const $v = useVuelidate(rules, model)
const emit = defineEmits(['emit:onSendToSigning'])

// Methods
const onSendToSigning = async () => {
  const valid = await $v.value.$validate()
  if (!valid) return

  buttonLoading.value = true
  const body = {
    performers: model.value.__performers.map((item) => ({
      id: item.id,
      first_name: item.first_name,
      last_name: item.last_name,
      father_name: item.father_name,
      full_name: item.full_name,
      is_responsible: item.id === responsibleIndex.value
    })),
    deadline: model.value.deadline ? `${model.value.deadline}T18:00:00+05:00` : null,
    resolution_text: model.value.resolution_text,
    resolution_type: model.value.type
  }

  try {
    const response = await fetchSendToSigning(route.params.id, body)
    if (response.status === 200) {
      emit('emit:onSendToSigning')
      dialog.value = false
    }
  } catch (err) {

  } finally {
    buttonLoading.value = false
  }
}
</script>

<template>
  <base-button
    border-color="border-transparent"
    label="send-to-signing"
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
    label="send-to-signing"
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
      />

      <base-calendar
        v-model="model.deadline"
        :min-date="new Date() /* Минимальная дата сегодняшние число */"
        label="deadline"
        placeholder="choose-date"
        @update:modelValue="(value) => model.deadline = formatDateReverse(value)"
        class="mt-4"
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
      />

<!--      <pre>{{ model }}</pre>-->
    </template>

    <template #footer>
      <base-button
        color="bg-white hover:bg-greyscale-100 text-primary-dark"
        border-color="border-transparent"
        label="cancel"
        rounded
        shadow
        type="button"
        @click="dialog = false"
      />
      <base-button
        label="send-to-signing"
        :loading="buttonLoading"
        rounded
        shadow
        type="button"
        @click="onSendToSigning"
      />
    </template>
  </base-dialog>
</template>

<style scoped>

</style>
