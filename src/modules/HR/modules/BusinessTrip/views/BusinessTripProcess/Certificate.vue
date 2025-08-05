<script setup>
// Core
import { computed, ref } from "vue"
import html2pdf from "html2pdf.js"
// Store
import { useBusinessTripStore } from "@/modules/HR/modules/BusinessTrip/stores/businessTrip.store"
// Utils
import { formatDate, formatDateHour } from "@/utils/formatDate"
// Components
import QrcodeVue from "qrcode.vue"
import { formatUserFullName } from "@/utils";
import { AltArrowDownIcon, DownloadMinimalisticIcon } from "@/components/Icons"
import axiosConfig from "@/services/axios.config";

const BTStore = useBusinessTripStore()

// Reactive
const downloadLoading = ref(false)

// Computed
const author = computed(() => {
  return BTStore.detailModel?.user
})
const numberOfDays = computed(() => {
  let startDate = new Date(BTStore.detailModel?.start_date)
  let endDate = new Date(BTStore.detailModel?.end_date)

  if (startDate && endDate) {
    // Calculate the difference in milliseconds
    let difference = endDate.getTime() - startDate.getTime();

    // Convert the difference from milliseconds to days
    let daysDifference = difference / (1000 * 3600 * 24);

    // Round the result to get an integer number of days
    daysDifference = Math.round(daysDifference);
    return daysDifference + 1
  } else {
    return null
  }
})

const verifications = computed(() => {
  let arr = []
  BTStore.detailModel?.verifications?.forEach(item => {
    if (item.is_sender && item.left_at) {
      arr.push({
        label: 'Jo\'nadi',
        actionTime: item.left_at,
        filial: item.region?.name_uz || item.company?.name,
        responsible: formatUserFullName(item.left_verified_by),
        visited_places: [],
        actionTimeForBack: formatDateHour(item.left_at)
      })
    }
    if (!item.is_sender && item.left_at) {
      arr.push({
        label: 'Jo\'nadi',
        actionTime: item.left_at,
        filial: item.region?.name_uz || item.company?.name,
        responsible: formatUserFullName(item.left_verified_by),
        visited_places: [],
        actionTimeForBack: formatDateHour(item.left_at)
      })
    }
    if (!item.is_sender && item.arrived_at) {
      arr.push({
        label: 'Keldi',
        actionTime: item.arrived_at,
        filial: item.region?.name_uz || item.company?.name,
        responsible: formatUserFullName(item.arrived_verified_by),
        visited_places: item.visited_places.map((item) => ({
          ...item,
          createdDateForBack: formatDateHour(item.created_date)
        })),
        actionTimeForBack: formatDateHour(item.arrived_at)
      })
    }
    if (item.is_sender && item.arrived_at) {
      arr.push({
        label: 'Keldi',
        actionTime: item.arrived_at,
        filial: item.region?.name_uz || item.company?.name,
        responsible: formatUserFullName(item.arrived_verified_by),
        visited_places: [],
        actionTimeForBack: formatDateHour(item.arrived_at)
      })
    }
  })

  // BTStore.detailModel?.verifications?.map()

  return arr.sort((a, b) => new Date(a.actionTime) - new Date(b.actionTime))
})
const docType = computed(() => {
  return BTStore.detailModel?.compose?.find(item => item.doc_type === 'order') ? 'order' : 'decree'
})
const orderRegisteredNumber = computed(() => {
  return BTStore.detailModel?.compose?.find(item => item.doc_type === docType.value)?.register_number
})
const orderRegisteredDate = computed(() => {
  return BTStore.detailModel?.compose?.find(item => item.doc_type === docType.value)?.register_date
})
const curatorFullName = computed(() => {
  return BTStore.detailModel?.compose && BTStore.detailModel?.compose[0]?.curator
})
const isTripChanged = computed(() => {
  return BTStore.detailModel?.compose && BTStore.detailModel?.compose.length > 2 && BTStore.detailModel?.end_date_2
})
const addedRegions = computed(() => {
  const exclude = new Set(BTStore.detailModel?.locations?.map(l => l.id))
  return BTStore.detailModel?.verifications?.filter(v => !exclude.has(v.region.id) && !v.is_sender)
})
const decree2RegisteredDate = computed(() => {
  return BTStore.detailModel?.compose?.find(item => item.doc_type === 'changed_decree')?.register_date
})
const decree2RegisteredNumber = computed(() => {
  return BTStore.detailModel?.compose?.find(item => item.doc_type === 'changed_decree')?.register_number
})
const chunkedArray = computed(() => {
  const chunkSize = 2
  const result = []
  for (let i = 0; i < verifications.value.length; i += chunkSize) {
    result.push(verifications.value.slice(i, i + chunkSize))
  }
  return result
})


