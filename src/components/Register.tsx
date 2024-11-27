/* eslint-disable @typescript-eslint/no-explicit-any */
import { RegisterValidation } from "@/lib/validation";
import { register } from "@/services/authService";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const Register = () => {

    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    // 1. Define your form
    const form = useForm<z.infer<typeof RegisterValidation>>({
        resolver: zodResolver(RegisterValidation),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            role: "employee",
            department: "",
        },
    })

    // 2. Define a submit handler.
    async function onSubmit(user: z.infer<typeof RegisterValidation>) {
        const { name, email, password, role, department } = user;
        try {
            await register(name, email, password, role, department);
            navigate(`/${user.role}-dashboard`);
        } catch (error: any) {
            setError(error.response?.data?.message || "Login failed!, Please try again");
        }
    };

    return (
        <div className="w-full h-screen flex justify-center items-center bg-darkBg text-darkText">
            <div className="max-w-md mx-auto p-6 shadow-md rounded-lg bg-darkSurface">
                <h2 className="text-xl text-center font-bold mb-8">
                    Register New user
                </h2>


                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full mt-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input type='text' className="w-80 bg-darkBg border-darkBorder border-[2px]" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input type='email' className="w-80 bg-darkBg border-darkBorder border-[2px]" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input type='password' className="w-80 bg-darkBg border-darkBorder border-[2px]" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Confirm Password</FormLabel>
                                    <FormControl>
                                        <Input type='password' className="w-80 bg-darkBg border-darkBorder border-[2px]" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="role"
                            render={({ field }) => (
                                <FormItem className="flex flex-col gap-3">
                                    <FormLabel>Role</FormLabel>
                                    <FormControl>
                                        <select {...field} className="w-80 p-1 bg-darkBg border-darkBorder border-[2px]">
                                            <option value="employee">Employee</option>
                                            <option value="manager">Manager</option>
                                            <option value="admin">Admin</option>
                                        </select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="department"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Department</FormLabel>
                                    <FormControl>
                                        <Input type='text' className="w-80 bg-darkBg border-darkBorder border-[2px]" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {error && <p className="text-red-800 text-sm mb-5">{error}</p>}

                        <Button type="submit" className="w-80" variant="outline">
                            Register
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    )
}

export default Register
