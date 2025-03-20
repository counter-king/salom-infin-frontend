<script setup>
// Core
import { computed, ref } from "vue"
import { useRoute, useRouter } from "vue-router"
import { useI18n } from "vue-i18n"
import { useVuelidate } from "@vuelidate/core"
// Store
import { useAuthStore } from "@/modules/Auth/stores"
import { useSDBTDecreeStore } from "@/modules/Documents/modules/SendDocuments/stores/businessTripDecree.store"
import { useCountStore } from "@/stores/count.store"
import { useCommonStore } from "@/stores/common"
// Const
import { FORM_TYPE_CREATE } from "@/constants/constants"
// Components
import { LayoutWithTabsCompose } from "@/components/DetailLayout"
import FormContainer from "@/modules/Documents/modules/SendDocuments/components/FormContainer.vue"
import UserSelect from "@/components/Select/UserSelect.vue"
import { AddPlusIcon, TrashBinTrashBoldIcon } from "@/components/Icons"
import UserMultiSelect from "@/components/Select/UserMultiSelect.vue";
import { UserWithRadio } from "@/components/Users";
import { formatDateReverse } from "@/utils/formatDate";
import EditorWithTabs from "@/components/Composed/EditorWithTabs.vue";
import { adjustUsersToArray } from "@/utils";
import { COLOR_TYPES, JOURNAL } from "@/enums";
import { DecreeTemplate } from "@/components/Templates";
import PreviewDialog from "@/modules/Documents/modules/SendDocuments/components/PreviewDialog.vue";
import { dispatchNotify } from "@/utils/notify";
import { ROUTE_SD_DETAIL, ROUTE_SD_LIST } from "@/modules/Documents/modules/SendDocuments/constants";

const props = defineProps({
  formType: {
    type: String,
    default: FORM_TYPE_CREATE
  }
})

// Reactive
const showNestedError = ref(false)
const dialog = ref(false)

// Composable
const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const store = useSDBTDecreeStore()

const countStore = useCountStore()
const commonStore = useCommonStore()
const $v = useVuelidate(store.rules, store.model)
const $vTripPlan = useVuelidate(store.trip_plan_rules, store.trip_plan_model)

// Computed
const title = computed(() => {
  return props.formType === FORM_TYPE_CREATE ? 'create-decree' : 'update-decree'
})
const users = computed(() => {
  const seenIds = new Set()
  return store.model.__groups
    .reduce((acc, obj) => {
      if (obj.__users && Array.isArray(obj.__users)) {
        return acc.concat(obj.__users)
      }
      return acc
    }, [])
    .filter((user) => {
      if (seenIds.has(user.id)) {
        return false
      }
      seenIds.add(user.id)
      return true
    })
})

// Methods
const preview = async () => {
  showNestedError.value = true
  const valid = await $v.value.$validate()
  if (!valid) {
    dispatchNotify(null, t('fill-required-fields'), COLOR_TYPES.WARNING)
    return
  }

  const approvers = adjustUsersToArray(store.model.__approvers)
  const signers = adjustUsersToArray(store.model.__signers)

  store.model.approvers = []
  store.model.signers = []
  store.model.notices = []
  store.model.bookings = []
  store.model.trip_plans = []
  store.model.approvers = approvers
  store.model.signers = signers
  store.model.curator = store.model?.__curator?.user_id
  store.model.journal = JOURNAL.ORDERS_PROTOCOLS
  store.model.company = authStore.currentUser?.company?.id

  store.model.__groups.forEach((group, index) => {
    const group_id = index + 1
    store.model.notices.push(
      ...group.__users.map(user => ({
        start_date: group.__start_date,
        end_date: group.__end_date,
        user: user.id,
        company: authStore.currentUser?.company?.id,
        regions: group.__regions.map(r => r.id),
        tags: group.__tags.map(t => ({ id: t.id })),
        group_id
      }))
    )
  })

  store.model.sender = authStore?.currentUser?.top_level_department?.id
  store.model.files = store.model.__files.map(item => { return { id: item.id } })
  store.model.document_type = route.params.document_type
  store.model.document_sub_type = route.params.document_sub_type

  store.model.trip_plans = store.trip_plan_model.trip_plans.map(plan => ({
    users: plan.users.map(user => ({ id: user.id })),
    text: plan.text
  }))

  dialog.value = true
}
const clearForm = () => {

}
const addGroupBlock = () => {
  store.actionAddGroupBlock()
}
const addRow = () => {
  store.actionAddWorkPlanRow()
  showNestedError.value = false
}
const onFileUpload = (files) => {
  store.model.__files = []
  files.forEach(file => {
    store.model.__files.push(file)
  })
}
const create = async () => {
  const response = await store.actionCreateDocument(store.model)
  await countStore.actionCountList()
  if (response) {
    dialog.value = false
    dispatchNotify(null, t('document-sent'), COLOR_TYPES.SUCCESS)
    await router.replace({
      name: ROUTE_SD_LIST,
      query: {
        document_type: route.params.document_type
      }
    })
  } else {
    dispatchNotify(null, t('error-occurred'), COLOR_TYPES.ERROR)
  }
}
const update = async () => {
  const data = await store.actionUpdateDocument(
    {
      id: route.params.id,
      body: store.model
    }
  );
  await countStore.actionCountList();
  dispatchNotify(null, t('changed'), COLOR_TYPES.SUCCESS);
  await router.replace({
    name: ROUTE_SD_DETAIL,
    params: {
      id: route.params.id,
      document_type: route.params.document_type,
      document_sub_type: route.params.document_sub_type
    }
  })
}
const manage = () => {
  if (props.formType === FORM_TYPE_CREATE) {
    create()
  } else {
    update()
  }
}
</script>

