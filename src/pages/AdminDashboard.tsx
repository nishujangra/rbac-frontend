/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { logout } from "@/services/authService";
import { viewAllTimesheets } from "@/services/timesheetService";
import { getAllUser } from "@/services/userService";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface Timesheet {
  date: string;
  description: string;
  hoursWorked: number;
  status: 'approved' | 'rejected' | 'pending';
  _id: string;
  userID: {
    name: string;
    email: string;
    role: string;
    _id: string;
  }
}

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  department?: string;
}

const AdminDashboard = () => {
  const [timesheets, setTimesheets] = useState<Timesheet[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  const navigate = useNavigate();

  const fetchTimesheets = async () => {
    try {
      const data = await viewAllTimesheets();
      setTimesheets(data.timesheets);
    } catch (err: any) {
      console.log(err.message || "Failed to fetch timesheets");
    }
  };

  const fetchUsers = async () => {
    try {
      const data = await getAllUser();
      setUsers(data.users);
    } catch (err: any) {
      console.log(err.message || "Failed to fetch users");
    }
  };

  useEffect(() => {
    fetchTimesheets();
    fetchUsers();
  }, []);


  const handleLogout = () => {
    logout();
    navigate('/login');
  }

  return (
    <div className="max-w-full min-h-screen px-10 mx-auto p-6 bg-darkBg text-darkText overflow-hidden">
      <h2 className="text-2xl font-bold mb-4 pl-4">Admin Dashboard</h2>

      <hr className="h-2 bg-green-400 w-1/4 rounded-lg" />

      <div className="flex justify-between">
        <Button className="mt-4" variant="outline" onClick={() => navigate('/register')}>
          Register New User
        </Button>

        <Button className="mt-4" variant="outline" onClick={handleLogout}>
          Logout
        </Button>
      </div>

      <h3 className="text-xl font-bold my-8">
        Employees
      </h3>

      {users.length === 0 ? (
        <p className="mt-4">No employees found</p>
      ) : (
        <div className="w-full text-base">
          <div className="flex flex-col justify-center mb-2">
            <div className="flex font-bold">
              <div className="px-2 py-1 w-1/4 border-darkBorder border-[3px]">Name</div>
              <div className="px-2 py-1 w-1/4 border-darkBorder border-[3px]">Email</div>
              <div className="px-2 py-1 w-1/4 border-darkBorder border-[3px]">Role</div>
              <div className="px-2 py-1 w-1/4 border-darkBorder border-[3px]">Department</div>
            </div>
          </div>

          {users.map((user) => (
            user.role != 'admin' && (
              <div key={user._id} className="flex">
                <div className="px-2 py-1 w-1/4 border-darkBorder border-[2px]">{user.name}</div>
                <div className="px-2 py-1 w-1/4 border-darkBorder border-[2px]">{user.email}</div>
                <div className="px-2 py-1 w-1/4 border-darkBorder border-[2px]">{user.role.toUpperCase()}</div>
                <div className="px-2 py-1 w-1/4 border-darkBorder border-[2px]">{user.department}</div>
              </div>
            )
          ))}
        </div>
      )}

      <h3 className="text-xl font-bold my-8">
        Employee Timesheets
      </h3>

      {timesheets.length === 0 ? (
        <p className="mt-4">No timesheets found</p>
      ) : (
        <div className="w-full text-base">
          <div className="flex flex-col justify-center">
            <div className="flex font-bold mb-2">
              <div className="px-2 py-1 w-1/4 text-center border-darkBorder border-[3px]">Employee Name</div>
              <div className="px-2 py-1 w-1/4 text-center border-darkBorder border-[3px]">Hours Worked</div>
              <div className="px-2 py-1 w-1/4 text-center border-darkBorder border-[3px]">Description</div>
              <div className="px-2 py-1 w-1/4 text-center border-darkBorder border-[3px]">Status</div>
            </div>

            {timesheets.map((timesheet) => (
              <div key={timesheet._id} className="flex">
                <div className="px-2 py-1 w-1/4 border-darkBorder border-[2px]">{timesheet.userID.name}</div>
                <div className="px-2 py-1 w-1/4 border-darkBorder border-[2px]">{timesheet.hoursWorked}</div>
                <div className="px-2 py-1 w-1/4 border-darkBorder border-[2px]">{timesheet.description}</div>
                <div
                  className={`${timesheet.status === 'approved' ? 'text-green-600' : timesheet.status === 'rejected' ? 'text-red-800' : 'text-yellow-300'} px-2 py-1 w-1/4 border-darkBorder border-[2px]`}
                >
                  {timesheet.status}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminDashboard
