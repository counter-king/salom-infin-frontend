// Core
import { defineStore } from 'pinia'
// Utils
import { helpers, required } from "@vuelidate/validators"
// Services
import {
  CaseBoldIcon,
  DocumentTextBoldIcon,
  LocalTaxiIcon,
  PlaneIcon,
  Routing2BoldIcon,
  TrainIcon
} from "@/components/Icons"

import {
  BY_CAR,
  BY_PLANE,
  BY_TRAIN,
  MULTI_CITY,
  ONE_WAY,
  ROUND_TRIP, STEPPER_DECREE,
  STEPPER_ROUTE,
  STEPPER_TRIP_INFO,
  STEPPER_WORK_PLAN, TRANSPORT_CLASS_LIST
} from "@/modules/Documents/modules/SendDocuments/constants"
import { nextTick } from "vue";
import { withAsync } from "@/utils/withAsync";
import {
  fetchCreateDocument,
  fetchGetDocumentDetail, fetchGetLinkedDocumentsList,
  fetchUpdateDocument
} from "@/modules/Documents/modules/SendDocuments/services/index.service";
import {
  adjustObjectToArray,
  adjustTagObjectToArray,
  adjustTopSignerObjectToArray,
  adjustUserObjectToArray,
  removeKeysWithDoubleUnderscore,
  setValuesToKeys
} from "@/utils";
import { formatDateReverse } from "@/utils/formatDate";
import { adjustBTDateToTimeArray } from "@/modules/Documents/modules/SendDocuments/utils";
import { useCountStore } from "@/stores/count.store";

