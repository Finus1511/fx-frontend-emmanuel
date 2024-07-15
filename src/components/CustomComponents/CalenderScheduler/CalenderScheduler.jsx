import React, { useCallback, useEffect, useMemo, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import * as Styles from "./CalenderStyles";

export const CalenderScheduler = ({
  format = "YYYY-MM-DD",
  date,
  disablePastDate = false,
  onChange,
}) => {
  const today = date ? dayjs(date) : dayjs();
  const [selectedDate, setSelectedDate] = useState(today);
  const [calenderDate, setCalenderDate] = useState(today);
  const currentDay = useMemo(() => dayjs().toDate(), []);
  const firstDayOfTheMonth = useMemo(
    () => calenderDate.clone().startOf("month"),
    [calenderDate]
  );

  const firstDayOfFirstWeekOfMonth = useMemo(
    () => dayjs(firstDayOfTheMonth).startOf("week"),
    [firstDayOfTheMonth]
  );

  const generateFirstDayOfEachWeek = useCallback((day) => {
    const dates = [day];
    for (let i = 1; i < 6; i++) {
      const date = day.clone().add(i, "week");
      dates.push(date);
    }
    return dates;
  }, []);

  const generateWeek = useCallback((day) => {
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const date = day.clone().add(i, "day").toDate();
      dates.push(date);
    }
    return dates;
  }, []);

  const generateWeeksOfTheMonth = useMemo(() => {
    const firstDayOfEachWeek = generateFirstDayOfEachWeek(
      firstDayOfFirstWeekOfMonth
    );
    return firstDayOfEachWeek.map((date) => generateWeek(date));
  }, [
    generateFirstDayOfEachWeek,
    firstDayOfFirstWeekOfMonth,
    generateWeek,
    calenderDate,
  ]);

  const onDateClick = (date) => {
    setCalenderDate(date);
    setSelectedDate(date);
    onChange(date.format(format));
  };

  return (
    <Styles.MainWrapper>
      <Styles.CalendarHeaderWrapper>
        <div className="calender-title">
          <MdKeyboardArrowLeft
            size={25}
            onClick={() => setCalenderDate((date) => date.subtract(1, "month"))}
          />
          <h3>{calenderDate.clone().format("MMM YYYY")}</h3>
          <MdKeyboardArrowRight
            size={25}
            onClick={() => setCalenderDate((date) => date.add(1, "month"))}
          />
        </div>
      </Styles.CalendarHeaderWrapper>
      <Styles.WeekDaysWrapper>
        {generateWeeksOfTheMonth[0].map((day, index) => (
          <Styles.WeekDayCell key={`week-day-${index}`}>
            <Styles.WeekDayCellDesktop>
              {new Date(day).toLocaleDateString("en-us", { weekday: "long" })}
            </Styles.WeekDayCellDesktop>
            <Styles.WeekDayCellMobile>
              {dayjs(day).format("dd")}
            </Styles.WeekDayCellMobile>
          </Styles.WeekDayCell>
        ))}
      </Styles.WeekDaysWrapper>
      {generateWeeksOfTheMonth.map((week, weekIndex) => (
        <Styles.CalendarContentWrapper key={`week-${weekIndex}`}>
          {week.map((day, dayIndex) => (
            <Styles.CalendarDayCell
              key={`day-${dayIndex}`}
              onClick={() => {
                const date = dayjs(day);
                if (disablePastDate) {
                  if (!date.isBefore(dayjs(today.format(format), format)))
                    onDateClick(date);
                } else {
                  onDateClick(date);
                }
              }}
            >
              <Styles.CalendarDayInnerCell
                variant={
                  disablePastDate &&
                    dayjs(day).isBefore(dayjs(today.format(format), format))
                    ? "nextMonth"
                    : calenderDate.clone().toDate().getMonth() !==
                      day.getMonth()
                      ? "nextMonth"
                      : dayjs(selectedDate).isSame(day, "date")
                        ? "selected"
                        : dayjs(day).isSame(today.format(format), format)
                          ? "today"
                          : "default"
                }
              >
                <span>{day.getDate()}</span>
              </Styles.CalendarDayInnerCell>
            </Styles.CalendarDayCell>
          ))}
        </Styles.CalendarContentWrapper>
      ))}
    </Styles.MainWrapper>
  );
};
