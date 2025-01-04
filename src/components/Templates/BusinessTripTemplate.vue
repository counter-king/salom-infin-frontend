<script setup>
// Core
import { computed } from "vue"
// Store
import { useAuthStore } from "@/modules/Auth/stores"
import { useSDStore } from "@/modules/Documents/modules/SendDocuments/stores/index.store"
// Utils
import { formatDate } from "@/utils/formatDate"
import {
  returnBTClass,
  returnBTDateTimeToISO,
  returnBTDepartureTime,
  returnBTRoute
} from "@/modules/Documents/modules/SendDocuments/utils"
// Enums
import { SIGNER_TYPES } from "@/enums"
// Components
import {
  BaseDepartmentName,
  BaseHeaderTemplate,
  BasePerformer,
  BaseSignersTemplate
} from "@/components/Templates/components"
import QrcodeVue from "qrcode.vue"

const props = defineProps({
  composeModel: {
    type: Object,
    default: () => {},
    required: true
  },
  preview: {
    type: Boolean,
    default: false
  }
})

// Composable
const SDStore = useSDStore()

// Computed
const author = computed(() => {
  return props.preview ? useAuthStore().currentUser : props.composeModel?.author
})
const curator = computed(() => {
  let basicSigner = props.composeModel && props.composeModel.signers && props.composeModel.signers.length && props.composeModel?.signers.find(item => item.type === SIGNER_TYPES.BASIC_SIGNER)
  return  props.preview ?
    props.composeModel.__curator :
    {
      ...props.composeModel.curator,
      is_signed: basicSigner ? basicSigner.is_signed : null,
      performers: basicSigner ? basicSigner.performers : null
    }
})

const groups = computed(() => {
  return props.preview ?
    props.composeModel.__groups.map((group, index) => ({
      group_id: index + 1,
      children: group.__users.map((user, userIndex) => ({
        user,
        locations: group?.__regions,
        start_date: group?.__start_date,
        end_date: group?.__end_date,
        tags: group?.__tags
      }))
    }))
    :
    props.composeModel?.notices.reduce((acc, item) => {
      const group = acc.find((g) => g.group_id === item.group_id)
      if (group) {
        group.children.push(item)
      } else {
        acc.push({
          group_id: item.group_id,
          children: [item]
        })
      }
      return acc
    }, [])
})

const trip_plans = computed(() => {
  return props.composeModel?.trip_plans
})

const bookings = computed(() => {
  return props.preview ?
    props.composeModel?.bookings.map((booking, index) => ({
      ...booking,
      segments: booking.segments.map((segment, segmentIndex) => ({
        ...segment,
        departure_date: returnBTDateTimeToISO(segment, 0),
        departure_end_date: returnBTDateTimeToISO(segment, 1),
      })),
      passengers: booking.passengers.map((passenger, passengerIndex) => ({
        user: passenger
      }))
    }))
    :
    props.composeModel?.bookings
})

const signers = computed(() => {
  return props.preview ? props.composeModel?.__signers : props.composeModel?.signers.filter(item => item.type === SIGNER_TYPES.SIGNER)
})
</script>

