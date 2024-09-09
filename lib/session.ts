import { SessionOptions } from 'iron-session';

export interface SessionData {
	email?: string;
	isLoggedIn: boolean;
}

export const defaultSession: SessionData = {
	isLoggedIn: false,
};

export const sessionsOptions: SessionOptions = {
	password: process.env.SECRET_KEY!,
	cookieName: 'user-session',
	cookieOptions: {
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production',
	},
};
