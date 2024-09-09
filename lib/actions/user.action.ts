'use server';
import { connectToDb } from '@/lib/db';
import { User } from '@/database/user.schema';
import { IErrorResponse, IUser, IUserLogin } from '@/lib/types';
import { getSession } from '@/lib/actions/getSession';
import mongoose, { mongo } from 'mongoose';
import { redirect } from 'next/navigation';

export const signIn = async (prevState: undefined | IErrorResponse, formData: FormData) => {
	try {
		await connectToDb();
		const session = await getSession();

		const loginData: IUserLogin = {
			email: formData.get('email') as string,
			password: formData.get('password') as string,
		};

		const user = await User.findOne({ email: loginData.email });

		if (!user) {
			return { message: 'Wrong credentials', isJSON: false };
		}

		const isMatch = await user.checkPassword(loginData.password);

		if (!isMatch) {
			return { message: 'Wrong credentials', isJSON: false };
		}

		if (!session) {
			//IDK mb it's not necessary
			return { message: 'Session error', isJSON: false };
		}

		session.email = user.email;
		session.isLoggedIn = true;
		await session.save();
		redirect('/');
	} catch (e) {
		if (e instanceof mongoose.Error.ValidationError) {
			//TODO
			// this is not the way
			return { message: JSON.stringify(e), isJSON: true };
		}

		return { message: 'Login failed due to an unexpected error', isJSON: false };
	}
};

export const signUp = async (prevState: undefined | IErrorResponse, formData: FormData) => {
	try {
		await connectToDb();

		const middleName = formData.get('middleName');

		const user: IUser = {
			name: formData.get('name') as string,
			lastName: formData.get('lastName') as string,
			middleName: middleName === '' ? (middleName as string) : 'def',
			email: formData.get('email') as string,
			password: formData.get('password') as string,
		};

		const newUser = new User(user);
		await newUser.save();

		return { message: 'Register success', isJSON: false };
	} catch (e) {
		if (e instanceof mongoose.Error.ValidationError) {
			//TODO
			// this is not the way
			return { message: JSON.stringify(e), isJSON: true };
		}

		if (e instanceof mongo.MongoServerError && e.code === 11000) {
			return { message: 'Email already exists', isJSON: false };
		}

		return { message: 'Registration failed due to an unexpected error', isJSON: false };
	}
};

export const getUsers = async () => {
	try {
		await connectToDb();
		const users = await User.find({});
		return users;
	} catch (e) {
		console.log(e);
	}
};