export const useBusinessTripStore = defineStore("sd-business-trip-store", {
  state: () => ({
    buttonLoading: false,
    detailLoading: false,
    model: {
      approvers: [],
      bookings: null,
      company: null,
      content: null,
      curator: null,
      document_type: null,
      document_sub_type: null,
      journal: null,
      notices: [],
      start_date: null,
      end_date: null,
      short_description: null,
      sender: null,
      signers: [],
      files: [],
      trip_plans: null,
      __groups: [
        {
          __users: null,
          __tags: null,
          __regions: null,
          __start_date: null,
          __end_date: null,
          __company: null
        }
      ],
      __curator: null,
      __approvers: [],
      __signers: [],
      __files: []
    },
    decreeModel: {
      content: null,
      __files: []
    },
    decreeRules: {
      content: {
        required: helpers.withMessage(`Поле не должен быть пустым`, required)
      }
    },
    rules: {
      content: {
        required: helpers.withMessage(`Поле не должен быть пустым`, required)
      },
      __curator: {
        required: helpers.withMessage(`Поле не должен быть пустым`, required)
      },
      __signers: {
        required: helpers.withMessage(`Поле не должен быть пустым`, required)
      },
      short_description: {
        required: helpers.withMessage(`Поле не должен быть пустым`, required)
      },
      __groups: {
        $each: helpers.forEach({
          __users: {
            required: helpers.withMessage(`Поле не должен быть пустым`, required),
          },
          __tags: {
            required: helpers.withMessage(`Поле не должен быть пустым`, required),
          },
          __regions: {
            required: helpers.withMessage(`Поле не должен быть пустым`, required),
          },
          __start_date: {
            required: helpers.withMessage(`Поле не должен быть пустым`, required),
          },
          __end_date: {
            required: helpers.withMessage(`Поле не должен быть пустым`, required),
          },
          __company: {
            required: helpers.withMessage(`Поле не должен быть пустым`, required),
          },
        }),
      }
    },
    trip_plan_model: {
      trip_plans: [
        {
          users: null,
          text: null
        }
      ],
    },
    trip_plan_rules: {
      trip_plans: {
        $each: helpers.forEach({
          users: {
            required: helpers.withMessage(`Поле не должен быть пустым`, required),
          },
          text: {
            required: helpers.withMessage(`Поле не должен быть пустым`, required),
          },
        })
      }
    },
    booking_model: {
      bookings: [
        {
          type: ROUND_TRIP,
          route: BY_PLANE,
          segments: [
            {
              departure_city: null,
              arrival_city: null,
              date: null,
              time: null,
              segment_class: null
            },
            {
              departure_city: null,
              arrival_city: null,
              date: null,
              time: null,
              segment_class: null
            }
          ],
          passengers: null
        }
      ],
    },
    booking_model_rules: {
      bookings: {
        $each: helpers.forEach({
          segments: {
            $each: helpers.forEach({
              departure_city: {
                required: helpers.withMessage(`Поле не должен быть пустым`, required),
              },
              arrival_city: {
                required: helpers.withMessage(`Поле не должен быть пустым`, required),
              },
              date: {
                required: helpers.withMessage(`Поле не должен быть пустым`, required),
              },
              time: {
                required: helpers.withMessage(`Поле не должен быть пустым`, required),
              },
              segment_class: {
                required: helpers.withMessage(`Поле не должен быть пустым`, required),
              }
            })
          },
          passengers: {
            required: helpers.withMessage(`Поле не должен быть пустым`, required),
          }
        })
      }
    },
    segment: {
      departure_city: null,
      arrival_city: null,
      date: null,
      time: null,
      segment_class: null
    },
    stepperItems: [
      {
        id: 1,
        label: 'trip-info',
        icon: CaseBoldIcon,
        active: true,
        value: STEPPER_TRIP_INFO
      },
      {
        id: 2,
        label: 'work-plan',
        icon: DocumentTextBoldIcon,
        active: false,
        value: STEPPER_WORK_PLAN
      },
      {
        id: 3,
        label: 'route',
        icon: Routing2BoldIcon,
        active: false,
        value: STEPPER_ROUTE
      },
      {
        id: 4,
        label: 'decree',
        icon: DocumentTextBoldIcon,
        active: true,
        value: STEPPER_DECREE
      }
    ],
    routeTabItems: [
      {
        id: 1,
        title: 'airplane',
        icon: PlaneIcon,
        value: BY_PLANE
      },
      {
        id: 2,
        title: 'train',
        icon: TrainIcon,
        value: BY_TRAIN
      },
      {
        id: 3,
        title: 'taxi',
        icon: LocalTaxiIcon,
        value: BY_CAR
      }
    ],
    routeTypeTabItems: [
      {
        id: 1,
        title: 'there-back',
        icon: PlaneIcon,
        value: ROUND_TRIP
      },
      {
        id: 2,
        title: 'complex-route',
        icon: TrainIcon,
        value: MULTI_CITY
      },
      {
        id: 3,
        title: 'one-way',
        icon: LocalTaxiIcon,
        value: ONE_WAY
      }
    ]
  }),
  actions: {
    async actionCreateDocument(body) {
      const model = removeKeysWithDoubleUnderscore(body)
      this.buttonLoading = true
      const {response, error} = await withAsync(fetchCreateDocument, model)
      if (response) {
        this.buttonLoading = false
        await useCountStore().actionCountList()
        return Promise.resolve(response)
      } else {
        this.buttonLoading = false
        return Promise.reject(error)
      }
    },
    /** **/
    async actionUpdateDocument({ id, body }) {
      const model = await removeKeysWithDoubleUnderscore(body)
      try {
        this.buttonLoading = true;
        const { data } = await fetchUpdateDocument({ id, body: model })
        return Promise.resolve(data)
      } catch (err) {
        return Promise.reject(err)
      } finally {
        await useCountStore().actionCountList()
        this.buttonLoading = false
      }
    },
    /** **/
    async actionGetDocumentDetailForUpdate(id) {
      try {
        this.detailLoading = true
        const { data } = await fetchGetDocumentDetail(id)
        const res = await fetchGetLinkedDocumentsList(data.id)
        this.decreeModel = res?.data?.to_composes[0]?.from_compose
        setValuesToKeys(this.model, data)
        this.model.__curator = await adjustTopSignerObjectToArray([], data.curator.id, false)
        this.model.__signers =  await adjustUserObjectToArray(data.signers)
        this.model.__approvers =  await adjustUserObjectToArray(data.approvers)

        const array = Object.values(
          data.notices.reduce((acc, notice) => {
            const groupId = notice.group_id
            acc[groupId] = acc[groupId] || { group_id: groupId, items: [] }
            acc[groupId].items.push(notice)
            return acc
          }, {})
        )

        this.model.__groups = await Promise.all(
          array.map(async (group) => {
            const __users = await Promise.all(
              group.items.map(async (childItem) => {
                const user = await adjustUserObjectToArray([], childItem.user.id, false)
                return {
                  ...user,
                  business_trip_id : childItem.id
                }
              })
            )

            const __tags = await adjustTagObjectToArray(group.items[0].tags)
            const __regions = await adjustObjectToArray('regions', group.items[0].locations)
            const __company = await adjustObjectToArray('companies', [], false, group.items[0].sender_company)
            const __start_date = group.items[0].start_date
            const __end_date = group.items[0].end_date

            return {
              __users,
              __tags,
              __regions,
              __start_date,
              __end_date,
              __company
            }
          })
        )

        this.trip_plan_model.trip_plans = await Promise.all(
          data.trip_plans.map(async (item, index) => ({
            ...item,
            users: await adjustUserObjectToArray(item.users)
          }))
        )

        this.booking_model.bookings = await Promise.all(
          data.bookings.map(async (item) => ({
            type: item.type,
            route: item.route,
            segments: await Promise.all(
              item.segments.map(async (seg) => ({
                departure_city: await adjustObjectToArray('regions', [], false, seg.departure_city.id),
                arrival_city: await adjustObjectToArray('regions', [], false, seg.arrival_city.id),
                segment_class: await TRANSPORT_CLASS_LIST.find(segClass => segClass.value === seg.segment_class),
                date: formatDateReverse(seg.departure_date),
                time: await adjustBTDateToTimeArray(seg.departure_date, seg.departure_end_date)
              }))
            ),
            passengers: await adjustUserObjectToArray(item.passengers)
          }))
        )
      } catch (err) {

      } finally {
        this.detailLoading = false
      }
    },
    /** **/
    actionAddGroupBlock() {
      this.model.__groups.push({
        __users: null,
        __tags: null,
        __regions: null,
        __start_date: null,
        __end_date: null,
        __company: null
      })
    },
    /** **/
    actionDeleteGroupBlock(index) {
      this.model.__groups.splice(index, 1)
    },
    /** **/
    async actionStepClick(router, route, step) {
      await router.replace({
        query: {
          ...route.query,
          step: step
        }
      })

      this.stepperItems.forEach(item => item.active = item.value === step)

      await nextTick()
      const element = document.querySelector('.document-view-aside')
      if (element) {
        element.scrollTo({
          top: 0,
          behavior: 'smooth'
        })
      }
    },
    /** **/
    actionAddWorkPlanRow() {
      this.trip_plan_model.trip_plans.push({
        users: null,
        text: null
      })
    },
    /** **/
    actionDeleteWorkPlanRow(index) {
      this.trip_plan_model.trip_plans.splice(index, 1)
    },
    /** **/
    actionAddRouteRow() {
      this.booking_model.bookings.push({
        type: ROUND_TRIP,
        route: BY_PLANE,
        segments: [
          {
            departure_city: null,
            arrival_city: null,
            date: null,
            time: null,
            segment_class: null
          },
          {
            departure_city: null,
            arrival_city: null,
            date: null,
            time: null,
            segment_class: null
          }
        ],
        passengers: null
      })
    },
    /** **/
    actionDeleteRouteRow(index) {
      this.booking_model.bookings.splice(index, 1)
    },
    /** **/
    actionChangeRouteSegment(routeType, routeIndex) {
      const createSegment = () => ({
        departure_city: null,
        arrival_city: null,
        date: null,
        time: null,
        segment_class: null,
      })

      this.booking_model.bookings[routeIndex].segments = routeType === ROUND_TRIP
        ? [createSegment(), createSegment()]
        : [createSegment()]
    },
    /** **/
    async actionAddRouteLine(index) {
      this.booking_model.bookings[index].segments.push({
        departure_city: null,
        arrival_city: null,
        date: null,
        time: null,
        segment_class: null
      })
    },
    /** **/
    async actionDeleteRouteLine(parentIndex, childIndex) {
      this.booking_model.bookings[parentIndex].segments.splice(childIndex, 1)
    },
    /** **/
    actionResetBTModel() {
      this.model = {
        approvers: [],
        bookings: null,
        company: null,
        content: null,
        curator: null,
        document_type: null,
        document_sub_type: null,
        journal: null,
        notices: [],
        start_date: null,
        end_date: null,
        short_description: null,
        sender: null,
        signers: [],
        files: [],
        trip_plans: null,
        __groups: [
          {
            __users: null,
            __tags: null,
            __regions: null,
            __start_date: null,
            __end_date: null,
            __company: null
          }
        ],
        __curator: null,
        __approvers: [],
        __signers: [],
        __files: []
      }

      this.trip_plan_model = {
        trip_plans: [
          {
            users: null,
            text: null
          }
        ]
      }

      this.booking_model = {
        bookings: [
          {
            type: ROUND_TRIP,
            route: BY_PLANE,
            segments: [
              {
                departure_city: null,
                arrival_city: null,
                date: null,
                time: null,
                segment_class: null
              },
              {
                departure_city: null,
                arrival_city: null,
                date: null,
                time: null,
                segment_class: null
              }
            ],
            passengers: null
          }
        ]
      }

      this.decreeModel = {
        content: null,
          __files: []
      }
    }
  }
})
