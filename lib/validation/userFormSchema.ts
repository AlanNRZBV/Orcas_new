import { z } from 'zod';
export const userFormSchema = z.object({
	username: z.string().min(4, 'Username must be 4-16 characters').max(16, 'Username must be 4-16 characters'),
	email: z.string().email('Email is not valid'),
	password: z.string().min(4, 'Password must be at least 8 characters long.'),
});
