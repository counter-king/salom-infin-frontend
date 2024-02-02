<script setup>
import Button from 'primevue/button';
import Loading from './Loading.vue';
import NoDepartment from './NoDepartment.vue';
import axiosConfig from '@/services/axios.config';
import CreateDepartment from './CreateDepartment.vue';
import Department from './Department.vue';
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute();
const activeDepartment = ref(null);
const createDepartment = ref(null);
const createVisible = ref(false);
const departmentId = route.params?.id;
const employees = ref([]);
const employeesLoading = ref(false);
const parentDepartments = ref([]);
const status = ref('loading');
const subDepartments = ref([]);
const subDepartmentsLoading = ref(false);
const topLevelDepartment = ref(null);
const setCreateVisible = visible => {
   createVisible.value = visible;
};
const setActiveDepartment = department => {
   activeDepartment.value = department;
};
const openModal = (departments, department) => {
   createDepartment.value = department;
   createVisible.value = true;
   parentDepartments.value = departments;
};
const getSubDepartments = department => {
   subDepartmentsLoading.value = true;
   axiosConfig
      .get(`/departments/${department}/`)
      .then(response => {
         const children = response?.data?.children;
         const newSubDepartments = Array.isArray(children) ? children : [];
         subDepartments.value = newSubDepartments;
      })
      .catch(() => {
         subDepartments.value = [];
      })
      .finally(() => {
         subDepartmentsLoading.value = false;
      })
};
const getEmployees = department => {
   activeDepartment.value = department;
   employeesLoading.value = true;
   axiosConfig
      .get(`/users/?department=${department?.id}`)
      .then(response => {
         const results = response?.data?.results;
         const newEmployees = Array.isArray(results) ? results : [];
         employees.value = newEmployees;
      })
      .catch(() => {
         employees.value = [];
      })
      .finally(() => {
         employeesLoading.value = false;
      });
};
const getDepartment = department => {
   status.value = 'loading';
   axiosConfig
      .get(`/departments/${department}/`)
      .then(response => {
         const data = response?.data;
         const success = response?.status === 200;
         if(success && data) {
            getEmployees(department);
            getSubDepartments(department);
            status.value = 'success';
            topLevelDepartment.value = data;
         } else {
            status.value = 'error';
         }
      })
      .catch(() => {
         status.value = 'error';
      });
}
watch(departmentId, departmentId => {
   getDepartment(departmentId);
});
onMounted(() => {
   getDepartment(departmentId);
});
</script>
<template>
   <div class="h-full w-full">
      <template v-if="status === 'loading'">
         <Loading />
      </template>
      <template v-else-if="status === 'success'">
         <div class="flex items-center justify-between h-10 mb-5">
            <div class="flex items-center gap-3">
               <router-link
                  to="/settings/structure/departments"
                  class="p-button p-component font-semibold text-sm rounded-xl h-8 border-transparent shadow-button bg-white text-primary-900 py-[7px] px-0 text-xs w-[32px] h-[32px]"
                  v-tooltip.left="{
                     autoHide: false,
                     escape: true,
                     value: `<h4 class='text-xs text-white -my-1'>Департаменты</h4>`,
                  }"
                  >
                  <div class="flex items-center justify-center w-full">
                     <svg fill="none" viewBox="0 0 24 24" width="16" height="20" class="app-stroke-icon text-greyscale-500">
                        <path stroke="#1C274C" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m15 5-6 7 6 7">
                        </path>
                     </svg>
                  </div>
               </router-link>
               <h1 class="font-bold text-xl text-primary-900">{{ (topLevelDepartment && topLevelDepartment.name) || departmentId }}</h1>
            </div>
            <div class="flex items-center gap-2"></div>
         </div>
         <div class="flex justify-between" style="height: calc(100% - 60px)">
            <div style="width: calc(50% - 10px)" class="h-full rounded-2xl bg-white sub-departments">
               <template v-if="subDepartmentsLoading">
                  <Loading />
               </template>
               <template v-else>
                  <template v-if="subDepartments.length">
                     <div class="h-full w-full">
                        <div class="px-3 pt-3">
                           <div class="flex items-center justify-between text-md font-semibold rounded-xl px-3 py-2.5 duration-[400ms] bg-greyscale-100">
                              <span>Отдели</span>
                              <Button
                                 class="shadow-none p-0 text-xs bg-transparent rounded-full"
                                 icon
                                 severity="secondary"
                                 text
                                 @click="() => {
                                    openModal([], topLevelDepartment);
                                 }"
                                 v-tooltip.top="{
                                    autoHide: false,
                                    escape: true,
                                    value: `<h4 class='text-xs text-white -my-1'>Добавить</h4>`,
                                 }"
                                 >
                                 <svg width="22" height="22" class="mr-2" viewBox="0 0 48 48">
                                    <path fill="none" d="M0 0h48v48H0z"></path>
                                    <path fill="#635AFF" d="M26 14h-4v8h-8v4h8v8h4v-8h8v-4h-8v-8zM24 4C12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20S35.05 4 24 4zm0 36c-8.82 0-16-7.18-16-16S15.18 8 24 8s16 7.18 16 16-7.18 16-16 16z"></path>
                                 </svg>
                              </Button>
                           </div>
                        </div>
                        <div class="flex flex-col overflow-y-scroll settings-structure-departments" style="height: calc(100% - 74px)">
                           <div class="pl-3 pr-[6px] pt-2">
                              <Department
                                 :activeDepartment="activeDepartment"
                                 :department="department"
                                 :getEmployees="getEmployees"
                                 :key="index"
                                 :last="index === subDepartments.length - 1"
                                 :openModal="openModal"
                                 :parentDepartments="[]"
                                 :setActiveDepartment="setActiveDepartment"
                                 v-for="(department, index) in subDepartments"
                                 :getSubDepartments="() => {
                                    getSubDepartments(departmentId)
                                 }"
                              />
                           </div>
                        </div>
                     </div>
                  </template>
                  <template v-else>
                     <div class="flex justify-center pt-12">
                        <div class="flex flex-col items-center" style="max-width: 250px">
                           <div class="w-[48px] h-[48px]">
                              <svg width="49" height="48" viewBox="0 0 49 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                 <ellipse cx="24.5" cy="24" rx="23.5102" ry="24" fill="#F7F7F9"/>
                                 <path d="M34 24C34 29.5228 29.5228 34 24 34C18.4772 34 14 29.5228 14 24C14 18.4772 18.4772 14 24 14C29.5228 14 34 18.4772 34 24Z" fill="#ADB7C2"/>
                                 <path fill-rule="evenodd" clip-rule="evenodd" d="M24 19.25C24.4142 19.25 24.75 19.5858 24.75 20V23.6893L27.0303 25.9697C27.3232 26.2626 27.3232 26.7374 27.0303 27.0303C26.7374 27.3232 26.2626 27.3232 25.9697 27.0303L23.4697 24.5303C23.329 24.3897 23.25 24.1989 23.25 24V20C23.25 19.5858 23.5858 19.25 24 19.25Z" fill="white"/>
                              </svg>
                           </div>
                           <p class="text-center text-greyscale-300 mt-3 mb-6">В этом отделе нет подотделов. Нажмите кнопку ниже, чтобы добавить.</p>
                           <Button
                              @click="() => {
                                 createDepartment = topLevelDepartment;
                                 createVisible = true;
                                 parentDepartments = [];
                              }"
                              size="small"
                              class="rounded-lg bg-greyscale-100 text-black text-sm font-semibold border-transparent focus:border-primary-500">
                              <span class="mr-2">
                                 <svg width="24" height="24" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M10.5003 18.3307C15.1027 18.3307 18.8337 14.5998 18.8337 9.9974C18.8337 5.39502 15.1027 1.66406 10.5003 1.66406C5.89795 1.66406 2.16699 5.39502 2.16699 9.9974C2.16699 14.5998 5.89795 18.3307 10.5003 18.3307ZM11.1253 7.4974C11.1253 7.15222 10.8455 6.8724 10.5003 6.8724C10.1551 6.8724 9.87533 7.15222 9.87533 7.4974L9.87532 9.37242H8.00033C7.65515 9.37242 7.37533 9.65224 7.37533 9.99742C7.37533 10.3426 7.65515 10.6224 8.00033 10.6224H9.87532V12.4974C9.87532 12.8426 10.1551 13.1224 10.5003 13.1224C10.8455 13.1224 11.1253 12.8426 11.1253 12.4974L11.1253 10.6224H13.0003C13.3455 10.6224 13.6253 10.3426 13.6253 9.99742C13.6253 9.65224 13.3455 9.37242 13.0003 9.37242H11.1253V7.4974Z" fill="#635AFF"/>
                                 </svg>
                              </span>
                              <span>Добавить отдел</span>
                           </Button>
                        </div>
                     </div>
                  </template>
               </template>
            </div>
            <div style="width: calc(50% - 10px)" class="h-full rounded-2xl bg-white p-4 employees">
               <template v-if="employeesLoading">
                  <Loading />
               </template>
               <template v-else>
                  <template v-if="employees.length">
                     <div>Employees</div>
                  </template>
                  <template v-else>
                     <div class="flex justify-center pt-12">
                        <div class="flex flex-col items-center" style="max-width: 250px">
                           <div class="w-[48px] h-[48px]">
                              <svg width="49" height="48" viewBox="0 0 49 48" fill="none">
                                 <circle cx="24.5" cy="24" r="24" fill="#F7F7F9"/>
                                 <path d="M27.5 19.5C27.5 21.433 25.933 23 24 23C22.067 23 20.5 21.433 20.5 19.5C20.5 17.567 22.067 16 24 16C25.933 16 27.5 17.567 27.5 19.5Z" fill="#ADB7C2"/>
                                 <path d="M30 28.5C30 30.433 27.3137 32 24 32C20.6863 32 18 30.433 18 28.5C18 26.567 20.6863 25 24 25C27.3137 25 30 26.567 30 28.5Z" fill="#ADB7C2"/>
                                 <path d="M19.122 17C19.2995 17 19.4728 17.0174 19.6401 17.0506C19.2325 17.7745 19 18.6101 19 19.5C19 20.3683 19.2213 21.1848 19.6106 21.8964C19.4524 21.9258 19.2891 21.9413 19.122 21.9413C17.7076 21.9413 16.561 20.8351 16.561 19.4706C16.561 18.1061 17.7076 17 19.122 17Z" fill="#ADB7C2"/>
                                 <path d="M17.4473 30.986C16.8794 30.3071 16.5 29.474 16.5 28.5C16.5 27.5558 16.8566 26.744 17.3958 26.0767C15.4911 26.2245 14 27.2662 14 28.5294C14 29.8044 15.5173 30.8538 17.4473 30.986Z" fill="#ADB7C2"/>
                                 <path d="M28.9999 19.5C28.9999 20.3683 28.7786 21.1848 28.3893 21.8964C28.5475 21.9258 28.7108 21.9413 28.8779 21.9413C30.2923 21.9413 31.4389 20.8351 31.4389 19.4706C31.4389 18.1061 30.2923 17 28.8779 17C28.7004 17 28.5272 17.0174 28.3599 17.0506C28.7674 17.7745 28.9999 18.6101 28.9999 19.5Z" fill="#ADB7C2"/>
                                 <path d="M30.5526 30.986C32.4826 30.8538 33.9999 29.8044 33.9999 28.5294C33.9999 27.2662 32.5088 26.2245 30.6041 26.0767C31.1433 26.744 31.4999 27.5558 31.4999 28.5C31.4999 29.474 31.1205 30.3071 30.5526 30.986Z" fill="#ADB7C2"/>
                              </svg>
                           </div>
                           <p class="text-center text-greyscale-300 mt-3 mb-6">В этом отделе нет Сотрудников. Нажмите кнопку ниже, чтобы добавить.</p>
                           <Button size="small" class="rounded-lg bg-greyscale-100 text-black text-sm font-semibold border-transparent focus:border-primary-500">
                              <span class="mr-2">
                                 <svg width="24" height="24" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M10.5003 18.3307C15.1027 18.3307 18.8337 14.5998 18.8337 9.9974C18.8337 5.39502 15.1027 1.66406 10.5003 1.66406C5.89795 1.66406 2.16699 5.39502 2.16699 9.9974C2.16699 14.5998 5.89795 18.3307 10.5003 18.3307ZM11.1253 7.4974C11.1253 7.15222 10.8455 6.8724 10.5003 6.8724C10.1551 6.8724 9.87533 7.15222 9.87533 7.4974L9.87532 9.37242H8.00033C7.65515 9.37242 7.37533 9.65224 7.37533 9.99742C7.37533 10.3426 7.65515 10.6224 8.00033 10.6224H9.87532V12.4974C9.87532 12.8426 10.1551 13.1224 10.5003 13.1224C10.8455 13.1224 11.1253 12.8426 11.1253 12.4974L11.1253 10.6224H13.0003C13.3455 10.6224 13.6253 10.3426 13.6253 9.99742C13.6253 9.65224 13.3455 9.37242 13.0003 9.37242H11.1253V7.4974Z" fill="#635AFF"/>
                                 </svg>
                              </span>
                              <span>Добавить сотрудник</span>
                           </Button>
                        </div>
                     </div>
                  </template>
               </template>
            </div>
            <CreateDepartment
               :getSubDeparments="() => {
                  getSubDepartments(departmentId);
               }"
               :parent="createDepartment"
               :parentDepartments="parentDepartments"
               :setVisible="setCreateVisible"
               :topLevelDepartment="topLevelDepartment"
               :visible="createVisible"
               />
         </div>
      </template>
      <template v-else>
         <NoDepartment />
      </template>
   </div>
</template>
<style>
.settings-structure-departments::-webkit-scrollbar {
   height: 6px;
   width: 6px;
}
.settings-structure-departments::-webkit-scrollbar-track {
   border-radius: 3px;
   box-shadow: none;
}
.settings-structure-departments::-webkit-scrollbar-thumb {
   background-color: #635AFF;
   border-radius: 3px;
}
.settings-structure-departments::-webkit-scrollbar-thumb:hover {
   background-color: #635AFF;
}
</style>