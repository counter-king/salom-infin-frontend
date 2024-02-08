<script setup>
// Core
import { computed } from "vue";
// Utils
import { formatDate } from "@/utils/formatDate";
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
<!--    <pre>{{ receivers }}</pre>-->
    <div class="flex justify-between border-b pb-4 items-center">
      <div class="flex">
        <img src="/images/logo.svg" alt="Logo" />
        <img src="/images/logo-text.svg" alt="Logo text" class="invert ml-2" />
      </div>

      <div class="flex flex-col items-end gap-y-2">
        <span class="text-sm font-semibold block max-w-[300px] text-right">{{ props.composeModel?.sender?.name }}</span>
<!--        <span class="text-sm font-medium text-greyscale-500">{{ props.composeModel?.register_date && formatDate(props.composeModel?.register_date) }}  № {{ props.composeModel?.register_number }}</span>-->
      </div>
    </div>

    <div class="flex justify-between my-5">
      <div class="flex flex-col text-sm font-medium">
        <span> № {{ props.composeModel?.register_number }}</span>
        <span>{{ props.composeModel?.register_date && formatDate(props.composeModel?.register_date) }}</span>
      </div>
      <div class="flex flex-col items-end text-sm font-medium text-right gap-y-2">
        <div class="max-w-[300px]" v-for="receiver in receivers" :key="receiver.id">
          {{ receiver.name }}
        </div>
      </div>
    </div>

    <div class="text-justify" v-html="props.composeModel?.content">

    </div>

    <div class="mt-6 pb-2 border-b">
      <template v-for="item in props.composeModel?.signers" :key="item.id">
<!--        <pre>{{ item }}</pre>-->
        <base-row class="mb-2 items-center">
          <base-col col-class="w-1/2">
            <span class="text-sm font-medium block">{{ item.user ? item.user.position.name : item.position.name }}</span>
          </base-col>

          <base-col col-class="w-1/4">
            <qrcode-vue
              v-if="item.is_signed"
              :value="'https://check.asakabank.uz/document/'"
              :size="50"
              level="L"
              render-as="svg"
            />
          </base-col>

          <base-col col-class="w-1/4">
            <span class="text-sm font-medium block">{{ formatUserFullName(item) }}</span>
          </base-col>
        </base-row>
      </template>
    </div>

    <div class="flex flex-col my-4 text-sm font-medium">
      <span class="text-greyscale-500">Ijrochi:</span>
      <span class="block max-w-[300px]">{{ props.composeModel?.author && formatUserFullName(props.composeModel?.author) }}</span>
    </div>
  </div>
</template>

<style scoped>

</style>
