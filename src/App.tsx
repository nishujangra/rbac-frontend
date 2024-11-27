import { Navigate, Route, Routes } from "react-router-dom"
import Login from "./components/Login"
import Register from "./components/Register"
import { getUserRole } from "./utils/authUtils"
import EmployeeDashboard from "./pages/EmployeeDashboard"
import AdminDashboard from "./pages/AdminDashboard"
import ManagerDashboard from "./pages/ManagerDashboard"
import TimesheetForm from "./components/TimesheetForm"
import Home from "./pages/Home"


const ProtectedRoute = ({ children, role }: { children: React.ReactNode, role: string }) => {
  const userRole = getUserRole();

  if (!userRole) {
    return <Navigate to="/login" replace />
  }

  if (role !== userRole) {
    return <Navigate to={`/${userRole}-dashboard`} />
  }

  return <>{children}</>
}

const Authentication = ({ children }: { children: React.ReactNode }) => {
  const userRole = getUserRole();

  if (userRole) {
    return <Navigate to={`/${userRole}-dashboard`} />
  }

  return <>{children}</>
}


function App() {

  return (
    <div className="bg-darkBg text-darkText">
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path='/login' element={
          <Authentication>
            <Login />
          </Authentication>
        } />
        
        <Route path="/register" element={
          <ProtectedRoute role="admin">
            <Register />
          </ProtectedRoute>
        } />

        <Route path="/employee-dashboard" element={
          <ProtectedRoute role="employee">
            <EmployeeDashboard />
          </ProtectedRoute>
        } />

        <Route path="/admin-dashboard" element={
          <ProtectedRoute role="admin">
            <AdminDashboard />
          </ProtectedRoute>
        } />


        <Route path="/manager-dashboard" element={
          <ProtectedRoute role="manager">
            <ManagerDashboard />
          </ProtectedRoute>
        } />

        <Route path="/submit-timesheet" element={
          <ProtectedRoute role="employee">
            <TimesheetForm />
          </ProtectedRoute>
        } />


        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </div>
  )
}

export default App
