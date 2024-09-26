'use server';
import { getSession } from '@/lib/actions/getSession';
import Studio from '@/database/studio.schema';
import { IStudio, IStudioResponse } from '@/lib/types';
import mongoose from 'mongoose';
import { studioFormSchema } from '@/lib/validation/studioFormSchema';

export const getStudio = async () => {
	try {
		const session = await getSession();

		if (!session) {
			return { errorMsg: 'Session error', message: null, data: null };
		}

		const studio = await Studio.findOne({ owner: session._id })
			.populate('owner', 'username firstName lastName middleName')
			.populate('tasks')
			.populate({ path: 'staff.userId', select: 'username email' });

		if (!studio) {
			return { message: 'Studio has not been found', errorMsg: null, data: null };
		}

		return { message: null, errorMsg: null, data: studio };
	} catch (e) {
		return { message: null, errorMsg: JSON.stringify(e), data: null };
	}
};
export const createStudio = async (prevState: IStudioResponse, formData: FormData) => {
	try {
		const session = await getSession();

		if (!session) {
			return { ...prevState, errorMsg: 'Session error' };
		}

		const studio = {
			name: formData.get('studioName' as string),
			owner: session._id,
		};

		const validatedStudio = studioFormSchema.safeParse(studio);

		if (!validatedStudio.success) {
			return {
				...prevState,
				zodErrors: validatedStudio.error.flatten().fieldErrors,
			};
		}

		const newStudio = new Studio(studio);
		await newStudio.save();

		return { ...prevState, message: 'Studio created successfully', zodErrors: {}, isJSON: false };
	} catch (e) {
		if (e instanceof mongoose.Error.ValidationError) {
			return { ...prevState, dbErrorMsg: JSON.stringify(e), isJSON: true };
		}

		return { ...prevState, errorMsg: 'Registration failed due to an unexpected error', isJSON: false };
	}
};
