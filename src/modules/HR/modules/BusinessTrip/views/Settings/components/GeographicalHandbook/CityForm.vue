<script setup>
// core
import { useModel, onMounted, ref, nextTick } from 'vue';

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
// reactives
const inputRef = ref(null)
const formValue = useModel(props, 'formValue')
const $v = useModel(props, 'validator')

onMounted(() => {
  if(inputRef.value){
    nextTick(()=>{
      const input = inputRef.value?.$el?.querySelector('input')
      input?.focus()
    })
  }
})
</script>
<template>
  <form :id="props.formId" @submit.prevent>
    <div class="flex flex-col gap-y-6">
        <div class="w-full">
          <base-dropdown
            label="country"
            disabled
            option-label="name"
            option-value="id"
            :options="[{...props.formValue.country}]"
            v-model="formValue.country.id"
            :error="$v?.country"
          >
            <template #option="{ option }">
              <span>{{ option.name }}</span>
            </template>
          </base-dropdown>
        </div>
        <div class="w-full">
          <base-input
            ref="inputRef"
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

