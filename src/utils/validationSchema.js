
import { z } from 'zod';

export const paymentSchema = z.object({
    paymentMethod: z.string().nonempty("Payment method is required"),
    firstName: z.string().nonempty("First name is required"),
    lastName: z.string().nonempty("Last name is required"),
    creditCardNumber: z.string().nonempty("Credit card number is required"),
    cvv: z.string().nonempty("CVV is required"),
    mm: z.string().nonempty("MM is required"),
    yyyy: z.string().nonempty("YYYY is required"),
});