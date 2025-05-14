<script setup>
// core
import { useModel, watch, ref } from 'vue';
import { useI18n } from 'vue-i18n';
// stores
import { useCommonStore } from '@/stores/common'

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
// Composable
const commonStore = useCommonStore()
const formValue = useModel(props, 'formValue')
const $v = useModel(props, 'validator')
// reactives
const count = ref(0)

const { t } = useI18n()

watch(()=> formValue.value.name, (newValue, oldValue)=>{
  if(newValue){
    count.value = newValue.length
  }
},{ deep: true })

</script>
<template>
  <form :id="props.formId" @submit.prevent>
    <div class="flex flex-col gap-y-6">
        <div class="w-full">
            <base-dropdown
              required  
              searchable
              label="category-purpose"
              v-model:options="commonStore.documentSubTypesList"
              api-url="document-sub-types"
              option-value="id"
              placeholder="choose-document-sub-type"
              option-label="name"
              v-model="formValue.document_sub_type"
              :error="$v?.document_sub_type"
            >
              <template #option="{ option }">
                <span>{{ option.name }}</span>
              </template>
            </base-dropdown>
        </div>
        <div class="w-full">
          <!-- <base-input
            label="name"
            placeholder="enter-naming-2"
            v-model="formValue.name"
            :error="$v?.name"
          /> -->
          <base-label
            :label="t('name-count', { count: count })"
            required
          />
          <base-textarea
            label=""
            required
            :maxLength="100"
            rows="3"
            placeholder="enter-naming-2"
            v-model="formValue.name"
            :error="$v?.name"
          />
        </div>
    </div>
  </form>
</template>

