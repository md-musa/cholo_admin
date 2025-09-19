import React, { useState, useEffect } from "react";
import apiClient from "../config/axiosConfig";
import { showSuccess, showError, showLoading, dismissToast } from "../utils/toastUtils";
import {
  FaRoute,
  FaUserGraduate,
  FaUserTie,
  FaCalendarAlt,
  FaExchangeAlt,
  FaClock,
  FaStickyNote,
  FaBus,
  FaUser,
  FaPlus,
} from "react-icons/fa";
import { MdDirectionsBus } from "react-icons/md";
import { SCHEDULE_DIRECTIONS, SCHEDULE_MODES, SCHEDULE_OPERATING_DAYS, SCHEDULE_USER_TYPES } from "../constants";
import { formatTime, getEnumLabel, groupSchedule } from "../utils/scheduleutil";
import moment from "moment";
import AddScheduleModal from "../components/AddScheduleModal";
import BusAssignModal from "../components/AssignBusModal";
// Main Component
function AddSchedule() {
  const [schedules, setSchedules] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedMode, setSelectedMode] = useState(SCHEDULE_MODES.REGULAR);
  const [selectedRoute, setSelectedRoute] = useState("");

  const [form, setForm] = useState({
    routeId: "",
    direction: SCHEDULE_DIRECTIONS.TO_CAMPUS,
    time: "",
    userType: SCHEDULE_USER_TYPES.STUDENT,
    mode: SCHEDULE_MODES.REGULAR,
    operatingDays: SCHEDULE_OPERATING_DAYS.WEEKDAYS,
    note: "",
    serviceType: "",
  });

  const [modalVisible, setModalVisible] = useState(false);
  const [busAssignModalVisible, setBusAssignModalVisible] = useState(false);
  const [selectedScheduleId, setSelectedScheduleId] = useState(null);

  // Fetch Routes
  function fetchRoutes() {
    async function getRoutes() {
      try {
        const routesResponse = await apiClient.get("/routes");
        setRoutes(routesResponse.data);
      } catch (err) {
        console.error("Fetch routes error:", err);
      }
    }
    getRoutes();
  }

  // Fetch Schedule
  function fetchSchedule() {
    async function getSchedule() {
      try {
        const schedulesResponse = await apiClient.get(`/schedules/admin/route/${selectedRoute}`);
        setSchedules(schedulesResponse.data);
        showSuccess("Schedules loaded successfully");
      } catch (err) {
        showError(err.response?.data?.message || "Failed to load schedules");
      }
    }

    if (selectedRoute) {
      getSchedule();
    }
  }

  useEffect(() => fetchRoutes(), []);
  useEffect(() => fetchSchedule(), [selectedRoute, modalVisible, busAssignModalVisible]);

  const groupedSchedule = groupSchedule(schedules);

  // Open Add Schedule modal pre-filled
  const handleAddSchedule = (direction, operatingDays, userType) => {
    setForm({
      ...form,
      direction,
      operatingDays,
      userType,
      routeId: selectedRoute,
      time: "",
      note: "",
      mode: selectedMode,
    });
    setModalVisible(true);
  };

  const handleAssignBus = (scheduleId) => {
    setSelectedScheduleId(scheduleId);
    setBusAssignModalVisible(true);
  };

  return (
    <div className="p-6">
      <Header />
      <SelectionPanel
        selectedMode={selectedMode}
        selectedRoute={selectedRoute}
        routes={routes}
        onModeChange={(e) => setSelectedMode(e.target.value)}
        onRouteChange={(e) => setSelectedRoute(e.target.value)}
      />
      <ScheduleDisplay
        groupedSchedule={groupedSchedule}
        onAddSchedule={handleAddSchedule}
        handleAssignBus={handleAssignBus}
      />

      {modalVisible && <AddScheduleModal form={form} onClose={() => setModalVisible(false)} />}
      {busAssignModalVisible && (
        <BusAssignModal scheduleId={selectedScheduleId} onClose={() => setBusAssignModalVisible(false)} />
      )}
    </div>
  );
}

