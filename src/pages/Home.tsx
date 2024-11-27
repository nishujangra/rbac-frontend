import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

const Home = () => {
    return (
        <div className="min-h-screen bg-darkBg text-darkText flex flex-col justify-center items-center">
            <header className="w-full py-8">
                <h1 className="text-3xl text-center font-bold">
                    Employee Timesheet Management System
                </h1>
            </header>
            <main className="flex-1 w-full flex flex-col items-center justify-center px-4">
                <div className="max-w-xl w-full text-center rounded-lg p-6">
                    <h2 className="text-2xl font-semibold mb-4">
                        Welcome to the Timesheet Management System
                    </h2>
                    <p className="mb-6">
                        Manage your work hours, approve department timesheets, or view all users.
                    </p>
                    <div className="flex justify-center space-x-4">
                        <Button className="px-6" variant="outline">
                            <Link to="/login">Login</Link>
                        </Button>
                    </div>
                </div>
                <div className="bg-darkSurface p-5 rounded-lg border-darkBg border-[1px]">
                    <h2 className="text-xl font-semibold">You can test this project using these emails:</h2>
                    <div className="flex flex-col mt-3">
                        <p><span className="font-semibold">Admin:</span> admin@example.com</p>
                        <p><span className="font-semibold">Manager:</span> manager@example.com</p>
                        <p><span className="font-semibold">Employee:</span> employee@example.com </p>
                        <p><span className="font-semibold">Password:</span> 12345678 <span className="italic opacity-50 text-white">(for all type of users)</span> </p>
                    </div>
                </div>
            </main>
            <footer className="w-full py-4 text-center">
                <p className="text-sm">
                    © {new Date().getFullYear()} Timesheet Management System. All rights reserved.
                </p>
            </footer>
        </div>
    )
}

export default Home