<template>
  <template v-if="store.detailLoading">
    <base-spinner/>
  </template>

  <template v-else>
    <layout-with-tabs-compose
      :title="title"
    >
      <template #content>
        <form-container
          @emit:preview="preview"
          @emit:clear-form="clearForm"
        >
          <base-row>
            <base-col col-class="w-1/2">
              <user-select
                v-model="$v.__curator.$model"
                :error="$v.__curator"
                api-url="top-signers"
                :api-params="{ doc_types: route.params.document_type }"
                label="whom"
                required
                placeholder="select-leader"
              />
            </base-col>

            <base-col col-class="w-1/2">
              <base-input
                v-model="$v.short_description.$model"
                :error="$v.short_description"
                required
                label="short-description"
                placeholder="enter-short-description"
              />
            </base-col>

            <base-col col-class="w-full mb-2 flex flex-col gap-y-3">
              <div
                v-for="(group, index) in store.model.__groups"
                class="border-[1.5px] border-greyscale-200 rounded-2xl px-5 py-4"
              >
                <div class="flex justify-between">
                  <span class="text-base text-primary-900 font-semibold mb-1">{{ t('group') }}-{{ index + 1 }}</span>

                  <div
                    v-if="index !== 0"
                    class="flex justify-center items-center bg-critic-50 hover:bg-critic-100 rounded-lg w-7 h-7 cursor-pointer"
                    @click="store.actionDeleteGroupBlock(index)"
                  >
                    <base-iconify :icon="TrashBinTrashBoldIcon" class="text-critic-500 !w-4 !h-4" />
                  </div>
                </div>

                <base-row>
                  <base-col col-class="w-1/2">
                    <user-multi-select
                      v-model="group.__users"
                      :error="$v.__groups.$each.$response.$data[index].__users"
                      label="who-is-going-to-business-trip"
                      placeholder="select-employees"
                      required
                      :show-nested-error="showNestedError"
                    />
                  </base-col>

                  <base-col col-class="w-1/2">
                    <base-multi-select
                      v-model="group.__regions"
                      :error="$v.__groups.$each.$response.$data[index].__regions"
                      api-url="regions"
                      :token-class="['chip-hover shadow-button bg-white cursor-pointer']"
                      display="chip"
                      selectable
                      label="trip-place"
                      type="department"
                      placeholder="select-trip-place"
                      required
                      :show-nested-error="showNestedError"
                    >
                      <template #chip="{ value }">
                        {{ value.name }}
                      </template>

                      <template #option="{ value }">
                        <user-with-radio
                          :title="value.name"
                          :text-truncate="false"
                        >
                        </user-with-radio>
                      </template>
                    </base-multi-select>
                  </base-col>

                  <base-col col-class="w-1/2">
                    <base-multi-select
                      v-model="group.__tags"
                      :error="$v.__groups.$each.$response.$data[index].__tags"
                      api-url="tags"
                      :api-params="{ document_sub_type: route.params. document_sub_type, page_size: 500}"
                      :token-class="['chip-hover shadow-button bg-white cursor-pointer']"
                      display="chip"
                      selectable
                      label="trip-purpose"
                      type="department"
                      placeholder="select-targets"
                      required
                      :show-nested-error="showNestedError"
                    >
                      <template #chip="{ value }">
                        {{ value.name }}
                      </template>

                      <template #option="{ value }">
                        <user-with-radio
                          :title="value.name"
                          :text-truncate="false"
                        >
                        </user-with-radio>
                      </template>
                    </base-multi-select>
                  </base-col>

                  <base-col col-class="w-1/2">
                    <div class="flex w-full gap-x-4">
                      <base-calendar
                        v-model="group.__start_date"
                        :error="$v.__groups.$each.$response.$data[index].__start_date"
                        :min-date="new Date()"
                        required
                        label="start-date"
                        placeholder="choose-start-time"
                        class="w-1/2"
                        :show-nested-error="showNestedError"
                        @update:modelValue="(value) => group.__start_date = formatDateReverse(value)"
                      />
                      <base-calendar
                        v-model="group.__end_date"
                        :error="$v.__groups.$each.$response.$data[index].__end_date"
                        :min-date="new Date()"
                        required
                        label="end-date"
                        placeholder="choose-end-time"
                        class="w-1/2"
                        :show-nested-error="showNestedError"
                        @update:modelValue="(value) => group.__end_date = formatDateReverse(value)"
                      />
                    </div>
                  </base-col>
                </base-row>
              </div>
              <base-button
                color="bg-primary-30 hover:bg-primary-100 text-primary-500"
                border-color="border-transparent"
                label="add-more"
                icon-color="#767994"
                :icon-left="AddPlusIcon"
                root-classes=""
                type="button"
                shadow
                class="rounded-[10px] w-[195px]"
                @click="addGroupBlock"
              />
            </base-col>
          </base-row>

          <!-- Trip plans -->

          <div class="flex flex-col gap-y-3" >
            <div
              v-for="(item, index) in store.trip_plan_model.trip_plans"
              class="border-[1.5px] border-greyscale-200 rounded-2xl px-5 py-4"
            >
              <div class="flex justify-between">
                <span class="text-base text-primary-900 font-semibold mb-1">{{ t('plan') }}-{{ index + 1 }}</span>

                <div
                  v-if="index !== 0"
                  class="flex justify-center items-center bg-critic-50 rounded-lg w-7 h-7 cursor-pointer"
                  @click="store.actionDeleteWorkPlanRow(index)"
                >
                  <base-iconify :icon="TrashBinTrashBoldIcon" class="text-critic-500 !w-4 !h-4" />
                </div>
              </div>

              <base-row>
                <base-col col-class="w-1/2">
                  <base-textarea
                    v-model="item.text"
                    :error="$vTripPlan.trip_plans.$each.$response.$data[index].text"
                    required
                    label="work-plan-content"
                    placeholder="enter-work-plan-content"
                    :show-nested-error="showNestedError"
                  />
                </base-col>

                <base-col col-class="w-1/2">
                  <user-multi-select
                    v-model="item.users"
                    :options="users"
                    :error="$vTripPlan.trip_plans.$each.$response.$data[index].users"
                    label="employees"
                    placeholder="select-employees"
                    required
                    :show-nested-error="showNestedError"
                  />
                </base-col>
              </base-row>
            </div>
          </div>

          <base-button
            color="bg-primary-30 hover:bg-primary-100 text-primary-500"
            border-color="border-transparent"
            label="add-more"
            icon-color="#767994"
            :icon-left="AddPlusIcon"
            root-classes=""
            type="button"
            shadow
            class="my-3 rounded-[10px]"
            @click="addRow"
          />

          <base-row>
            <base-col col-class="w-1/2">
              <user-multi-select
                v-model="store.model.__approvers"
                label="approvers"
                placeholder="enter-approvers"
              />
            </base-col>

            <base-col col-class="w-1/2">
              <user-multi-select
                v-model="$v.__signers.$model"
                :error="$v.__signers"
                label="signers"
                placeholder="enter-signers"
                required
              />
            </base-col>

            <base-col col-class="w-full">
              <div class="border-[1.5px] border-greyscale-200 rounded-2xl px-5 py-4">
                <div class="text-base text-primary-900 font-semibold mb-2">{{ t('decree') }}</div>

                <editor-with-tabs
                  v-model="$v.content.$model"
                  :error="$v.content"
                  file-upload-container-classes="w-1/2 pr-2"
                  :files="store.model.__files"
                  @emit:file-upload="onFileUpload"
                />
              </div>
            </base-col>
          </base-row>
        </form-container>
      </template>
    </layout-with-tabs-compose>

    <!-- PREVIEW -->
    <preview-dialog
      v-model="dialog"
      :send-button-loading="store.buttonLoading"
      @emit:send="manage"
    >
      <template #content>
        <decree-template
          :compose-model="{
                ...store.model,
                trip_plans: store.trip_plan_model.trip_plans,
                type: 'decree_for_leadership'
              }"
          :preview="true"
        />
      </template>
    </preview-dialog>
  </template>
</template>

<style scoped>

</style>
