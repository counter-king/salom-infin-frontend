<script setup>
// core
import { ref, inject } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter, useRoute } from 'vue-router';
// components
import { ActionToolbar } from '@/components/Actions';
import { FileDownloadIcon, CalendarBoldIcon, FaceScanSquareBoldIcon } from '@/components/Icons';
import BaseButton from '@/components/UI/BaseButton.vue';
import CalendarButton from '@/components/Actions/CalendarButton.vue';

const { t } = useI18n()
const router = useRouter()
const route = useRoute()
// injects
const currentDate = inject('currentDate')
const handleMonthChange = inject('handleMonthChange')
const goToPrevMonth = inject('goToPrevMonth')
const goToNextMonth = inject('goToNextMonth')
const handleClickCurrentMonth = inject('handleClickCurrentMonth')

// methods
const activeTab = ref('with-reason')
// methods
const handleWithReason = () => {
  activeTab.value = 'with-reason'
  setTimeout(() => router.replace({ name: 'AttendanceEmployee' }), 0)
}

const handleWithoutReason = () => {
  activeTab.value = 'without-reason'
  setTimeout(() => router.replace({ name: 'AbsenceEmployee' }), 0)
}


</script>           
<template>
  <action-toolbar :title="t('employee-attendance')">
    <template #title-after>
      <div class="flex items-center gap-2">
       <base-button
        label="with-reason"
        rounded
        @click="handleWithReason"
        :outlined="activeTab != 'with-reason'" 
        class="border-none shadow-none focus:outline-none"
        />
        <base-button
        label="without-reason"
        rounded
        @click="handleWithoutReason"
        :outlined="activeTab != 'without-reason'" 
        class="border-none shadow-none focus:outline-none"
        />
      </div>
    </template>
    <template #filters>
      <div></div>
    </template>
  </action-toolbar>
</template>
<style>
.p-button {
  transition: none !important;
}
</style>