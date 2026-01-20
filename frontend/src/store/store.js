import { configureStore } from '@reduxjs/toolkit'
import authSliceReducer from "./auth/authSlice";
import userSliceReducer from "./user/userSlice";
import autoAppointmentReducer from "./company/autoAppointment/autoAppointmentSlice";
import votingReducer from  "./company/voting/votingSlice";
import tasksSliceReducer from "./company/tasks/tasksSlice";
import workerVotingReducer from "./company/worker-voting/workerVotingSlice";
import qualificationsSliceReducer from "./company/qualifications/qualificationsSlice";
import workersSliceReducer from "./company/workers/workersSlice";
import tasksAppointmentsSliceReducer from "./company/tasksAppointments/tasksAppointmentsSlice";
import getLogsSliceReducer from "./company/getLogs/getLogsSlice";
import iotSliceReducer from "./company/iot/iotSlice";
import workerReportSliceReducer from "./company/workerReport/workerReportSlice";
import techSupportSliceReducer from "./user/techSupport/techSupportSlice";
import ordersSliceReducer from "./company/orders/ordersSlice";

export default configureStore({
    reducer: {
        auth: authSliceReducer,
        user: userSliceReducer,
        autoAppointment: autoAppointmentReducer,
        voting: votingReducer,
        tasks: tasksSliceReducer,
        worker_voting: workerVotingReducer,
        qualifications: qualificationsSliceReducer,
        workers: workersSliceReducer,
        appointments: tasksAppointmentsSliceReducer,
        logs: getLogsSliceReducer,
        iot: iotSliceReducer,
        worker_report: workerReportSliceReducer,
        tech_support: techSupportSliceReducer,
        orders: ordersSliceReducer
    },
})