<script setup>
// core
import { ref, inject, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useDebounce } from '@vueuse/core';
// components
import BaseInput from '@/components/UI/BaseInput.vue';
import { MagniferIcon } from '@/components/Icons';
import DataTable from '../../../InteractionABS/components/DataTable.vue';
// stores
import { useWithReasonStore } from '../../stores/withReason.store';
// composables
const { t } = useI18n()
const withReasonStore = useWithReasonStore()




</script>
<template>
    <div class="flex flex-col h-full">
      <DataTable
        :headers="withReasonStore.headers"
        :value="withReasonStore.withReasonList"
        scroll-height="calc(100vh - 360px)"
        class="flex flex-col h-full"
        :loading="withReasonStore.withReasonListLoading"
        :total-count="withReasonStore.withReasonListTotalCount"
        :pageSize="15"
        @emit:onSort="onSort"
        @emit:set-store-headers="(val) => interactionABSStore.headers = val"
        >
        <!-- header -->
        <template #headerIconemployee="{ data }">
            <div class="flex items-center gap-1">
              <base-iconify 
                v-if="data.filter"
                :icon="CloseCircleBoldIcon"
                @click="onCancelFilter(HEADERS.EMPLOYEE)"
                class="!w-5 !h-5 text-greyscale-500"
              />
              <div class="flex flex-col items-center relative">
                <base-iconify :icon="AltArrowUpIcon" class="!w-4 !h-4 text-greyscale-500 absolute left-0 bottom-[-5px]"/>
                <base-iconify :icon="AltArrowDownIcon" class="!w-4 !h-4 text-greyscale-500 absolute left-0 top-[-5px]"/>
              </div>
            </div>
          </template>
         <template #headerIconcompany="{ data }">
          <div class="flex items-center gap-1">
            <base-iconify 
              v-if="data.filter"
              :icon="CloseCircleBoldIcon"
              @click="onCancelFilter(HEADERS.COMPANY)"
              class="!w-5 !h-5 text-greyscale-500"
            />
            <div class="flex flex-col items-center relative">
              <base-iconify :icon="AltArrowUpIcon" class="!w-4 !h-4 text-greyscale-500 absolute left-0 bottom-[-5px]"/>
              <base-iconify :icon="AltArrowDownIcon" class="!w-4 !h-4 text-greyscale-500 absolute left-0 top-[-5px]"/>
            </div>
          </div>
          </template>
          <template #headerIcondepartment="{ data }">
            <div class="flex items-center gap-1">
              <base-iconify 
                v-if="data.filter"
                :icon="CloseCircleBoldIcon"
                @click="onCancelFilter(HEADERS.DEPARTMENT)"
                class="!w-5 !h-5 text-greyscale-500"
              />
              <div class="flex flex-col items-center relative">
                <base-iconify :icon="AltArrowUpIcon" class="!w-4 !h-4 text-greyscale-500 absolute left-0 bottom-[-5px]"/>
                <base-iconify :icon="AltArrowDownIcon" class="!w-4 !h-4 text-greyscale-500 absolute left-0 top-[-5px]"/>
              </div>
            </div>
          </template>
          <template #headerIcondocumentType="{ data }">
            <div class="flex items-center gap-1">
              <base-iconify 
                v-if="data.filter"
                :icon="CloseCircleBoldIcon"
                @click="onCancelFilter(HEADERS.DOCUMENT_TYPE)"
                class="!w-5 !h-5 text-greyscale-500"
              />
              <div class="flex flex-col items-center relative">
                <base-iconify :icon="AltArrowUpIcon" class="!w-4 !h-4 text-greyscale-500 absolute left-0 bottom-[-5px]"/>
                <base-iconify :icon="AltArrowDownIcon" class="!w-4 !h-4 text-greyscale-500 absolute left-0 top-[-5px]"/>
              </div>
            </div>
          </template>
          <template #headerIcondocumentSubType="{ data }">
            <div class="flex items-center gap-1">
              <base-iconify 
                v-if="data.filter"
                :icon="CloseCircleBoldIcon"
                @click="onCancelFilter(HEADERS.DOCUMENT_SUB_TYPE)"
                class="!w-5 !h-5 text-greyscale-500"
              />
              <div class="flex flex-col items-center relative">
                <base-iconify :icon="AltArrowUpIcon" class="!w-4 !h-4 text-greyscale-500 absolute left-0 bottom-[-5px]"/>
                <base-iconify :icon="AltArrowDownIcon" class="!w-4 !h-4 text-greyscale-500 absolute left-0 top-[-5px]"/>
              </div>
            </div>
          </template>
          <template #headerIconoperationType="{ data }">
            <div class="flex items-center gap-1">
              <base-iconify 
                v-if="data.filter"
                :icon="CloseCircleBoldIcon"
                @click="onCancelFilter(HEADERS.OPERATION_TYPE)"
              />
              <div class="flex flex-col items-center relative">
                <base-iconify :icon="AltArrowUpIcon" class="!w-4 !h-4 text-greyscale-500 absolute left-0 bottom-[-5px]"/>
                <base-iconify :icon="AltArrowDownIcon" class="!w-4 !h-4 text-greyscale-500 absolute left-0 top-[-5px]"/>
              </div>
            </div>
          </template>
          <template #headerIcontype="{ data }">
            <div class="flex items-center gap-1">
              <base-iconify 
                v-if="data.filter"
                :icon="CloseCircleBoldIcon"
                @click="onCancelFilter(HEADERS.TYPE)"
              />
              <div class="flex flex-col items-center relative">
                <base-iconify :icon="AltArrowUpIcon" class="!w-4 !h-4 text-greyscale-500 absolute left-0 bottom-[-5px]"/>
                <base-iconify :icon="AltArrowDownIcon" class="!w-4 !h-4 text-greyscale-500 absolute left-0 top-[-5px]"/>
              </div>
            </div>
          </template>
          <template #headerIconstatusAbs="{ data }">
            <div class="flex items-center gap-1">
              <base-iconify 
                v-if="data.filter"
                :icon="CloseCircleBoldIcon"
                @click="onCancelFilter(HEADERS.STATUS_ABS)"
              />
              <div class="flex flex-col items-center relative">
                <base-iconify :icon="AltArrowUpIcon" class="!w-4 !h-4 text-greyscale-500 absolute left-0 bottom-[-5px]"/>
                <base-iconify :icon="AltArrowDownIcon" class="!w-4 !h-4 text-greyscale-500 absolute left-0 top-[-5px]"/>
              </div>
            </div>
          </template>
        <!-- body -->
          <template #order="{ data }">
            <div class="text-greyscale-500">
             {{ data.order }}
            </div>
          </template>
          <template #employee="{ data }">
            <div class="flex items-center gap-3">
              <base-avatar  
                :label="data.user?.full_name"
                :image="null"
                :color="data.user?.full_name"
                detail-dialog
                :meta="data.user"
                avatarClasses="w-7 h-7"
              >
                <span class="text-xs font-semibold text-white">{{ data.user?.full_name[0] }}</span>
              </base-avatar>
              <p class="text-sm font-medium text-greyscale-900">{{ data.user?.full_name }}</p>
            </div>
          </template>
          <template #position="{ data }">
            <p class="text-sm font-medium text-greyscale-900">{{ data.user?.position?.name }}</p>
          </template>
          <template #company="{ data }">
            <p class="text-sm font-medium text-greyscale-900">{{ data?.company?.name }}</p>
          </template>
          <template #department="{ data }">
            <p class="text-sm font-medium text-greyscale-900">{{ data?.department?.name }}</p>
          </template>
          <template #documentType="{ data }">
            <p class="text-sm font-medium text-greyscale-900">{{ data?.documentType?.name }}</p>
          </template>
          <template #documentSubType="{ data }">
            <p class="text-sm font-medium text-greyscale-900">{{ data?.documentSubType?.name }}</p>
          </template>
          <template #operationType="{ data }">
            <p class="text-sm font-medium text-greyscale-900">{{ t(data.operationType) }}</p>
          </template>
          <template #statusAbs="{ data }"> 
            <status :status="data.statusAbs" />
          </template>
          <template #createDate="{ data }">
            <p class="text-sm font-medium text-greyscale-900">{{ formatDate(data?.createdDate) }}</p>
          </template>
          <template #requestId="{ data }">
            <p class="text-sm font-medium text-greyscale-900">{{ data?.requestId }}</p>
          </template>
          <template #history="{ data }">
            <base-iconify :icon="History2Icon" class="w-6 h-6 text-greyscale-400" @click="onHistoryClick(data)"/>
          </template>
          <template #actions="{ data }">
            <div 
              @click="onSendAgain(data)"
              class="px-3 py-2 select-none bg-primary-500 rounded-[90px] text-xs text-white w-fit "
              :class="{ '!bg-greyscale-200 !pointer-events-none': !(data.statusAbs === STATUS_ABS.FAILED && ((data.type == TYPE.ORDER && data.iabsId == null) || (data.type == TYPE.TRIP && data.iabsId != null)) )}"
              >
              {{ t('send-again') }}
            </div>
          </template>
      </DataTable>
      <!-- Filter dropdown -->
      <!-- <div 
        ref="filterDropdownRef"
        class="hidden fixed z-10 bg-[#2B2D33] rounded-xl p-1"
      >
        <component 
          :parentRef="filterDropdownRef" 
          :is="activeFilterComponent"
          :type="QUERY_NAMES[activeComponentType]"
          :apiAction="activeApiAction"
          :apiList="dataList"
          :apiParams="{ page: 1, page_size: 15 }"
          @onChange="onChangeFilter"
          :key="activeComponentType"
          />
      </div> -->
    </div>
</template>
