<script setup>
// Core
import {computed, ref} from "vue";
import {useI18n} from "vue-i18n";
import Timeline from 'primevue/timeline';
import {formatDateHour} from "../../../utils/formatDate";
import {ModalComment} from "@/components/Modal";

const properties = defineProps({
  composeModel: {
    type: Object,
    default: () => {},
    required: true
  }
})

const { t } = useI18n();
const reason = ref("");
const reasonModal = ref(false);

// Computed
const signingProcessComputed = computed(() => {
  if (!(properties.composeModel && properties.composeModel.approvers && properties.composeModel.signers)) {
    return [];
  }
  const author = { user: properties.composeModel.author, type: "author" };
  const approvers = properties.composeModel.approvers.map(item => ({ ...item, type: "approvers" }));
  const signers = properties.composeModel.signers.map(item => ({ ...item, type: "signers" }));

  return [author, ...approvers, ...signers];
});

// Methods
const returnConnectorClasses = (props, context) => {
  return props.value[context.index].type === "author"
    || (props.value[context.index].type === "approvers" && props.value[context.index].is_approved === true)
      || (props.value[context.index].type === "signers" && props.value[context.index].is_signed === true)
        ? 'bg-success-500' :
          (props.value[context.index].type === "approvers" && props.value[context.index].is_approved === false)
            || (props.value[context.index].type === "signers" && props.value[context.index].is_signed === false)
             ? 'bg-critic-500' : ''
}
const returnItemIcon = (item) => {
  return item.type === 'author' ? 'PenIcon' : item.type === 'signers' ? 'CheckCircleIcon' : 'FileCheckIcon'
}
const returnItemRole = (item) => {
  return item.type === 'author' ? t('author') : item.type === 'signers' ? t('signer') : t('approver')
}
const returnItemActionTime = (item) => {
  if (item.type === 'author') {
    return formatDateHour(properties.composeModel.created_date)
  } else {
    return item.action_date ? formatDateHour(item.action_date) : null
  }
}
const returnItemActionValue = (item) => {
  return item.type === 'author' ? t('author')
    : (item.type === 'approvers' && item.is_approved === true) ? t('agree')
      : (item.type === 'approvers' && item.is_approved === false) ? t('not-agree')
        : (item.type === 'approvers' && item.is_approved === null) ? t('not-checked')
          : (item.type === 'signers' && item.is_signed === true) ? t('signed')
            : (item.type === 'signers' && item.is_signed === false) ? t('rejected')
              : t('not-checked');
}
const returnItemActionClass = (item) => {
  return item.type === 'author'
    || (item.type === 'approvers' && item.is_approved === true)
      || (item.type === 'signers' && item.is_signed === true)
         ? 'text-success-500 bg-success-50 border-success-100' :
          (item.type === 'approvers' && item.is_approved === false)
            || (item.type === 'signers' && item.is_signed === false)
              ? 'text-critic-500 bg-critic-50 border-critic-100'
                : 'text-greyscale-500 bg-greyscale-50 border-greyscale-100'
}
const returnItemClass = (item) => {
  return item.type === 'author'
    || (item.type === 'approvers' && item.is_approved === true)
      || (item.type === 'signers' && item.is_signed === true)
        ? 'border-success-100' :
          (item.type === 'approvers' && item.is_approved === false)
            || (item.type === 'signers' && item.is_signed === false)
              ? 'border-critic-100'
                : 'border-greyscale-100'
}
const returnItemIconName = (item) => {
  return item.type === 'author'
    || (item.type === 'approvers' && item.is_approved === true)
      || (item.type === 'signers' && item.is_signed === true)
       ? 'CheckCircleFilledIcon' :
        (item.type === 'approvers' && item.is_approved === false)
          || (item.type === 'signers' && item.is_signed === false)
           ? 'CloseCircleFilledIcon' : 'Circle'
}
const returnItemIconClass = (item) => {
  return item.type === 'author'
    || (item.type === 'approvers' && item.is_approved === true)
      || (item.type === 'signers' && item.is_signed === true)
        ? 'text-success-500' :
          (item.type === 'approvers' && item.is_approved === false)
          || (item.type === 'signers' && item.is_signed === false)
            ? 'text-critic-500' : 'text-white'
}
const showReason = (item) => {
	reason.value = item.comment;
	reasonModal.value = true;
}
</script>

<template>
  <div class="signing-process bg-greyscale-50 rounded-xl p-6 overflow-y-auto" style="max-height: calc(100vh - 300px)">
    <Timeline
      v-if="properties.composeModel"
      :value="signingProcessComputed"
      :pt="{
        opposite: { class: [ 'hidden' ] },
        connector: ({ props, context }) => (
          { class: [returnConnectorClasses(props, context)] }
        )
      }"
    >
      <template #marker="{ item }">
        <base-icon
          :name="returnItemIconName(item)"
          width="24"
          height="24"
          :stroke="false"
          :class="returnItemIconClass(item)"
        />
      </template>

      <template #content="{ item }">
        <div
          class="flex p-5 rounded-xl bg-white mb-3 border"
          :class="returnItemClass(item)"
        >
          <div class="user-avatar relative">
            <base-avatar
              :label="item?.user.first_name"
              :color="item?.user.color"
              shape="circle"
              avatar-classes="w-10 h-10"
            />
            <div
              class="absolute left-6 top-6 border-2 rounded-3xl border-white p-1"
              :class="item.type === 'signers' && !item.is_all_approved ? 'bg-greyscale-300' : 'bg-success-500'"
            >
              <base-icon
                :name="item.type === 'signers' && !item.is_all_approved ? 'EyeHideIcon' : 'EyeIcon'"
                width="12"
                height="12"
                class="text-white"
              />
            </div>
          </div>

          <div class="flex flex-col ml-3 w-full">
            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <base-icon
                  :name="returnItemIcon(item)"
                  width="16"
                  height="16"
                  class="text-greyscale-500"
                  :stroke="item.type !== 'approvers'"
                />
                <span class="text-sm font-semibold text-primary-500 mx-2">{{ returnItemRole(item) }}</span>
                <div class="w-[6px] h-[6px] bg-greyscale-300 rounded-lg"></div>
                <span class="text-sm font-medium text-greyscale-300 block ml-2">{{ returnItemActionTime(item) }}</span>
              </div>

	            <div class="flex items-center">
		            <div
			            v-if="(item.is_approved === false || item.is_signed === false) && item.comment"
			            class="flex text-xs px-2 py-[2px] rounded-lg border bg-greyscale-50 mr-2 cursor-pointer"
			            @click="showReason(item)"
		            >
			            <base-icon name="HorizontalDotsIcon" width="16" height="16" :stroke="false" class="text-greyscale-500" />
			            <span class="ml-1 text-greyscale-500 font-medium">{{ t('reason') }}</span>
		            </div>

		            <div
			            class="text-xs font-semibold px-2 py-[2px] rounded-lg border"
			            :class="returnItemActionClass(item)"
		            >
			            {{ returnItemActionValue(item) }}
		            </div>
	            </div>
            </div>

            <div class="text-sm font-semibold text-greyscale-900 mt-1">
              {{ item?.user.full_name }}
            </div>
          </div>
        </div>
<!--        <pre>{{ item }}</pre>-->
      </template>
    </Timeline>
  </div>

	<!-- REASON MODAL -->
	<modal-comment
		v-model="reasonModal"
		header-text="reject-reason"
		editor-type="comment"
		max-width="max-w-[750px]"
		:editor-value="reason"
		:footer="false"
	/>
	<!-- /REASON TEXT MODAL -->
</template>

<style scoped>

</style>
