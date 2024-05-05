import { z } from "zod";


export const authFormSchema = (type: "sign-in" | "sign-up") => z.object({
    // validate for sign-up

    firstName: type === "sign-in" ? z.string().optional() : z.string().min(1),
    lastName: type === "sign-in" ? z.string().optional() : z.string().min(1),
    address1: type === "sign-in" ? z.string().optional() : z.string().max(70),
    city: type === "sign-in" ? z.string().optional() : z.string().max(30),
    state: type === "sign-in" ? z.string().optional() : z.string().min(2).max(5),
    postalCode: type === "sign-in" ? z.string().optional() : z.string().min(3).max(6),
    dateOfBirth: type === "sign-in" ? z.string().optional() : z.string().min(4),
    ssn: type === "sign-in" ? z.string().optional() : z.string().min(3),


    // validate for both (sign-in & sign-up)

    email: z.string().email(),
    password: z.string().min(8, { message: "Password must be at least 8 characters long." }),
});
