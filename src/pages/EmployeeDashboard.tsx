/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { logout } from "@/services/authService";
import { getMyTimesheets } from "@/services/timesheetService";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Timesheet {
    _id: string;
    date: string;
    hoursWorked: number;
    description: string;
    status: string;
    createdAt: string;
    updatedAt: string;
}

const EmployeeDashboard = () => {
    const navigate = useNavigate();

    const [timesheets, setTimesheets] = useState<Timesheet[]>([]);

    const fetchTimesheets = async () => {
        try {
            const data = await getMyTimesheets();
            setTimesheets(data);
        } catch (err: any) {
            console.error(err.message);
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
            <h2 className="text-2xl font-bold mb-4 pl-4">Employee Dashboard</h2>

            <hr className="h-2 bg-green-400 w-1/4 rounded-lg" />

            <div className="flex justify-between my-2">
                <Button className="mt-4" variant="outline" onClick={() => navigate('/submit-timesheet')}>
                    Submit New Timesheet
                </Button>

                <Button className="mt-4" variant="outline" onClick={handleLogout}>
                    Logout
                </Button>
            </div>

            <h3 className="text-xl font-bold my-8">My Timesheets</h3>

            {timesheets.length === 0 ? (
                <p className="mt-4">No timesheets found</p>
            ) : (
                <div className="w-full text-base">
                    <div className="flex flex-col justify-center">
                        <div className="flex font-bold mb-2">
                            <div className="px-2 py-1 w-1/5 text-center border-darkBorder border-[3px]">Data</div>
                            <div className="px-2 py-1 w-1/5 text-center border-darkBorder border-[3px]">Hours Worked</div>
                            <div className="px-2 py-1 w-1/5 text-center border-darkBorder border-[3px]">Description</div>
                            <div className="px-2 py-1 w-1/5 text-center border-darkBorder border-[3px]">Status</div>
                            <div className="px-2 py-1 w-1/5 text-center border-darkBorder border-[3px]">Submited On</div>
                        </div>

                        {timesheets.map((timesheet) => (
                            <div key={timesheet._id} className="flex">
                                <div className="px-2 py-1 w-1/5 border-darkBorder border-[2px]">{timesheet.date}</div>
                                <div className="px-2 py-1 w-1/5 border-darkBorder border-[2px]">{timesheet.hoursWorked}</div>
                                <div className="px-2 py-1 w-1/5 border-darkBorder border-[2px]">{timesheet.description}</div>
                                <div
                                    className={`${timesheet.status === 'approved' ? 'text-green-600' : timesheet.status === 'rejected' ? 'text-red-800' : 'text-yellow-300'} px-2 py-1 w-1/5 border-darkBorder border-[2px]`}
                                >
                                    {timesheet.status}
                                </div>
                                <div className="px-2 py-1 w-1/5 border-darkBorder border-[2px]">
                                    {timesheet.createdAt ? timesheet.createdAt : 'N/A'}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default EmployeeDashboard
