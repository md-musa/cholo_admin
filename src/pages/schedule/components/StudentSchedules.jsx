import { FaUserGraduate } from "react-icons/fa";
import { WeekdaySchedules } from "./WeekdaySchedules";

// Student Schedules
export function StudentSchedules({
  groupedSchedule,
  addSchedule,
  editSchedule,
  deleteSchedule,
  assignBus,
  editBus,
  deleteBus,
  fetchSchedule,
}) {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-4 text-lg font-semibold">
        <FaUserGraduate className="text-blue-600" /> <span>Student Schedules</span>
      </div>
      <hr className="border-t-2 border-muted-300 mb-4" />
      <div className="grid grid-cols-2">
        <WeekdaySchedules
          schedules={groupedSchedule.students?.weekdays}
          title="Weekdays"
          iconColor="text-green-600"
          onAddTo={() =>
            onAddSchedule(SCHEDULE_DIRECTIONS.TO_CAMPUS, SCHEDULE_OPERATING_DAYS.WEEKDAYS, SCHEDULE_USER_TYPES.STUDENT)
          }
          onAddFrom={() =>
            onAddSchedule(
              SCHEDULE_DIRECTIONS.FROM_CAMPUS,
              SCHEDULE_OPERATING_DAYS.WEEKDAYS,
              SCHEDULE_USER_TYPES.STUDENT
            )
          }
          addSchedule={addSchedule}
          editSchedule={editSchedule}
          deleteSchedule={deleteSchedule}
          assignBus={assignBus}
          editBus={editBus}
          deleteBus={deleteBus}
          fetchSchedule={fetchSchedule}
        />

        <WeekdaySchedules
          schedules={groupedSchedule.students?.friday}
          title="Friday"
          iconColor="text-purple-600"
          onAddTo={() =>
            onAddSchedule(SCHEDULE_DIRECTIONS.TO_CAMPUS, SCHEDULE_OPERATING_DAYS.FRIDAY, SCHEDULE_USER_TYPES.STUDENT)
          }
          onAddFrom={() =>
            onAddSchedule(SCHEDULE_DIRECTIONS.FROM_CAMPUS, SCHEDULE_OPERATING_DAYS.FRIDAY, SCHEDULE_USER_TYPES.STUDENT)
          }
          addSchedule={addSchedule}
          editSchedule={editSchedule}
          deleteSchedule={deleteSchedule}
          assignBus={assignBus}
          editBus={editBus}
          deleteBus={deleteBus}
          fetchSchedule={fetchSchedule}
        />
      </div>
    </div>
  );
}
