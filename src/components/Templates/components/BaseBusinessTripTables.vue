<script setup>
// Core
import { computed } from "vue"
import { useRoute } from "vue-router"
// Utils
import {
  returnBTClass, returnBTDateTimeToISO,
  returnBTDepartureTime,
  returnBTRoute,
  returnBTRouteType
} from "@/modules/Documents/modules/SendDocuments/utils"
import { COMPOSE_DOCUMENT_SUB_TYPES } from "@/enums"
import { formatDate } from "@/utils/formatDate"

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

const route = useRoute()

const groups = computed(() => {
  if (route.params.document_sub_type === COMPOSE_DOCUMENT_SUB_TYPES.EXTEND_BUSINESS_TRIP_NOTICE) {
    if (props.preview) {
      const allNotices = props.composeModel?.__groups
        ?.flatMap(group => group.__notices_to_change || [])

      return allNotices.map((notice, noticeId) => ({
        group_id: noticeId + 1,
        children: [
          {
            user: notice.user,
            locations: notice?.__regions,
            start_date: notice.__start_date,
            end_date: notice.__end_date,
            tags: notice.tags,
            sender_company: notice.__sender_company,
          }
        ]
      }))
    } else {
      return props.composeModel?.notices.map((notice, index) => ({
        group_id: index + 1,
        children: [
          {
            user: notice.user,
            locations: notice?.locations,
            start_date: notice?.start_date,
            end_date: notice?.end_date,
            tags: notice?.tags,
            sender_company: notice?.sender_company,
          }
        ]
      }))
    }
  } else {
    return props.preview ?
      props.composeModel.__groups.map((group, index) => ({
        group_id: index + 1,
        children: group.__users.map((user, userIndex) => ({
          user,
          locations: group?.__regions,
          start_date: group?.__start_date,
          end_date: group?.__end_date,
          tags: group?.__tags,
          sender_company: {
            region: {
              name: group?.__company?.region?.name,
            }
          }
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
  }
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
        departure_end_date: null,
      })),
      passengers: booking.passengers.map((passenger, passengerIndex) => ({
        user: passenger
      }))
    }))
    :
    props.composeModel?.bookings
})

</script>

<template>
<!--  <pre>{{ props.composeModel?.notices }}</pre>-->
  <!-- Loop according to groups -->
  <div
    v-for="(item, index) in groups"
    :key="item.group_id"
  >
    <table class="business-trip-table w-full mt-4 text-sm text-center">
      <tr class="bg-greyscale-100 font-semibold">
        <td class="w-[5%] text-start">
          №
        </td>
        <td class="w-[30%]">
          F.I.Sh
        </td>
        <td class="w-[30%]">
          Lavozimi
        </td>
        <td class="w-[35%]">
          Tarkibiy tuzilmasi
        </td>
      </tr>

      <!-- Loop according to group users -->
      <tr
        v-for="(child, index) in item.children"
        :key="child?.user?.id"
      >
        <td>{{ index + 1 }}.</td>
        <td>{{ child?.user?.full_name }}</td>
        <td>{{ child?.user?.position?.name }}</td>
        <td>{{ child?.user?.top_level_department?.name }}</td>
      </tr>
      <!-- /Loop according to group users -->
    </table>

<!--    <pre>{{ composeModel }}</pre>-->

    <table class="business-trip-table w-full text-sm text-center mt-2">
      <tr class="bg-greyscale-100 font-semibold">
        <td class="w-1/3">
          Qayerdan
        </td>
        <td class="w-1/3">
          Qayerga
        </td>
        <td class="w-1/3">
          Mamlakat
        </td>
      </tr>

      <!-- Loop according to group regions -->
      <tr
        v-for="(location, index) in item.children[0]?.locations"
        :key="location?.id"
      >
        <td>{{ index === 0 ? item?.children[0]?.sender_company?.region?.name : '' }}</td>
        <td>{{ location?.name_uz }}</td>
        <td>{{ index === 0 ? location?.country?.name : '' }}</td>
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
        <td class="w-[5%] text-start">№</td>
        <td class="text-start w-[95%]">
          Xizmat safari maqsadi:
        </td>
      </tr>

      <!-- Loop according to group tags -->
      <tr
        v-for="(tag, index) in item.children[0]?.tags"
        :key="index"
      >
        <td class="text-start">
          {{ index + 1 }}.
        </td>
        <td class="text-start">{{ tag?.name_uz }}</td>
      </tr>
      <!-- /Loop according to group tags -->
    </table>

    <divider v-if="index < groups.length - 1" class="my-8 border border-greyscale-300" />
  </div>
  <!-- /Loop according to groups -->

<!--  composeModel?.type !== 'decree'-->
  <template v-if="false">
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

    <template v-if="composeModel.type !== 'decree_for_leadership'">
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
            <td :rowspan="item.segments.length" class="w-[80px]">{{ returnBTRouteType(item?.type) }}</td>
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
    </template>
  </template>
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
