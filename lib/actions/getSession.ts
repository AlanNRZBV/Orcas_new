'use server';
import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';
import { defaultSession, SessionData, sessionsOptions } from '@/lib/session';

export const getSession = async () => {
	const session = await getIronSession<SessionData>(cookies(), sessionsOptions);

	if (!session.isLoggedIn) {
		session.isLoggedIn = defaultSession.isLoggedIn;
	}

	return session;
};
