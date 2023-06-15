export function generateEvents(
  dayList,
  startDate,
  endDate,
  title,
  backgroundColor,
) {
  const dateTimeList = []
  const dayMap = {
    sunday: 0,
    monday: 1,
    tuesday: 2,
    wednesday: 3,
    thursday: 4,
    friday: 5,
    saturday: 6,
  }

  const start = new Date(startDate + ' EST')
  const end = new Date(endDate + 'EST')

  for (let d = start; d <= end; d.setDate(d.getDate() + 1)) {
    const dayOfWeek = d.getDay()
    const dayName =
      Object.keys(dayMap)[Object.values(dayMap).indexOf(dayOfWeek)]
    const day = dayList.find((item) => item.day.toLowerCase() === dayName)

    if (day) {
      const startDateTime = new Date(d)
      const [startHour, startMin, startSec] = day.start_time.split(':')
      startDateTime.setHours(startHour, startMin, startSec)
      const endDateTime = new Date(d)
      const [endHour, endMin, endSec] = day.end_time.split(':')
      endDateTime.setHours(endHour, endMin, endSec)
      dateTimeList.push({
        title,
        start: startDateTime,
        end: endDateTime,
        backgroundColor,
      })
    }
  }

  return dateTimeList
}
