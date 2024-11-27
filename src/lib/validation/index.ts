import * as z from "zod";


export const LoginValidation = z.object({
    email: z.string().email({
        message: 'Invalid email',
    }),
    password: z.string().min(8, {
        message: 'Password must be at least 8 characters',
    }),
})


export const RegisterValidation = z.object({
    name: z.string().min(3, {
        message: 'Name must be at least 3 characters',
    }),
    email: z.string().email({
        message: 'Invalid email',
    }),
    password: z.string().min(8, {
        message: 'Password must be at least 8 characters',
    }),
    confirmPassword: z.string().min(8, {
        message: 'Password must be at least 8 characters',
    }),
    role: z.enum(['employee', 'admin', 'manager']),
    department: z.string(),
})


export const TimesheetValidation = z.object({
    date: z.string(),
    hoursWorked: z.string().regex(/^\d+$/, {
        message: 'Hours worked must be a number',
    }),
    description: z.string().min(10, {
        message: 'Description must be at least 10 characters',
    }),
})