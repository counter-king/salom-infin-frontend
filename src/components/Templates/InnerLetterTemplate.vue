<script setup>
// Core
import { computed } from "vue";
// Utils
import {formatDate, formatDateHour} from "@/utils/formatDate";
import { formatUserFullName } from "@/utils";
// Components
import QrcodeVue from "qrcode.vue";


const props = defineProps({
  composeModel: {
    type: Object,
    default: () => {},
    required: true
  }
})

const receivers = computed(() => {
  return (
    props.composeModel?.receiver?.departments ||
    props.composeModel?.receiver?.organizations ||
    props.composeModel?.receiver?.companies ||
    []
  ).flat();
});
</script>

<template>
  <div class="inner-letter-template">
<!--    <pre>{{ composeModel }}</pre>-->
    <div class="pb-4">
      <img src="@/assets/img/logo.png" alt="Logo" />
    </div>

    <div class="bg-dep-name">
      <div class="bg-dep-name-child">
        <span class="text-sm font-semibold block">{{ props.composeModel?.sender?.name }}</span>
      </div>
    </div>

    <div class="flex text-sm font-medium gap-x-2 mt-4">
      <span>{{ props.composeModel?.register_date && formatDate(props.composeModel?.register_date) }}</span>
      <span> № {{ props.composeModel?.register_number }}</span>
    </div>

    <div class="flex flex-col items-end text-sm font-semibold text-right gap-y-2 my-4">
      <div class="max-w-[300px]" v-for="receiver in receivers" :key="receiver.id">
        {{ receiver.name }}
      </div>
    </div>

    <div class="flex w-full justify-center text-center text-sm font-semibold my-5">
      {{ props.composeModel?.title?.name }}
    </div>

    <div class="text-justify" v-html="props.composeModel?.content"></div>

    <div class="mt-6 pb-2">
      <template v-for="item in props.composeModel?.signers" :key="item.id">
<!--        <pre>{{ item }}</pre>-->
        <base-row class="mb-2 items-center">
          <base-col col-class="w-1/2">
            <span class="text-sm font-semibold block">{{ item.user ? item.user.position.name : item.position.name }}</span>
          </base-col>

          <base-col col-class="w-1/4">
            <qrcode-vue
              v-if="item.is_signed"
              :value="'Work Zone'"
              :size="50"
              level="L"
              render-as="svg"
            />
          </base-col>

          <base-col col-class="w-1/4">
            <span class="text-sm font-semibold block">{{ formatUserFullName(item) }}</span>
          </base-col>
        </base-row>
      </template>
    </div>

    <div class="flex flex-col my-4 text-xs font-light">
      <span><span class="font-medium">Ijrochi:</span> {{ props.composeModel?.author && formatUserFullName(props.composeModel?.author) }}</span>
      <span><span class="font-medium">Tel:</span> +99899 777 77 77 (1234)</span>
      <span>
        <span class="font-medium">Kiritildi:</span>
        {{ props.composeModel?.created_date && formatDateHour(props.composeModel.created_date) + '&nbsp' }}
        <template v-if="props.composeModel?.is_signed">
          <span class="font-medium">Imzolandi:</span>
          {{ props.composeModel?.modified_date && formatDateHour(props.composeModel.modified_date) }}
        </template>
      </span>
    </div>
  </div>
</template>

<style scoped>

</style>
