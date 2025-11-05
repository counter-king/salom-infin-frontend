<script setup>
// core
import { ref, inject, useModel, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';
// components
import { ActionToolbar } from '@/components/Actions';
import BaseButton from '@/components/UI/BaseButton.vue';

// compsibles
const { t } = useI18n()
const route = useRoute()
const router = useRouter()
// props

const handleCurrent = () => {
  router.push({ name: 'MyApplicationsCurrent' })
}
const handleArchive = () => {
  router.push({ name: 'MyApplicationsArchive' })
}
</script>           
<template>
    <action-toolbar :title="t('my-applications')">
    <template #title-after>
      <div class="flex items-center gap-2">
       <base-button
        label="current"
        rounded
        @click="handleCurrent"
        :outlined="route.name != 'MyApplicationsCurrent'" 
        class="border-none shadow-none focus:outline-none"
        />
        <base-button
        label="archive"
        rounded
        @click="handleArchive"
        :outlined="route.name != 'MyApplicationsArchive'" 
        class="border-none shadow-none focus:outline-none"
        />
      </div>
    </template>
    <template #filters>
      <div></div>
    </template>
    </action-toolbar>
</template>