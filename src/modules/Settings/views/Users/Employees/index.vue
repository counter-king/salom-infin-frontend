<script setup>
import DataTable from 'primevue/datatable';
import Button from 'primevue/button'
import Column from 'primevue/column'
import axiosConfig from "@/services/axios.config"
import { onMounted, ref } from 'vue';
const defaultFilter = { page: 1, page_size: 10 };
const users = ref([]);
const loading = ref(false);
const visible = ref(false);
const filter = ref(defaultFilter);
const pageSize = filter.page_size;
const page = filter.page;
onMounted(() => {
  loading.value = true;
  filter = defaultFilter;
  axiosConfig
    .get('users/')
    .then(response => {
      const results = response?.data?.results;
      const newUsers = Array.isArray(results) ? results: [];
      users.value = newUsers;
    })
    .catch(() => {
      users.value = [];
    })
    .finally(() => {
      loading.value = false;
    })
})
</script>
<template>
  <div>
    <div class="flex mb-5 justify-between items-center">
      <h1 class="text-2xl font-bold text-primary-900">Сотрудники</h1>
      <div class="flex items-center gap-2">
        <Button
          @click="visible = true"
          class="p-button p-component font-semibold text-sm rounded-xl !rounded-full py-[9px] px-4"
          icon-left="AddIcon"
          rounded
          type="button"
        >Создать</Button>
      </div>
    </div>
    <DataTable
      :rows-per-page-options="[10, 15, 30]"
      :rows="pageSize"
      :value="users.users"
      class="base-data-table"
      paginator
      :loading="loading.loading"
      paginator-position="bottom"
      paginatorTemplate="RowsPerPageDropdown CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
      row-hover
      scrollable
      :pt="{
        table: { class: ['border-separate', 'border-spacing-y-1', '-mt-1'] },
        thead: { class: ['bg-white'] },
        bodyRow: { class: ['cursor-pointer', 'hover:bg-greyscale-50'] },
        loadingoverlay: { class: ['bg-transparent', 'h-[90%]'] },
        emptymessagecell: { class: ['bg-white', '!rounded-xl'] },
        paginator: {
          rowPerPageDropdown: {
            root: { class: ['h-6', 'rounded-2'] },
            paginatorWrapper: ['flex', 'justify-between', 'border', 'border-solid'],
            input: { class: ['flex', 'items-center', 'text-xs', 'font-semibold'] },
            dropdownicon: { class: ['w-3', 'h-3'] },
            trigger: { class: ['w-[30px]'] },
            item: { class: ['h-8', 'text-xs', 'flex', 'items-center'] },
            list: { class: ['p-0'] },
          },
          root: { class: ['h-14', 'rounded-3'] },
          paginatorWrapper: { class: ['h-14', 'rounded-3'] },
          current: { class: ['text-xs', 'text-greyscale-300', 'mr-auto', 'h-full'] },
          firstPageButton: { class: ['rounded-[6px]', 'h-6', 'w-6', 'min-w-[24px]', 'border', 'border-solid', 'border-border-1'] },
          lastPageButton: { class: ['rounded-[6px]', 'h-6', 'w-6', 'min-w-[24px]', 'border', 'border-solid', 'border-border-1'] },
          previousPageButton: { class: ['rounded-[6px]', 'h-6', 'w-6', 'min-w-[24px]', 'border', 'border-solid', 'border-border-1'] },
          // pageButton: ({ context }) => ({
          //     class:  [ context.active ? ['bg-primary-500', 'text-primary-0'] : undefined, 'rounded-[6px]', 'h-6', 'w-6', 'min-w-[24px]', 'text-xs']
          // }),
          nextPageButton: { class: ['rounded-[6px]', 'h-6', 'w-6', 'min-w-[24px]', 'border', 'border-solid', 'border-border-1'] }
        },
        // rowExpansionCell: {
        //   class: '!bg-white !rounded-xl'
        // }
      }">
      <Column field="name" header="Name" style="width: 25%"></Column>
        <template #empty>
          <div
            class="w-full flex justify-center items-center rounded-lg"
            style="height: calc(100vh - 420px)"
          >
            <img class="w-[200px] h-[170px]" src="@/assets/img/empty-img-gray.png" alt="EmptyFolder">
          </div>
        </template>
    </DataTable>
    <Dialog
      dismissableMask
      v-model:visible="visible"
      modal
      header="Создать сотрудник"
      :pt="{
        root: {
          class: ['p-dialog rounded-2xl']
        },
        header: {
          class: ['rounded-t-2xl bg-greyscale-50 border border-solid border-b-greyscale-200']
        },
        closeButton: {
          class: ['w-9 h-9 shadow-button bg-white']
        },
        closeButtonIcon: {
          class: ['w-3 h-3']
        },
        content: {
          class: ['p-6 p-ripple-disabled w-full shadow-none max-w-[610px]']
        },
        footer: {
          class: ['rounded-b-2xl bg-greyscale-50 border border-solid border-t-greyscale-200 p-6']
        }
      }">
        <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
        <template #footer>
          <div>
            <Button
              @click="visible = false"
              class="p-button p-component font-semibold text-sm rounded-xl !rounded-full py-[9px] px-4"
              icon-left="AddIcon"
              rounded
              type="button"
            >Создать</Button>
          </div>
        </template>
    </Dialog>
  </div>
</template>
<style>

</style>
