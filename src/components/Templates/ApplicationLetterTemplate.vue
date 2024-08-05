<script setup>
import {formatUserFullName} from "@/utils";
import QrcodeVue from "qrcode.vue";
import {formatDateHour} from "@/utils/formatDate";

const props = defineProps({
  composeModel: {
    type: Object,
    default: () => {},
    required: true
  }
})
</script>

<template>
  <div class="application-letter-template">
    <div class="flex justify-end">
      <div class="flex flex-col items-end" style="width: 70%;">
        <div class="text-sm font-bold text-end">“Ўзсаноатқурилишбанк” АТБ</div>
        <div class="text-sm font-bold text-end">{{ props.composeModel?.curator?.position?.name }}</div>
        <div class="text-sm font-bold text-end">{{ props.composeModel && props.composeModel.curator && formatUserFullName(props.composeModel?.curator) }}га</div>
        <div class="text-sm font-bold text-end">Банк маҳсулотларини сотиш ва тармоқларни мувофиқлаштириш департаменти </div>
        <div class="text-sm font-bold text-end">{{ props.composeModel?.author?.position?.name }}</div>
        <div class="text-sm font-bold text-end">{{ props.composeModel && props.composeModel.author && formatUserFullName(props.composeModel?.author) }}дан</div>
      </div>
    </div>

    <div class="flex justify-center text-base font-bold my-8">
      АРИЗА
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

<!--    <pre>{{ props.composeModel }}</pre>-->
  </div>
</template>

<style scoped>

</style>
