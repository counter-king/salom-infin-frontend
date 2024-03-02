<script setup>
// Available keys: approvers, author, curator, signers, departments, register_number
// Core
import { onMounted, ref, unref } from "vue";
import { useRoute, useRouter } from "vue-router";
// Services
import { fetchUserDetail, fetchDepartmentDetail, fetchComposeStatusDetail } from "@/services/common.service";
// Utils
import { clearModel, filterFalsyValues, filterObjectByKeys, removeKeysWithDoubleUnderscore } from "@/utils";
// Store
import { useCommonStore } from "@/stores/common";
import { useFilterStore } from "@/stores/filter.store";
import { usePaginationStore } from "@/stores/pagination.store";
// Components
import UserMultiSelect from "@/components/Select/UserMultiSelect.vue";
import DepartmentMultiSelect from "@/components/Select/DepartmentMultiSelect.vue";
import BaseMultiSelect from "@/components/UI/BaseMultiSelect.vue";
import {UserWithRadio} from "@/components/Users";

const props = defineProps({
  actionList: {
    type: Function,
    default: () => void 0
  },
  filterKeys: {
    type: Array,
    default: () => []
  },
  keysToIncludeOnClearFilter: {
    type: Array,
    default: () => []
  }
});

const route = useRoute();
const router = useRouter();
const filterStore = useFilterStore();
const opRef = ref(null);
const paginationStore = usePaginationStore();
const commonStore = useCommonStore();

const paramList = ["register_number"];
const objectToKeysList = [
  {
    param: "approvers",
    action: fetchUserDetail
  },
  {
    param: "author",
    action: fetchUserDetail
  },
  {
    param: "curator",
    action: fetchUserDetail
  },
  {
    param: "signers",
    action: fetchUserDetail
  },
  {
    param: "departments",
    action: fetchDepartmentDetail
  },
  {
    param: "status",
    action: fetchComposeStatusDetail
  }
]

// Methods
const toggle = (event) => {
  const _opRef = unref(opRef)
  _opRef.opRef.toggle(event)
}
const mapObjectsToKey = (sourceArray, targetKey) => {
  filterStore.filterState[targetKey] = sourceArray && sourceArray.length
    ? sourceArray.map(user => user.id).join(',')
    : null;
};
const adjustKeysToValues = async () => {
  for (let i = 0; i < objectToKeysList.length; i++) {
    await mapObjectsToKey(filterStore.filterState[`__${objectToKeysList[i].param}`], objectToKeysList[i].param);
  }
}
const filter = async () => {
  await adjustKeysToValues();
  const filterModel = await removeKeysWithDoubleUnderscore(filterStore.filterState);
  const filterModelFalsyKeys = filterFalsyValues({ ...route.query, ...filterModel });
  await paginationStore.resetPagination();
  await router.replace({
    query: {
      ...route.query,
      ...filterModelFalsyKeys,
      page: paginationStore.page,
      page_size: paginationStore.pageSize,
      first_row: paginationStore.firstRow
    }
  });
  toggle();
  await props.actionList({ ...route.query });
}
const clearFilter = async () => {
  await clearModel(filterStore.filterState, props.keysToIncludeOnClearFilter);
  toggle();
  if (route.query) {
    let tempRouteQuery = filterObjectByKeys(route.query, props.keysToIncludeOnClearFilter);
    await paginationStore.resetPagination();
    await router.replace({
      query: {
        ...tempRouteQuery,
        page: paginationStore.page,
        page_size: paginationStore.pageSize,
        first_row: paginationStore.firstRow
      }
    });
    await props.actionList({ ...route.query });
  }
}
const fetchAndPopulateFilterState = async (queryParam, targetArray, action) => {
  if (route.query && route.query[queryParam]) {
    const idArray = route.query[queryParam].split(',').map(Number);
    for (const id of idArray) {
      const response = await action(id);
      targetArray.push(response.data);
    }
  }
};

