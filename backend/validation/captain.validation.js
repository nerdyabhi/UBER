const { z } = require('zod');


const captainRegistrationSchema = z.object({
    fullName: z.object({
        firstName: z.string().min(3, 'First Name should be at least 3 characters long'),
        lastName: z.string().min(3, 'Last Name should be at least 3 characters long')
    }),
    email: z.string().email(),
    password: z.string().min(6, 'Password should be at least 6 characters long'),
    socketId: z.string().optional(),
    status: z.enum(['active', 'inactive']).optional(),
    vehicle: z.object({
        color: z.string().min(3, 'Color must be at least 3 characters long'),
        plate: z.string().min(3, 'Plate must have 3 characters'),
        capacity: z.number().min(1, 'Capacity must be at least 1'),
        vehicleType: z.enum(['car', 'motorcycle', 'auto'])
    }),
    location: z.object({
        lat: z.number().optional(),
        lang: z.number().optional()
    }).optional()
}).strict();

const captainLoginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6, 'Password should be at least 6 characters long')
})

module.exports = {captainRegistrationSchema ,captainLoginSchema };