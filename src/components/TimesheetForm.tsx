/* eslint-disable @typescript-eslint/no-explicit-any */
import { TimesheetValidation } from "@/lib/validation";
import { getUserRole } from "@/utils/authUtils";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { submitTimesheet } from "@/services/timesheetService";

const TimesheetForm = () => {
    const navigate = useNavigate();

    // 1. Define your form
    const form = useForm<z.infer<typeof TimesheetValidation>>({
        resolver: zodResolver(TimesheetValidation),
        defaultValues: {
            date: (new Date().toISOString().split('T')[0]),
            hoursWorked: "",
            description: "",
        },
    })

    // 2. Define a submit handler.
    async function onSubmit(user: z.infer<typeof TimesheetValidation>) {
        const { date, hoursWorked, description } = user;
        console.log(date, hoursWorked, description);
        try {
            await submitTimesheet({ date, hoursWorked, description });
            const userRole = getUserRole();
            navigate(`/${userRole}-dashboard`);
        } catch (error: any) {
            console.error(error.message);
        }
    };

    return (
        <div className="w-full h-screen flex justify-center items-center bg-darkBg text-darkText">
            <div className="max-w-md mx-auto p-6 shadow-md rounded-lg bg-darkSurface">
                <h2 className="text-xl text-center font-bold mb-8">
                    Submit Your TimeSheet
                </h2>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col justify-center items-center gap-5 w-full mt-4">
                        <FormField
                            control={form.control}
                            name="date"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Date</FormLabel>
                                    <FormControl>
                                        <Input type='date' className="w-80 bg-darkBg border-darkBorder border-[2px]" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="hoursWorked"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Hours Worked</FormLabel>
                                    <FormControl>
                                        <Input type='text' className="w-80 bg-darkBg border-darkBorder border-[2px]" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Input type='text' className="w-80 bg-darkBg border-darkBorder border-[2px]" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button type="submit" className="w-80" variant="outline">
                            Log In
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    )
}

export default TimesheetForm