// Methods
const generatePdf = async () => {
  downloadLoading.value = true
  const body = {
    author: author.value,
    start_date: formatDate(BTStore.detailModel?.start_date),
    isTripChanged: isTripChanged.value,
    end_date: formatDate(BTStore.detailModel?.end_date),
    end_date_2: formatDate(BTStore.detailModel?.end_date_2),
    numberOfDays: numberOfDays.value,
    locations: BTStore.detailModel?.locations,
    addedRegions: addedRegions.value,
    orderRegisteredDate: orderRegisteredDate.value ? formatDate(orderRegisteredDate.value) : null,
    orderRegisteredNumber: orderRegisteredNumber.value ? orderRegisteredNumber.value : null,
    decree2RegisteredDate: decree2RegisteredDate.value ? formatDate(decree2RegisteredDate.value) : null,
    decree2RegisteredNumber: decree2RegisteredNumber.value ? decree2RegisteredNumber.value : null,
    curatorFullName: curatorFullName.value,
    verifications: chunkedArray.value,
  }

  axiosConfig.post('business-trip-certificate-to-pdf/', body, { responseType: 'blob' })
    .then((response) => {
      const blob = new Blob([response.data], {type: 'application/pdf'})
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', `${author?.value?.full_name}.pdf`)
      document.body.appendChild(link)
      link.click()
      link.remove()
    })
    .catch((error) => {
      console.error('PDF download failed:', error)
    })
    .finally(() => {
      downloadLoading.value = false
    })
  // const element = document.querySelector('.element-to-download'); // Adjust selector as needed
  //
  // const options = {
  //   margin: [16, 20], // Set margins (top, bottom, left, right)
  //   filename: author?.value?.full_name,
  //   image: { type: "jpeg", quality: 0.98 },
  //   html2canvas: { scale: 2 }, // Increase scale for better quality
  //   jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
  // };
  //
  // // Generate the PDF
  // try {
  //   await html2pdf()
  //     .from(element)
  //     .set(options)
  //     .save();
  // } catch (err) {
  //
  // } finally {
  //   downloadLoading.value = false
  // }

};
</script>

<template>
  <div class="flex justify-center px-6 py-6 overflow-y-auto"
       style="height: calc(100% - 100px)">
    <div class="w-[600px] h-fit border shadow py-10 px-8" ref="contentToPrint">
      <div class="element-to-download">
        <div class="flex justify-center text-base font-semibold text-greyscale-900">
          Xizmat safari guvohnomasi
        </div>

        <div class="flex flex-col text-sm mt-4 gap-y-4">
          <div>
            <span class="font-semibold">Berildi: </span> "Sanoat-Qurilish banki" ATB {{
              author?.top_level_department?.name
            }} {{ author?.position?.name }} <span class="font-semibold">{{ author?.full_name }}</span>ga
          </div>

          <div>
            <span class="font-semibold">Xizmat safari muddati: </span> {{ formatDate(BTStore.detailModel?.start_date) }}
            dan {{ isTripChanged ? formatDate(BTStore.detailModel?.end_date_2) : formatDate(BTStore.detailModel?.end_date) }} gacha ({{ numberOfDays }} kun)<template v-if="isTripChanged">, {{ formatDate(BTStore.detailModel?.start_date) }} dan {{ formatDate(BTStore.detailModel?.end_date) }} gacha</template>
          </div>

          <div>
            <span class="font-semibold">Safarga boradigan joylari: </span>
            <span v-for="(location, index) in BTStore.detailModel?.locations">{{ location.name_uz }}<span
              v-if="index !== BTStore.detailModel?.locations.length - 1">,</span> &nbsp; </span>
            <template v-if="isTripChanged && addedRegions.length">
              (<span v-for="(item, itemIndex) in addedRegions">{{ item?.region?.name_uz }}<span
                v-if="itemIndex !== addedRegions.length - 1">, &nbsp;</span></span>)
            </template>
          </div>

          <div>
            <span class="font-semibold">Asos: </span> {{ orderRegisteredDate ? formatDate(orderRegisteredDate) : '__.__.____' }} dagi {{
              orderRegisteredNumber ? orderRegisteredNumber : '__'
            }}-sonli {{ docType === 'order' ? 'buyruq' : 'farmoyish' }}<template v-if="isTripChanged">,
            {{ decree2RegisteredDate ? formatDate(decree2RegisteredDate) : '__.__.____' }} dagi
            {{ decree2RegisteredNumber ? decree2RegisteredNumber : '__' }}-sonli farmoyish
            </template>
          </div>
        </div>

        <div class="flex flex-col mt-4 gap-y-2">
          <qrcode-vue
            :value="'salom.sqb.uz'"
            :size="50"
            level="L"
            render-as="svg"
          />
          <span class="text-sm font-medium text-greyscale-900">{{ curatorFullName }}</span>
        </div>

        <div class="text-sm font-semibold text-greyscale-900 my-4">Berilgan manzilga yetib borish va u yerdan qaytish
          belgilari:
        </div>

        <div v-if="verifications && verifications.length">
          <base-row>
            <base-col
              v-for="item in verifications"
              col-class="w-1/2 mb-1"
            >
              <div class="text-sm flex flex-col">
                <div><span class="font-semibold">{{ item.label }}:</span> {{ formatDateHour(item.actionTime) }}</div>
                <div><span class="font-semibold">Hudud:</span> {{ item.filial }}</div>
                <div><span class="font-semibold">Mas'ul xodim: </span> {{ item.responsible }}</div>
                <div class="font-semibold">Borilgan manzillar:</div>
                <div
                  v-for="(visited_place, index) in item.visited_places"
                >
                 {{ index + 1 }}. {{ visited_place?.place?.name }} - {{ formatDateHour(visited_place?.created_date) }}
<!--                  <pre>{{ item.visited_places }}</pre>-->
                </div>
                <div class="mt-3">
                  <qrcode-vue
                    :value="'salom.sqb.uz'"
                    :size="50"
                    level="L"
                    render-as="svg"
                  />
                </div>
              </div>
            </base-col>
          </base-row>
        </div>
      </div>

      <div class="flex justify-end items-end mt-8">
        <base-button
          label="download"
          :icon-left="DownloadMinimalisticIcon"
          type="button"
          :loading="downloadLoading"
          @click="generatePdf"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
