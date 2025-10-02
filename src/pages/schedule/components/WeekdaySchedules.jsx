import { FaCalendarAlt } from "react-icons/fa";
import { DirectionSchedules } from "./DirectionSchedules";
import { SCHEDULE_DIRECTIONS } from "../../../constants";

export function WeekdaySchedules({
  schedules,
  title,
  iconColor,
  onAddTo,
  onAddFrom,
  addSchedule,
  editSchedule,
  deleteSchedule,
  assignBus,
  editBus,
  deleteBus,
  fetchSchedule,
  metadata,
}) {
  return (
    <div className="mx-4 border-2 shadow border-gray-300 rounded-lg p-3 bg-white">
      <div className="flex items-center justify-center mb-2 gap-2 text-md font-medium">
        <FaCalendarAlt className={iconColor} />
        <span>{title}</span>
      </div>

      <div className="grid grid-cols-2 gap-1">
        <DirectionSchedules
          directionSchedules={schedules?.to}
          direction="To Campus"
          iconRotation="rotate-90"
          onAdd={onAddTo}
          addSchedule={addSchedule}
          editSchedule={editSchedule}
          deleteSchedule={deleteSchedule}
          assignBus={assignBus}
          editBus={editBus}
          deleteBus={deleteBus}
          fetchSchedule={fetchSchedule}
          metadata={{ ...metadata, direction: SCHEDULE_DIRECTIONS.TO_CAMPUS }}
        />
        <DirectionSchedules
          directionSchedules={schedules?.from}
          direction="From Campus"
          iconRotation="-rotate-90"
          onAdd={onAddFrom}
          addSchedule={addSchedule}
          editSchedule={editSchedule}
          deleteSchedule={deleteSchedule}
          assignBus={assignBus}
          editBus={editBus}
          deleteBus={deleteBus}
          fetchSchedule={fetchSchedule}
          metadata={{ ...metadata, direction: SCHEDULE_DIRECTIONS.FROM_CAMPUS }}
        />
      </div>
    </div>
  );
}
