<script setup>
// core
import { useI18n } from 'vue-i18n';
// components
import UserCard from './UserCard.vue';
import NewsStatus from './NewsStatus.vue';
import Divider from '@/components/Divider/Divider.vue';
// utils
import { formatDate, formatHour } from '@/utils/formatDate';

const { t } = useI18n();
const props = defineProps({
 data: {
  type: Object,
 },
 isDividerVisible: {
  type: Boolean,
  default: false,
 }
})
</script>
<template>
  <div class="py-5 flex flex-col gap-2">
      <!-- user info -->
    <div class="flex justify-between">
      <user-card 
       :name="props.data?.created_by?.full_name"
       :info="props.data?.created_by?.top_level_department?.name"
       :avatar-color="props.data?.created_by?.color" 
      />
      <div class="text-sm text-greyscale-500">{{ formatHour(props.data?.created_date) }} , {{ formatDate(props.data?.created_date) }}</div>
    </div>
    <div class="flex flex-col gap-3 ml-[52px]">
      <div v-if="!!props.data?.description" class="text-lg font-medium text-greyscale-800">{{ props.data?.description }}</div>
      <NewsStatus v-if="!!props.data?.status" :status="props.data?.status" />
    </div>
  </div>
  <Divider v-if="props.isDividerVisible" />
</template>