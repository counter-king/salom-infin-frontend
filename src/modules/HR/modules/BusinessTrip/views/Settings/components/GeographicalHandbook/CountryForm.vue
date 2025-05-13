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
          <base-input
            label="name"
            placeholder="enter-naming-2"
            v-model="formValue.name"
            :error="$v?.name"
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

