const { z } = require('zod');

const userRegistrationSchema = z.object({
    fullName: z.object({
        firstName: z.string().min(1, "First name is required"),
        lastName: z.string().min(1, "Last name is required")
    }),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long")
});

const userLoginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long")
}).strict()

module.exports = {
    userRegistrationSchema,
    userLoginSchema
}