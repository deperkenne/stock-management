import { z } from 'zod';

export const contactSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required.')
    .min(2, 'Name must be at least 2 characters.'),

  email: z
    .string()
    .min(1, 'Email address is required.')
    .email('Please enter a valid email address.'),

  phone: z
    .string()
    .optional()
    .refine(
      (val) => !val || /^\+?[\d\s\-(). ]{7,20}$/.test(val),
      { message: 'Please enter a valid phone number.' }
    ),

  subject: z
    .string()
    .min(1, 'Subject is required.')
    .min(3, 'Subject must be at least 3 characters.'),

  message: z
    .string()
    .min(1, 'Message is required.')
    .min(20, 'Message must be at least 20 characters.'),
});

export type ContactFormData = z.infer<typeof contactSchema>;
