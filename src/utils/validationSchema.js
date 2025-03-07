
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

export const bookingSchema = z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    gender: z.string().min(1, "Gender is required"),
    address: z.string().min(1, "Address is required"),
    apartment: z.string().optional(),
    city: z.string().min(1, "City is required"),
    zipcode: z.string().min(1, "Postal code is required"),
    state: z.string().min(1, "State is required"),
    countryName: z.string().min(1, "Country is required"),
    phoneNumber: z.string().min(1, "Phone number is required"),
    emergencyContactPhoneNumber: z.string().min(1, "Emergency contact phone number is required"),
    emergencyContactName: z.string().min(1, "Emergency contact name is required"),
    emergencyContactRelationship: z.string().min(1, "Emergency contact relationship is required"),
    visitReason: z.string().min(1, "Visit reason is required"),
});



export const generateValidationRules = () => {
    const rules = {};

    Object.keys(bookingSchema.shape).forEach((field) => {
        const fieldSchema = bookingSchema.shape[field];

        if (fieldSchema instanceof z.ZodString) {
            rules[field] = (value) => {
                if (fieldSchema.isOptional && !value) return ''; // Skip validation for optional fields
                if (!value) return fieldSchema._def.errorMap().message || `${field} is required`;
                return '';
            };
        }
    });

    return rules;
};

export const bookingRule = generateValidationRules();