import React from "react";
import moment from "moment";
import { FaBus, FaClock, FaStickyNote, FaUser, FaEdit, FaTrash } from "react-icons/fa";
import AssignedBusCard from "./AssignedBusCard";

/**
 * Props:
 * - schedule
 * - editSchedule(schedule)
 * - deleteSchedule(scheduleId)
 * - assignBus(scheduleId)
 * - editBus(scheduleId, assigned)
 * - deleteBus(scheduleId, assignedId)
 */
export function ScheduleItem({ schedule, editSchedule, deleteSchedule, assignBus, editBus, deleteBus, metadata }) {
  const formattedTime = schedule?.time ? moment(schedule.time, "HH:mm").format("hh:mm A") : "Not Scheduled";
  const assignedBuses = schedule?.assignedBuses || [];

  return (
    // top-level "group" so children can show controls on hover/focus
    <div className="group relative my-5 bg-white border border-gray-300 rounded-lg shadow-sm p-3">
      {/* Header: time + (hover) controls */}
      <div className="flex items-start justify-between gap-4">
        <div className="w-full">
          <div className="flex justify-between items-center gap-4">
            <div className="flex items-center space-x-1.5">
              <FaClock className="text-blue-400" />
              <div className="text-lg font-medium leading-none">{formattedTime}</div>
            </div>

            {/* edit/delete schedule buttons — hidden until hover or focus within */}
            <div
              className="flex items-center justify-end gap-2 opacity-0 transition-opacity duration-150
                     group-hover:opacity-100 group-focus-within:opacity-100"
              aria-hidden={!editSchedule && !deleteSchedule}
            >
              <button
                type="button"
                onClick={() => editSchedule && editSchedule(schedule)}
                title="Edit schedule"
                className="btn btn-ghost btn-sm p-2"
                aria-label="Edit schedule"
              >
                <FaEdit />
              </button>

              <button
                type="button"
                onClick={() => {
                  if (typeof deleteSchedule === "function") {
                    if (window.confirm("Delete this schedule?")) deleteSchedule(schedule._id);
                  }
                }}
                title="Delete schedule"
                className="btn btn-ghost btn-sm p-2 text-red-600"
                aria-label="Delete schedule"
              >
                <FaTrash />
              </button>
            </div>
          </div>

          {schedule?.note && (
            <div className="flex items-center mt-1 text-sm text-gray-600">
              <span>Note: {schedule.note}</span>
            </div>
          )}
        </div>
      </div>


      {/* Assigned buses list */}
      <div className="space-y-4">
        {/* Fixed */}
        <div>
          <div className="divider">Fixed Bus</div>

          {assignedBuses.filter((a) => a.assignmentType === "fixed").length === 0 ? (
            <div className="text-sm text-gray-400 text-center">No fixed buses assigned</div>
          ) : (
            assignedBuses
              .filter((a) => a.assignmentType === "fixed")
              .map((assigned) => (
                <AssignedBusCard
                  key={assigned._id}
                  scheduleId={schedule._id}
                  assigned={assigned}
                  variant="fixed" 
                  onEditBus={editBus} 
                  onDeleteBus={deleteBus} 
                  metadata= {{...metadata, busData: assigned}}
                />
              ))
          )}
        </div>

        {/* One-off */}
        <div>
          <div className="divider">One-Off Bus</div>

          {assignedBuses.filter((a) => a.assignmentType === "one-off").length === 0 ? (
            <div className="text-sm text-gray-400 text-center">No one-off buses assigned</div>
          ) : (
            assignedBuses
              .filter((a) => a.assignmentType === "one-off")
              .map((assigned) => (
                <AssignedBusCard
                  key={assigned._id}
                  scheduleId={schedule._id}
                  assigned={assigned}
                  variant="one-off" // or "fixed"
                  onEditBus={editBus} // pass your handler
                  onDeleteBus={deleteBus} // pass your handler
                />
              ))
          )}
        </div>
      </div>

      {/* Assign Bus button — visible always (clear call-to-action) */}
      <div className="mt-4">
        <button
          onClick={() => assignBus && assignBus(schedule._id)}
          className="btn btn-sm btn-outline w-full flex items-center justify-center gap-2"
        >
          <FaBus /> Assign Bus & Driver
        </button>
      </div>
    </div>
  );
}
