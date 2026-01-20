import './App.css';
import * as React from "react";
import {ThemeProvider, createTheme} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {amber, deepOrange, grey, orange} from "@mui/material/colors";
import {useDispatch, useSelector} from "react-redux";
import {getUser} from "./store/user/userAction";
import {useEffect} from "react";
import {Navigate, Route, Routes} from "react-router-dom";
import AutoAppointmentPage from "./components/auto-appointment-page";
import IndexPage from "./pages/IndexPage";
import Layout from "./components/navigation/layout";
import VotingPage from "./components/voting/voting-page";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {LocalizationProvider} from "@mui/x-date-pickers";
import WorkerVotingPage from "./components/voting/worker/worker-voting-page";
import QualificationsPage from "./components/qualifications-page/qualifications-page";
import WorkersPage from "./components/workers-page/workers-page";
import TasksPage from "./components/tasks-page/tasks-page";
import TasksAppointmentsPage from "./components/tasks-appointments-page/tasks-appointments-page";
import WorkersLogsPage from "./components/workers-logs-page/workers-logs-page";
import TestComponent from "./components/test-component";
import IotPage from "./components/iot-page/iot-page";
import WorkerReportPage from "./components/workers-page/worker-report-page/worker-report-page";
import ProfilePage from "./components/profile-page/profile-page";
import TechSupportPage from "./components/tech-support-page/tech-support-page";
import './i18n';
import PricingPage from "./pages/pricingPage";
import DevblogPage from "./pages/devblogPage";
import ProductsPage from "./pages/productsPage";
import OrdersPage from "./components/orders-page/orders-page";
import {useMediaQuery} from "@mui/material";
import 'dayjs/locale/uk';
import 'dayjs/locale/en-gb';

const getDesignTokens = (mode) => ({
    palette: {
        mode,
        ...(mode === 'light'
            ? {
                // // palette values for light mode
                // primary: amber,
                // divider: amber[200],
                // text: {
                //     primary: grey[900],
                //     secondary: grey[800],
                // },
            } : {
                // palette values for dark mode
                primary: orange,
                // divider: deepOrange[700],
                // background: {
                //     default: deepOrange[900],
                //     paper: deepOrange[900],
                // },
                // text: {
                //     primary: '#fff',
                //     secondary: grey[500],
                // },
            }),
    },
});

export const ColorModeContext = React.createContext({
    toggleColorMode: () => {
    }
});

function App() {
    const dispatch = useDispatch();
    const token = localStorage.getItem('access_token');
    useEffect(() => {
        dispatch(getUser(token))
    }, [])
    const userType = useSelector((state) => state.user.role)

    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

    const [mode, setMode] = React.useState(prefersDarkMode ? 'dark' : 'light');
    const colorMode = React.useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
            },
        }),
        [],
    );

    const theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

    return (
        <div className="App">
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='en-gb'>
                <ColorModeContext.Provider value={colorMode}>
                    <ThemeProvider theme={theme}>
                        <CssBaseline/>
                        <Routes>
                            <Route path="/" element={<Layout/>}>
                                <Route path="/" element={<IndexPage/>}/>
                                <Route path="pricing" element={<PricingPage/>}/>
                                <Route path="devblog" element={<DevblogPage/>}/>
                                <Route path="products" element={<ProductsPage/>}/>
                                <Route path="qualifications" element={userType === "C" ? <QualificationsPage/> : <Navigate to="/" replace/>}/>
                                <Route path="workers" element={userType === "C" ? <WorkersPage/> : <Navigate to="/" replace/>}/>
                                <Route path="workers/report" element={userType === "C" ? <WorkerReportPage/> : <Navigate to="/" replace/>}/>
                                <Route path="tasks" element={userType === "C" ? <TasksPage/> : <Navigate to="/" replace/>}/>
                                <Route path="tasks-appointments" element={userType === "C" ? <TasksAppointmentsPage/> : <Navigate to="/" replace/>}/>
                                <Route path="workers-logs" element={userType === "C" ? <WorkersLogsPage/> : <Navigate to="/" replace/>}/>
                                <Route path="iot" element={userType === "C" ? <IotPage/> : <Navigate to="/" replace/>}/>
                                <Route path="auto-appointment" element={userType === "C" ? <AutoAppointmentPage/> : <Navigate to="/" replace/>}/>
                                <Route path="profile" element={userType === "C" ? <ProfilePage/> : <Navigate to="/" replace/>}/>
                                <Route path="tech-support" element={userType === "C" ? <TechSupportPage/> : <Navigate to="/" replace/>}/>
                                <Route path="offers" element={userType === "C" ? <OrdersPage/> : <Navigate to="/" replace/>}/>
                                <Route path="voting" element={userType === "C" ? (<VotingPage/>) : (userType === "W" ? <WorkerVotingPage/> : <Navigate to="/" replace/>)}/>
                            </Route>
                        </Routes>
                    </ThemeProvider>
                </ColorModeContext.Provider>
            </LocalizationProvider>
        </div>
    );
}


export default App;


