'use server';

import { connectToDb } from '@/lib/db';

export const signUp = async () => {
	try {
		await connectToDb();
	} catch (e) {}
};
