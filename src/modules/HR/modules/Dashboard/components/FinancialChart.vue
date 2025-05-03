<script setup>
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useHRDashboardStore } from '../stores'
import ChartCard from '../components/Card.vue'
import { numberFormat } from '@/utils/formatIntl'
import { formatNumberToMillionsOrBillions, formatNumberToFinanceChart } from '@/utils'

const { t } = useI18n()
const dashboardStore = useHRDashboardStore()

const loading = ref(false)

const month = new Date().getMonth()
const year = new Date().getFullYear()
const isCompare = ref(false)
const current = ref({
	current_start: `${year}-01-01`,
	current_end: `${year}-${month < 9 ? '0' + month : month}-01`,
})
const compare = ref({
	compare_start: `${year - 1}-01-01`,
	compare_end: `${year - 1}-${month < 9 ? '0' + month : month}-01`,
})

const handleYear = async () => {
	if(isCompare.value) {
		await dashboardStore.actionDashboardComparison({
			...current.value,
			...compare.value
		})
	}
	else {
		await dashboardStore.actionDashboardComparison(current.value)
	}
}

onMounted(async () => {
	await dashboardStore.actionDashboardComparison(current.value)

	setTimeout(() => {
		loading.value = true
	}, 500)
})
</script>

<template>
  <div v-if="loading" class="relative pb-[35%]">
    <div class="absolute top-0 left-0 w-full h-full">
      <chart-card class="h-full pt-6 pb-8 mt-2 px-10">
        <header class="flex flex-wrap items-center">
          <div class="flex items-center flex-1 gap-7 text-greyscale-900">
            <h1 class="text-lg font-semibold">Динамика ФОТ</h1>

	          <div class="flex items-center gap-2 cursor-pointer">
		          <Checkbox
			          v-model="isCompare"
			          :binary="true"
			          input-id="checkbox-year"
			          :pt="{
	                root: {
	                  class: 'flex items-center'
	                },
	                input:{
	                  class: 'checkbox-event w-5 h-5 rounded'
	                }
	              }"
			          @change="handleYear"
			          >
		          </Checkbox>

		          <label for="checkbox-year" class="cursor-pointer">
			          <span class="font-semibold text-base">2024 Год</span>
		          </label>
	          </div>
          </div>

          <div class="flex items-center gap-7">
	          <template v-if="isCompare">
		          <div class="flex items-center gap-2">
			          <div
					          class="w-4 h-4 rounded"
					          style="background: repeating-linear-gradient(-45deg, #66c2ff, #66c2ff 4px, #4da6ff 4px, #4da6ff 8px)"
			          ></div>

			          <span class="text-[13px] font-medium text-greyscale-900">Сравнение Головной банк</span>
		          </div>

		          <div class="flex items-center gap-2">
			          <div
					          class="w-4 h-4 rounded"
					          style="background: repeating-linear-gradient(-45deg, #FFECC8, #FFECC8 4px, #FFA803 4px, #FFA803 8px)"
			          ></div>

			          <span class="text-[13px] font-medium text-greyscale-900">Сравнение Филиальная сеть</span>
		          </div>
	          </template>

            <div class="flex items-center gap-2">
              <div class="w-4 h-4 rounded bg-info-500"></div>

              <span class="text-[13px] font-medium text-greyscale-900">Головной Банк</span>
            </div>

            <div class="flex items-center gap-2">
              <div class="w-4 h-4 rounded bg-warning-500"></div>

              <span class="text-[13px] font-medium text-greyscale-900">Филиальная сеть</span>
            </div>
          </div>
        </header>

	      <template v-if="dashboardStore.comparison.loader">
		      <div class="relative h-full">
			      <base-spinner />
		      </div>
	      </template>

	      <template v-else>
          <div class="grid grid-cols-6 gap-16 relative pl-10 mt-11">
	          <div class="flex flex-col absolute top-0 left-0 w-full h-full">
		          <template v-for="(item, index) in dashboardStore.comparison.axes">
			          <div class="flex flex-1 gap-2">
				          <h1 class="text-xs font-medium text-greyscale-500">
					          {{ formatNumberToMillionsOrBillions(item) }} {{ t(formatNumberToFinanceChart(item)) }}
				          </h1>

				          <div
					          class="flex-1 h-[1px] mt-[6px]"
					          style="background-image: repeating-linear-gradient(to right, #E2E8F0 0px, #E2E8F0 10px, transparent 10px, transparent 20px)"
				          ></div>
			          </div>
		          </template>
	          </div>

	          <template v-for="(item, index) in dashboardStore.comparison.data.head_office">
		          <div class="col-span-1">
			          <div class="flex justify-center gap-5">
				          <div class="w-14 h-[385px] relative rounded-lg overflow-hidden">
					          <div
						          class="bg-info-50 hover:bg-info-100 transition-colors absolute w-full h-[70%] bottom-0 left-0 border-t-[3px] border-t-info-500 cursor-pointer"
						          :class="[item.comparison_amount_percent > item.current_amount_percent ? 'z-[1]': '']"
						          :style="{
												'height': item.current_amount_percent,
											}"
						          v-tooltip.top="{
		                    value: `<h4 class='text-xs text-white -my-1'>${numberFormat(parseInt(item.current_amount))}</h4>`,
		                    escape: true,
		                    autoHide: false
		                  }"
					          ></div>

					          <div
						          class="gradient-info-diagonal absolute w-full h-[50%] bottom-0 left-0 border-t-[3px] border-t-info-300 cursor-pointer"
						          :style="{
												'height': item.comparison_amount_percent,
											}"
						          v-tooltip.top="{
		                    value: `<h4 class='text-xs text-white text-center -my-1'>${numberFormat(parseInt(item.comparison_amount))} <br> <span class='block mt-[2px]'>Сравнение с ${new Date().getFullYear() - 1} г.</span></h4>`,
		                    escape: true,
		                    autoHide: false
		                  }"
					          ></div>
				          </div>

				          <div class="w-14 h-[385px] relative rounded-lg overflow-hidden">
					          <div
						          class="bg-warning-50 hover:bg-warning-100 transition-colors absolute w-full h-[70%] bottom-0 left-0 border-t-[3px] border-t-warning-500 cursor-pointer"
						          :class="[
												dashboardStore.comparison.data.branches[index]?.comparison_amount_percent > dashboardStore.comparison.data.branches[index]?.current_amount_percent
													? 'z-[1]'
													: ''
												]"
						          :style="{
												'height': dashboardStore.comparison.data.branches[index]?.current_amount_percent ?? 0,
											}"
						          v-tooltip.top="{
		                    value: `<h4 class='text-xs text-white -my-1'>${numberFormat(parseInt(dashboardStore.comparison.data.branches[index]?.current_amount ?? 0))}</h4>`,
		                    escape: true,
		                    autoHide: false
		                  }"
					          ></div>

					          <div
						          class="gradient-warning-diagonal absolute w-full h-[50%] bottom-0 left-0 border-t-[3px] border-t-warning-300 cursor-pointer"
						          :style="{
												'height': dashboardStore.comparison.data.branches[index]?.comparison_amount_percent ?? 0,
											}"
						          v-tooltip.top="{
		                    value: `<h4 class='text-xs text-white text-center -my-1'>${numberFormat(parseInt(dashboardStore.comparison.data.branches[index]?.comparison_amount ?? 0))} <br> <span class='block mt-[2px]'>Сравнение с ${new Date().getFullYear() - 1} г.</span></h4>`,
		                    escape: true,
		                    autoHide: false
		                  }"
					          ></div>
				          </div>
			          </div>

			          <span class="block h-10 content-center text-sm font-medium text-greyscale-900 text-center mt-4">{{ item.pay_type }}</span>
		          </div>
	          </template>
          </div>
	      </template>
      </chart-card>
    </div>
  </div>

<!--	<pre>{{ dashboardStore.comparison }}</pre>-->
</template>

<style scoped>
.gradient-info-diagonal {
  background: repeating-linear-gradient(
    -45deg,
    #e0f5ff,
    #e0f5ff 15px,
    #d0efff 15px,
    #d0efff 30px
  );
	transition: background 0.4s ease;
}

.gradient-info-diagonal:hover {
	background: repeating-linear-gradient(-45deg, #c9eafc, #c9eafc 15px, #b3e2fc 15px, #b3e2fc 30px);
}

.gradient-warning-diagonal {
  background:
    repeating-linear-gradient(
      -45deg,
      #fff8eb,
      #fff8eb 15px,
      #fde7b0 15px,
      #fde7b0 30px
    );
	transition: background 0.4s ease;
}

.gradient-warning-diagonal:hover {
	background: repeating-linear-gradient(
		-45deg,
		#fcebcf,
		#fcebcf 15px,
		#fcd98e 15px,
		#fcd98e 30px
	)
}
</style>
