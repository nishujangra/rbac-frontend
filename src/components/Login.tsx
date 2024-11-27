/* eslint-disable @typescript-eslint/no-explicit-any */
import { login } from "@/services/authService";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Button } from "./ui/button";
import { z } from "zod";
import { Input } from "./ui/input";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form";
import { LoginValidation } from "@/lib/validation";
import { getUserRole } from "@/utils/authUtils";

const Login = () => {

    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    // 1. Define your form
    const form = useForm<z.infer<typeof LoginValidation>>({
        resolver: zodResolver(LoginValidation),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    // 2. Define a submit handler.
    async function onSubmit(user: z.infer<typeof LoginValidation>) {
        const { email, password } = user;
        try {
            setIsLoading(true);
            const data = await login(email, password);
            localStorage.setItem('token', data.token);
            const userRole = getUserRole();
            setIsLoading(false);
            navigate(`/${userRole}-dashboard`);
        } catch (error: any) {
            setError(error.response?.data?.message || "Login failed!, Please try again");
        }
    };

    return (
        <div className="w-full h-screen flex justify-center items-center bg-darkBg text-darkText">
            <div className="max-w-md mx-auto p-6 shadow-md rounded-lg bg-darkSurface">
                <h2 className="text-xl text-center font-bold mb-8">
                    Login
                </h2>


                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full mt-4">
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
                            name="password"
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

                        {error && <p className="text-red-800 text-sm mb-5">{error}</p>}

                        <Button type="submit" className={`w-80`} variant="outline">
                            {isLoading ? "Loading..." : "Login"}
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    )
}

export default Login