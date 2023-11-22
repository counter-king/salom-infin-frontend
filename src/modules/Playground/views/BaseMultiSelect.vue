<script setup>
// Core
import { ref } from 'vue'
// Components
import BaseMultiSelect from '@/components/UI/BaseMultiSelect.vue'
import { UserWithLabel, UserWithRadio } from '@/components/Users'
// Reactive
const select = ref([])
const select2 = ref([])
// Methods
const selectItem = (value) => {
  console.log(value);
}
</script>

<template>
  <div class="flex gap-20 p-10">
    <div class="w-1/4">
      <h1 class="text-2xl font-bold mb-4">User with label</h1>

      <base-multi-select
        v-model="select"
        api-url="users"
        :token-class="['chip-hover shadow-button bg-white cursor-pointer']"
        display="chip"
        @emit:select-item="selectItem"
      >
        <template #chip="{ value }">
          <user-with-label
            :compact="true"
            :title="value.full_name"
            image="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D"
            avatar-classes="w-5 h-5"
          />
        </template>

        <template #option="{ value }">
          <user-with-label
            :compact="true"
            :title="value.full_name"
            image="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D"
            avatar-classes="w-6 h-6"
          />
        </template>

        <template #hint="{ value }">
          <user-with-label
            :title="value.full_name"
            shadow
            image="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D"
            avatar-classes="w-5 h-5"
          />
        </template>
      </base-multi-select>
    </div>

    <div class="w-1/4">
      <h1 class="text-2xl font-bold mb-4">User with radio select</h1>

      <base-multi-select
        v-model="select2"
        api-url="users"
        :token-class="['chip-hover shadow-button bg-white cursor-pointer']"
        display="chip"
        selectable
      >
        <template #chip="{ value }">
          <user-with-label
            :compact="true"
            :title="value.full_name"
            image="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D"
            avatar-classes="w-5 h-5"
          >
            <template #avatar>
              <span class="hidden"></span>
            </template>
          </user-with-label>
        </template>

        <template #option="{ value }">
          <user-with-radio
            :title="value.full_name"
          >
          </user-with-radio>
        </template>

        <template #hint="{ value }">
          <user-with-label
            :title="value.full_name"
            shadow
            image="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D"
            avatar-classes="w-5 h-5"
          >
            <template #avatar>
              <span class="hidden"></span>
            </template>
          </user-with-label>
        </template>
      </base-multi-select>
    </div>
  </div>
</template>

<style scoped>

</style>
