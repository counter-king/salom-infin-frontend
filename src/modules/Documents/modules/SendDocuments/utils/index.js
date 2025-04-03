import {
  BUSINESS_CLASS,
  BY_CAR,
  BY_PLANE,
  BY_TRAIN,
  ECONOMY_CLASS, FIRST_CLASS, MULTI_CITY, ONE_WAY, ROUND_TRIP, SEAT_CLASS, SLEEPER_CLASS
} from "@/modules/Documents/modules/SendDocuments/constants"
import { formatDate } from "@/utils/formatDate";
import dayjs from "dayjs";

export const adjustDateTime = (date, time, timeIndex) => {
  if (date && time) {
    return `${date}T${time[timeIndex].hours}:${time[timeIndex].minutes}:${time[timeIndex].seconds}+05:00`
  }
}
export const returnBTRoute = (route) => {
  switch (route) {
    case BY_PLANE:
      return 'Samolyot'
    case BY_TRAIN:
      return 'Poyezd'
    case BY_CAR:
      return 'Taksi'
    default:
      return 'Samolyot'
  }
}
export const returnBTRouteType = (type) => {
  switch (type) {
    case ROUND_TRIP:
      return 'Borish-kelish'
    case MULTI_CITY:
      return 'Ko\'p shaharli'
    case ONE_WAY:
      return 'Bir tomonlama'
    default:
      return 'Borish-kelish'
  }
}
export const returnBTClass = (className) => {
  const value = className.hasOwnProperty('value') ? className.value : className
  switch (value) {
    case ECONOMY_CLASS:
      return 'Ekonom klass'
    case BUSINESS_CLASS:
      return 'Biznes klass'
    case FIRST_CLASS:
      return 'Birinchi klass'
    case SLEEPER_CLASS:
      return 'Kupe'
    case SEAT_CLASS:
      return 'Umumiy vagon'
    default:
      return 'Ekonom klass'
  }
}

export const returnBTDepartureTime = (departure_date, departure_end_date) => {
  if (departure_date && departure_end_date) {
    const departureDate = formatDate(departure_date)
    const time = `${new Date(departure_date).toTimeString().slice(0, 5)}-${new Date(departure_end_date).toTimeString().slice(0, 5)}`
    return `${departureDate} <br> ${time}`
  } else if (departure_date) {
    const departureDate = formatDate(departure_date)
    const time = `${new Date(departure_date).toTimeString().slice(0, 5)}`
    return `${departureDate} <br> ${time}`
  }
}

export const returnBTDateTimeToISO = (segment, index) => {
  if (Array.isArray(segment.time)) {
    const hours = Number(segment.time[index].hours) < 10 ? `0${Number(segment.time[index].hours)}` : segment.time[index].hours
    const minutes = Number(segment.time[index].minutes) < 10 ? `0${Number(segment.time[index].minutes)}` : segment.time[index].minutes
    return `${segment.date}T${hours}:${minutes}:00+05:00`
  } else {
    const hours = Number(segment.time.hours) < 10 ? `0${Number(segment.time.hours)}` : segment.time.hours
    const minutes = Number(segment.time.minutes) < 10 ? `0${Number(segment.time.minutes)}` : segment.time.minutes
    return `${segment.date}T${hours}:${minutes}:00+05:00`
  }
}

export const adjustBTDateToTimeArray = async (start_date, end_date) => {
  if (start_date && end_date) {
    const start = dayjs(start_date)
    const end = dayjs(end_date)

    return [
      { hours: start.format('HH'), minutes: start.format('mm'), seconds: '00' },
      { hours: end.format('HH'), minutes: end.format('mm'), seconds: '00' },
    ]
  } else if (start_date) {
    const start = dayjs(start_date)
    return { hours: start.format('HH'), minutes: start.format('mm'), seconds: '00' }
  }
}
