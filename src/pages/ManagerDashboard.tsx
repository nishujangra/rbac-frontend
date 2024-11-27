/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button"
import { logout } from "@/services/authService";
import { updateTimesheetStatus, viewAllTimesheets } from "@/services/timesheetService";
import { useEffect, useState } from "react";
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

const ManagerDashboard = () => {
  const [timesheets, setTimesheets] = useState<Timesheet[]>([]);

  const navigate = useNavigate();

  const handleStatusChange = async (id: string, status: "approved" | "rejected") => {
    try {
      await updateTimesheetStatus(id, status);
      setTimesheets((prev) => {
        return prev.map((timesheet) => {
          if (timesheet._id === id) {
            return { ...timesheet, status };
          }
          return timesheet;
        });
      });
    } catch (err: any) {
      console.error(err.message || 'Failed to update timesheet status');
    }
  };

  const fetchTimesheets = async () => {
    try {
      const data = await viewAllTimesheets();
      setTimesheets(data.timesheets);
    } catch (err: any) {
      console.log(err.message || "Failed to fetch timesheets");
    }
  };

  useEffect(() => {
    fetchTimesheets();
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  }

  return (
    <div className="max-w-full min-h-screen px-10 mx-auto p-6 bg-darkBg text-darkText overflow-hidden">
      <h2 className="text-2xl font-bold mb-4 pl-4">Manager Dashboard</h2>

      <hr className="h-2 bg-green-400 w-1/4 rounded-lg" />

      <div className="flex justify-end my-2">
        <Button className="mt-4" variant="outline" onClick={handleLogout}>
          Logout
        </Button>
      </div>

      <h3 className="text-xl font-bold my-8">Employee Timesheets</h3>


      {timesheets.length === 0 ? (
        <p className="mt-4">No timesheets found</p>
      ) : (
        <div className="w-full border-darkBorder border-[1px] text-base">
          <div className="flex flex-col justify-center">
            <div className="flex font-bold mb-2">
              <div className="px-2 py-1 w-1/5 text-center border-darkBorder border-[3px]">Employee Name</div>
              <div className="px-2 py-1 w-1/5 text-center border-darkBorder border-[3px]">Hours Worked</div>
              <div className="px-2 py-1 w-1/5 text-center border-darkBorder border-[3px]">Description</div>
              <div className="px-2 py-1 w-1/5 text-center border-darkBorder border-[3px]">Status</div>
              <div className="px-2 py-1 w-1/5 text-center border-darkBorder border-[3px]">Actions</div>
            </div>

            {timesheets.map((timesheet) => (
              <div key={timesheet._id} className="flex">
                <div className="px-2 py-1 w-1/5 border-darkBorder border-[2px]">{timesheet.userID.name}</div>
                <div className="px-2 py-1 w-1/5 border-darkBorder border-[2px]">{timesheet.hoursWorked}</div>
                <div className="px-2 py-1 w-1/5 border-darkBorder border-[2px]">{timesheet.description}</div>
                <div
                  className={`${timesheet.status === 'approved' ? 'text-green-600' : timesheet.status === 'rejected' ? 'text-red-800' : 'text-yellow-300'} px-2 py-1 w-1/5 border-darkBorder border-[2px]`}
                >
                  {timesheet.status}
                </div>
                <div className={`p-2 flex w-1/5 justify-around border-darkBorder border-[2px]`}>
                  {timesheet.status === 'pending' && (
                    <>
                      <Button
                        onClick={() => handleStatusChange(timesheet._id, "approved")}
                        className="px-4 py-2 rounded bg-green-400 text-green-950 hover:bg-green-500"
                      >
                        Approve
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={() => handleStatusChange(timesheet._id, "rejected")}
                        className="px-4 py-2 rounded"
                      >
                        Reject
                      </Button>
                    </>
                  )}
                  {timesheet.status !== 'pending' && (
                    <div className="">Already {timesheet.status}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default ManagerDashboard
