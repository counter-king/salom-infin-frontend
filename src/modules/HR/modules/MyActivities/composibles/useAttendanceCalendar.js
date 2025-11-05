import { useI18n } from 'vue-i18n'
import dayjs from 'dayjs'
import { USER_STATUS_CODES } from '@/enums'

export function useAttendanceCalendar(calendarDaysWithAttendance) {
  const { t, locale } = useI18n()

  // methods
const getCellMergeRangeClass = (index) => {
    // ================================================================
    // BOSHLANG'ICH MA'LUMOTLAR VA ERTA TO'XTATISH SHARTLARI
    // ================================================================
    const currentValue = calendarDaysWithAttendance.value[index]
    const startIndex = index
    let endIndex = index
    let endIndexLaborLeave = index  // LABOR_LEAVE uchun alohida indeks (weekend'larni qo'shadi)
    
    // ERTA TO'XTATISH: Agar hozirgi kun WORKERS yoki dam olish kuni bo'lsa
    // Va agar LABOR_LEAVE emas va dam olish kuni bo'lsa, hech narsa qaytarmaymiz
    if((currentValue.attendance?.type == USER_STATUS_CODES.WORKERS || !currentValue?.workDay) && 
       (currentValue.attendance?.type != USER_STATUS_CODES.LABOR_LEAVE && !currentValue.workDay)) {
      return '';  // Bo'sh string - hujayra birlashtirilmaydi
    }
    
    const previousValue = calendarDaysWithAttendance.value[index - 1]
  
    // ================================================================
    // YORDAMCHI FUNKSIYA: Weekend orqali davom etishni tekshirish
    // ================================================================
    /**
     * Berilgan indeksdan keyin 2 ta dam olish kuni va undan keyin
     * bir xil type bor ekanligini tekshiradi
     * Misol: [type_A, WEEKEND, WEEKEND, type_A]
     */
    const IsAfterEndIndexDayTwoDaysDayOffAndNextDayHasTheSameTypeF = (endIndex)=> {
      return !calendarDaysWithAttendance.value[endIndex + 1]?.workDay      // +1: dam olish
          && !calendarDaysWithAttendance.value[endIndex + 2]?.workDay      // +2: dam olish
          && calendarDaysWithAttendance.value[endIndex + 3]?.attendance?.type == currentValue.attendance?.type  // +3: bir xil type
    }
    
    // ================================================================
    // 1-QADAM: Oxirgi indeksni topish (LABOR_LEAVE va boshqa type'lar uchun)
    // ================================================================
    
    // LABOR_LEAVE uchun maxsus mantiq
    if(currentValue.attendance?.type == USER_STATUS_CODES.LABOR_LEAVE) {
      // Agar oldingi kun ham LABOR_LEAVE bo'lsa, hujayra allaqachon birlashtirilgan
      // Shuning uchun biz bu yerda hech narsa ko'rsatmaymiz
      if(previousValue?.workDay && previousValue?.attendance?.type == currentValue?.attendance?.type) {
        return '';  // Bu hujayra oldingi merge'ning davomi
      }
      else {
        // LABOR_LEAVE uchun oxirgi kunni topish
        // Weekend'larni ham hisobga oladi
        for(let i = startIndex + 1; i < calendarDaysWithAttendance.value.length; i++) {
          // Agar weekend orqali davom etsa
          if(IsAfterEndIndexDayTwoDaysDayOffAndNextDayHasTheSameTypeF(i)) { 
            endIndexLaborLeave = i + 2;  // Weekend'larni qo'shib
            endIndex = i;                // Oddiy indeks weekend'siz
            break;
          }
          // Oddiy ketma-ket LABOR_LEAVE kunlar
          if(calendarDaysWithAttendance.value[i].attendance?.type == currentValue.attendance?.type) {
            endIndex = i;
          }
          else {
            break  // Boshqa type topilsa to'xtatish
          }
        }
      }
    } 
    // BOSHQA TYPE'LAR uchun mantiq
    else {
      // Agar oldingi kun bir xil type bo'lsa, merge allaqachon boshlangan
      // Shuning uchun bu yerda hech narsa ko'rsatmaymiz
      if(previousValue?.attendance?.type == currentValue?.attendance?.type) {
        return '';  // Dublikat ko'rsatishni oldini olish
      }
      else {
        // Oddiy ketma-ket kunlarni topish (faqat ish kunlari)
        for(let i = startIndex + 1; i < calendarDaysWithAttendance.value.length; i++) {
          if(!!currentValue.attendance && 
             calendarDaysWithAttendance.value[i].attendance?.type == currentValue.attendance?.type && 
             calendarDaysWithAttendance.value[i]?.workDay) {
            endIndex = i
          }
          else {
            break  // Boshqa type yoki dam olish kuni
          }
        }
      }
    }
  
    // ================================================================
    // 2-QADAM: Maxsus holatlarni aniqlash
    // ================================================================
    
    // HOLAT 1: Keyingi weekend orqali davom etish
    const IsAfterEndIndexDayTwoDaysDayOffAndNextDayHasTheSameType = 
      !calendarDaysWithAttendance.value[endIndex + 1]?.workDay 
      && !calendarDaysWithAttendance.value[endIndex + 2]?.workDay 
      && calendarDaysWithAttendance.value[endIndex + 3]?.attendance?.type == currentValue.attendance?.type
    
    // HOLAT 2: Oldingi weekend orqali davom etish
    const isBeforeStartIndexDayTwoDaysDayOffAndPreviousDayHasTheSameType = 
      !calendarDaysWithAttendance.value[startIndex - 1]?.workDay 
      && !calendarDaysWithAttendance.value[startIndex - 2]?.workDay 
      && calendarDaysWithAttendance.value[startIndex - 3]?.attendance?.type == currentValue.attendance?.type
    
    // HOLAT 3: Ikkala tarafdan ham weekend orqali davom etish
    const IsBothCodition = IsAfterEndIndexDayTwoDaysDayOffAndNextDayHasTheSameType && 
                           isBeforeStartIndexDayTwoDaysDayOffAndPreviousDayHasTheSameType
    
    let inlineStyle = {}
  
    // ================================================================
    // 3-QADAM: Style'larni hisoblash (turli holatlar uchun)
    // ================================================================
  
    // ----------------------------------------------------------------
    // HOLAT 1: Ikkala tarafdan weekend bilan (LABOR_LEAVE)
    // ----------------------------------------------------------------
    // Misol: LABOR [weekend] LABOR [weekend] LABOR
    //               ^------ hozirgi kun (o'rtada) ------^
    if(IsBothCodition && currentValue.attendance?.type == USER_STATUS_CODES.LABOR_LEAVE){
      // Width: Necha kun birlashtirilyapti (weekend'lar bilan)
      const width = 100*(endIndexLaborLeave - startIndex + 1)  // Foiz (%)
      const extraWidth = 32*(endIndexLaborLeave - startIndex) + 52  // Pixel (px) qo'shimcha
      
      // Left: Badge qayerdan boshlanadi
      const left = 50*(endIndexLaborLeave - startIndex)  // Foiz (%)
      const extraLeft = 16*(endIndexLaborLeave - startIndex) + 3  // Pixel (px) qo'shimcha
      
      // Type bo'yicha rang va stil
      const getMatchStyleForType = ()=> {
        switch(currentValue?.attendance?.type) {
          case USER_STATUS_CODES.LABOR_LEAVE: {
            return {
              width: `calc(${width}% + ${extraWidth}px)`,
              left: `calc(${left}% + ${extraLeft}px)`,
              backgroundColor: 'var(--info-100)',    // Och ko'k
              borderColor: 'var(--info-200)',
              borderRadius: '0px',                    // O'rtada - burchaklar yo'q
              borderLeftWidth: '0px',                 // Chap border yo'q
              borderRightWidth: '0px',                // O'ng border yo'q
            }
          }
          case USER_STATUS_CODES.NO_CONTENT: {
            return {
              width: `calc(${width}% + ${extraWidth}px)`,
              left: `calc(${left}% + ${extraLeft}px)`,
              backgroundColor: 'var(--warning-100)',  // Sariq
              borderColor: 'var(--warning-200)',
              borderRadius: '0px',
              borderLeftWidth: '0px',
              borderRightWidth: '0px',
            }
          }
          case USER_STATUS_CODES.SICK_LEAVES: {
            return {
              width: `calc(${width}% + ${extraWidth}px)`,
              left: `calc(${left}% + ${extraLeft}px)`,
              backgroundColor: 'var(--critic-30)',   // Qizil
              borderColor: 'var(--critic-100)',
              borderRadius: '0px',
              borderLeftWidth: '0px',
              borderRightWidth: '0px',
            }
          }
          case USER_STATUS_CODES.BUSINESS_TRIP: {
            return {
              width: `calc(${width}% + ${extraWidth}px)`,
              left: `calc(${left}% + ${extraLeft}px)`,
              backgroundColor: 'var(--greyscale-100)',  // Kulrang
              borderColor: 'var(--greyscale-200)',
              borderRadius: '0px',
              borderLeftWidth: '0px',
              borderRightWidth: '0px',
            }
          }
          default: {
            return {
              width: `calc(${width}% + ${extraWidth}px)`,
              left: `calc(${left}% + ${extraLeft}px)`,
              backgroundColor: 'var(--warning-100)',
              borderColor: 'var(--warning-200)',
              borderRadius: '0px',
              borderLeftWidth: '0px',
              borderRightWidth: '0px',
            }
          }
        }
      }
      inlineStyle = getMatchStyleForType()
    }
    
    // ----------------------------------------------------------------
    // HOLAT 2: Ikkala tarafdan weekend bilan (BOSHQA TYPE'LAR)
    // ----------------------------------------------------------------
    // LABOR_LEAVE emas, lekin ikkala tarafdan weekend orqali davom etadi
    else if(IsBothCodition){
      const width = 100*(endIndex - startIndex + 1)
      const extraWidth = 32*(endIndex - startIndex) + 36
      const left = 50*(endIndex - startIndex)
      const extraLeft = 16*(endIndex - startIndex) + 3
      
      const getMatchStyleForType = ()=> {
        // ... bir xil switch-case mantiq ...
        switch(currentValue.attendance.type) {
          case USER_STATUS_CODES.LABOR_LEAVE: {
            return {
              width: `calc(${width}% + ${extraWidth}px)`,
              left: `calc(${left}% + ${extraLeft}px)`,
              backgroundColor: 'var(--info-100)',
              borderColor: 'var(--info-200)',
              borderRadius: '0px',
              borderLeftWidth: '0px',
              borderRightWidth: '0px',
            }
          }
          case USER_STATUS_CODES.NO_CONTENT: {
            return {
              width: `calc(${width}% + ${extraWidth}px)`,
              left: `calc(${left}% + ${extraLeft}px)`,
              backgroundColor: 'var(--warning-100)',
              borderColor: 'var(--warning-200)',
              borderRadius: '0px',
              borderLeftWidth: '0px',
              borderRightWidth: '0px',
            }
          }
          case USER_STATUS_CODES.SICK_LEAVES: {
            return {
              width: `calc(${width}% + ${extraWidth}px)`,
              left: `calc(${left}% + ${extraLeft}px)`,
              backgroundColor: 'var(--critic-30)',
              borderColor: 'var(--critic-100)',
              borderRadius: '0px',
              borderLeftWidth: '0px',
              borderRightWidth: '0px',
            }
          }
          case USER_STATUS_CODES.BUSINESS_TRIP: {
            return {
              width: `calc(${width}% + ${extraWidth}px)`,
              left: `calc(${left}% + ${extraLeft}px)`,
              backgroundColor: 'var(--greyscale-100)',
              borderColor: 'var(--greyscale-200)',
              borderRadius: '0px',
              borderLeftWidth: '0px',
              borderRightWidth: '0px',
            }
          }
          default: {
            return {
              width: `calc(${width}% + ${extraWidth}px)`,
              left: `calc(${left}% + ${extraLeft}px)`,
              backgroundColor: 'var(--warning-100)',
              borderColor: 'var(--warning-200)',
              borderRadius: '0px',
              borderLeftWidth: '0px',
              borderRightWidth: '0px',
            }
          }
        }
      }
      inlineStyle = getMatchStyleForType()
    }
    
    // ----------------------------------------------------------------
    // HOLAT 3: Faqat o'ng tarafdan weekend bilan (LABOR_LEAVE)
    // ----------------------------------------------------------------
    // Misol: LABOR LABOR [weekend] LABOR
    //        ^---- boshlanadi -----^
    else if(IsAfterEndIndexDayTwoDaysDayOffAndNextDayHasTheSameType && 
            currentValue.attendance?.type == USER_STATUS_CODES.LABOR_LEAVE){
      const width = 100 *(endIndexLaborLeave - startIndex + 1)
      const extraWidth = 32*(endIndexLaborLeave - startIndex) + 36
      const left = 50*(endIndexLaborLeave - startIndex)
      const extraLeft = 16*(endIndexLaborLeave - startIndex) + 20
  
      const getMatchStyleForType = ()=> {
        switch(currentValue.attendance.type) {
          case USER_STATUS_CODES.LABOR_LEAVE: {
            return {
              width: `calc(${width}% + ${extraWidth}px)`,
              left: `calc(${left}% + ${extraLeft}px)`,
              backgroundColor: 'var(--info-100)',
              borderColor: 'var(--info-200)',
              borderTopRightRadius: '0px',    // O'ng burchaklar yo'q
              borderBottomRightRadius: '0px',  // Chunki weekend'dan keyin davom etadi
              borderRightWidth: '0px',
            }
          }
          case USER_STATUS_CODES.NO_CONTENT: {
            return {
              width: `calc(${width}% + ${extraWidth}px)`,
              left: `calc(${left}% + ${extraLeft}px)`,
              backgroundColor: 'var(--warning-100)',
              borderColor: 'var(--warning-200)',
              borderTopRightRadius: '0px',
              borderBottomRightRadius: '0px',
              borderRightWidth: '0px',
            }
          }
          case USER_STATUS_CODES.SICK_LEAVES: {
            return {
              width: `calc(${width}% + ${extraWidth}px)`,
              left: `calc(${left}% + ${extraLeft}px)`,
              backgroundColor: 'var(--critic-30)',
              borderColor: 'var(--critic-100)',
              borderTopRightRadius: '0px',
              borderBottomRightRadius: '0px',
              borderRightWidth: '0px',
            }
          }
          case USER_STATUS_CODES.BUSINESS_TRIP: {
            return {
              width: `calc(${width}% + ${extraWidth}px)`,
              left: `calc(${left}% + ${extraLeft}px)`,
              backgroundColor: 'var(--greyscale-100)',
              borderColor: 'var(--greyscale-200)',
              borderTopRightRadius: '0px',
              borderBottomRightRadius: '0px',
              borderRightWidth: '0px'
            }
          }
          default: {
            return {
              width: `calc(${width}% + ${extraWidth}px)`,
              left: `calc(${left}% + ${extraLeft}px)`,
              backgroundColor: 'var(--warning-100)',
              borderColor: 'var(--warning-200)',
              borderTopRightRadius: '0px',
              borderBottomRightRadius: '0px',
              borderRightWidth: '0px',
            }
          }
        }
      }
      inlineStyle = getMatchStyleForType()
    } 
    
    // ----------------------------------------------------------------
    // HOLAT 4: Faqat o'ng tarafdan weekend bilan (BOSHQA TYPE'LAR)
    // ----------------------------------------------------------------
    else if(IsAfterEndIndexDayTwoDaysDayOffAndNextDayHasTheSameType){
      const width = 100 *(endIndex - startIndex + 1)
      const extraWidth = 32*(endIndex - startIndex) + 16 
      const left = 50*(endIndex - startIndex)
      const extraLeft = 16*(endIndex - startIndex) + 10
  
      const getMatchStyleForType = ()=> {
        // ... bir xil switch-case, lekin turli width/left qiymatlari
        switch(currentValue.attendance.type) {
          case USER_STATUS_CODES.LABOR_LEAVE: {
            return {
              width: `calc(${width}% + ${extraWidth}px)`,
              left: `calc(${left}% + ${extraLeft}px)`,
              backgroundColor: 'var(--info-100)',
              borderColor: 'var(--info-200)',
              borderTopRightRadius: '0px',
              borderBottomRightRadius: '0px',
              borderRightWidth: '0px',
            }
          }
          case USER_STATUS_CODES.NO_CONTENT: {
            return {
              width: `calc(${width}% + ${extraWidth}px)`,
              left: `calc(${left}% + ${extraLeft}px)`,
              backgroundColor: 'var(--warning-100)',
              borderColor: 'var(--warning-200)',
              borderTopRightRadius: '0px',
              borderBottomRightRadius: '0px',
              borderRightWidth: '0px',
            }
          }
          case USER_STATUS_CODES.SICK_LEAVES: {
            return {
              width: `calc(${width}% + ${extraWidth}px)`,
              left: `calc(${left}% + ${extraLeft}px)`,
              backgroundColor: 'var(--critic-30)',
              borderColor: 'var(--critic-100)',
              borderTopRightRadius: '0px',
              borderBottomRightRadius: '0px',
              borderRightWidth: '0px',
            }
          }
          case USER_STATUS_CODES.BUSINESS_TRIP: {
            return {
              width: `calc(${width}% + ${extraWidth}px)`,
              left: `calc(${left}% + ${extraLeft}px)`,
              backgroundColor: 'var(--greyscale-100)',
              borderColor: 'var(--greyscale-200)',
              borderTopRightRadius: '0px',
              borderBottomRightRadius: '0px',
              borderRightWidth: '0px'
            }
          }
          default: {
            return {
              width: `calc(${width}% + ${extraWidth}px)`,
              left: `calc(${left}% + ${extraLeft}px)`,
              backgroundColor: 'var(--warning-100)',
              borderColor: 'var(--warning-200)',
              borderTopRightRadius: '0px',
              borderBottomRightRadius: '0px',
              borderRightWidth: '0px',
            }
          }
        }
      }
      inlineStyle = getMatchStyleForType()
    }
    
    // ----------------------------------------------------------------
    // HOLAT 5: Faqat chap tarafdan weekend bilan
    // ----------------------------------------------------------------
    // Misol: [weekend] LABOR LABOR LABOR
    //                  ^---- boshlanadi (lekin chap tarafda weekend bor)
    else if(isBeforeStartIndexDayTwoDaysDayOffAndPreviousDayHasTheSameType && currentValue.workDay) {
      const width = 100*(endIndex - startIndex + 1)
      const extraWidth = 32*(endIndex - startIndex) + 24
      const left = 50*(endIndex - startIndex)
      const extraLeft = 16*(endIndex - startIndex) - 8  // Manfiy qiymat - chapga surish
      
      const getMatchStyleForType = ()=> {
        switch(currentValue.attendance.type) {
          case USER_STATUS_CODES.LABOR_LEAVE: {
            return {
              width: `calc(${width}% + ${extraWidth}px)`,
              left: `calc(${left}% + ${extraLeft}px)`,
              backgroundColor: 'var(--info-100)',
              borderColor: 'var(--info-200)',
              borderTopLeftRadius: '0px',     // Chap burchaklar yo'q
              borderBottomLeftRadius: '0px',   // Chunki weekend'dan oldin davom etgan
              borderLeftWidth: '0px',
            }
          }
          case USER_STATUS_CODES.NO_CONTENT: {
            return {
              width: `calc(${width}% + ${extraWidth}px)`,
              left: `calc(${left}% + ${extraLeft}px)`,
              backgroundColor: 'var(--warning-100)',
              borderColor: 'var(--warning-200)',
              borderTopLeftRadius: '0px',
              borderBottomLeftRadius: '0px',
              borderLeftWidth: '0px',
            }
          }
          case USER_STATUS_CODES.SICK_LEAVES: {
            return {
              width: `calc(${width}% + ${extraWidth}px)`,
              left: `calc(${left}% + ${extraLeft}px)`,
              backgroundColor: 'var(--critic-30)',
              borderColor: 'var(--critic-100)',
              borderTopLeftRadius: '0px',
              borderBottomLeftRadius: '0px',
              borderLeftWidth: '0px',
            }
          }
          case USER_STATUS_CODES.BUSINESS_TRIP: {
            return {
              width: `calc(${width}% + ${extraWidth}px)`,
              left: `calc(${left}% + ${extraLeft}px)`,
              backgroundColor: 'var(--greyscale-100)',
              borderColor: 'var(--greyscale-200)',
              borderTopLeftRadius: '0px',
              borderBottomLeftRadius: '0px',
              borderLeftWidth: '0px',
            }
          }
          default: {
            return {
              width: `calc(${width}% + ${extraWidth}px)`,
              left: `calc(${left}% + ${extraLeft}px)`,
              backgroundColor: 'var(--warning-100)',
              borderColor: 'var(--warning-200)',
              borderTopLeftRadius: '0px',
              borderBottomLeftRadius: '0px',
              borderLeftWidth: '0px',
            }
          }
        }
      }
      inlineStyle = getMatchStyleForType()
    } 
    
    // ----------------------------------------------------------------
    // HOLAT 6: Oddiy ketma-ketlik (weekend yo'q)
    // ----------------------------------------------------------------
    // Misol: LABOR LABOR LABOR (faqat ish kunlari ketma-ket)
    else {
      const width = 100*(endIndex - startIndex + 1)
      const extraWidth = 32*(endIndex - startIndex)  // Qo'shimcha kenglik
      const left = 50*(endIndex - startIndex)
      const extraLeft = 16*(endIndex - startIndex)
  
      const getMatchStyleForType = ()=> {
        switch(currentValue.attendance.type) {
          case USER_STATUS_CODES.LABOR_LEAVE: {
            return {
              width: `calc(${width}% + ${extraWidth}px)`,
              left: `calc(${left}% + ${extraLeft}px)`,
              backgroundColor: 'var(--info-100)',
              borderColor: 'var(--info-200)',
              // Border radius va width default qiymatda qoladi (to'liq yumaloq)
            }
          }
          case USER_STATUS_CODES.NO_CONTENT: {
            return {
              width: `calc(${width}% + ${extraWidth}px)`,
              left: `calc(${left}% + ${extraLeft}px)`,
              backgroundColor: 'var(--warning-100)',
              borderColor: 'var(--warning-200)',
            }
          }
          case USER_STATUS_CODES.SICK_LEAVES: {
            return {
              width: `calc(${width}% + ${extraWidth}px)`,
              left: `calc(${left}% + ${extraLeft}px)`,
              backgroundColor: 'var(--critic-30)',
              borderColor: 'var(--critic-100)',
            }
          }
          case USER_STATUS_CODES.BUSINESS_TRIP: {
            return {
              width: `calc(${width}% + ${extraWidth}px)`,
              left: `calc(${left}% + ${extraLeft}px)`,
              backgroundColor: 'var(--greyscale-100)',
              borderColor: 'var(--greyscale-200)',
            }
          }
        }
      }
      inlineStyle = getMatchStyleForType()
    } 
    
    // ================================================================
    // 4-QADAM: Inline style'ni qaytarish
    // ================================================================
    return inlineStyle  // CSS obyekti: {width: ..., left: ..., backgroundColor: ...}
  }
  
  const getCellMergeRangeText = (attendance, index) => {
    const currentValue = calendarDaysWithAttendance.value[index]
    const previousValue = calendarDaysWithAttendance.value[index - 1]
    if(previousValue?.attendance?.type == currentValue?.attendance?.type) return '';
    
    return attendance?.user_status?.name
  }
  
  // comments by ai 
  const getToltipText = (attendance, index) => {
    // Hozirgi kunning to'liq ma'lumotini olish
    const currentValue = calendarDaysWithAttendance.value[index]
    
    // Boshlang'ich indekslar - hozirgi kun
    const startIndex = index
    let endIndex = index
    
    // Weekend orqali davom etgan holatlar uchun kengaytirilgan indekslar
    let startIndexContinue = index
    let endIndexContinue = index
    
    // Dam olish kunlari (weekend) soni
    let countDaysOff = 0
  
    // ================================================================
    // 1-QADAM: Oldinga yo'nalishda ketma-ket bir xil type'li ISH kunlarini topish
    // ================================================================
    // Faqat workDay === true bo'lgan kunlarni tekshiradi
    for(let i = startIndex + 1; i < calendarDaysWithAttendance.value.length; i++) {
      // Agar keyingi kun ish kuni va bir xil type bo'lsa
      if(calendarDaysWithAttendance.value[i].attendance?.type == currentValue.attendance?.type && 
         calendarDaysWithAttendance.value[i]?.workDay) {
        endIndex = i  // Oxirgi indeksni yangilash
      }
      else {
        break  // Turli type yoki dam olish kuni topilsa to'xtatish
      }
    }
  
    // ================================================================
    // YORDAMCHI FUNKSIYALAR: Weekend orqali davom etishni tekshirish
    // ================================================================
    
    /**
     * Berilgan indeksdan OLDIN 2 ta dam olish kuni va undan oldin yana 
     * bir xil type bor ekanligini tekshiradi
     * 
     * Misol: [type_A, WEEKEND, WEEKEND, type_A (hozirgi)]
     *         index-3  index-2  index-1  index
     */
    const isBeforeStartIndexDayTwoDaysDayOffAndPreviousDayHasTheSameTypeF = (startIndex)=> {
      return !calendarDaysWithAttendance.value[startIndex - 1]?.workDay      // -1: dam olish kuni
          && !calendarDaysWithAttendance.value[startIndex - 2]?.workDay      // -2: dam olish kuni
          && calendarDaysWithAttendance.value[startIndex - 3]?.attendance?.type == currentValue.attendance?.type  // -3: bir xil type
    }
  
    /**
     * Berilgan indeksdan KEYIN 2 ta dam olish kuni va undan keyin yana 
     * bir xil type bor ekanligini tekshiradi
     * 
     * Misol: [type_A (hozirgi), WEEKEND, WEEKEND, type_A]
     *         index             index+1  index+2  index+3
     */
    const IsAfterEndIndexDayTwoDaysDayOffAndNextDayHasTheSameTypeF = (endIndex)=> {
      return !calendarDaysWithAttendance.value[endIndex + 1]?.workDay        // +1: dam olish kuni
          && !calendarDaysWithAttendance.value[endIndex + 2]?.workDay        // +2: dam olish kuni
          && calendarDaysWithAttendance.value[endIndex + 3]?.attendance?.type == currentValue.attendance?.type  // +3: bir xil type
    }
  
    // ================================================================
    // 2-QADAM: Oldinga - Weekend DAN KEYIN davom etgan kunlarni topish
    // ================================================================
    // Agar endIndex dan keyin weekend orqali bir xil type davom etsa
    if(IsAfterEndIndexDayTwoDaysDayOffAndNextDayHasTheSameTypeF(endIndex)){
      startIndexContinue = startIndex
      endIndexContinue = endIndex + 3  // 2 ta weekend va 1 ta ish kuni
      countDaysOff = 2  // 2 ta dam olish kuni topildi
      
      // Weekend orqali davom etayotgan barcha kunlarni topish
      for(let i = endIndexContinue + 1; i < calendarDaysWithAttendance.value.length; i++) {
        // Yana weekend orqali davom etsami tekshirish
        if(IsAfterEndIndexDayTwoDaysDayOffAndNextDayHasTheSameTypeF(i)) {
          i = i + 3  // 2 weekend + 1 ish kunini o'tkazib yuborish
          endIndexContinue = i
          countDaysOff += 2  // Yana 2 ta dam olish kuni qo'shish
          continue
        }
        
        // Oddiy bir xil type'li kun bo'lsa
        if(calendarDaysWithAttendance.value[i]?.attendance?.type == currentValue.attendance?.type) {
          endIndexContinue = i
        }
        else {
          break  // Turli type topilsa to'xtatish
        }
      }
    }
  
    // ================================================================
    // 3-QADAM: Orqaga - Weekend DAN OLDIN davom etgan kunlarni topish
    // ================================================================
    // Agar startIndex dan oldin weekend orqali bir xil type davom etsa
    if(isBeforeStartIndexDayTwoDaysDayOffAndPreviousDayHasTheSameTypeF(startIndex)){
      startIndexContinue = startIndex - 3  // 2 ta weekend va 1 ta ish kuni orqaga
      
      // Agar oldinga ham weekend orqali davom etgan bo'lsa, u indeksni saqlash
      endIndexContinue = IsAfterEndIndexDayTwoDaysDayOffAndNextDayHasTheSameTypeF(endIndex) ? endIndexContinue : endIndex 
      
      // Dam olish kunlari sonini yangilash
      countDaysOff = IsAfterEndIndexDayTwoDaysDayOffAndNextDayHasTheSameTypeF(endIndex) ? countDaysOff + 2 : 2
      
      // Weekend orqali orqaga davom etayotgan barcha kunlarni topish
      for(let i = startIndexContinue - 1; i >= 0; i--) {
        // Yana weekend orqali davom etsami tekshirish
        if(isBeforeStartIndexDayTwoDaysDayOffAndPreviousDayHasTheSameTypeF(i)) {
          i = i - 3  // 2 weekend + 1 ish kunini orqaga o'tkazib yuborish
          startIndexContinue = i
          countDaysOff += 2  // Yana 2 ta dam olish kuni qo'shish
          continue
        }
        
        // Oddiy bir xil type'li kun bo'lsa
        if(calendarDaysWithAttendance.value[i]?.attendance?.type == currentValue.attendance?.type) {
          startIndexContinue = i
        }
        else {
          break  // Turli type topilsa to'xtatish
        }
      }
    }
  
    // ================================================================
    // 4-QADAM: Umumiy kunlar sonini hisoblash
    // ================================================================
    // Kengaytirilgan indekslar oralig'idagi barcha kunlar
    let totalDays = endIndexContinue - startIndexContinue + 1
    
    // MUHIM: LABOR_LEAVE uchun weekend kunlari HISOBGA olinadi
    //        Boshqa type'lar uchun weekend kunlari AYIRILADI
    if(currentValue.attendance?.type != USER_STATUS_CODES.LABOR_LEAVE) {
      totalDays -= countDaysOff
    }
    
    // ================================================================
    // 5-QADAM: Bosh va oxirgi sanalarni aniqlash
    // ================================================================
    let endDate = null
    let startDate = null
    
    // Agar weekend orqali davom etmagan oddiy ketma-ketlik bo'lsa
    if(!isBeforeStartIndexDayTwoDaysDayOffAndPreviousDayHasTheSameTypeF(startIndex) && 
       !IsAfterEndIndexDayTwoDaysDayOffAndNextDayHasTheSameTypeF(endIndex)) {
      
      // Oddiy ketma-ketlik uchun asosiy indekslardan foydalanish
      totalDays = endIndex - startIndex + 1
      if(currentValue.attendance?.type != USER_STATUS_CODES.LABOR_LEAVE) {
        totalDays -= countDaysOff
      }
      startDate = calendarDaysWithAttendance.value[startIndex]
      endDate = calendarDaysWithAttendance.value[endIndex]
    } 
    // Weekend orqali davom etgan ketma-ketlik uchun
    else {
      startDate = calendarDaysWithAttendance.value[startIndexContinue]
      endDate = calendarDaysWithAttendance.value[endIndexContinue]
    }
  
    // ================================================================
    // 6-QADAM: Tooltip uchun title formatini yaratish
    // ================================================================
    // 1 kundan ko'p bo'lsa: "5 - 10 Sentyabr (6 kun)"
    // 1 kun bo'lsa: "5 Sentyabr (1 kun)"
    const title = totalDays > 1 
      ? `${startDate.day} - ${endDate.day} ${dayjs(startDate.date).locale(locale.value).format('MMMM')} (${totalDays} ${t('day')})` 
      : `${startDate.day} ${dayjs(startDate.date).locale(locale.value).format('MMMM')} (${totalDays} ${t('day')})`
  
    // Tooltip ma'lumotini qaytarish
    return { 
      title: title,                           // "5 - 10 Sentyabr (6 kun)"
      description: attendance?.user_status?.name  // "Trudovoy otpusk"
    }
  }
  
  const toolTipFun = (data) => {
    return {
      value: `<div class="flex flex-col gap-1">
                <p class="text-sm text-white">${ data?.title }</p>
                <p class="text-sm text-white">${ data.description && t(data.description) }</p>
              </div>`,
      pt: {
        arrow: {
          class: '!text-greyscale-900 !bottom-[4px]'
        },
        text: '!px-3 !py-2 !rounded-[12px] !bg-greyscale-900 !text-white !text-sm !w-max relative top-[-4px] !w-fit',
      },
      escape: true,
      autoHide: false
    }
  }

  return {
    getCellMergeRangeClass,
    getCellMergeRangeText,
    getToltipText, 
    toolTipFun
  }
}