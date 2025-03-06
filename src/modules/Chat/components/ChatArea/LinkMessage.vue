<script setup>
import { MESSAGE_TYPES } from '../../constatns';

// cores
const props = defineProps({
 message: {
  type: Object
 },
 type: {
  type: String,
  default: 'owner',
  validator: (value) => {
    return ['owner', 'friend'].includes(value);
  } 
  }
})

// https:// or http:// regular  pattern 
const urlRegex = /(^|\s)(https?:\/\/[^\s]+)/g;
const messageSplitArray = props.message?.text?.split(urlRegex);
const formattedMessageSplitArray = []

messageSplitArray.forEach((item) => {
    const isValidPattern = urlRegex.test(item);
    if (isValidPattern) {
        formattedMessageSplitArray.push({
            type: MESSAGE_TYPES.LINK,
            content: item
        })        
    }
    else {
        formattedMessageSplitArray.push({
            type: MESSAGE_TYPES.TEXT,
            content: item
        })
    }
})

</script>
<template>
 <template v-for="(item, index) in formattedMessageSplitArray" :key="index">
    <template v-if="item.type == MESSAGE_TYPES.LINK">
      <a class="underline cursor-pointer" :class="{'text-primary-500': type == 'friend'}"  :href="item.content" target="_blank"> {{ item.content }} </a>
    </template>
    <template v-else>
        {{ item.content }}
    </template>
 </template>   
</template>