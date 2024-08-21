<script setup>
// Core
import {computed, onMounted} from "vue"
import { useI18n } from "vue-i18n"
import { useRoute } from "vue-router"
// Store
import { useBusinessTripStore } from "@/modules/HR/modules/BusinessTrip/stores/businessTrip.store"
// Components
import {
  BillListIcon,
  CheckListMinimalisticIcon,
  DocumentTextBoldIcon,
  AltArrowRightIcon,
  UnreadLinearIcon,
  FileTextBoldIcon
} from "@/components/Icons"
import { VerificationProcess } from "@/modules/HR/modules/BusinessTrip/components"

const { t } = useI18n()
const BTStore = useBusinessTripStore()
const route = useRoute()

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

// Hooks
onMounted( async () => {
  await BTStore.actionGetBusinessTripDetail(route.params.id)
})
</script>

<template>
  <template v-if="BTStore.detailLoading">
    <base-spinner />
  </template>
  <template v-else>
    <div class="business-trip-detail-view bg-white shadow-block h-full rounded-2xl relative">
      <div class="flex items-center w-full py-4 px-6 border-b-[1.5px]">
        <div class="flex gap-x-2 items-center py-[10px] px-4 border border-primary-500 rounded-[80px] text-base font-semibold text-primary-900">
          <base-iconify
            :icon="CheckListMinimalisticIcon"
            class="text-primary-500"
          />
          <span>{{ t('process') }}</span>
        </div>
        <div class="flex h-2 bg-greyscale-200 w-8"></div>
        <div class="flex gap-x-2 items-center py-[10px] px-4 border border-greyscale-70 bg-greyscale-50 rounded-[80px] text-base font-semibold text-greyscale-500">
          <base-iconify
            :icon="BillListIcon"
            class="text-greyscale-400"
          />
          <span>{{ t('avans-report') }}</span>
        </div>
      </div>

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
                    <span class="text-xs text-greyscale-900 font-semibold">{{ t(item.name) }}</span>
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

          <verification-process
            v-for="(item, index) in verificationList"
            :item="item"
            :verifications="verificationList"
            :index="index"
          />
        </div>
      </div>

      <div class="absolute flex flex-col gap-y-2 right-[32px] top-[102px] w-[298px] min-h-[220px] max-h-[72vh] overflow-y-auto rounded-2xl border border-primary-100 bg-primary-10 p-4 pt-3">
        <span class="text-base text-primary-900 font-semibold">{{ t('documents') }}</span>

        <div v-for="doc in 3" class="flex items-center justify-between bg-greyscale-70 rounded-[10px] py-1 px-2 cursor-pointer">
          <div class="flex items-center gap-x-3">
            <div class="flex justify-center items-center w-8 h-8 border bg-white rounded-lg">
              <base-iconify
                :icon="FileTextBoldIcon"
                class="text-primary-500 !w-4 !h-4"
              />
            </div>

            <div class="flex flex-col gap-y-[2px]">
              <span class="text-sm text-greyscale-900 font-medium">Bildirishnoma.pdf</span>
              <span class="text-greyscale-500 text-xs font-medium">1.5 MB</span>
            </div>
          </div>

          <base-iconify
            :icon="AltArrowRightIcon"
            class="text-greyscale-400 !w-4 !h-4"
          />
        </div>
      </div>
    </div>
  </template>
</template>

<style scoped>

</style>