// Header Component
function Header() {
  return (
    <h2 className="text-2xl text-center font-bold mb-6 flex items-center gap-2">
      <MdDirectionsBus className="text-blue-500" /> View Schedule
    </h2>
  );
}

// Selection Panel
function SelectionPanel({ selectedMode, selectedRoute, routes, onModeChange, onRouteChange }) {
  return (
    <div className="bg-base-200 p-4 rounded-lg mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <RouteSelector selectedRoute={selectedRoute} routes={routes} onRouteChange={onRouteChange} />
        <ModeSelector selectedMode={selectedMode} onModeChange={onModeChange} />
      </div>
    </div>
  );
}

function ModeSelector({ selectedMode, onModeChange }) {
  return (
    <div>
      <label className="label">
        <span className="label-text flex items-center gap-2">
          <FaCalendarAlt /> Schedule Mode
        </span>
      </label>
      <select className="select select-bordered w-full" value={selectedMode} onChange={onModeChange}>
        {Object.values(SCHEDULE_MODES).map((mode) => (
          <option key={mode} value={mode}>
            {getEnumLabel(mode)}
          </option>
        ))}
      </select>
    </div>
  );
}

function RouteSelector({ selectedRoute, routes, onRouteChange }) {
  return (
    <div>
      <label className="label">
        <span className="label-text flex items-center gap-2">
          <FaRoute /> Select Route
        </span>
      </label>
      <select className="select select-bordered w-full" value={selectedRoute} onChange={onRouteChange}>
        <option value="">Select Route</option>
        {routes.map((route) => (
          <option key={route._id} value={route._id}>
            {route.routeNo + ": " + route.routeName}
          </option>
        ))}
      </select>
    </div>
  );
}

// Schedule Display
function ScheduleDisplay({ groupedSchedule, onAddSchedule, handleAssignBus }) {
  return (
    <div className="space-y-8">
      <div className="card bg-base-100 shadow-lg">
        <div className="card-body p-0">
          <RouteHeader groupedSchedule={groupedSchedule} />
          <div className="p-4">
            <StudentSchedules
              groupedSchedule={groupedSchedule}
              onAddSchedule={onAddSchedule}
              handleAssignBus={handleAssignBus}
            />
            <EmployeeSchedules
              groupedSchedule={groupedSchedule}
              onAddSchedule={onAddSchedule}
              handleAssignBus={handleAssignBus}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function RouteHeader({ groupedSchedule }) {
  return (
    <div className="bg-primary text-primary-content p-4 rounded-t-lg">
      <h3 className="text-xl font-bold flex items-center gap-2">
        <FaRoute /> {groupedSchedule.route?.name || "Unknown Route"}
      </h3>
      <p className="text-sm opacity-90">
        {groupedSchedule.route?.startLocation} to {groupedSchedule.route?.endLocation}
      </p>
    </div>
  );
}

// Student Schedules
function StudentSchedules({ groupedSchedule, onAddSchedule, handleAssignBus }) {
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
          handleAssignBus={handleAssignBus}
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
          handleAssignBus={handleAssignBus}
        />
      </div>
    </div>
  );
}

// Employee Schedules
function EmployeeSchedules({ groupedSchedule, onAddSchedule, handleAssignBus }) {
  return (
    <div className="mb-4">
      <div className="flex items-center gap-2 mb-4 text-lg font-semibold">
        <FaUserTie className="text-blue-600" /> <span>Employee Schedules</span>
      </div>
      <hr className="border-t-2 border-muted-300 mb-4" />
      <div className="grid grid-cols-2">
        <WeekdaySchedules
          schedules={groupedSchedule.employees?.weekdays}
          title="Weekdays"
          iconColor="text-green-600"
          onAddTo={() =>
            onAddSchedule(SCHEDULE_DIRECTIONS.TO_CAMPUS, SCHEDULE_OPERATING_DAYS.WEEKDAYS, SCHEDULE_USER_TYPES.EMPLOYEE)
          }
          onAddFrom={() =>
            onAddSchedule(
              SCHEDULE_DIRECTIONS.FROM_CAMPUS,
              SCHEDULE_OPERATING_DAYS.WEEKDAYS,
              SCHEDULE_USER_TYPES.EMPLOYEE
            )
          }
          handleAssignBus={handleAssignBus}
        />
        <WeekdaySchedules
          schedules={groupedSchedule.employees?.friday}
          title="Friday"
          iconColor="text-purple-600"
          onAddTo={() =>
            onAddSchedule(SCHEDULE_DIRECTIONS.TO_CAMPUS, SCHEDULE_OPERATING_DAYS.FRIDAY, SCHEDULE_USER_TYPES.EMPLOYEE)
          }
          onAddFrom={() =>
            onAddSchedule(SCHEDULE_DIRECTIONS.FROM_CAMPUS, SCHEDULE_OPERATING_DAYS.FRIDAY, SCHEDULE_USER_TYPES.EMPLOYEE)
          }
          handleAssignBus={handleAssignBus}
        />
      </div>
    </div>
  );
}

// WeekdaySchedules
function WeekdaySchedules({ schedules, title, iconColor, onAddTo, onAddFrom, handleAssignBus }) {
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
          handleAssignBus={handleAssignBus}
        />
        <DirectionSchedules
          directionSchedules={schedules?.from}
          direction="From Campus"
          iconRotation="-rotate-90"
          onAdd={onAddFrom}
          handleAssignBus={handleAssignBus}
        />
      </div>
    </div>
  );
}

