import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import esLocale from '@fullcalendar/core/locales/es.js'

const Calendar = ({ events }) => {
  return (
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin]}
      initialView="dayGridMonth"
      hiddenDays={[0]}
      height={'auto'}
      contentHeight={2.5 * 50}
      locale={esLocale}
      fixedWeekCount={false}
      headerToolbar={{
        start: 'prev,next today',
        center: 'title',
        end: 'dayGridMonth,timeGridWeek,timeGridDay',
      }}
      navLinks={true}
      slotMinTime="06:30:00"
      slotMaxTime="22:00:00"
      slotDuration="1:00:00"
      slotLabelFormat={{
        hour: 'numeric',
        minute: '2-digit',
        meridiem: 'short',
        omitZeroMinute: false,
        hour12: false,
      }}
      showNonCurrentDates={false}
      nowIndicator={true}
      initialDate={new Date()}
      validRange={() => ({
        start: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
        end: new Date(new Date().getFullYear(), 11, 32),
      })}
      events={events}
    />
  )
}

export default Calendar