const populateFilterState = async (queryParams) => {
  if (route.query && route.query[queryParams]) {
    filterStore.filterState[queryParams] = route.query[queryParams];
  }
}

// Hooks
onMounted(async () => {
  for (let i = 0; i < objectToKeysList.length; i++) {
    await fetchAndPopulateFilterState(objectToKeysList[i].param, filterStore.filterState[`__${objectToKeysList[i].param}`], objectToKeysList[i].action);
  }

  for (let i = 0; i < paramList.length; i++) {
    await populateFilterState(paramList[i]);
  }
})
</script>

<template>
  <base-button
    color="bg-primary-0 hover:bg-greyscale-100 text-primary-dark"
    border-color="border-transparent"
    label="filter"
    icon-color="#767994"
    icon-left="SortIcon"
    rounded
    shadow
    type="button"
    @click="toggle"
  />

  <base-overlay-panel
    ref="opRef"
    width="w-[800px]"
    menu-class="bg-white mt-1 overflow-hidden"
  >
    <template #header>
      <div class="flex items-center h-[72px] px-6">
        <span class="text-lg font-semibold">Фильтрация</span>
      </div>
    </template>

    <div class="px-5 py-4">
      <base-row>
        <base-col v-if="props.filterKeys.includes('author')" col-class="w-1/2">
          <user-multi-select
            v-model="filterStore.filterState.__author"
            label="author"
          />
        </base-col>

        <base-col v-if="props.filterKeys.includes('curator')" col-class="w-1/2">
          <user-multi-select
            v-model="filterStore.filterState.__curator"
            label="curator"
          />
        </base-col>

        <base-col v-if="props.filterKeys.includes('approvers')" col-class="w-1/2">
          <user-multi-select
            v-model="filterStore.filterState.__approvers"
            label="approver"
          />
        </base-col>

        <base-col v-if="props.filterKeys.includes('signers')" col-class="w-1/2">
          <user-multi-select
            v-model="filterStore.filterState.__signers"
            label="signer"
          />
        </base-col>

        <base-col v-if="props.filterKeys.includes('departments')" col-class="w-1/2">
          <department-multi-select
            v-model="filterStore.filterState.__departments"
            :required="false"
          />
        </base-col>

        <base-col v-if="props.filterKeys.includes('register_number')" col-class="w-1/2">
          <base-input
            v-model="filterStore.filterState.register_number"
            label="reg-number"
          />
        </base-col>

        <base-col v-if="props.filterKeys.includes('status')" col-class="w-1/2">
          <base-multi-select
            v-model="filterStore.filterState.__status"
            api-url="compose/1/statuses"
            :token-class="['chip-hover shadow-button bg-white cursor-pointer']"
            display="chip"
            selectable
            label="status"
            type="department"
          >
            <template #chip="{ value }">
              {{ value.name }}
            </template>

            <template #option="{ value }">
              <user-with-radio
                :title="value.name"
              >
              </user-with-radio>
            </template>
          </base-multi-select>
        </base-col>
      </base-row>

<!--      <pre>{{ props.filterModel }}</pre>-->
    </div>

    <template #actions>
      <div class="flex py-3 px-4 justify-end items-center">
<!--        <base-button
          color="bg-white hover:bg-greyscale-100 text-primary-900"
          border-color="border-transparent"
          label="save"
          :rounded="true"
          shadow
          type="button"
          size="small"
        />-->

        <div class="flex items-center gap-3">
          <base-button
            color="bg-white hover:bg-greyscale-100 text-primary-900"
            border-color="border-transparent"
            label="clear"
            :rounded="true"
            shadow
            type="button"
            size="small"
            @click="clearFilter"
          />

          <base-button
            border-color="border-transparent"
            label="filter"
            :rounded="true"
            shadow
            type="button"
            size="small"
            @click="filter"
          />
        </div>
      </div>
    </template>
  </base-overlay-panel>
</template>

<style scoped>

</style>
