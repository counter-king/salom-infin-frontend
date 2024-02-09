/**
 * Генерация времени по интервалу
 * @return { Array } [08:00, 08:15, ... 18:45]
 * */
export const generateDayHours = (interval, language = window.navigator.language) => {
  const ranges = []
  const date = new Date()
  const format = {
    hour: 'numeric',
    minute: 'numeric',
  };

  for (let minutes = 480; minutes < 24 * 60 - 300; minutes = minutes + interval) {
    date.setHours(0)
    date.setMinutes(minutes)
    ranges.push({
      id: minutes,
      time: date.toLocaleTimeString(language, format),
      disabled: false
    });
  }

  return ranges
}
