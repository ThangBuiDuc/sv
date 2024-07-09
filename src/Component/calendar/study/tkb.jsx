import style from "./index.module.css";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
// import listPlugin from "@fullcalendar/list";
import timeGridPlugin from "@fullcalendar/timegrid";
import momentPlugin from "@fullcalendar/moment";
import viLocale from "@fullcalendar/core/locales/vi";
import moment from "moment";
import { useEffect, useState } from "react";
// import {useRef} from 'react'

// const raw = [
//   {
//     allDay: false,
//     end: "2023-02-21T18:36:00",
//     gv: "Bùi Thị Mai Anh",
//     id: 0,
//     ma_mon_hoc: "ESP33031",
//     phong: "C303",
//     so_tiet: 3,
//     start: "2023-02-21T17:00:00+07:00",
//     tiet_bat_dau: 1,
//     title: "Anh Văn Chuyên Ngành",
//   },
// ];

export default function TKB({ data }) {
  // var calendarRef = useRef()
  // console.log(data)
  const [currentTime, setCurrentTime] = useState(moment());
  useEffect(() => {
    let repeat = setInterval(() => {
      setCurrentTime(moment());
    }, 1000);

    return () => {
      clearInterval(repeat);
    };
  }, []);

  // console.log(currentTime)

  return (
    <FullCalendar
      // ref={calendarRef}
      plugins={[timeGridPlugin, momentPlugin]}
      locales={[viLocale]}
      initialView="timeGridWeek"
      allDaySlot={false}
      headerToolbar={{
        start: "prev,next,today",
        center: "title",
        end: "timeGridDay,timeGridWeek",
      }}
      buttonText={{
        today: "Hiện tại",
        month: "Tháng",
        week: "Tuần",
        day: "Ngày",
        list: "Danh sách",
      }}
      titleFormat={"D/MM/YYYY"}
      firstDay={0}
      contentHeight={"auto"}
      slotLabelFormat={{
        hour: "2-digit",
        minute: "2-digit",
        omitZeroMinute: false,
        meridiem: "short",
      }}
      events={data}
      eventContent={(eventInfo) => {
        // console.log(eventInfo)
        let present =
          currentTime.isSameOrAfter(eventInfo.event.start) &&
          currentTime.isSameOrBefore(eventInfo.event.end);
        let past = currentTime.isSameOrAfter(eventInfo.event.end);
        return present ? (
          <div
            className={style.eventCalendar}
            style={{ backgroundColor: "#27aecb", border: "1px solid #27aecb" , cursor: eventInfo.view.type === 'timeGridWeek'?'pointer':'unset'}}
          >
            <p style={{ textAlign: "center", fontWeight: "bold" }}>
              {eventInfo.timeText}
            </p>
            <p style={{ textAlign: "center" }}>{eventInfo.event.title}</p>
            <p style={{ textAlign: "center", fontWeight: "bold" }}>
              {eventInfo.event.extendedProps.phong}
            </p>
            <p style={{ textAlign: "center" }}>
              {eventInfo.event.extendedProps.gv}
            </p>
          </div>
        ) : past ? (
          <div
            className={style.eventCalendar}
            style={{ backgroundColor: "#898989", border: "1px solid #898989" , cursor: eventInfo.view.type === 'timeGridWeek'?'pointer':'unset'}}
          >
            <p style={{ textAlign: "center", fontWeight: "bold" }}>
              {eventInfo.timeText}
            </p>
            <p style={{ textAlign: "center" }}>{eventInfo.event.title}</p>
            <p style={{ textAlign: "center", fontWeight: "bold" }}>
              {eventInfo.event.extendedProps.phong}
            </p>
            <p style={{ textAlign: "center" }}>
              {eventInfo.event.extendedProps.gv}
            </p>
          </div>
        ) : (
          <div className={style.eventCalendar} style={{cursor: eventInfo.view.type === 'timeGridWeek'?'pointer':'unset'}}>
            <p style={{ textAlign: "center", fontWeight: "bold" }}>
              {eventInfo.timeText}
            </p>
            <p style={{ textAlign: "center" }}>{eventInfo.event.title}</p>
            <p style={{ textAlign: "center", fontWeight: "bold" }}>
              {eventInfo.event.extendedProps.phong}
            </p>
            <p style={{ textAlign: "center" }}>
              {eventInfo.event.extendedProps.gv}
            </p>
          </div>
        );
      }}
      views={{
        timeGridWeek: {
          dayHeaderFormat: {
            weekday: "short",
            month: "2-digit",
            day: "2-digit",
            omitCommas: true,
          },
          slotDuration: "00:20:00",
          // eventDidMount: ({el})=>{el.style.cursor = 'pointer'},
          eventClick: (e) => {
            // console.log()
            e.view.calendar.changeView(
              "timeGridDay",
              `${e.event.startStr.split("T")[0]}`
            );
          },
        },
        timeGridDay: {
          slotDuration: "00:30:00",
          // eventDidMount: ({el})=>{console.log(el)},
        },
      }}
      slotMinTime={"07:00:00"}
      slotMaxTime={"18:00:00"}
    />
  );
}
