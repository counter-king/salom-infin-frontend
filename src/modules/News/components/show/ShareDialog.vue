<script setup>
// core
import { ref, useModel, watch } from 'vue';
import { useI18n } from 'vue-i18n';
// components
import BaseDialog from '@/components/UI/BaseDialog.vue';
import BaseButton from '@/components/UI/BaseButton.vue';
import UserMultiSelect from '@/components/Select/UserMultiSelect.vue';
// icons
import BaseIconify from '@/components/UI/BaseIconify.vue';
import { InfoCircleBoldIcon } from '@/components/Icons';

const { t } = useI18n() 
// props
const props = defineProps({
 modelValue: {
  type: Boolean,
  default: false
 },
 isLoading: {
  type: Boolean,
  default: false
 },
 onClickShareFn: {
  type: Function,
  default: () => {}
 }
});

const currentUrl = window.location.href
// reactive
const users = ref([])
// composable
const modelValue = useModel(props, 'modelValue');

watch(users, () => {
  console.log(users.value);
})

</script>
<template>
   <base-dialog v-model="modelValue" label="share" max-width="max-w-[608px]">
     <template #content> 
        <div class="flex gap-2 p-2 items-center rounded-lg bg-warning-50">
            <div class="text-warning-500">
              <base-iconify :icon="InfoCircleBoldIcon"  />
            </div>
           <p class="text-xs text-greyscale-900">{{ t('share-employee') }}</p>
        </div>
        <div>
          <user-multi-select
            v-model="users"
            label="signers"
            />
        </div>
        
     </template> 
     <template #footer>
      <base-button
        label="cancel"
        rounded
        outlined
        shadow
        border-color="border-transparent"
        @click="modelValue = false"
       />
      <base-button
        :loading="props.isLoading"
        label="share"
        rounded
        shadow
        @click="props.onClickShareFn"
      />
     </template>
   </base-dialog>
</template>