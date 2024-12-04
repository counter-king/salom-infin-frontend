<script setup>
// Core
import { useI18n } from 'vue-i18n';
import { ref } from 'vue';
// Components
import BaseButton from '@/components/UI/BaseButton.vue';
import Textarea from 'primevue/textarea';
import UserCard from '../../components/UserCard.vue';
import Divider from '@/components/Divider';
import { AltArrowDownIcon, AltArrowUpIcon } from '@/components/Icons';

// internalization
const { t } = useI18n()

// props
const props = defineProps({
    isButtonLoading: {
        type: Boolean,
        default: false
    },
    data: {
        type: Object,
        default: () => ({})
    },
    replayTo: {
        type: Object,
        default: () => ({})
    },
    isDiveiderVisible: {
        type: Boolean,
        default: false
    }
})

// emits
const emits = defineEmits(['emit:replay-comment'])
// reactive 
const toggleComment = ref(false);
const replayCommmenValue = ref('');
const replayCommentVisible = ref(false);
// methods
const handleReplayCommentRecursive = (value,replay) => {
    emits('emit:replay-comment', value, replay)
    replayCommmenValue.value = '';
    replayCommentVisible.value = false;
}
const handleReplayComment = () => {
    emits('emit:replay-comment', replayCommmenValue.value, props.data?.id)
    replayCommmenValue.value = '';
    replayCommentVisible.value = false;

}
</script>
<template>
    <div class="py-5">
        <!-- user info -->
        <user-card  
             :avatar-color="props.data?.created_by?.color" 
             :name="props.data?.created_by?.full_name"
             :created-date="props.data?.created_date" />
        <div class="ml-[52px] mt-4 relative">
            <!-- commment info -->
            <p class="text-lg font-medium text-greyscale-800">
                <template v-if="props.replayTo?.id && props.replayTo.id !== props.data?.replied_to.id">
                    <span class="text-primary-500 font-semibold cursor-pointer">
                    @{{ props.data.replied_to.created_by.full_name}} 
                    </span>
                    {{ props.data?.comment }}
                </template>
                <template v-else>
                    {{ props.data?.comment }}
                </template>
            </p>
            <div class="flex gap-[10px] mt-4">
                <base-button 
                    v-if="!!props.data?.replies?.length"
                    :iconRight="toggleComment ? AltArrowUpIcon : AltArrowDownIcon"
                    @click="toggleComment = !toggleComment"
                    iconWidth="!w-4"
                    iconHeight="!h-4"
                    iconColor="text-primary-500"
                    :label="t('answers')" 
                    class="px-3 py-1 rounded-[80px] bg-greyscale-50 text-sm font-medium text-greyscale-900 border-none focus:shadow-none focus:outline-none" 
                    >
                    <template #badge>
                        <div class="ml-1 w-5 h-5 min-w-5 min-h-5 rounded-full text-primary-500 bg-white flex justify-center items-center text-xs font-semibold">{{props.data?.replies?.length}}</div>
                    </template>
                </base-button>
                <base-button 
                    @click="replayCommentVisible = !replayCommentVisible"
                    :label="t('answer')" 
                    class="px-3 py-1 rounded-[80px] bg-greyscale-50 text-sm font-medium text-greyscale-900 border-none focus:shadow-none focus:outline-none"  />
            </div>
            <div class="ml-[104px] mt-2 relative" :class="{'hidden': !replayCommentVisible}">
                <!-- comment replay -->
                <Textarea 
                    :disabled="props.isButtonLoading"
                    v-model="replayCommmenValue"
                    :placeholder="t('enter-answer') + '...'"
                    :pt="{
                        root: { 
                        class: [
                            'w-full text-[14px] min-h-[123px] rounded-2xl bg-primary-50 text-greyscale-400'
                        ]
                        }
                    }"/>
                    <base-button
                    :loading="props.isButtonLoading"  
                    :label="t('send')" 
                    :disabled="!replayCommmenValue"
                    @click="handleReplayComment"
                    button-class="absolute bottom-4 right-4"
                    />
             </div>
             <divider v-if="isDiveiderVisible" class="mt-5"/>
             <template v-if="toggleComment">
                 <view-replay-comment 
                    v-for="(reply, index) in props.data?.replies"
                    :key="reply.id"
                    :data="reply"
                    @emit:replay-comment="handleReplayCommentRecursive" 
                    :replay-to="props.data"
                    :isDiveiderVisible="true"
                 />
            </template>
        </div>
    </div>
</template>

<style></style>