<template>
  <div class="business-trip-v2-template letter-template">
    <base-header-template />

    <base-department-name
      :dep-name="author?.top_level_department?.name"
    />

    <div class="flex flex-col text-sm font-medium mt-4">
      <span> № {{ props.composeModel?.register_number }}</span>
      <span>{{ props.composeModel?.register_date && formatDate(props.composeModel?.register_date) }}</span>
    </div>

    <div class="flex w-full items-center justify-between mt-1">
      <div class="flex flex-col">
        <template v-if="curator && curator.is_signed && curator.performers">
          <qrcode-vue
            :value="'Work Zone'"
            :size="50"
            level="L"
            render-as="svg"
          />
          <div class="text-sm mt-1">
            <span class="font-bold">Topshiriq: </span>
            <span v-for="(performer, index) in curator.performers">{{ performer && performer.first_name && performer.first_name[0] }}. {{ performer.last_name }}<span v-if="index !== curator.performers.length - 1">, &nbsp;</span></span>
          </div>
        </template>
      </div>
      <div class="flex flex-col items-end text-sm font-semibold text-right my-4">
        <span>{{ curator?.position?.name }}</span>
        <span>{{ curator?.first_name[0] }}. {{ curator?.last_name }}ga</span>
      </div>
    </div>

    <div class="flex w-full justify-center text-base font-bold my-5">
      BILDIRISHNOMA
    </div>

    <div class="text-sm italic text-justify my-4 indent-8">
      Qisqacha mazmuni: {{ props.composeModel?.short_description }}
    </div>

    <div v-if="SDStore.historyShow" class="text-justify" v-html="SDStore.historyContent"></div>
    <div v-else class="text-justify" v-html="props.composeModel?.content"></div>

    <!-- Loop according to groups -->
    <div
      v-for="(item, index) in groups"
      :key="item.group_id"
    >
      <table class="business-trip-table w-full mt-4 text-sm text-center">
        <tr class="bg-greyscale-100 font-semibold">
          <td class="w-[16%] text-start">
            Guruh {{ item.group_id }}:
          </td>
          <td class="w-[28%]">
            F.I.Sh
          </td>
          <td class="w-[28%]">
            Lavozimi
          </td>
          <td class="w-[28%]">
            Tarkibiy tuzilmasi
          </td>
        </tr>

        <!-- Loop according to group users -->
        <tr
          v-for="(child, index) in item.children"
          :key="child?.user?.id"
        >
          <td></td>
          <td>{{ child?.user?.full_name }}</td>
          <td>{{ child?.user?.position?.name }}</td>
          <td>{{ child?.user?.top_level_department?.name }}</td>
        </tr>
        <!-- /Loop according to group users -->
      </table>

      <table class="business-trip-table w-full text-sm text-center mt-2">
        <tr class="bg-greyscale-100 font-semibold">
          <td class="w-1/3 text-start">
            Xizmat safari hududi:
          </td>
          <td class="w-1/3">
            Mamlakat
          </td>
          <td class="w-1/3">
            Hudud
          </td>
        </tr>

        <!-- Loop according to group regions -->
        <tr
          v-for="(location, index) in item.children[0]?.locations"
          :key="location?.id"
        >
          <td></td>
          <td>O'zbekiston</td>
          <td>{{ location?.name_uz }}</td>
        </tr>
        <!-- /Loop according to group regions -->
      </table>

      <table class="business-trip-table w-full text-sm text-center mt-2">
        <tr class="bg-greyscale-100 font-semibold">
          <td class="w-1/3 text-start">
            Xizmat safari muddati:
          </td>
          <td class="w-1/3">
            Jo'nab ketish sanasi
          </td>
          <td class="w-1/3">
            Yetib kelish sanasi
          </td>
        </tr>

        <tr>
          <td></td>
          <td>{{ formatDate(item?.children[0]?.start_date) }}</td>
          <td>{{ formatDate(item?.children[0]?.end_date) }}</td>
        </tr>
      </table>

      <table class="business-trip-table w-full text-sm text-center mt-2">
        <tr class="bg-greyscale-100 font-semibold">
          <td class="w-1/3 text-start">
            Xizmat safari maqsadi:
          </td>
          <td class="w-2/3 text-center">
            Qisqacha mazmuni
          </td>
        </tr>

        <!-- Loop according to group tags -->
        <tr
          v-for="(tag, index) in item.children[0]?.tags"
          :key="index"
        >
          <td></td>
          <td>{{ tag?.name_uz }}</td>
        </tr>
        <!-- /Loop according to group tags -->
      </table>
    </div>
    <!-- /Loop according to groups -->

    <divider class="my-4 border border-greyscale-300" />

    <table class="business-trip-table w-full text-sm text-center">
      <tr class="bg-greyscale-100 font-semibold">
        <td class="w-1/3 text-start">
          Xizmat safari rejasi:
        </td>
        <td class="w-1/3">
          Reja
        </td>
        <td class="w-1/3">
          Ijrochilar
        </td>
      </tr>

      <!-- Loop according to trip plans -->
      <tr
        v-for="(plan, index) in trip_plans"
        :key="index"
      >
        <td></td>
        <td>{{ plan?.text }}</td>
        <td>
          <!-- Loop according to trip plan users-->
          <span v-for="(user, index) in plan?.users">{{ user?.full_name }}<span v-if="index < plan?.users.length - 1">,</span> <br></span>
          <!-- /Loop according to trip plan users-->
        </td>
      </tr>
      <!-- /Loop according to trip plans -->
    </table>

    <divider class="my-4 border border-greyscale-300" />

    <table class="booking-table w-full text-sm text-center">
      <tr class="bg-greyscale-100 font-semibold">
        <td>
          Marshrut
        </td>
        <td>
          Transport
        </td>
        <td>
          Qayerdan
        </td>
        <td>
          Qayerga
        </td>
        <td>
          Klass
        </td>
        <td>
          Jo'nash vaqti
        </td>
        <td>
          Yo'lovchilar
        </td>
      </tr>

      <!-- Loop according to booking segments -->
      <template v-for="(item, bookingIndex) in bookings">
        <tr>
          <td :rowspan="item.segments.length" class="w-[80px]">Marshrut {{ bookingIndex + 1 }}</td>
          <td :rowspan="item.segments.length">{{ returnBTRoute(item?.route) }}</td>
          <td>
            {{ item.segments[0]?.departure_city?.name }}
          </td>
          <td>
            {{ item.segments[0]?.arrival_city?.name }}
          </td>
          <td>
            {{ returnBTClass(item.segments[0]?.segment_class) }}
          </td>
          <td v-html="returnBTDepartureTime(item.segments[0]?.departure_date, item.segments[0]?.departure_end_date)"></td>
          <td :rowspan="item.segments.length">
            <!-- Loop according to booking segment users-->
            <span v-for="(passenger, passengerIndex) in item.passengers" :key="passengerIndex">
              {{ passenger?.user?.full_name }}<span v-if="passengerIndex < item.passengers.length - 1">,</span> <br />
            </span>
            <!-- /Loop according to booking segment users-->
          </td>
        </tr>

        <tr v-for="(segment, segmentIndex) in item.segments.slice(1)" :key="`${bookingIndex}-${segmentIndex}`">
          <td>
            {{ segment?.departure_city?.name }}
          </td>
          <td>
            {{ segment?.arrival_city?.name }}
          </td>
          <td>
            {{ returnBTClass(segment?.segment_class) }}
          </td>
          <td v-html="returnBTDepartureTime(segment?.departure_date, segment?.departure_end_date)"></td>
        </tr>
      </template>
      <!-- /Loop according to booking segments -->
    </table>

    <base-signers-template :signers="signers" />

    <base-performer
      :compose-model="props.composeModel"
      :author="author"
    />

<!--    <pre>{{ composeModel }}</pre>-->
  </div>
</template>

<style scoped>
.business-trip-table,
.business-trip-table tr,
.business-trip-table td {
  border: none;
}
.booking-table td {
  border: 1px solid var(--greyscale-200)
}
</style>
