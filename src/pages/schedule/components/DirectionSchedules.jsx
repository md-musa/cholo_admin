import { FaExchangeAlt, FaPlus } from "react-icons/fa";
import { ScheduleItem } from "./ScheduleItem";

// DirectionSchedules (Add button always shown)
export function DirectionSchedules({
  directionSchedules,
  direction,
  iconRotation,
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
    <div className="bg-gray-50 border border-gray-300 p-3 mx-2 rounded">
      <div className="flex items-center gap-2 mb-2 font-semibold">
        <FaExchangeAlt className={`text-green-500 ${iconRotation}`} />
        <span>{direction}</span>
        <span className="badge badge-sm">{directionSchedules?.length || 0} trips</span>
      </div>

      {directionSchedules && directionSchedules.length > 0 ? (
        directionSchedules.map((schedule) => (
          <ScheduleItem
            key={schedule._id}
            schedule={schedule}
            addSchedule={addSchedule}
            editSchedule={editSchedule}
            deleteSchedule={deleteSchedule}
            assignBus={assignBus}
            editBus={editBus}
            deleteBus={deleteBus}
            fetchSchedule={fetchSchedule}
            metadata={metadata}
          />
        ))
      ) : (
        <div className="text-center text-gray-400 text-sm py-2">No schedules yet</div>
      )}

      <button
        onClick={() => addSchedule(metadata.direction, metadata.operatingDays, metadata.userType)}
        className="btn btn-xs btn-outline btn-success mt-2 w-full flex items-center justify-center gap-1"
      >
        <FaPlus /> Add Schedule
      </button>
    </div>
  );
}
