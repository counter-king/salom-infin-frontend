// Core
import { defineStore } from "pinia"
// Enums
import { QR_SCANNING, SUCCESS_MESSAGE } from "@/components/Toolbar/Telegram/constants"
import { COLOR_TYPES } from "@/enums"
// Utils
import { dispatchNotify } from "@/utils/notify"
// Store
import { useCommonStore } from "@/stores/common"
// Services
import {
  fetchConfirmTelegramOtp,
  fetchRequestTelegramQRCode,
  fetchUnlinkTelegram
} from "@/components/Toolbar/Telegram/telegram.service"

export const useTelegramStore = defineStore("telegramStore", {
  state: () => ({
    dialog: false,
    qrCodeLoading: false,
    qrCodeValue: null,
    qrCodeExpireTime: null,
    qrCodeTimer: '--:--',
    qrCodeInterval: null,
    requestToken: null,
    otpValue: null,
    buttonLoading: false,
    component: QR_SCANNING
  }),
  actions: {
    async actionRequestTelegramQRCode() {
      this.qrCodeLoading = true
      try {
        const {data} = await fetchRequestTelegramQRCode()
        this.qrCodeValue = data.deep_link
        this.qrCodeExpireTime = data.expires_at
        this.requestToken = data.request_token

        this.qrCodeLoading = false

        let remaining = data.expires_in || 59

        // Format helper
        const formatTime = (seconds) => {
          const m = Math.floor(seconds / 60)
          const s = seconds % 60
          return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
        }

        // Initialize countdown display
        this.qrCodeTimer = formatTime(remaining)

        // Clear any existing interval before starting new
        if (this.qrCodeInterval) clearInterval(this.qrCodeInterval)

        // Start countdown
        this.qrCodeInterval = setInterval(async () => {
          if (remaining > 0) {
            remaining -= 1
            this.qrCodeTimer = formatTime(remaining)
          } else {
            clearInterval(this.qrCodeInterval)
            await this.actionRequestTelegramQRCode() // request new QR automatically
          }
        }, 1000)
      } catch (err) {
        this.qrCodeLoading = false
        console.error(err)
      }
    },
    /** **/
    async actionConfirmTelegramOtp(){
      const body = {
        request_token: this.requestToken,
        confirmation_code: this.otpValue,
      }

      try {
        this.buttonLoading = true
        const { data } = await fetchConfirmTelegramOtp(body)
        if (data.status === 'ok') {
          this.component = SUCCESS_MESSAGE
          useCommonStore().actionTelegramProfileList()
          this.actionResetValues()
          this.actionStopQrCountdown()
        }
      } catch (err) {}
      finally {
        this.buttonLoading = false
      }
    },
    /** **/
    async actionUnlinkTelegram(t) {
      this.buttonLoading = true
      const commonStore = useCommonStore()
      const telegram_id = commonStore.telegramProfiles?.[0]?.chat_id

      try {
        await fetchUnlinkTelegram({ telegram_id })
        await commonStore.actionTelegramProfileList()
        this.actionResetValues()
        this.dialog = false
        dispatchNotify(null, t('success'), COLOR_TYPES.SUCCESS)
      } finally {
        this.buttonLoading = false
      }
    },
    /** **/
    actionStopQrCountdown() {
      if (this.qrCodeInterval) clearInterval(this.qrCodeInterval)
      this.qrCodeInterval = null
      this.qrCodeTimer = "--:--"
    },
    /** **/
    actionResetValues(){
      this.qrCodeLoading = false
      this.qrCodeValue = null
      this.qrCodeExpireTime = null
      this.qrCodeTimer = "--:--"
      this.requestToken = null
      this.otpValue = null
      this.buttonLoading = false
    }
  }
})
