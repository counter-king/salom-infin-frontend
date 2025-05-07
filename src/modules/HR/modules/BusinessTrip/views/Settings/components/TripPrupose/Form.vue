<script setup>
// core
import { useModel } from 'vue';

// props
const props = defineProps({
  formValue: {
    type: Object,
    default: () => {}
  },
  formId: {
    type: String,
    default: ''
  },
  validator: {
    type: Object,
    default: () => {}
  }
})
const formValue = useModel(props, 'formValue')
const $v = useModel(props, 'validator')

</script>
<template>
  <form :id="props.formId" @submit.prevent>
    <div class="flex flex-col gap-y-6">
        <div class="w-full">
            <base-dropdown
              searchable
              label="category"
              option-label="label"
              option-value="value"
              :options="[{label: 'category', value: 'category' }]"
              v-model="formValue.category"
              :error="$v?.category"
            >
              <template #option="{ option }">
                <span>{{ option.label }}</span>
              </template>
            </base-dropdown>
        </div>
        <div class="w-full">
          <base-input
            label="name-uz"
            v-model="formValue.name.uz"
            :error="$v?.name?.uz"
          />
        </div>
        <div class="w-full">
          <base-input
            label="name-ru"
            v-model="formValue.name.ru"
            :error="$v?.name?.ru"
          />
        </div>
        <div class="w-full">
          <base-input
            label="name-en"
            v-model="formValue.name.en"
            :error="$v?.name?.en"
          />
        </div>
        <div class="flex justify-between items-center">
          <base-label label="status" />
          <base-switch
            label="active"
            class-body="!flex !items-center gap-2"
            v-model="formValue.status"
            :error="$v.status"
          />
        </div>
    </div>
  </form>
</template>