// DirectionSchedules (Add button always shown)
function DirectionSchedules({ directionSchedules, direction, iconRotation, onAdd, handleAssignBus }) {
  return (
    <div className="bg-gray-50 border border-gray-300 p-2 rounded">
      <div className="flex items-center gap-2 mb-2">
        <FaExchangeAlt className={`text-green-500 ${iconRotation}`} />
        <span>{direction}</span>
        <span className="badge badge-sm">{directionSchedules?.length || 0} trips</span>
      </div>

      {directionSchedules && directionSchedules.length > 0 ? (
        directionSchedules
          .sort((a, b) => a.time.localeCompare(b.time))
          .map((schedule) => <ScheduleItem key={schedule._id} schedule={schedule} handleAssignBus={handleAssignBus} />)
      ) : (
        <div className="text-center text-gray-400 text-sm py-2">No schedules yet</div>
      )}

      <button
        onClick={onAdd}
        className="btn btn-xs btn-outline btn-success mt-2 w-full flex items-center justify-center gap-1"
      >
        <FaPlus /> Add Schedule
      </button>
    </div>
  );
}

// Schedule Item
function ScheduleItem({ schedule, handleAssignBus }) {
  const formattedTime = schedule.time ? moment(schedule.time, "HH:mm").format("hh:mm A") : "Not Scheduled";

  return (
    <div className="flex relative justify-between items-center my-3 bg-white border border-gray-500 p-2 rounded shadow-sm">
      <div className="w-full">
        <div className="flex items-center gap-1 font-mono">
          <FaClock className="text-blue-500" />
          <span className="text-lg">{formattedTime}</span>
        </div>
        {schedule.note && (
          <div className="flex items-center gap-1 text-[10px]">
            <FaStickyNote className="text-yellow-500" />
            <span className="text-[15px]">{schedule.note}</span>
          </div>
        )}
        <hr className="my-1 border-gray-400" />
        <p className="text-center my-2">Assigned Buses:</p>

        <div className="mt-2 rounded-md">
          {schedule.assignedBuses.map((assigned, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between px-2 my-2 text-[11px] bg-gray-100 border border-gray-300 py-1 rounded"
            >
              <div className="flex items-center">
                <FaBus className="text-green-600 mr-1" />
                <span>{assigned.busId?.name || "Bus Not Assigned"}</span>
              </div>
              <div className="flex items-center ml-4 space-x-1">
                <FaUser className={assigned.driverId?.name ? "text-gray-700" : "text-red-500"} />
                <span>{assigned.driverId?.name || "Not Assigned"}</span>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => handleAssignBus(schedule._id)}
          className="btn btn-xs btn-outline btn-dash mt-2 w-full flex items-center justify-center gap-1"
        >
          <FaBus /> Assign Bus and Driver
        </button>
      </div>
    </div>
  );
}

export default AddSchedule;
