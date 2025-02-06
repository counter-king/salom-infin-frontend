<script setup>
// Core
import {computed, ref} from "vue"
import {useI18n} from "vue-i18n"
// Store
import {useBusinessTripStore} from "@/modules/HR/modules/BusinessTrip/stores/businessTrip.store"
// Components
import {AltArrowRightIcon, DocumentTextBoldIcon, EyeIcon, FileTextBoldIcon, UnreadLinearIcon} from "@/components/Icons"
import { VerificationProcess, ReportProcess, SenderProcess } from "@/modules/HR/modules/BusinessTrip/components"
import {FilePreview} from "@/components/Files";

const { t } = useI18n()
const BTStore = useBusinessTripStore()
const filePreview = ref(false)
const currentFile = ref(null)

// Computed
const verificationList = computed(() => {
  if (BTStore.detailModel.verifications) {
    return BTStore?.detailModel?.verifications.map((item, index) => {
      return {
        ...item,
        direction: index % 2 !== 0 ? 'left' : 'right'
      }
    })
  }
})
const isProcessFinished = computed(() => {
  return verificationList.value?.every(every => every.left_at && every.arrived_at)
})

// Methods
const zoomFile = (event, file) => {
  event.stopImmediatePropagation()
  currentFile.value = { ...file, document: file }
  filePreview.value = true
}
</script>

<template>
  <div class="flex px-6 py-6 overflow-y-auto" style="height: calc(100% - 100px)">
    <div class="flex flex-col w-2/3">
      <div class="flex gap-x-3">
        <div class="flex flex-col w-[350px] rounded-xl border border-greyscale-100 py-[10px] px-3 bg-greyscale-50 mb-[6px]">
          <span class="text-primary-900 text-sm font-semibold">{{ t('sketch') }}</span>

          <div class="flex flex-col gap-y-1 mt-2">
            <div
              v-for="item in BTStore.detailModel?.compose"
              class="flex items-center justify-between bg-white rounded-lg p-2"
            >
              <div class="flex items-center gap-x-[6px]">
                <base-iconify
                  :icon="DocumentTextBoldIcon"
                  class="text-primary-500"
                />
                <span class="text-xs text-greyscale-900 font-semibold">{{ t(item.doc_type) }}</span>
              </div>

              <div class="flex items-center gap-x-1">
                <div class="flex justify-center items-center border border-success-100 bg-success-50 text-xs font-semibold text-success-500 rounded-lg px-2 py-1">
                  {{ item.status }}
                </div>

                <base-iconify
                  :icon="AltArrowRightIcon"
                  class="text-greyscale-400 !w-4 !h-4"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="flex flex-col items-center w-8">
          <div class="flex justify-center items-center bg-success-500 rounded-full w-8 h-8">
            <div class="flex justify-center items-center bg-white rounded-full w-6 h-6">
              <base-iconify
                :icon="UnreadLinearIcon"
                class="text-success-500"
              />
            </div>
          </div>

          <div class="w-2 bg-success-500 flex-1">

          </div>
        </div>
      </div>

      <template
        v-if="verificationList && verificationList.length"
        v-for="(item, index) in verificationList"
      >
        <verification-process
          v-if="(!item.is_sender && item.arrived_at) || (item.is_sender && item.left_at)"
          :item="item"
          :verifications="verificationList"
          :index="index"
        />
      </template>

      <sender-process
        v-if="verificationList && verificationList.length"
        :verifications="verificationList"
      />

      <report-process
        v-if="isProcessFinished && verificationList && verificationList.length"
        :verifications="verificationList"
      />

    </div>
  </div>

  <div class="absolute flex flex-col gap-y-2 right-[32px] top-[102px] w-[298px] max-h-[72vh] overflow-y-auto rounded-2xl border border-primary-100 bg-primary-10 p-4 pt-3">
    <span class="text-base text-primary-900 font-semibold">{{ t('documents') }}</span>

    <div
      v-for="doc in BTStore.detailModel?.compose"
      class="flex items-center justify-between bg-greyscale-70 rounded-[10px] py-1 px-2 cursor-pointer"
      @click="zoomFile($event, doc)"
    >
      <div class="flex items-center gap-x-3">
        <div class="flex justify-center items-center w-8 h-8 border bg-white rounded-lg">
          <base-iconify
            :icon="FileTextBoldIcon"
            class="text-primary-500 !w-4 !h-4"
          />
        </div>

        <div class="flex flex-col gap-y-[2px]">
          <span class="text-sm text-greyscale-900 font-medium">{{ doc.name }} ({{t(doc.doc_type)}})</span>
          <span class="text-greyscale-500 text-xs font-medium">{{ doc.size }} MB</span>
        </div>
      </div>

      <base-iconify
        :icon="EyeIcon"
        class="text-primary-500"
      />
    </div>
  </div>

  <!-- FILE PREVIEW -->
  <base-dialog v-model="filePreview" max-width="max-w-[820px]">
    <template #header>
      <div class="flex-1 truncate mr-2">
        <h1 class="text-xl font-semibold truncate"> {{ t('preview') }} </h1>
      </div>
    </template>

    <template #content>
      <div class="-my-6 -mx-8 h-[80vh]">
        <FilePreview :file="currentFile" />
      </div>
    </template>
  </base-dialog>
  <!-- /FILE PREVIEW -->
</template>

<style scoped>

</style>
