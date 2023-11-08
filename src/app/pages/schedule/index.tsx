import { MyCalendar } from "./MyCalendar";
import ListSchedule from "./ListSchedule";

export function Schedule() {
  const decodedToken = localStorage.getItem("decoded");
  const decoded = JSON.parse(decodedToken || "");
  const role = decoded?.role.toLowerCase()

  return (
    <div>
      {role === "admin" ? <ListSchedule/> : <MyCalendar/> }
    </div>
  );
}

export default Schedule;