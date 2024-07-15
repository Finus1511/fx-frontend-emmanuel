import { styled } from "@stitches/react";

export const MainWrapper = styled("div", {
  // width: 240,
  borderRadius: 10,
  padding: 20,
  backgroundColor: "white",
  // fontFamily: "Anek Telugu",
  marginTop: 20,
  "@media (max-width: 767.98px)": {
    padding: 0,
  },
});

export const CalendarHeaderWrapper = styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});

export const WeekDaysWrapper = styled("div", {
  display: "flex",
  flexDirection: "row",
  marginBottom: 15,
});

export const WeekDayCell = styled("div", {
  width: 175,

  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#000",
  fontSize: 15,
  fontWeight: 400,
  overflow: "hidden",
  "@media (max-width: 767.98px)": {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
});

export const WeekDayCellDesktop = styled("span", {
  display: "block",
  "@media (max-width: 767.98px)": {
    display: "none",
  },
});
export const WeekDayCellMobile = styled("span", {
  display: "none",
  "@media (max-width: 767.98px)": {
    display: "block",
  },
});

export const CalendarContentWrapper = styled("div", {
  display: "flex",
  flexDirection: "row",
  "&:last-child div": {
    borderBottomWidth: 0,
  },
});

export const CalendarDayCell = styled("div", {
  height: 175,
  width: 175,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  // borderRadius: 6,
  // margin: 2,
  // border: "1px solid #e5e5e5",
  borderBottom: "1px solid #e5e5e5",
  borderRight: "1px solid #e5e5e5",
  "&:last-child": {
    // borderRightWidth: 0,
  },
  "&:last-child": {
    borderRight: "1px solid #e5e5e5",
  },
  "&:first-child": {
    borderLeft: "1px solid #e5e5e5",
  },
});

export const CalendarDayInnerCell = styled("div", {
  width: "100%",
  height: "100%",
  margin: 1,
  borderRadius: 6,
  fontWeight: "bold",
  "& span": {
    position: "absolute",
    marginTop: 10,
    marginLeft: 10,
    fontSize: 15,
    fontWeight: 500,
  },
  variants: {
    variant: {
      default: {
        color: "#1B1B2F",
      },
      today: {
        border: "3px solid #9f4298",
      },
      selected: {
        color: "#fff",
        background: "#9f4298",
      },
      nextMonth: {
        color: "#DAE1E7",
      },
    },
  },
});
