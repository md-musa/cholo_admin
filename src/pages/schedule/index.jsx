import { useState, useEffect } from "react";
import apiClient from "../../config/axiosConfig";
import { showSuccess, showError } from "../../utils/toastUtils";
import { SCHEDULE_DIRECTIONS, SCHEDULE_MODES, SCHEDULE_OPERATING_DAYS, SCHEDULE_USER_TYPES } from "../../constants";
import { groupSchedule } from "../../utils/scheduleutil";
import AddScheduleModal from "../../components/AddScheduleModal";
import BusAssignModal from "../../components/AssignBusModal";
import { Header } from "./components/Header";
import { SelectionPanel } from "./components/SelectionPanel";
import { RouteHeader } from "./components/RouteHeader";
import { StudentSchedules } from "./components/StudentSchedules";
import { EmployeeSchedules } from "./components/EmployeeSchedules";

function SchedulePage() {
  const [schedules, setSchedules] = useState([]);
  const [routes, setRoutes] = useState([]);
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

  // ========================
  // Fetching Data
  // ========================
  const fetchRoutes = async () => {
    try {
      const routesResponse = await apiClient.get("/routes");
      setRoutes(routesResponse.data);
    } catch (err) {
      console.error("Fetch routes error:", err);
    }
  };

  const fetchSchedule = async () => {
    if (!selectedRoute) return;
    try {
      const schedulesResponse = await apiClient.get(`/schedules/admin/route/${selectedRoute}`);
      setSchedules(schedulesResponse.data);
      showSuccess("Schedules loaded successfully");
    } catch (err) {
      showError(err.response?.data?.message || "Failed to load schedules");
    }
  };

  useEffect(() => {
    fetchRoutes();
  }, []);

  useEffect(() => {
    fetchSchedule();
  }, [selectedRoute, modalVisible, busAssignModalVisible]);

  const groupedSchedule = groupSchedule(schedules);

  // ========================
  // Schedule Functions
  // ========================

  const addSchedule = (direction, operatingDays, userType) => {
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

  const editSchedule = (schedule) => {
    setForm({
      ...schedule,
    });
    setModalVisible(true);
  };

  const deleteSchedule = async (scheduleId) => {
    try {
      await apiClient.delete(`/schedules/${scheduleId}`);
      showSuccess("Schedule deleted successfully");
      fetchSchedule();
    } catch (err) {
      showError(err.response?.data?.message || "Failed to delete schedule");
    }
  };

  // ========================
  // Bus Functions
  // ========================

  const assignBus = (scheduleId) => {
    setSelectedScheduleId(scheduleId);
    setBusAssignModalVisible(true);
  };

  const editBus = (busData) => {
    // Example: pre-fill bus data into assign modal
    setSelectedScheduleId(busData.scheduleId);
    setBusAssignModalVisible(true);
  };

  const deleteBus = async (busId) => {
    try {
      await apiClient.delete(`/buses/${busId}`);
      showSuccess("Bus deleted successfully");
      fetchSchedule();
    } catch (err) {
      showError(err.response?.data?.message || "Failed to delete bus");
    }
  };

  // ========================
  // Render
  // ========================
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
        addSchedule={addSchedule}
        editSchedule={editSchedule}
        deleteSchedule={deleteSchedule}
        assignBus={assignBus}
        editBus={editBus}
        deleteBus={deleteBus}
        fetchSchedule={fetchSchedule}
      />

      {modalVisible && <AddScheduleModal form={form} onClose={() => setModalVisible(false)} />}

      {busAssignModalVisible && (
        <BusAssignModal scheduleId={selectedScheduleId} onClose={() => setBusAssignModalVisible(false)} />
      )}
    </div>
  );
}

function ScheduleDisplay({
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
    <div className="space-y-8">
      <div className="card bg-base-100 shadow-lg">
        <div className="card-body p-0">
          <RouteHeader groupedSchedule={groupedSchedule} />
          <div className="p-4">
            <StudentSchedules
              groupedSchedule={groupedSchedule}
              addSchedule={addSchedule}
              editSchedule={editSchedule}
              deleteSchedule={deleteSchedule}
              assignBus={assignBus}
              editBus={editBus}
              deleteBus={deleteBus}
              fetchSchedule={fetchSchedule}
            />
            <EmployeeSchedules
              groupedSchedule={groupedSchedule}
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
      </div>
    </div>
  );
}

export default SchedulePage;
