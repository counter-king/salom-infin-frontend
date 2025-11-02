<script setup>
// core
import { useI18n } from 'vue-i18n';
import { useRouter, useRoute } from 'vue-router';
// components
import { ActionToolbar } from '@/components/Actions';

const { t } = useI18n()
const router = useRouter()
const route = useRoute()
// injects


</script>           
<template>
  <action-toolbar :title="t('employees-timesheet')">
    <template #title-after>
      <div class="flex items-center gap-2">
      
      </div>
    </template>
    <template #filters>
      <div></div>
    </template>
  </action-toolbar>
</template>