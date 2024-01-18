<script setup>
import {formatDate} from "../../utils/formatDate";
import {formatUserFullName} from "../../utils";

const props = defineProps({
  composeModel: {
    type: Object,
    default: () => {},
    required: true
  }
})
</script>

<template>
  <div class="inner-letter-template">
<!--    <pre>{{ props.composeModel }}</pre>-->
    <div class="flex justify-between border-b pb-4">
      <div class="flex">
        <img src="/images/logo.svg" alt="Logo" />
        <img src="/images/logo-text.svg" alt="Logo text" class="invert ml-2" />
      </div>

      <div class="flex flex-col items-end gap-y-2">
        <span class="text-sm font-semibold block max-w-[300px] text-right">{{ props.composeModel?.sender?.name }}</span>
        <span class="text-sm font-medium text-greyscale-500">{{ props.composeModel?.register_date && formatDate(props.composeModel?.register_date) }}  № {{ props.composeModel?.register_number }}</span>
      </div>
    </div>

    <div class="flex justify-center text-base font-semibold my-5">
      XIZMAT XATI
    </div>

    <div class="text-justify indent-4" v-html="props.composeModel?.content">

    </div>

    <div class="mt-6 pb-2 border-b">
      <template v-for="item in props.composeModel?.signers" :key="item.id">
        <div class="flex justify-between mb-2">
          <div class="flex flex-col">
            <span class="text-sm font-medium text-greyscale-500">{{ item.user ? item.user.position.name : item.position.name }}:</span>
            <span class="text-sm font-semibold block max-w-[300px]">{{ formatUserFullName(item) }}</span>
          </div>

          <div class="w-[50px] h-[50px]">
            <img src="/images/qr-code.svg" alt="Qr code" />
          </div>
        </div>
      </template>
    </div>

    <div class="flex flex-col my-4">
      <span class="text-sm font-medium text-greyscale-500">Ijrochi:</span>
      <span class="text-sm font-semibold block max-w-[300px]">{{ props.composeModel?.author && formatUserFullName(props.composeModel?.author) }}</span>
    </div>
  </div>
</template>

<style scoped>

</style>
