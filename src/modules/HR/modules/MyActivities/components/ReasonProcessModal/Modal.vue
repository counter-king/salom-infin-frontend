<script setup>
// core
import { ref, useModel, onMounted, computed  } from 'vue';
import { useI18n } from 'vue-i18n';
import dayjs from 'dayjs';
// components
import BaseDialog from '@/components/UI/BaseDialog.vue';
import ModalBodyHeader from './ModalBodyHeader.vue';
import InfoCardStatus from './InfoCardStatus.vue';
import ExplanationReasonStatus from '../ExplanationReasonStatus.vue';
import ModalBodyContent from './ModalBodyContent.vue';
// store
import { useAttendanceExpectionsStore } from '@/modules/HR/modules/MyActivities/store/attendanceExceptions.store';
import NoteModal from './NoteModal.vue';
// services
import { fetchGetAttendanceExceptionsList } from '@/modules/HR/modules/MyActivities/services';
// enums
import { KIND } from '@/modules/HR/modules/MyActivities/enums';
// composable
const { t, locale } = useI18n()
const attendanceExpectionsStore = useAttendanceExpectionsStore()
// props
const props = defineProps({
  modelValue: {
      type: Boolean,
      default: false
  },
  data: {
    type: Object,
  },
  type: {
    type: String,
    default: 'single',
    validator: (value) => ['single', 'double'].includes(value)
  }
})

// reactive
const attendanceExceptionsList = ref([])
const loading = ref(true)
// emits
const emit = defineEmits(['update:modelValue'])
const modelValue = useModel(props, 'modelValue')
const activeTabIndex = ref(0)
const label = computed(() => dayjs(props.data?.date).format(locale.value === 'ru' ? 'D-MMMM, YYYY [г.]' : 'D-MMMM, YYYY [y.]'))

const showtablePanel = computed(()=> attendanceExceptionsList.value?.length > 1)
const come = computed(()=> attendanceExceptionsList.value?.find(item => [KIND.LATE, KIND.MISSED_CHECKIN].includes(item?.kind)))
const leave = computed(()=> attendanceExceptionsList.value?.find(item => [KIND.MISSED_CHECKOUT, KIND.EARLY_LEAVE].includes(item?.kind)))

const tabPanelList = [
  {
    title: 'come',
    slot: 'come',
  },
  {
    title: 'leave',
    slot: 'leave',
  }
];

const onTabChange = (value) => {
  activeTabIndex.value = value.index
}

const getAttendanceExceptionsList = async () => {
  try {
    loading.value = true
    if(props.data?.attendance?.id && props.type == 'double'){
    const { data } = await fetchGetAttendanceExceptionsList({
      attendance: props.data?.attendance?.id,
    })
      attendanceExceptionsList.value = data.results
    }
  } catch (error) {
    console.log(error)
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  if(props.data?.attendance?.id && props.type == 'double'){
    await getAttendanceExceptionsList()
  } else if(props.data?.attendance?.id && props.type == 'single'){
    try {
      loading.value = true
      await attendanceExpectionsStore.getAttendanceExceptionsById(props.data?.id)
      attendanceExceptionsList.value = [attendanceExpectionsStore.attendanceExpectionsById]
    }
    catch (error) {
      console.log(error)
    } finally {
      loading.value = false
    }
  }
})

</script>
<template>
  <div class="modal">
    <base-dialog
      v-model="modelValue"
      :label="label"
      max-width="reason-process-modal max-w-[648px] h-full"
      contentClasses="py-5 px-6 pb-10 flex flex-col !rounded-none"
      header-classes="!rounded-none"
      position="topright"
    >
      <template #content>
        <template v-if="loading">
          <div class="flex items-center justify-center h-full">
            <base-spinner />
          </div>
        </template>
        <template v-else>
          <!-- body header -->
          <div class="flex flex-col gap-4">
            <ModalBodyHeader :attendance="props.data?.attendance" />
          </div>
          <!-- there more tab panel -->
          <base-brick-tab
            v-if="showtablePanel"
            :active-index="activeTabIndex"
            :tab-panel-list="tabPanelList"
            panel-container-class="px-0 py-0"
            header-classes="h-[28px] w-full"
            nav-classes="w-full !p-1 !rounded-[8px] mt-4"
            nav-container-classes="mx-0"
            :on-tab-change="onTabChange"
          >
          <template #come>
            <div v-if="true" class="flex flex-col gap-5 mt-4">
              <InfoCardStatus :data="come" />
            </div>
            <ModalBodyContent v-if="!!attendanceExceptionsList.length" :data="come"  />
          </template>
          <template #leave>
            <div v-if="true" class="flex flex-col gap-5 mt-4">
              <InfoCardStatus :data="leave" />
            </div>
            <ModalBodyContent v-if="!!attendanceExceptionsList.length" :data="leave"  />
          </template>
          </base-brick-tab>
          <template v-else>
            <div v-if="true" class="flex flex-col gap-5 mt-4">
              <InfoCardStatus :data="attendanceExceptionsList[0]" />
            </div>  
            <ModalBodyContent v-if="!!attendanceExceptionsList.length" :data="attendanceExceptionsList[0]" />
          </template>
        </template>
      </template>
    </base-dialog>
  </div>
</template>
<style scoped>

:deep(.tab-active){
  border-radius: 8px !important;
}

:global(.reason-process-modal.p-dialog){
  margin:0;
  min-height: 100%;
}

:global(.reason-process-modal .p-dialog-content){
  height: 100%;
}

:global(.reason-process-modal .dialog-content){
  display: flex;
  flex-direction: column;
  height: 100%;
}

</style>

