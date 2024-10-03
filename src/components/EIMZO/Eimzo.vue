<script setup>
// Core
import { onMounted, ref } from "vue"
import { useI18n } from "vue-i18n"
// Utils
import { dispatchNotify } from "@/utils/notify"
// Enums
import { COLOR_TYPES, SIGNER_TYPES } from "@/enums"
// Components
import BaseDropdown from "@/components/UI/BaseDropdown.vue"
import { CheckCircleIcon } from "@/components/Icons";

// Composable
const { t } = useI18n()

const props = defineProps({
  type: {
    type: String,
    default: 'sign',
    validator(value) {
      return ['sign', 'login'].includes(value)
    }
  },
  inputClasses: {
    type: String
  },
  buttonLoading: {
    type: Boolean,
    default: false
  }
})

// Reactive
const pfxKeys = ref([])
const selectedKey = ref(null)
const keyValue = ref(null)
const loading = ref(true)
const keyIdTemp = ref(null)

// Methods
const uiAppLoad = () => {
  EIMZOClient.API_KEYS = [
    'localhost', '96D0C1491615C82B9A54D9989779DF825B690748224C2B04F500F370D51827CE2644D8D4A82C18184D73AB8530BB8ED537269603F61DB0D03D2104ABF789970B',
    '127.0.0.1', 'A7BCFA5D490B351BE0754130DF03A068F855DB4333D43921125B9CF2670EF6A40370C646B90401955E1F7BC9CDBF59CE0B2C5467D820BE189C845D0B79CFC96F',
    'salom.sqb.uz', '850FF0E4A84282419377FDC21B0F81F8F89D45F6313AE806531472908CF201629C1DDA93CDC03339F2E530ADF9CDE851BD92ED0256C3D47BD6E1DAEC49D7A833'
  ]

  EIMZOClient.listAllUserKeys(function(o, i){
    return "itm-" + o.serialNumber + "-" + i
  },function(itemId, v){
    return uiCreateItem(itemId, v)
  },function(items, firstId){
    uiFillCombo(items)
    uiLoaded()
  },function(e, r){
    if(e){
      dispatchNotify(null, e, COLOR_TYPES.ERROR)
    } else {
      dispatchNotify(null, r, COLOR_TYPES.ERROR)
    }
  })
}
const uiCreateItem = (itmkey, vo) => {
  const now = new Date()
  vo.expired = dates.compare(now, vo.validTo) > 0
  const itm = document.createElement("option")
  itm.value = itmkey
  itm.text = vo.CN
  if (!vo.expired) {

  } else {
    itm.style.color = 'gray'
    itm.text = itm.text + ' (срок истек)'
  }
  itm.setAttribute('vo',JSON.stringify(vo))
  itm.setAttribute('id',itmkey)
  return itm
}
const uiFillCombo = (items) => {
  if (items.length) {
    for (const item in items) {
      pfxKeys.value.push({
        name: items[item].text,
        value: items[item].value,
        option: items[item]
      })
    }
    selectedKey.value = pfxKeys.value[0]
    keyValue.value = pfxKeys.value[0].option
  }
}
const uiLoaded = () => {
  loading.value = false
}
const onKeyChange = (item) => {
  keyValue.value = item.option
  keyIdTemp.value = null
}
const getPkcs7 = () => {
  if (pfxKeys.value.length && selectedKey.value) {
    const itm = keyValue.value
    if (itm) {
      const vo = JSON.parse(itm.getAttribute('vo'))
      const data = 'Sample Data'
      const keyId = keyIdTemp.value
      if (keyId) {
        EIMZOClient.createPkcs7(keyId, data, null, (pkcs7) => {
          emit('emit:onGetPkcs7', pkcs7)
        }, (e, r) => {
          if (r) {
            if (r.indexOf("BadPaddingException") !== -1) {
              dispatchNotify(null, 'Пароль неверный', COLOR_TYPES.ERROR)
            } else {
              dispatchNotify(null, r, COLOR_TYPES.WARNING)
            }
          } else {
            dispatchNotify(null, t('error-2'), COLOR_TYPES.WARNING)
          }
        })
      } else {
        EIMZOClient.loadKey(vo, (id) => {
          keyIdTemp.value = id
          EIMZOClient.createPkcs7(id, data, null, (pkcs7) => {
            emit('emit:onGetPkcs7', pkcs7)
          }, (e, r) => {
            if (r) {
              if (r.indexOf("BadPaddingException") !== -1) {
                dispatchNotify(null, 'Пароль неверный', COLOR_TYPES.ERROR)
              } else {
                dispatchNotify(null, r, COLOR_TYPES.WARNING)
              }
            } else {
              dispatchNotify(null, t('error-2'), COLOR_TYPES.WARNING)
            }
          })
        })
      }
    }
  } else {
    dispatchNotify(null, t('select-pfx'), COLOR_TYPES.WARNING)
  }
}

// Hooks
onMounted(() => {
  uiAppLoad()
})

const emit = defineEmits(['emit:onGetPkcs7'])
</script>

<template>
  <div
    class="e-imzo-component"
    :class="props.type === 'sign' ? 'flex gap-x-2 justify-end w-fit' : 'w-full'"
  >
    <base-dropdown
      v-model="selectedKey"
      v-model:options="pfxKeys"
      option-label="name"
      placeholder="Выбрать"
      :show-clear="false"
      :root-class="props.inputClasses"
      @emit:change="(val) => onKeyChange(val)"
    />

    <base-button
      v-if="props.type === 'sign'"
      border-color="border-transparent"
      label="sign"
      :icon-left="CheckCircleIcon"
      icon-height="!w-4"
      icon-width="!h-4"
      rounded
      shadow
      type="button"
      :loading="props.buttonLoading"
      @click="getPkcs7"
    />

    <base-button
      v-if="props.type === 'login'"
      label="enter-via-eri"
      size="large"
      shadow
      rounded
      :loading="props.buttonLoading"
      class="w-full mt-4"
      @click="getPkcs7"
    >
    </base-button>

  </div>
</template>

<style scoped>

</style>
