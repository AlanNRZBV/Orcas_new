'use server';
import User from '@/database/user.schema';
import { IStaffResponse, IStudio } from '@/lib/types';
import mongoose from 'mongoose';
import Studio from '@/database/studio.schema';
import { getSession } from '@/lib/actions/getSession';

export const sendRequest = async (prevState: IStaffResponse, formData: FormData) => {
	try {
		const session = await getSession();

		if (!session) {
			return { ...prevState, errorMsg: 'Session error', isJSON: false };
		}

		const email = formData.get('userEmail' as string);

		const user = await User.findOneAndUpdate(
			{ email: email },
			{ invite: { studioId: session.studioId, status: 'PENDING' } },
		);

		if (!user) {
			return { ...prevState, errorMsg: 'User does not exist', isJSON: false };
		}

		return {
			errorMsg: null,
			dbErrorMsg: null,
			isJSON: false,
		};
	} catch (e) {
		if (e instanceof mongoose.Error.ValidationError) {
			return { ...prevState, dbErrorMsg: JSON.stringify(e), isJSON: true };
		}

		return { ...prevState, errorMsg: 'Unexpected error', isJSON: false };
	}
};

export const manageStaff = async (prevState: IStaffResponse, formData: FormData) => {
	try {
		const session = await getSession();

		if (!session) {
			return { ...prevState, errorMsg: 'Session error', isJSON: false };
		}

		const userId = formData.get('userSelectValue' as string);

		const user = await User.findById(userId);

		if (!user) {
			return { ...prevState, errorMsg: 'User does not exist', isJSON: false };
		}

		const newStaffData = {
			userId: user._id,
			spec: {
				name: formData.get('specName' as string),
				rank: formData.get('userRank' as string),
			},
		};

		const studio = await Studio.findOneAndUpdate(
			{
				owner: session._id,
				'staff.userId': newStaffData.userId,
			},
			{
				$set: {
					'staff.$.spec': newStaffData.spec,
				},
			},
			{ new: true },
		).populate({
			path: 'staff.userId',
			select: 'username email',
		});

		return {
			...prevState,
			errorMsg: null,
			dbErrorMsg: null,
			isJSON: false,
		};
	} catch (e) {
		if (e instanceof mongoose.Error.ValidationError) {
			return { ...prevState, dbErrorMsg: JSON.stringify(e), isJSON: true };
		}
		return { ...prevState, errorMsg: 'Unexpected error', isJSON: false };
	}
};

export const addStaff = async (prevState: IStaffResponse, formData: FormData) => {
	try {
		const session = await getSession();

		if (!session) {
			return { ...prevState, errorMsg: 'Session error', isJSON: false };
		}

		const email = formData.get('userEmail' as string);

		const user = await User.findOne({ email: email });

		if (!user) {
			return { ...prevState, errorMsg: 'User does not exist', isJSON: false };
		}

		const newStaffMember = {
			userId: user._id,
			spec: {
				name: formData.get('specName' as string),
				rank: formData.get('userRank' as string),
			},
		};

		const studio = await Studio.findOneAndUpdate(
			{ owner: session._id },
			{ $push: { staff: newStaffMember } },
			{ new: true },
		).populate({
			path: 'staff.userId',
			select: 'username email',
		});

		return {
			...prevState,
			message: 'ok',
			data: JSON.stringify(studio),
			errorMsg: null,
			dbErrorMsg: null,
			isJSON: true,
		};
	} catch (e) {
		if (e instanceof mongoose.Error.ValidationError) {
			return { ...prevState, dbErrorMsg: JSON.stringify(e), isJSON: true };
		}

		return { ...prevState, errorMsg: 'Unexpected error', isJSON: false };
	}
};
