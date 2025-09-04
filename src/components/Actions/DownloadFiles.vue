<script setup>
// Core
import { ref, unref } from "vue"
import { useI18n } from "vue-i18n"
import { useVuelidate } from "@vuelidate/core"
import { baseURL } from "@/services/axios.config"
import axios from "axios"
// Utils
import { formatDate, formatDateReverse, isDateRangeWithinLimit, isStartBeforeOrEqualEnd } from "@/utils/formatDate"
import { dispatchNotify } from "@/utils/notify"
import { getStorageItem } from "@/utils/storage"
// Enums
import { COLOR_TYPES } from "@/enums"
import { ACCESS, LANG } from "@/constants/storage"
// Store
import { useDocFlowStore } from "@/modules/Documents/modules/Registration/stores/docflow.store"
// Components
import { DownloadMinimalisticIcon } from "@/components/Icons"

// Composable
const { t } = useI18n()
const store = useDocFlowStore()
const $v = useVuelidate(store.downloadFileRules, store.downloadFilesModel)

// Reactive
const opRef = ref(null)
const buttonLoading = ref(false)

// Methods
const toggle = (event) => {
  const _opRef = unref(opRef)
  _opRef.opRef.toggle(event)
}
const downloadFiles = async () => {
  const valid = await $v.value.$validate()
  if (!valid) {
    dispatchNotify(null, t('fill-required-fields'), COLOR_TYPES.WARNING)
    return
  }

  const { register_start_date, register_end_date } = store.downloadFilesModel

  if (!isStartBeforeOrEqualEnd(register_start_date, register_end_date)) {
    dispatchNotify(null, t("start-date-after-end-date"), COLOR_TYPES.WARNING)
    return
  }

  if (!isDateRangeWithinLimit(register_start_date, register_end_date)) {
    dispatchNotify(null, t("date-range-too-large"), COLOR_TYPES.WARNING)
    return
  }

  buttonLoading.value = true

  try {
    const headers = {
      Authorization: getStorageItem(ACCESS) ? 'Bearer ' + getStorageItem(ACCESS) : null,
      Accept: 'application/json',
      "Accept-Language": getStorageItem(LANG)
        ? JSON.parse(getStorageItem(LANG)).value
        : 'uz'
    }

    const response = await axios.get(`${baseURL}docflow/1/download-zip/`, {
      responseType: 'blob',
      headers: headers,
      params: {
        register_start_date,
        register_end_date,
        journal: store.downloadFilesModel.journal
      }
    })

    // Create blob URL
    const url = window.URL.createObjectURL(new Blob([response.data]))
    const link = document.createElement("a")
    link.href = url

    // Get filename from headers if available
    let filename = `Dalolatnoma_${formatDate(register_start_date)}_dan_${formatDate(register_end_date)}_gacha.zip`
    const disposition = response.headers["content-disposition"]
    if (disposition && disposition.includes("filename=")) {
      filename = disposition.split("filename=")[1].replace(/"/g, "")
    }

    link.setAttribute("download", filename)
    document.body.appendChild(link)
    link.click()
    link.remove()

    window.URL.revokeObjectURL(url)
  } catch (error) {
    let backendMessage = error.message

    if (error.response && error.response.data) {
      try {
        const text = await error.response.data.text()
        const json = JSON.parse(text)
        backendMessage = json.message || backendMessage
      } catch (e) {
      }
    }
    dispatchNotify(null, backendMessage, COLOR_TYPES.WARNING)
  }
  finally {
    buttonLoading.value = false
  }
}
</script>

<template>
  <base-button
    color="bg-primary-0 hover:bg-greyscale-100 text-primary-dark"
    border-color="border-transparent"
    label="download-files"
    icon-color="#767994"
    :icon-left="DownloadMinimalisticIcon"
    rounded
    shadow
    type="button"
    @click="toggle"
  />

  <base-overlay-panel
    ref="opRef"
    width="w-[800px]"
    menu-class="bg-white mt-1 overflow-hidden"
  >
    <template #header>
      <div class="flex items-center h-[72px] px-6">
        <span class="text-lg font-semibold">{{ t('download-zip-files') }}</span>
      </div>
    </template>

    <div class="px-5 py-4">
      <base-row>
        <base-col col-class="w-1/2">
          <base-calendar
            v-model="$v.register_start_date.$model"
            :error="$v.register_start_date"
            required
            label="register-start-date"
            placeholder="register-start-date"
            @update:modelValue="(value) => store.downloadFilesModel.register_start_date = formatDateReverse(value)"
          />
        </base-col>

        <base-col col-class="w-1/2">
          <base-calendar
            v-model="$v.register_end_date.$model"
            :error="$v.register_end_date"
            required
            label="register-end-date"
            placeholder="register-end-date"
            @update:modelValue="(value) => store.downloadFilesModel.register_end_date = formatDateReverse(value)"
          />
        </base-col>
      </base-row>
    </div>
    <template #actions>
      <div class="flex py-3 px-4 justify-end items-center">
          <base-button
            border-color="border-transparent"
            label="download"
            :rounded="true"
            shadow
            type="button"
            size="small"
            :loading="buttonLoading"
            @click="downloadFiles"
          />
      </div>
    </template>
  </base-overlay-panel>
</template>

<style scoped>

</style>
