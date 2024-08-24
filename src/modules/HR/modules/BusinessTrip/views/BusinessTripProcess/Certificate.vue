<script setup>
// Core
import {computed} from "vue"
// Store
import {useBusinessTripStore} from "@/modules/HR/modules/BusinessTrip/stores/businessTrip.store"
// Utils
import {formatDate} from "@/utils/formatDate"
// Components
import QrcodeVue from "qrcode.vue"

const BTStore = useBusinessTripStore()

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
  }
  else {
    return null
  }
})

const verifications = computed(() => {
  let arr = []
  BTStore.detailModel?.verifications?.forEach(item => {
    arr.push({
      arrived: null,
      left: item.left_at,
      filial: item.company?.name,
      full_name: item.verified_by?.full_name
    })

  })

  // BTStore.detailModel?.verifications?.map()

  return arr
})
</script>

<template>
  <div class="flex justify-center px-6 py-6 overflow-y-auto" style="height: calc(100% - 100px)">
    <div class="w-[600px] h-fit min-h-full border shadow py-10 px-8">
      <div class="flex justify-center text-base font-semibold text-greyscale-900">
        Xizmat safari guvohnomasi
      </div>

      <div class="flex flex-col text-sm mt-4 gap-y-4">
        <div>
          <span class="font-semibold">Berildi: </span> "Sanoat-Qurilish banki" ATB {{ author?.top_level_department?.name }} {{ author?.position?.name }} <span class="font-semibold">{{ author?.full_name }}</span>ga
        </div>

        <div>
          <span class="font-semibold">Xizmat safari muddati: </span> {{ formatDate(BTStore.detailModel?.start_date) }} dan {{ formatDate(BTStore.detailModel?.end_date) }} gacha ({{ numberOfDays }} kun)
        </div>

        <div>
          <span class="font-semibold">Safarga boradigan joylari: </span>
          <span v-for="(filial, index) in BTStore.detailModel?.destinations">{{ filial.name }}<span v-if="index !== BTStore.detailModel?.destinations.length - 1">,</span> &nbsp; </span>
        </div>

        <div>
          <span class="font-semibold">Asos: </span> 13.08.2024 dagi 11-k-sonli buyruq
        </div>
      </div>

      <div class="flex flex-col mt-4 gap-y-2">
        <qrcode-vue
          :value="'Work Zone'"
          :size="50"
          level="L"
          render-as="svg"
        />
        <span class="text-sm font-medium text-greyscale-900">A. G'aybullayev</span>
      </div>

      <div class="text-sm font-semibold text-greyscale-900 my-4">Berilgan manzilga yetib borish va u yerdan qaytish belgilari:</div>

      <div>
        <base-row>
          <base-col
            v-for="item in 1"
            col-class="w-1/2"
          >
            <div class="text-sm flex flex-col">
              <div><span class="font-semibold">Jo'nadi:</span> 12.08.2024</div>
              <div><span class="font-semibold">Filial:</span> Bosh ofis</div>
              <div><span class="font-semibold">Mas'ul xodim: </span> E.Toshmatov</div>
              <qrcode-vue
                :value="'Work Zone'"
                :size="50"
                level="L"
                render-as="svg"
                class="mt-2"
              />
            </div>
          </base-col>
        </base-row>
      </div>
    </div>
  </div>

  <pre>{{ verifications }}</pre>
</template>

<style scoped>

</style>
