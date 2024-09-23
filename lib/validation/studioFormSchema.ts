import { z } from 'zod';
export const studioFormSchema = z.object({
	name: z.string().min(4, 'Name must be 4-16 characters').max(32),
});
