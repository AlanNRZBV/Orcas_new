'use server';
import { connectToDb } from '@/lib/db';
import { UserData, IUserFormResponse, IUserLogin } from '@/lib/types';
import { getSession } from '@/lib/actions/getSession';
import mongoose, { mongo } from 'mongoose';
import { userFormSchema } from '@/lib/validation/userFormSchema';
import User from '@/database/user.schema';
import Studio from '@/database/studio.schema';

export const signIn = async (prevState: IUserFormResponse, formData: FormData) => {
	try {
		await connectToDb();
		const session = await getSession();

		if (!session) {
			return { ...prevState, message: 'Session error', isJSON: false };
		}
		const loginData: IUserLogin = {
			email: formData.get('email') as string,
			password: formData.get('password') as string,
		};

		const user = await User.findOne({ email: loginData.email });

		if (!user) {
			return { ...prevState, message: 'Wrong credentials', isJSON: false };
		}

		const isMatch = await user.checkPassword(loginData.password);

		if (!isMatch) {
			return { ...prevState, message: 'Wrong credentials', isJSON: false };
		}

		const studio = await Studio.findOne({ owner: user._id });

		session.email = user.email;
		session._id = user._id;
		session.role = user.role;
		session.username = user.username;
		session.isLoggedIn = true;

		if (studio) {
			session.studioId = studio._id;
		}

		await session.save();

		return { ...prevState, message: 'Login successful', isJSON: false };
	} catch (e) {
		if (e instanceof mongoose.Error.ValidationError) {
			//TODO
			// this is not the way
			return { ...prevState, dbErrorMsg: JSON.stringify(e), isJSON: true };
		}

		return { ...prevState, dbErrorMsg: 'Login failed due to an unexpected error', isJSON: false };
	}
};

export const signUp = async (prevState: IUserFormResponse, formData: FormData) => {
	try {
		await connectToDb();

		const user: UserData = {
			username: formData.get('username') as string,
			email: formData.get('email') as string,
			password: formData.get('password') as string,
		};

		const validatedUser = userFormSchema.safeParse(user);

		if (!validatedUser.success) {
			return {
				...prevState,
				zodErrors: validatedUser.error.flatten().fieldErrors,
				data: null,
			};
		}

		const newUser = new User(user);
		await newUser.save();

		return { ...prevState, message: 'Registration successful', data: 'its ok', zodErrors: {}, isJSON: false };
	} catch (e) {
		if (e instanceof mongoose.Error.ValidationError) {
			return { ...prevState, dbErrorMsg: JSON.stringify(e), isJSON: true };
		}

		if (e instanceof mongo.MongoServerError && e.code === 11000) {
			return { ...prevState, dbErrorMsg: 'Email already exists', isJSON: false };
		}

		return { ...prevState, dbErrorMsg: 'Registration failed due to an unexpected error', isJSON: false };
	}
};

export const logout = async () => {
	const session = await getSession();
	session?.destroy();
	return;
};

export const checkInvites = async () => {
	try {
		const session = await getSession();

		if (!session) {
			return { errorMsg: 'Session error' };
		}

		const userId = session._id;

		const user = await User.findById(userId);

		if (!user) {
			return { errorMsg: 'User doesnt exist' };
		}

		return { data: user };
	} catch (e) {
		return { errorMsg: 'Unexpected error' };
	}
};
