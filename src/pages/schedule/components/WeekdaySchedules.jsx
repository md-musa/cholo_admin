import { FaCalendarAlt } from "react-icons/fa";
import { DirectionSchedules } from "./DirectionSchedules";

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
}) {
  return (
    <div className="mx-2">
      <div className="flex items-center justify-center mb-2 text-md font-medium">
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
        />
      </div>
    </div>
  );
}