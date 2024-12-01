const { z } = require('zod');


const captainRegistrationSchema = z.object({
    fullName: z.object({
        firstName: z.string().min(3, 'First Name should be at least 3 characters long'),
        lastName: z.string().min(3, 'Last Name should be at least 3 characters long')
    }),
    email: z.string().email(),
    password: z.string().min(6, 'Password should be at least 6 characters long'),
    vehicle: z.object({
        color: z.string().min(3, 'Color must be at least 3 characters long'),
        plate: z.string().min(3, 'Plate must have 3 characters'),
        capacity: z.number().min(1, 'Capacity must be at least 1'),
        vehicleType: z.enum(['car', 'motorcycle', 'auto'])
    })
}).strict();

const captainLoginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6, 'Password should be at least 6 characters long')
})

const updateLocationSchema = z.object({
    ltd: z.number().min(-90).max(90), // Latitude range
    lng: z.number().min(-180).max(180), // Longitude range
  });
  

module.exports = {captainRegistrationSchema ,captainLoginSchema , updateLocationSchema };